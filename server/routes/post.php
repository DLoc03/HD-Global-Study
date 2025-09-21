<?php
require_once __DIR__ . '/../src/PostController.php';
header('Content-Type: application/json');

$posts = new PostController($pdo);

$uri = preg_replace('#^/server/post#', '', $route);
$uri = rtrim($uri, '/');
if ($uri === '') $uri = '/';
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

$routes = [
    'GET /' => fn() => $posts->getList(
        [
            'category_id' => $_GET['category_id'] ?? null,
            'status'      => $_GET['status'] ?? null,
            'title'       => $_GET['title'] ?? null,
        ],
        $_GET['page'] ?? 1,
        $_GET['limit'] ?? 10,
        $_GET['order'] ?? 'DESC'
    ),

    'GET /get' => fn() => isset($_GET['id']) && (int)$_GET['id'] > 0
        ? $posts->get((int)$_GET['id'])
        : ['success' => false, 'message' => 'Invalid post ID'],

    'GET /detail' => fn() => !empty($_GET['slug'])
        ? $posts->getBySlug($_GET['slug'])
        : ['success' => false, 'message' => 'Slug is required'],

    'POST /updateStatus' => fn() => $posts->updateStatus(
        $input['id'] ?? ($_GET['id'] ?? 0),
        $input['status'] ?? ($_GET['status'] ?? '')
    ),

    'POST /create' => fn() => $posts->create($_POST, $_FILES),

    'POST /update' => fn() => $posts->updateWithImage(
        $_POST['id'] ?? 0,
        $_POST,
        $_FILES
    ),

    'PUT /update' => fn() => $posts->update(
        $input['id'] ?? 0,
        $input
    ),

    'DELETE /delete' => fn() => $posts->delete($_GET['id'] ?? 0),
];

// Dispatch route
$key = "$method $uri";
if (isset($routes[$key])) {
    echo json_encode($routes[$key]());
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Not Found!']);
}
