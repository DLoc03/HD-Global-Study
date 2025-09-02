<?php
require_once __DIR__ . '/../config/bootstrap.php';
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$pdo = getPDO();

$username = $_ENV['DEFAULT_ADMIN_USER'];
$password = $_ENV['DEFAULT_ADMIN_PASS'];
$hash = password_hash($password, PASSWORD_BCRYPT);

$stmt = $pdo->prepare("SELECT COUNT(*) FROM admins WHERE username = :username");
$stmt->execute(['username' => $username]);

if ($stmt->fetchColumn() == 0) {
    $stmt = $pdo->prepare("INSERT INTO admins (username, password) VALUES (:username, :password)");
    $stmt->execute([
        'username' => $username,
        'password' => $hash
    ]);
    echo "Admin created successfully\n";
} else {
    echo "Admin already exists\n";
}

echo "Username: $username\n";
echo "Password (plain): $password\n";
echo "Password (hash): $hash\n";
