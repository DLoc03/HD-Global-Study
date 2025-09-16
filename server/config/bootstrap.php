<?php
require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

date_default_timezone_set('Asia/Ho_Chi_Minh');
error_reporting(E_ALL);
ini_set('display_errors', 1);

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

        //  migration
        $files = glob(__DIR__ . '/../migrations/*.sql');
        foreach ($files as $file) {
            $sql = file_get_contents($file);
            $pdo->exec($sql);
        }

        //  auto seeder
        autoSeed($pdo);

        return $pdo;

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database setup failed', 'message' => $e->getMessage()]);
        exit;
    }
}

//  Seeder

function autoSeed(PDO $pdo): void {
    seedAdmin($pdo);
    seedCategories($pdo);
}

function seedAdmin(PDO $pdo): void {
    $username = $_ENV['DEFAULT_ADMIN_USER'] ?? 'admin';
    $password = $_ENV['DEFAULT_ADMIN_PASS'] ?? 'admin123';
    $hash     = password_hash($password, PASSWORD_BCRYPT);

    $count = $pdo->query("SELECT COUNT(*) FROM admins")->fetchColumn();
    if ($count == 0) {
        $stmt = $pdo->prepare("INSERT INTO admins (username, password) VALUES (:username, :password)");
        $stmt->execute(['username' => $username, 'password' => $hash]);

        error_log("[Seeder] Admin created: $username / $password");
    }
}

function seedCategories(PDO $pdo): void {
    $categories = ['Blog', 'Dịch vụ'];

    foreach ($categories as $name) {
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM category WHERE name = :name");
        $stmt->execute(['name' => $name]);

        if ($stmt->fetchColumn() == 0) {
            $insert = $pdo->prepare("INSERT INTO category (name) VALUES (:name)");
            $insert->execute(['name' => $name]);
            error_log("[Seeder] Category created: $name");
        }
    }
}
