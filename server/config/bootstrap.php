<?php
require __DIR__ . '/../vendor/autoload.php';
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

date_default_timezone_set('Asia/Ho_Chi_Minh');
error_reporting(E_ALL);
ini_set('display_errors', 1);

function generateSlug(string $title): string {
    $slug = mb_strtolower($title, 'UTF-8');
    $slug = str_replace(
        ['à','á','ạ','ả','ã','â','ầ','ấ','ậ','ẩ','ẫ','ă','ằ','ắ','ặ','ẳ','ẵ',
         'è','é','ẹ','ẻ','ẽ','ê','ề','ế','ệ','ể','ễ',
         'ì','í','ị','ỉ','ĩ',
         'ò','ó','ọ','ỏ','õ','ô','ồ','ố','ộ','ổ','ỗ','ơ','ờ','ớ','ợ','ở','ỡ',
         'ù','ú','ụ','ủ','ũ','ư','ừ','ứ','ự','ử','ữ',
         'ỳ','ý','ỵ','ỷ','ỹ',
         'đ'],
        ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a',
         'e','e','e','e','e','e','e','e','e','e','e',
         'i','i','i','i','i',
         'o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','o',
         'u','u','u','u','u','u','u','u','u','u','u',
         'y','y','y','y','y',
         'd'],
        $slug
    );
    $slug = preg_replace('/[^a-z0-9]+/i', '-', $slug);
    return trim($slug, '-');
}

function getPDO(): PDO
{
    try {
        $dsn = "mysql:host={$_ENV['DB_HOST']};port={$_ENV['DB_PORT']};charset=utf8mb4";
        $pdo = new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASS'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$_ENV['DB_NAME']}` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci");

        $dsnDb = "mysql:host={$_ENV['DB_HOST']};port={$_ENV['DB_PORT']};dbname={$_ENV['DB_NAME']};charset=utf8mb4";
        $pdo = new PDO($dsnDb, $_ENV['DB_USER'], $_ENV['DB_PASS'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        $files = glob(__DIR__ . '/../migrations/*.sql');
        foreach ($files as $file) {
            $sql = file_get_contents($file);
            $pdo->exec($sql);
        }

        return $pdo;

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database setup failed', 'message' => $e->getMessage()]);
        exit;
    }
}
