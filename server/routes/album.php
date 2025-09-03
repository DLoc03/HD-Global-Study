<?php
require_once __DIR__ . '/../src/AlbumController.php';

header('Content-Type: application/json');

$pdo = getPDO();
$albums = new AlbumsController($pdo);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = preg_replace('#^/album#', '', $uri);
$method = $_SERVER['REQUEST_METHOD'];

$input = json_decode(file_get_contents('php://input'), true);

switch ("$method $uri") {
    case 'GET /':
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        $status = $_GET['status'] ?? '';
        $name = $_GET['name'] ?? ''; 
        echo json_encode($albums->list($page, $limit, $status, $name));
        break;

    case 'GET /getAll':
        echo json_encode($albums->getAll());
        break;

    case 'GET /get':
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        echo json_encode($albums->get($id));
        break;

    case 'GET /preview':
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        echo json_encode($albums->listWithPreview($page, $limit));
        break;

    case 'GET /images':
        $albumId = isset($_GET['album_id']) ? (int)$_GET['album_id'] : 0;
        echo json_encode($albums->getImages($albumId));
        break;

    case 'POST /create':
        echo json_encode($albums->create($input ?? []));
        break;

   case 'PUT /update':
        $id = $input['id'] ?? ($_GET['id'] ?? 0);
        echo json_encode($albums->update((int)$id, $input ?? []));
        break;

    case 'DELETE /delete':
        $id = $_GET['id'] ?? 0;
        echo json_encode($albums->delete((int)$id));
        break;

    case 'POST /updateStatus':
        $id = $input['id'] ?? ($_GET['id'] ?? 0);
        $status = $input['status'] ?? ($_GET['status'] ?? '');
        echo json_encode($albums->updateStatus((int)$id, $status));
        break;

    case 'GET /search': 
        $title  = $_GET['title'] ?? '';
        $status = $_GET['status'] ?? '';
        $page   = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit  = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        echo json_encode($albums->searchByTitle($title, $status, $page, $limit));
        break;

    default:
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Not Found']);
        break;
}
