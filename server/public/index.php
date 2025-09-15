<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/bootstrap.php';

use Dotenv\Dotenv;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// CORS
$allowedOrigins = [
    $_ENV['VITE_API_FE_URL'] ?? 'http://localhost:5174',
    $_ENV['VITE_API_ADMIN_URL'] ?? 'http://localhost:5175',
];

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

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$prefix = $_ENV['BACKEND_PREFIX'] ?? '';
if ($prefix !== '') {
    $uri = preg_replace('#^' . preg_quote($prefix, '#') . '#', '', $uri);
}
$uri = rtrim($uri, '/');
$uri = rtrim($uri, '/'); 

if (preg_match('#^/auth#', $uri)) {
    $route = $uri; 
    require __DIR__ . '/../routes/auth.php';
} elseif (preg_match('#^/post#', $uri)) {
    $route = $uri;
    require __DIR__ . '/../routes/post.php';
} elseif (preg_match('#^/album#', $uri)) {
    $route = $uri;
    require __DIR__ . '/../routes/album.php';
} elseif (preg_match('#^/image#', $uri)) {
    $route = $uri;
    require __DIR__ . '/../routes/image.php';
} elseif (preg_match('#^/mail#', $uri)) {
    $route = $uri;
    require __DIR__ . '/../routes/email.php';
} elseif (preg_match('#^/category#', $uri)) {
    $route = $uri;
    require __DIR__ . '/../routes/category.php';
} else {
    http_response_code(404);
    echo json_encode(["error" => "Not Found"]);
}
