<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

class MailController
{
    public function sendContact(array $data): array
    {
        // --- Validate input ---
        $requiredFields = ['name', 'email', 'phone', 'service'];
        $missingFields = array_filter($requiredFields, fn($field) => empty($data[$field]));

        if (!empty($missingFields)) {
            return [
                'success' => false,
                'message' => 'Thiếu thông tin bắt buộc.',
                'missing_fields' => $missingFields,
            ];
        }

        if (empty($_ENV['MAIL_TO'])) {
            return [
                'success' => false,
                'message' => 'Chưa cấu hình email nhận.',
            ];
        }

        $to = $_ENV['MAIL_TO'];
        $subject = $data['subject'] ?? "Thông tin đăng ký khóa học AI";

        $message = <<<EOD
        Họ tên: {$data['name']}
        Email: {$data['email']}
        Số điện thoại: {$data['phone']}
        Dịch vụ: {$data['service']}
        Lời nhắn: {$data['message']}
        EOD;

        $headers = "From: SuriShop Contact <no-reply@surishops.com>\r\n";
        $headers .= "Reply-To: {$data['email']}\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        $parameters = "-f no-reply@surishops.com";

        if (mail($to, $subject, $message, $headers, $parameters)) {
            return ['success' => true, 'message' => 'Gửi email thành công.'];
        }

        return [
            'success' => false,
            'message' => 'Không gửi được email. Hãy kiểm tra cấu hình máy chủ.',
        ];
    }
}
