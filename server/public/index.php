<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/bootstrap.php';

use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// CORS + preflight
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$pdo = getPDO();

// Route map
$routes = [
    'auth' => __DIR__ . '/../routes/auth.php',
    'post' => __DIR__ . '/../routes/post.php',
    'album' => __DIR__ . '/../routes/album.php',
    'image' => __DIR__ . '/../routes/image.php',
    'mail' => __DIR__ . '/../routes/email.php',
    'category' => __DIR__ . '/../routes/category.php',
];

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = rtrim($uri, '/');
$matched = false;

foreach ($routes as $prefix => $file) {
   if (preg_match("#^/server/$prefix#", $uri)) {
    $route = preg_replace("#^/server/$prefix#", '', $uri);
    $route = rtrim($route, '/');
    if ($route === '') $route = '/';
    require $file;
    $matched = true;
    break;
}

}

if (!$matched) {
    http_response_code(404);
    echo json_encode(['error' => 'Not Found!!!']);
}
