<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/AuthController.php';

class ServiceController {
    private PDO $pdo;
    private AuthController $auth;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
        $this->auth = new AuthController($pdo);
    }

    private function encodeImage(?string $image): ?string {
        if (!$image) return null;
        return 'data:image/jpeg;base64,' . base64_encode($image);
    }

    // --- List services ---
    public function getList(int $page = 1, int $limit = 10, string $status = '', string $name = '', int $category_id = 0): array {
        $offset = ($page - 1) * $limit;

        $where = "1=1";
        $params = [];

        if ($status !== '') {
            $where .= " AND status = :status";
            $params['status'] = $status;
        }

        if ($name !== '') {
            $where .= " AND name LIKE :name";
            $params['name'] = "%$name%";
        }

        if ($category_id > 0) {
            $where .= " AND category_id = :category_id";
            $params['category_id'] = $category_id;
        }

        // Count total
        $totalStmt = $this->pdo->prepare("SELECT COUNT(*) FROM service WHERE $where");
        $totalStmt->execute($params);
        $totalItem = (int)$totalStmt->fetchColumn();

        // Get items, join category name
        $sql = "SELECT s.*, c.name AS category_name 
                FROM service s 
                LEFT JOIN category c ON s.category_id = c.id 
                WHERE $where 
                ORDER BY s.created_at DESC 
                LIMIT :limit OFFSET :offset";

        $stmt = $this->pdo->prepare($sql);
        foreach ($params as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();

        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($items as &$item) {
            $item['image'] = $this->encodeImage($item['image']);
        }

        return [
            'success' => true,
            'items' => $items,
            'totalItem' => $totalItem,
            'itemPerPage' => $limit,
            'currentPage' => $page,
            'totalPage' => ceil($totalItem / $limit),
        ];
    }

    // --- Get service by ID ---
    public function get(int $id): array {
        $stmt = $this->pdo->prepare("SELECT s.*, c.name AS category_name FROM service s LEFT JOIN category c ON s.category_id = c.id WHERE s.id = ?");
        $stmt->execute([$id]);
        $service = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$service) {
            return ['success' => false, 'message' => 'Service not found'];
        }

        $service['image'] = $this->encodeImage($service['image']);
        return ['success' => true, 'service' => $service];
    }

    // --- Create service ---
    public function create(array $data, array $files = []): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Vui lòng đăng nhập lại'];

        $name = $data['name'] ?? '';
        $category_id = (int)($data['category_id'] ?? 0);
        $status = $data['status'] ?? 'published';

        $image = null;
        if (isset($files['image']) && $files['image']['error'] === 0) {
            $image = file_get_contents($files['image']['tmp_name']);
        }

        $stmt = $this->pdo->prepare("INSERT INTO service (name, category_id, image, status) VALUES (:name, :category_id, :image, :status)");
        $stmt->execute([
            'name' => $name,
            'category_id' => $category_id,
            'image' => $image,
            'status' => $status
        ]);

        return ['success' => true, 'service_id' => $this->pdo->lastInsertId()];
    }

    // --- Update service ---
    public function updateWithImage(int $id, array $data, array $files = []): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Vui lòng đăng nhập lại'];

        $stmt = $this->pdo->prepare("SELECT * FROM service WHERE id = ?");
        $stmt->execute([$id]);
        $service = $stmt->fetch();
        if (!$service) return ['success' => false, 'message' => 'Service not found'];

        $name = $data['name'] ?? $service['name'];
        $category_id = (int)($data['category_id'] ?? $service['category_id']);
        $status = $data['status'] ?? $service['status'];

        $image = $service['image'];
        if (isset($files['image']) && $files['image']['error'] === 0) {
            $image = file_get_contents($files['image']['tmp_name']);
        }

        $stmt = $this->pdo->prepare("
            UPDATE service 
            SET name=:name, category_id=:category_id, image=:image, status=:status, updated_at=CURRENT_TIMESTAMP 
            WHERE id=:id
        ");
        $stmt->execute([
            'name' => $name,
            'category_id' => $category_id,
            'image' => $image,
            'status' => $status,
            'id' => $id
        ]);

        return ['success' => true, 'message' => 'Đã cập nhật service'];
    }

    // --- Update status ---
    public function updateStatus(int $id, string $status): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Vui lòng đăng nhập lại'];

        $stmt = $this->pdo->prepare("UPDATE service SET status=:status, updated_at=CURRENT_TIMESTAMP WHERE id=:id");
        $stmt->execute(['status' => $status, 'id' => $id]);

        return ['success' => true, 'message' => 'Đã cập nhật trạng thái service'];
    }

    // --- Delete service ---
    public function delete(int $id): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Vui lòng đăng nhập lại'];

        $stmt = $this->pdo->prepare("DELETE FROM service WHERE id = ?");
        $stmt->execute([$id]);

        return ['success' => true, 'message' => 'Đã xóa service'];
    }

    // --- Get service list for select (id + name) ---
    public function getForSelect(int $category_id = 0): array {
        $where = '';
        $params = [];
        if ($category_id > 0) {
            $where = "WHERE category_id = :category_id";
            $params['category_id'] = $category_id;
        }
        $stmt = $this->pdo->prepare("SELECT id, name FROM service $where ORDER BY name ASC");
        $stmt->execute($params);
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return ['success' => true, 'items' => $items];
    }
    public function updateCategory(int $id, int $new_category_id): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Vui lòng đăng nhập lại'];

        $stmt = $this->pdo->prepare("SELECT * FROM service WHERE id = ?");
        $stmt->execute([$id]);
        $service = $stmt->fetch();
        if (!$service) return ['success' => false, 'message' => 'Service không tồn tại'];

        $stmt = $this->pdo->prepare("SELECT * FROM category WHERE id = ?");
        $stmt->execute([$new_category_id]);
        $category = $stmt->fetch();
        if (!$category) return ['success' => false, 'message' => 'Category mới không tồn tại'];

        $stmt = $this->pdo->prepare("UPDATE service SET category_id = :category_id, updated_at = CURRENT_TIMESTAMP WHERE id = :id");
        $stmt->execute([
            'category_id' => $new_category_id,
            'id' => $id
        ]);

        return ['success' => true, 'message' => 'Đã chuyển service sang category mới'];
    }

}
