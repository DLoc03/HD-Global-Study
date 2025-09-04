<?php
require_once __DIR__ . '/../src/ServiceController.php';
header('Content-Type: application/json');

$pdo = getPDO();
$serviceCtrl = new ServiceController($pdo);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = preg_replace('#^/service#', '', $uri);
$method = $_SERVER['REQUEST_METHOD'];

$input = json_decode(file_get_contents('php://input'), true);

switch ("$method $uri") {

    // --- List services ---
    case 'GET /':
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
        $status = $_GET['status'] ?? '';
        $name = $_GET['name'] ?? '';
        $category_id = isset($_GET['category_id']) ? (int)$_GET['category_id'] : 0;
        echo json_encode($serviceCtrl->getList($page, $limit, $status, $name, $category_id));
        break;

    // --- Get service by ID ---
    case 'GET /get':
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        if ($id <= 0) {
            echo json_encode(['success' => false, 'message' => 'Invalid service ID']);
            break;
        }
        echo json_encode($serviceCtrl->get($id));
        break;

    // --- Create service ---
    case 'POST /create':
        $input = $_POST;
        $files = $_FILES;
        echo json_encode($serviceCtrl->create($input, $files));
        break;

    // --- Update service ---
    case 'POST /update':
    case 'PUT /update':
        $input = $_POST ?? $input;
        $id = $input['id'] ?? 0;
        if ($id <= 0) {
            echo json_encode(['success' => false, 'message' => 'Invalid service ID']);
            break;
        }
        echo json_encode($serviceCtrl->updateWithImage((int)$id, $input, $_FILES));
        break;

    // --- Update status ---
    case 'POST /updateStatus':
        $id = $input['id'] ?? ($_GET['id'] ?? 0);
        $status = $input['status'] ?? ($_GET['status'] ?? '');
        echo json_encode($serviceCtrl->updateStatus((int)$id, $status));
        break;

    // --- Update category ---
    case 'POST /updateCategory':
        $id = $input['id'] ?? 0;
        $new_category_id = $input['new_category_id'] ?? 0;
        if ($id <= 0 || $new_category_id <= 0) {
            echo json_encode(['success' => false, 'message' => 'Invalid service or category ID']);
            break;
        }
        echo json_encode($serviceCtrl->updateCategory((int)$id, (int)$new_category_id));
        break;

    // --- Delete service ---
    case 'DELETE /delete':
        $id = $_GET['id'] ?? 0;
        if ($id <= 0) {
            echo json_encode(['success' => false, 'message' => 'Invalid service ID']);
            break;
        }
        echo json_encode($serviceCtrl->delete((int)$id));
        break;

    // --- Get services for select ---
    case 'GET /forSelect':
        $category_id = isset($_GET['category_id']) ? (int)$_GET['category_id'] : 0;
        echo json_encode($serviceCtrl->getForSelect($category_id));
        break;

    default:
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Not Found']);
        break;
}
