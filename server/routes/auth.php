<?php
require_once __DIR__ . '/../src/AuthController.php';
header('Content-Type: application/json');

$pdo = getPDO();
$auth = new AuthController($pdo);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = preg_replace('#^/auth#', '', $uri);
$method = $_SERVER['REQUEST_METHOD'];

$input = json_decode(file_get_contents('php://input'), true);

switch ("$method $uri") {

    // --- LOGIN ---
    case 'POST /login':
        echo json_encode($auth->login());
        break;

    // --- LOGOUT ---
    case 'POST /logout':
        setcookie('auth_token', '', [
            'expires' => time() - 3600,
            'path' => '/',
            'httponly' => true,
            'samesite' => 'Strict'
        ]);
        echo json_encode(['success' => true, 'message' => 'Logged out']);
        break;

    // --- CHECK LOGIN STATUS ---
    case 'GET /check':
        $admin = $auth->check();
        if ($admin) {
            echo json_encode(['success' => true, 'admin_id' => $admin['admin_id'], 'username' => $admin['username']]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        }
        break;

    // --- REFRESH TOKEN ---
    case 'POST /refresh':
        echo json_encode($auth->refresh());
        break;

    // --- CHANGE PASSWORD ---
    case 'POST /change-password':
        $oldPassword = $input['old_password'] ?? '';
        $newPassword = $input['new_password'] ?? '';
        echo json_encode($auth->changePassword($oldPassword, $newPassword));
        break;

    // --- CHANGE USERNAME ---
    case 'PUT /change-username':
        $newUsername = $input['new_username'] ?? '';
        echo json_encode($auth->changeUsername($newUsername));
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not Found']);
        break;
}
