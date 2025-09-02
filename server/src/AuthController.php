<?php
require_once __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthController {
    private PDO $pdo;
    private string $jwtSecret;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
        $this->jwtSecret = $_ENV['JWT_SECRET'] ?? 'change_this_secret';
    }

    public function login(): array {
        $data = json_decode(file_get_contents('php://input'), true);

        $stmt = $this->pdo->prepare("SELECT * FROM admins WHERE username = :username");
        $stmt->execute(['username' => $data['username']]);
        $admin = $stmt->fetch();

        if (!$admin || !password_verify($data['password'], $admin['password'])) {
            return ['success' => false, 'message' => 'Tài khoản không được cấp phép. Vui lòng thử lại!'];
        }

        if (!password_verify($data['password'], $admin['password'])) {
            return [
                'success' => false,
                'message' => 'Mật khẩu không chính xác. Vui lòng thử lại!'
            ];
        }


        $payload = [
            'admin_id' => $admin['id'],
            'username' => $admin['username'],
            'iat' => time(),
            'exp' => time() + 3600, // token 1h
        ];

        $jwt = JWT::encode($payload, $this->jwtSecret, 'HS256');

        // Set cookie
        setcookie('auth_token', $jwt, [
            'expires' => time() + 3600,
            'path' => '/',
            'httponly' => true,
            'samesite' => 'Strict'
        ]);

        return ['success' => true, 'token' => $jwt];
    }

    public function getAdminFromToken(): ?array {
        $token = $_COOKIE['auth_token'] ?? null;
        if (!$token) return null;

        try {
            $payload = JWT::decode($token, new Key($this->jwtSecret, 'HS256'));
            $stmt = $this->pdo->prepare("SELECT * FROM admins WHERE id = ?");
            $stmt->execute([$payload->admin_id]);
            $admin = $stmt->fetch();
            return $admin ?: null;
        } catch (\Exception $e) {
            return null;
        }
    }

    // --- Check login ---
    public function check(): ?array {
        $admin = $this->getAdminFromToken();
        return $admin ? ['admin_id' => $admin['id'], 'username' => $admin['username']] : null;
    }

    // --- Refresh token ---
    public function refresh(): array {
        $admin = $this->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Unauthorized'];

        $payload = [
            'admin_id' => $admin['id'],
            'username' => $admin['username'],
            'iat' => time(),
            'exp' => time() + 3600,
        ];
        $jwt = JWT::encode($payload, $this->jwtSecret, 'HS256');

        setcookie('auth_token', $jwt, [
            'expires' => time() + 3600,
            'path' => '/',
            'httponly' => true,
            'samesite' => 'Strict'
        ]);

        return ['success' => true, 'token' => $jwt];
    }

    public function changePassword(string $oldPassword, string $newPassword): array {
        $admin = $this->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Unauthorized'];

        if (!password_verify($oldPassword, $admin['password'])) {
            return ['success' => false, 'message' => 'Sai mật khẩu cũ!'];
        }

        $hash = password_hash($newPassword, PASSWORD_BCRYPT);
        $stmt = $this->pdo->prepare("UPDATE admins SET password = ? WHERE id = ?");
        $stmt->execute([$hash, $admin['id']]);

        return ['success' => true, 'message' => 'Mật khẩu đã được cập nhật'];
    }

    public function changeUsername(string $newUsername): array {
        $admin = $this->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Unauthorized'];

        $stmt = $this->pdo->prepare("UPDATE admins SET username = ? WHERE id = ?");
        $stmt->execute([$newUsername, $admin['id']]);

        return ['success' => true, 'message' => 'Tên đăng nhập được cập nhật!'];
    }
}
