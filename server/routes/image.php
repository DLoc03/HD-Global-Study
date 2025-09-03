<?php
require_once __DIR__ . '/../src/ImageController.php';

header('Content-Type: application/json');

$pdo  = getPDO();
$images = new ImagesController($pdo);

$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri    = preg_replace('#^/image#', '', $uri);
$method = $_SERVER['REQUEST_METHOD'];

$input = json_decode(file_get_contents('php://input'), true);

switch ("$method $uri") {
    case 'POST /create':
        echo json_encode($images->create($_POST, $_FILES));
        break;

    case 'DELETE /delete':
        $id = $_GET['id'] ?? 0;
        echo json_encode($images->delete((int)$id));
        break;

    case 'PUT /move':
        $id = $input['id'] ?? 0;
        $newAlbumId = $input['album_id'] ?? 0;
        echo json_encode($images->updateAlbum((int)$id, (int)$newAlbumId));
        break;

    case 'POST /updateStatus':
        $id = $input['id'] ?? ($_GET['id'] ?? 0);
        $status = $input['status'] ?? ($_GET['status'] ?? '');
        echo json_encode($images->updateStatus((int)$id, $status));
        break;

    case 'GET /list':
        $albumId = $_GET['album_id'] ?? 0;
        $status  = $_GET['status'] ?? '';
        $page    = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit   = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        echo json_encode($images->list((int)$albumId, $status, $page, $limit));
        break;

    case 'GET /byAlbum':
        $albumId = $_GET['album_id'] ?? 0;
        $page    = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit   = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        echo json_encode($images->getByAlbum((int)$albumId, $page, $limit));
        break;

    case 'GET /get':
        $id = $_GET['id'] ?? 0;
        echo json_encode($images->get((int)$id));
        break;
    case 'GET /listByStatus':
        $status = $_GET['status'] ?? 'published';
        $page   = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit  = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        echo json_encode($images->listByStatus($status, $page, $limit));
        break;


    default:
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Not Found']);
        break;
}
