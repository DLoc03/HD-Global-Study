<?php
require_once __DIR__ . '/../src/AlbumController.php';
header('Content-Type: application/json');

$albums = new AlbumsController($pdo);

$uri = preg_replace('#^/server/album#', '', $route);
$uri = rtrim($uri, '/');
if ($uri === '') $uri = '/';
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

$routes = [
    'GET /' => fn() => $albums->list(
        $_GET['page'] ?? 1,
        $_GET['limit'] ?? 10,
        $_GET['status'] ?? '',
        $_GET['name'] ?? ''
    ),

    'GET /getAll' => fn() => $albums->getAll(),

    'GET /get' => fn() => $albums->get($_GET['id'] ?? 0),

    'GET /preview' => fn() => $albums->listWithPreview(
        $_GET['page'] ?? 1,
        $_GET['limit'] ?? 10
    ),

    'GET /images' => fn() => $albums->getImages($_GET['album_id'] ?? 0),

    'POST /create' => fn() => $albums->create($input ?? []),

    'PUT /update' => fn() => $albums->update(
        $input['id'] ?? ($_GET['id'] ?? 0),
        $input ?? []
    ),

    'DELETE /delete' => fn() => $albums->delete($_GET['id'] ?? 0),

    'POST /updateStatus' => fn() => $albums->updateStatus(
        $input['id'] ?? ($_GET['id'] ?? 0),
        $input['status'] ?? ($_GET['status'] ?? '')
    ),

    'GET /search' => fn() => $albums->searchByTitle(
        $_GET['title'] ?? '',
        $_GET['status'] ?? '',
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
