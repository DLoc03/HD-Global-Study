<?php
require_once __DIR__ . '/../src/CategoryController.php';
header('Content-Type: application/json');

$categories = new CategoryController($pdo);

$uri = preg_replace('#^/server/category#', '', $route);
$uri = rtrim($uri, '/');
if ($uri === '') $uri = '/';
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

$routes = [
    'GET /' => fn() => $categories->getList(
        $_GET['page'] ?? 1,
        $_GET['limit'] ?? 10,
        $_GET['order'] ?? 'DESC',
        $_GET['name'] ?? ''
    ),

    'GET /get' => fn() => isset($_GET['id']) && (int)$_GET['id'] > 0
        ? $categories->get((int)$_GET['id'])
        : ['success' => false, 'message' => 'Invalid category ID'],

    'POST /create' => fn() => $categories->create($_POST ?: $input),

    'POST /update' => fn() => $categories->update(
        $_POST['id'] ?? ($input['id'] ?? 0),
        $_POST ?: $input
    ),

    'PUT /update' => fn() => $categories->update(
        $input['id'] ?? 0,
        $input
    ),

    'DELETE /delete' => fn() => $categories->delete(
        $_GET['id'] ?? ($input['id'] ?? 0)
    ),
];

// Dispatch route
$key = "$method $uri";
if (isset($routes[$key])) {
    echo json_encode($routes[$key]());
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Not Found']);
}
