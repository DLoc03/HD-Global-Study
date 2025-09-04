<?php
require_once __DIR__ . '/../src/EmailController.php';

header('Content-Type: application/json');

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = preg_replace('#^/mail#', '', $uri);
$method = $_SERVER['REQUEST_METHOD'];

$input = json_decode(file_get_contents('php://input'), true) ?? [];

$mailController = new MailController();

switch ("$method $uri") {
    case 'POST /send':
        echo json_encode($mailController->sendContact($input));
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not Found']);
        break;
}
