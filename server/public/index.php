<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/bootstrap.php';

use Dotenv\Dotenv;

$allowedOrigins = [
    $_ENV['VITE_API_FE_URL'] ?? 'http://localhost:5174', // FE client
    $_ENV['VITE_API_ADMIN_URL'] ?? 'http://localhost:5175', // FE admin
];

// CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (preg_match('#^/auth#', $uri)) {
    require __DIR__ . '/../routes/auth.php';
} elseif (preg_match('#^/post#', $uri)) {
    require __DIR__ . '/../routes/post.php';
} elseif (preg_match('#^/album#', $uri)) {
    require __DIR__ . '/../routes/album.php';
} elseif (preg_match('#^/image#', $uri)) {
    require __DIR__ . '/../routes/image.php';
} elseif (preg_match('#^/mail#', $uri)) {
    require __DIR__ . '/../routes/email.php';
} else {
    http_response_code(404);
    echo json_encode(["error" => "Not Found"]);
}
