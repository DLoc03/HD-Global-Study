<?php
require_once __DIR__ . '/../src/EmailController.php';
header('Content-Type: application/json');

$uri = preg_replace('#^/server/mail#', '', $route);
$uri = rtrim($uri, '/');
if ($uri === '') $uri = '/';
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true) ?? [];

$mailController = new MailController();

$routes = [
    'POST /send' => fn() => $mailController->sendContact($input),
];

// Dispatch route
$key = "$method $uri";
if (isset($routes[$key])) {
    echo json_encode($routes[$key]());
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Not Found']);
}
