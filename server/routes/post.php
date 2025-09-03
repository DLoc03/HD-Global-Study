<?php
require_once __DIR__ . '/../src/PostController.php';
header('Content-Type: application/json');

$pdo = getPDO();
$posts = new PostController($pdo);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = preg_replace('#^/post#', '', $uri);
$method = $_SERVER['REQUEST_METHOD'];

$input = json_decode(file_get_contents('php://input'), true);

switch ("$method $uri") {

    case 'GET /':
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10; 
        echo json_encode($posts->list($page, $limit));
        break;

    case 'GET /get':
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        if ($id <= 0) {
            echo json_encode(['success' => false, 'message' => 'Invalid post ID']);
            break;
        }
        echo json_encode($posts->get($id));
        break;

    case 'GET /detail':
        $slug = $_GET['slug'] ?? '';
        if (!$slug) {
            echo json_encode(['success' => false, 'message' => 'Slug is required']);
            break;
        }
        echo json_encode($posts->getBySlug($slug));
        break;

    case 'GET /byType':
        $type = $_GET['type'] ?? '';
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        echo json_encode($posts->getListByType($type, $page, $limit));
        break;

    case 'GET /byTitle':
        $title  = $_GET['title'] ?? '';
        $status = $_GET['status'] ?? '';
        $page   = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit  = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        echo json_encode($posts->getListByTitle($title, $status, $page, $limit));
        break;


    case 'GET /byStatus':
        $status = $_GET['status'] ?? '';
        $title = $_GET['title'] ?? '';
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        $order = $_GET['order'] ?? 'DESC';
        
        $result = $posts->getListByStatus($status, $page, $limit, $order, $title);
        $result['items'] = $posts->sortByDate($result['items'], $order);
        echo json_encode($result);
        break;


    case 'POST /updateStatus':
        $id = $input['id'] ?? ($_GET['id'] ?? 0);
        $status = $input['status'] ?? ($_GET['status'] ?? '');
        echo json_encode($posts->updateStatus((int)$id, $status));
        break;

    case 'POST /create':
        $input = $_POST;
        $files = $_FILES; 
        echo json_encode($posts->create($input, $files));
        break;

    case 'POST /update':
        $input = $_POST ?? [];  
        $id = $input['id'] ?? 0;
        echo json_encode($posts->updateWithImage((int)$id, $input, $_FILES));
        break;

    case 'PUT /update':
        $id = $input['id'] ?? 0;
        echo json_encode($posts->update((int)$id, $input));
        break;

    case 'DELETE /delete':
        $id = $_GET['id'] ?? 0;
        echo json_encode($posts->delete((int)$id));
        break;

    default:
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Not Found']);
        break;
}
