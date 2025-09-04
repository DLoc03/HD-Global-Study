<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/AuthController.php';

class CategoryController {
    private PDO $pdo;
    private AuthController $auth;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
        $this->auth = new AuthController($pdo);
    }

    // --- List categories ---
    public function getList(int $page = 1, int $limit = 10, string $status = '', string $name = ''): array {
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

        // Count total
        $totalStmt = $this->pdo->prepare("SELECT COUNT(*) FROM category WHERE $where");
        $totalStmt->execute($params);
        $totalItem = (int)$totalStmt->fetchColumn();

        // Get items
        $stmt = $this->pdo->prepare("SELECT * FROM category WHERE $where ORDER BY created_at DESC LIMIT :limit OFFSET :offset");
        foreach ($params as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();

        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return [
            'success' => true,
            'items' => $items,
            'totalItem' => $totalItem,
            'itemPerPage' => $limit,
            'currentPage' => $page,
            'totalPage' => ceil($totalItem / $limit),
        ];
    }

    // --- Get category by ID ---
    public function get(int $id): array {
        $stmt = $this->pdo->prepare("SELECT * FROM category WHERE id = ?");
        $stmt->execute([$id]);
        $category = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$category) {
            return ['success' => false, 'message' => 'Category not found'];
        }

        return ['success' => true, 'category' => $category];
    }

    // --- Create category ---
    public function create(array $data): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Vui lòng đăng nhập lại'];

        $name = $data['name'] ?? '';
        $description = $data['description'] ?? '';
        $advantage = $data['advantage'] ?? '';
        $status = $data['status'] ?? 'published';

        $stmt = $this->pdo->prepare("
            INSERT INTO category (name, description, advantage, status) 
            VALUES (:name, :description, :advantage, :status)
        ");

        $stmt->execute([
            'name' => $name,
            'description' => $description,
            'advantage' => $advantage,
            'status' => $status
        ]);

        return ['success' => true, 'category_id' => $this->pdo->lastInsertId()];
    }

    // --- Update category ---
    public function update(int $id, array $data): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Vui lòng đăng nhập lại'];

        $stmt = $this->pdo->prepare("SELECT * FROM category WHERE id = ?");
        $stmt->execute([$id]);
        $category = $stmt->fetch();
        if (!$category) return ['success' => false, 'message' => 'Category không tồn tại'];

        $name = $data['name'] ?? $category['name'];
        $description = $data['description'] ?? $category['description'];
        $advantage = $data['advantage'] ?? $category['advantage'];
        $status = $data['status'] ?? $category['status'];

        $stmt = $this->pdo->prepare("
            UPDATE category SET name=:name, description=:description, advantage=:advantage, status=:status, updated_at=CURRENT_TIMESTAMP
            WHERE id=:id
        ");
        $stmt->execute([
            'name' => $name,
            'description' => $description,
            'advantage' => $advantage,
            'status' => $status,
            'id' => $id
        ]);

        return ['success' => true, 'message' => 'Đã cập nhật category'];
    }

    // --- Update status ---
    public function updateStatus(int $id, string $status): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Vui lòng đăng nhập lại'];

        $stmt = $this->pdo->prepare("SELECT * FROM category WHERE id = ?");
        $stmt->execute([$id]);
        if (!$stmt->fetch()) return ['success' => false, 'message' => 'Category không tồn tại'];

        $stmt = $this->pdo->prepare("UPDATE category SET status=:status, updated_at=CURRENT_TIMESTAMP WHERE id=:id");
        $stmt->execute([
            'status' => $status,
            'id' => $id
        ]);

        return ['success' => true, 'message' => 'Đã cập nhật trạng thái'];
    }

    // --- Delete category ---
    public function delete(int $id): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Vui lòng đăng nhập lại'];

        $stmt = $this->pdo->prepare("DELETE FROM category WHERE id = ?");
        $stmt->execute([$id]);

        return ['success' => true, 'message' => 'Đã xóa category'];
    }

    public function getForSelect(): array {
        $stmt = $this->pdo->query("SELECT id, name FROM category WHERE status='published' ORDER BY name ASC");
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return ['success' => true, 'items' => $items];
    }
    
    public function getTreePaginated(int $page = 1, int $limit = 10, string $status = 'published'): array {
        $offset = ($page - 1) * $limit;

        $totalStmt = $this->pdo->prepare("SELECT COUNT(*) FROM category WHERE status = :status");
        $totalStmt->execute(['status' => $status]);
        $totalItem = (int)$totalStmt->fetchColumn();

        $catStmt = $this->pdo->prepare("SELECT id, name FROM category WHERE status = :status ORDER BY name ASC LIMIT :limit OFFSET :offset");
        $catStmt->bindValue(':status', $status);
        $catStmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $catStmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $catStmt->execute();
        $categories = $catStmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($categories as &$cat) {
            $stmt = $this->pdo->prepare("SELECT id, name, image FROM service WHERE category_id = :category_id AND status = :status ORDER BY name ASC");
            $stmt->execute(['category_id' => $cat['id'], 'status' => $status]);
            $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($services as &$s) {
                $s['image'] = $s['image'] ? 'data:image/jpeg;base64,' . base64_encode($s['image']) : null;
            }
            $cat['services'] = $services;
        }

        return [
            'success' => true,
            'items' => $categories,
            'totalItem' => $totalItem,
            'itemPerPage' => $limit,
            'currentPage' => $page,
            'totalPage' => ceil($totalItem / $limit),
        ];
    }

}
