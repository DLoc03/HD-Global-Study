<?php
require_once __DIR__ . '/../src/AuthController.php';
header('Content-Type: application/json');

$auth = new AuthController($pdo);

$uri = preg_replace('#^/server/auth#', '', $route);
$uri = rtrim($uri, '/');
if ($uri === '') $uri = '/';
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

$routes = [
    'POST /login' => fn() => $auth->login(),

    'POST /logout' => fn() => [
        setcookie('auth_token', '', [
            'expires' => time() - 3600,
            'path' => '/',
            'httponly' => true,
            'samesite' => 'Strict'
        ]),
        ['success' => true, 'message' => 'Logged out']
    ][1], 

    'GET /check' => fn() => ($admin = $auth->check())
        ? ['success' => true, 'admin_id' => $admin['admin_id'], 'username' => $admin['username']]
        : ['success' => false, 'message' => 'Đã hết phiên làm việc, vui lòng đăng nhập lại'],

    'POST /refresh' => fn() => $auth->refresh(),

    'POST /change-password' => fn() => $auth->changePassword(
        $input['old_password'] ?? '',
        $input['new_password'] ?? ''
    ),

    'PUT /change-username' => fn() => $auth->changeUsername(
        $input['new_username'] ?? ''
    ),
];

// Dispatch route
$key = "$method $uri";
if (isset($routes[$key])) {
    echo json_encode($routes[$key]());
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not Found']);
}
