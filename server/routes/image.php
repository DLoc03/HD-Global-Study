<?php
require_once __DIR__ . '/../src/ImageController.php';
header('Content-Type: application/json');

$images = new ImagesController($pdo);

$uri = preg_replace('#^/server/image#', '', $route);
$uri = rtrim($uri, '/');
if ($uri === '') $uri = '/';
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true) ?? [];

$routes = [
    'POST /create' => fn() => $images->create($_POST, $_FILES),
    
    'DELETE /delete' => fn() => $images->delete($_GET['id'] ?? 0),

    'PUT /move' => fn() => $images->updateAlbum(
        $input['id'] ?? 0,
        $input['album_id'] ?? 0
    ),

    'POST /updateStatus' => fn() => $images->updateStatus(
        $input['id'] ?? ($_GET['id'] ?? 0),
        $input['status'] ?? ($_GET['status'] ?? '')
    ),

    'GET /list' => fn() => $images->list(
        $_GET['album_id'] ?? 0,
        $_GET['status'] ?? '',
        $_GET['page'] ?? 1,
        $_GET['limit'] ?? 10
    ),

    'GET /byAlbum' => fn() => $images->list(
        $_GET['album_id'] ?? 0,
        'published',
        $_GET['page'] ?? 1,
        $_GET['limit'] ?? 10
    ),

    'GET /get' => fn() => $images->get($_GET['id'] ?? 0),

    'GET /listByStatus' => fn() => $images->listByStatus(
        $_GET['status'] ?? 'published',
        $_GET['page'] ?? 1,
        $_GET['limit'] ?? 10
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
