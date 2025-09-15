<?php
require_once __DIR__ . '/../src/CategoryController.php';
header('Content-Type: application/json');

$pdo = getPDO();
$categories = new CategoryController($pdo);

$uri = preg_replace('#^/category#', '', $route); 
$uri = rtrim($uri, '/');
if ($uri === '') {
    $uri = '/'; 
}
$method = $_SERVER['REQUEST_METHOD'];

$input = json_decode(file_get_contents('php://input'), true);

switch ("$method $uri") {
    case 'GET /':
        $page  = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        $order = $_GET['order'] ?? 'DESC';
        $name  = $_GET['name'] ?? '';

        echo json_encode($categories->getList($page, $limit, $order, $name));
        break;

    case 'GET /get':
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        if ($id <= 0) {
            echo json_encode(['success' => false, 'message' => 'Invalid category ID']);
            break;
        }
        echo json_encode($categories->get($id));
        break;

    case 'POST /create':
        $input = $_POST ?: $input;
        echo json_encode($categories->create($input));
        break;

    case 'POST /update':
        $input = $_POST ?: $input;
        $id = $input['id'] ?? 0;
        echo json_encode($categories->update((int)$id, $input));
        break;

    case 'PUT /update':
        $id = $input['id'] ?? 0;
        echo json_encode($categories->update((int)$id, $input));
        break;

    case 'DELETE /delete':
        $id = $_GET['id'] ?? ($input['id'] ?? 0);
        echo json_encode($categories->delete((int)$id));
        break;

    default:
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Not Found']);
        break;
}
