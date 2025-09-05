<?php
require_once __DIR__ . '/AuthController.php';

class CategoryController {
    private PDO $pdo;
    private AuthController $auth;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
        $this->auth = new AuthController($pdo);
    }

    public function getList(int $page = 1, int $limit = 10, string $order = 'DESC', string $name = ''): array {
        $offset = ($page - 1) * $limit;
        $order = strtoupper($order) === 'ASC' ? 'ASC' : 'DESC';

        $where = "1=1";
        $params = [];

        if ($name !== '') {
            $where .= " AND name LIKE :name";
            $params['name'] = "%$name%";
        }

        $totalStmt = $this->pdo->prepare("SELECT COUNT(*) FROM category WHERE $where");
        $totalStmt->execute($params);
        $totalItem = (int)$totalStmt->fetchColumn();

        $sql = "SELECT * FROM category WHERE $where ORDER BY created_at $order LIMIT :limit OFFSET :offset";
        $stmt = $this->pdo->prepare($sql);
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

    public function get(int $id): array {
        $stmt = $this->pdo->prepare("SELECT * FROM category WHERE id = ?");
        $stmt->execute([$id]);
        $category = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$category) {
            return ['success' => false, 'message' => 'Không tìm thấy danh mục'];
        }

        return ['success' => true, 'category' => $category];
    }

    public function create(array $data): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) {
            return ['success' => false, 'message' => 'Đã hết phiên làm việc, vui lòng đăng nhập lại'];
        }

        $name = trim($data['name'] ?? '');
        if ($name === '') {
            return ['success' => false, 'message' => 'Tên danh mục là bắt buộc'];
        }

        try {
            $stmt = $this->pdo->prepare("INSERT INTO category (name) VALUES (:name)");
            $stmt->execute(['name' => $name]);

            return ['success' => true, 'category_id' => $this->pdo->lastInsertId()];
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) { // Duplicate entry
                return ['success' => false, 'message' => 'Đã có danh mục này tồn tại'];
            }
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public function update(int $id, array $data): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) {
            return ['success' => false, 'message' => 'Đã hết phiên làm việc, vui lòng đăng nhập lại'];
        }

        $stmt = $this->pdo->prepare("SELECT * FROM category WHERE id = ?");
        $stmt->execute([$id]);
        $category = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$category) {
            return ['success' => false, 'message' => 'Không tìm thấy danh mục'];
        }

        $name = trim($data['name'] ?? $category['name']);
        if ($name === '') {
            return ['success' => false, 'message' => 'Tên danh mục là bắt buộc'];
        }

        try {
            $stmt = $this->pdo->prepare("UPDATE category SET name=:name, updated_at=CURRENT_TIMESTAMP WHERE id=:id");
            $stmt->execute(['name' => $name, 'id' => $id]);

            return ['success' => true, 'message' => 'Đã cập nhật danh mục'];
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) {
                return ['success' => false, 'message' => 'Đã có danh mục này tồn tại'];
            }
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public function delete(int $id): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) {
            return ['success' => false, 'message' => 'Đã hết phiên làm việc, vui lòng đăng nhập lại'];
        }

        try {
            $stmt = $this->pdo->prepare("DELETE FROM category WHERE id = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                return ['success' => false, 'message' => 'Không tìm thấy danh mục này để xoá'];
            }

            return ['success' => true, 'message' => 'Đã xoá category'];
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) { // Foreign key constraint
                return ['success' => false, 'message' => 'Không thể xoá, danh mục đang được sử dụng'];
            }
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }
}
