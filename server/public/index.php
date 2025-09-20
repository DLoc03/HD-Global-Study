<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/bootstrap.php';

use Dotenv\Dotenv;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// CORS
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Parse URI
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = rtrim($uri, '/');

// Root check
if (
    $uri === '' || 
    $uri === '/server' || $uri === '/server/' ||
    $uri === '/server/public' || $uri === '/server/public/'
) {
    echo json_encode([
        "status" => "API running",
        "time" => date("Y-m-d H:i:s")
    ]);
    exit;
}

// Routes
if (preg_match('#^/server/auth#', $uri)) {
    $route = preg_replace('#^/server#', '', $uri); 
    require __DIR__ . '/../routes/auth.php';
} elseif (preg_match('#^/server/post#', $uri)) {
    $route = preg_replace('#^/server#', '', $uri); 
    require __DIR__ . '/../routes/post.php';
} elseif (preg_match('#^/server/album#', $uri)) {
    $route = preg_replace('#^/server#', '', $uri); 
    require __DIR__ . '/../routes/album.php';
} elseif (preg_match('#^/server/image#', $uri)) {
    $route = preg_replace('#^/server#', '', $uri); 
    require __DIR__ . '/../routes/image.php';
} elseif (preg_match('#^/server/mail#', $uri)) {
    $route = preg_replace('#^/server#', '', $uri); 
    require __DIR__ . '/../routes/email.php';
} elseif (preg_match('#^/server/category#', $uri)) {
    $route = preg_replace('#^/server#', '', $uri); 
    require __DIR__ . '/../routes/category.php';
} else {
    http_response_code(404);
    echo json_encode(["error" => "Not Found!"]);
}
