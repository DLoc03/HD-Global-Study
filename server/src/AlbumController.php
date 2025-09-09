<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/AuthController.php';

class AlbumsController {
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

  public function list(int $page = 1, int $limit = 10, string $status = '', string $name = ''): array {
    if (!$status) {
        return ['success' => false, 'message' => 'Thiếu tham số status (published/hidden)'];
    }

    $offset = ($page - 1) * $limit;

    $totalQuery = "SELECT COUNT(*) FROM albums WHERE status = :status";
    if ($name) {
        $totalQuery .= " AND name LIKE :name";
    }
    $totalStmt = $this->pdo->prepare($totalQuery);
    $totalStmt->bindValue(':status', $status);
    if ($name) {
        $totalStmt->bindValue(':name', '%' . $name . '%');
    }
    $totalStmt->execute();
    $totalItem = (int)$totalStmt->fetchColumn();

    // Lấy danh sách albums với pagination
    $stmtQuery = "SELECT * FROM albums WHERE status = :status";
    if ($name) {
        $stmtQuery .= " AND name LIKE :name";
    }
    $stmtQuery .= " ORDER BY created_at DESC LIMIT :limit OFFSET :offset";

    $stmt = $this->pdo->prepare($stmtQuery);
    $stmt->bindValue(':status', $status);
    if ($name) {
        $stmt->bindValue(':name', '%' . $name . '%');
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
    $albums = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return [
        'success' => true,
        'items' => $albums,
        'totalItem' => $totalItem,
        'itemPerPage' => $limit,
        'currentPage' => $page,
        'totalPage' => ceil($totalItem / $limit),
    ];
}


    public function getAll(): array {
        $stmt = $this->pdo->query("SELECT * FROM albums ORDER BY created_at DESC");
        $albums = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return [
            'success' => true,
            'items' => $albums,
            'totalItem' => count($albums),
        ];
    }


    public function get(int $id): array {
        $stmt = $this->pdo->prepare("SELECT * FROM albums WHERE id=:id");
        $stmt->execute(['id' => $id]);
        $album = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$album) {
            return ['success' => false, 'message' => 'Album không tồn tại'];
        }
        return ['success' => true, 'album' => $album];
    }

    public function listWithPreview(int $page = 1, int $limit = 10): array {
        $offset = ($page - 1) * $limit;

        $totalStmt = $this->pdo->query("SELECT COUNT(*) FROM albums WHERE status='published'");
        $totalItem = (int)$totalStmt->fetchColumn();

        $stmt = $this->pdo->prepare("
            SELECT * FROM albums 
            WHERE status='published' 
            ORDER BY created_at DESC 
            LIMIT :limit OFFSET :offset
        ");
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $albums = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $filteredAlbums = [];

        foreach ($albums as &$album) {
            $albumId = $album['id'];

            $stmtDemo = $this->pdo->prepare("
                SELECT id, title, image_data 
                FROM images 
                WHERE album_id=:id AND status='published' 
                ORDER BY id ASC 
                LIMIT 3
            ");
            $stmtDemo->execute(['id' => $albumId]);
            $demoImages = $stmtDemo->fetchAll(PDO::FETCH_ASSOC);

            if (count($demoImages) === 0) {
                continue;
            }

            foreach ($demoImages as &$img) {
                $img['image_data'] = $this->encodeImage($img['image_data']);
            }
            $album['demo_images'] = $demoImages;

            $album['cover_image'] = $demoImages[0];

            $filteredAlbums[] = $album;
        }

        return [
            'success' => true,
            'items' => $filteredAlbums,
            'totalItem' => count($filteredAlbums),
            'itemPerPage' => $limit,
            'currentPage' => $page,
            'totalPage' => ceil(count($filteredAlbums) / $limit),
        ];
    }


    public function getImages(int $albumId): array {
        $stmt = $this->pdo->prepare("SELECT id, name, image_data FROM images WHERE album_id=:album_id AND status='published' ORDER BY created_at DESC");
        $stmt->execute(['album_id' => $albumId]);
        $images = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($images as &$img) {
            $img['image_data'] = $this->encodeImage($img['image_data']);
        }

        return [
            'success' => true,
            'album_id' => $albumId,
            'items' => $images
        ];
    }

    public function create(array $data): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Đã hết phiên làm việc, vui lòng đăng nhập lại'];

        $name = trim($data['name'] ?? '');
        if (!$name) return ['success' => false, 'message' => 'Tên album không được để trống'];

       $stmt = $this->pdo->prepare("
            INSERT INTO albums (name, description, status, created_at, updated_at) 
            VALUES (:name, :description, :status, NOW(), NOW())
        ");
            
        $stmt->execute([
            'name'        => $name,
            'description' => $data['description'] ?? '',
            'status'      => $data['status'] ?? 'published'
        ]);


        return ['success' => true, 'message' => 'Tạo album thành công'];
    }

    public function update(int $id, array $data): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Đã hết phiên làm việc, vui lòng đăng nhập lại'];

        $stmt = $this->pdo->prepare("UPDATE albums SET name=:name, updated_at=NOW() WHERE id=:id");
        $stmt->execute([
            'name' => $data['name'] ?? '',
            'id' => $id
        ]);

        return ['success' => true, 'message' => 'Cập nhật album thành công'];
    }

    public function delete(int $id): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Đã hết phiên làm việc, vui lòng đăng nhập lại'];

        $stmt = $this->pdo->prepare("DELETE FROM albums WHERE id=:id");
        $stmt->execute(['id' => $id]);

        return ['success' => true, 'message' => 'Đã xoá album (cùng toàn bộ ảnh trong đó)'];
    }

    public function updateStatus(int $id, string $status): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Đã hết phiên làm việc, vui lòng đăng nhập lại'];

        $stmt = $this->pdo->prepare("UPDATE albums SET status=:status, updated_at=NOW() WHERE id=:id");
        $stmt->execute([
            'status' => $status,
            'id' => $id
        ]);

        return ['success' => true, 'message' => 'Cập nhật trạng thái album thành công'];
    }

    public function searchByTitle(string $name, int $page = 1, int $limit = 10): array {
        $offset = ($page - 1) * $limit;

        $totalStmt = $this->pdo->prepare("SELECT COUNT(*) FROM albums WHERE name LIKE :name");
        $totalStmt->execute(['name' => '%' . $name . '%']);
        $totalItem = (int)$totalStmt->fetchColumn();

        $stmt = $this->pdo->prepare("SELECT * FROM albums WHERE name LIKE :name ORDER BY created_at DESC LIMIT :limit OFFSET :offset");
        $stmt->bindValue(':name', '%' . $name . '%');
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $albums = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return [
            'success' => true,
            'items' => $albums,
            'totalItem' => $totalItem,
            'itemPerPage' => $limit,
            'currentPage' => $page,
            'totalPage' => ceil($totalItem / $limit),
        ];
    }
}
