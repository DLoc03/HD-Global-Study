<?php
require_once __DIR__ . '/../src/EmailController.php';

header('Content-Type: application/json');

$uri = preg_replace('#^/mail#', '', $route);
$uri = rtrim($uri, '/');
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
