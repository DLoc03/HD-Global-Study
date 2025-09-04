<?php
require_once __DIR__ . '/../src/CategoryController.php';
header('Content-Type: application/json');

$pdo = getPDO();
$categoryCtrl = new CategoryController($pdo);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = preg_replace('#^/category#', '', $uri);
$method = $_SERVER['REQUEST_METHOD'];

$input = json_decode(file_get_contents('php://input'), true);

switch ("$method $uri") {

    // --- List categories ---
    case 'GET /':
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        $status = $_GET['status'] ?? '';
        $name = $_GET['name'] ?? '';
        echo json_encode($categoryCtrl->getList($page, $limit, $status, $name));
        break;

    // --- Get category by ID ---
    case 'GET /get':
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        if ($id <= 0) {
            echo json_encode(['success' => false, 'message' => 'Invalid category ID']);
            break;
        }
        echo json_encode($categoryCtrl->get($id));
        break;

    // --- Create category ---
    case 'POST /create':
        $input = $_POST;
        echo json_encode($categoryCtrl->create($input));
        break;

    // --- Update category ---
    case 'POST /update':
    case 'PUT /update':
        $input = $_POST ?? $input;
        $id = $input['id'] ?? 0;
        if ($id <= 0) {
            echo json_encode(['success' => false, 'message' => 'Invalid category ID']);
            break;
        }
        echo json_encode($categoryCtrl->update((int)$id, $input));
        break;

    // --- Update status ---
    case 'POST /updateStatus':
        $id = $input['id'] ?? ($_GET['id'] ?? 0);
        $status = $input['status'] ?? ($_GET['status'] ?? '');
        echo json_encode($categoryCtrl->updateStatus((int)$id, $status));
        break;

    // --- Delete category ---
    case 'DELETE /delete':
        $id = $_GET['id'] ?? 0;
        if ($id <= 0) {
            echo json_encode(['success' => false, 'message' => 'Invalid category ID']);
            break;
        }
        echo json_encode($categoryCtrl->delete((int)$id));
        break;

    case 'GET /treePaginated':
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        $status = $_GET['status'] ?? 'published';
        echo json_encode($categoryCtrl->getTreePaginated($page, $limit, $status));
        break;

    default:
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Not Found']);
        break;
}
