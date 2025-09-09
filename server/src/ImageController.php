<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/AuthController.php';

class ImagesController {
    private PDO $pdo;
    private AuthController $auth;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
        $this->auth = new AuthController($pdo);
    }

    private function encodeImage(?string $binary): ?string {
        if (!$binary) return null;
        return 'data:image/jpeg;base64,' . base64_encode($binary);
    }

    public function list(int $albumId, string $status = 'published', int $page = 1, int $limit = 10): array {
        $offset = ($page - 1) * $limit;

        $countStmt = $this->pdo->prepare("SELECT COUNT(*) FROM images WHERE album_id=:album_id AND status=:status");
        $countStmt->execute([
            'album_id' => $albumId,
            'status' => $status
        ]);
        $totalItem = (int) $countStmt->fetchColumn();

        $stmt = $this->pdo->prepare("
            SELECT id, title, image_data, status, created_at, updated_at 
            FROM images 
            WHERE album_id=:album_id AND status=:status 
            ORDER BY created_at DESC 
            LIMIT :limit OFFSET :offset
        ");
        $stmt->bindValue(':album_id', $albumId, PDO::PARAM_INT);
        $stmt->bindValue(':status', $status, PDO::PARAM_STR);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $images = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($images as &$img) {
            $img['image_data'] = $this->encodeImage($img['image_data']);
        }
        return [
            'success'     => true,
            'items'       => $images,
            'album_id'    => $albumId,
            'totalItem'   => $totalItem,
            'itemPerPage' => $limit,
            'currentPage' => $page,
            'totalPage'   => ceil($totalItem / $limit),
        ];
    }


    public function create(array $data = [], array $files = []): array {
    try {
        $albumId = $data['album_id'] ?? null;
        $title   = $data['title'] ?? '';
        $status  = $data['status'] ?? 'published';

        if (!$albumId) {
            return ['success' => false, 'message' => 'Album ID không hợp lệ'];
        }

        if (!isset($files['image']) || $files['image']['error'] !== UPLOAD_ERR_OK) {
            return ['success' => false, 'message' => 'Vui lòng chọn ảnh để tải lên'];
        }

        $imageData = file_get_contents($files['image']['tmp_name']);

        $stmt = $this->pdo->prepare("
            INSERT INTO images (album_id, title, image_data, status, created_at, updated_at)
            VALUES (:album_id, :title, :image_data, :status, NOW(), NOW())
        ");
        $stmt->execute([
            'album_id'   => $albumId,
            'title'      => $title,
            'image_data' => $imageData,
            'status'     => $status,
        ]);

        return [
            'success' => true,
            'message' => 'Tải ảnh thành công',
            'id' => $this->pdo->lastInsertId()
        ];
    } catch (PDOException $e) {
        return ['success' => false, 'message' => $e->getMessage()];
    }
}


    public function delete(int $id): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Đã hết phiên làm việc, vui lòng đăng nhập lại'];

        $stmt = $this->pdo->prepare("DELETE FROM images WHERE id=:id");
        $stmt->execute(['id' => $id]);

        return ['success' => true, 'message' => 'Xoá ảnh thành công'];
    }

    public function updateAlbum(int $id, int $albumId): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Đã hết phiên làm việc, vui lòng đăng nhập lại'];

        $stmt = $this->pdo->prepare("UPDATE images SET album_id=:album_id, updated_at=NOW() WHERE id=:id");
        $stmt->execute(['album_id' => $albumId, 'id' => $id]);

        return ['success' => true, 'message' => 'Cập nhật album cho ảnh thành công'];
    }

    public function updateStatus(int $id, string $status): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Đã hết phiên làm việc, vui lòng đăng nhập lại'];

        $stmt = $this->pdo->prepare("UPDATE images SET status=:status, updated_at=NOW() WHERE id=:id");
        $stmt->execute(['status' => $status, 'id' => $id]);

        return ['success' => true, 'message' => 'Cập nhật trạng thái ảnh thành công'];
    }
    
    public function listByStatus(string $status = 'published', int $page = 1, int $limit = 10): array {
        $offset = ($page - 1) * $limit;

        $totalStmt = $this->pdo->prepare("SELECT COUNT(*) FROM images WHERE status=:status");
        $totalStmt->execute(['status' => $status]);
        $totalItem = (int)$totalStmt->fetchColumn();

        $stmt = $this->pdo->prepare("
            SELECT id, title, image_data, status, album_id, created_at, updated_at
            FROM images
            WHERE status=:status
            ORDER BY created_at DESC
            LIMIT :limit OFFSET :offset
        ");
        $stmt->bindValue(':status', $status, PDO::PARAM_STR);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $images = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($images as &$img) {
            $img['image_data'] = $this->encodeImage($img['image_data']);
        }

        return [
            'success'     => true,
            'items'       => $images,
            'totalItem'   => $totalItem,
            'itemPerPage' => $limit,
            'currentPage' => $page,
            'totalPage'   => ceil($totalItem / $limit),
        ];
    }

}
