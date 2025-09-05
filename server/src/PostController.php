<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/AuthController.php';

class PostController {
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

    public function getList(array $filters = [], int $page = 1, int $limit = 10, string $order = 'DESC'): array {
        $offset = ($page - 1) * $limit;
        $order = strtoupper($order) === 'ASC' ? 'ASC' : 'DESC';

        $where = [];
        $params = [];

        if (!empty($filters['category_id'])) {
            $where[] = "p.category_id = :category_id";
            $params['category_id'] = (int)$filters['category_id'];
        }
        if (!empty($filters['status'])) {
            $where[] = "p.status = :status";
            $params['status'] = $filters['status'];
        }
        if (!empty($filters['title'])) {
            $where[] = "p.title LIKE :title";
            $params['title'] = "%" . $filters['title'] . "%";
        }

        $whereSql = count($where) > 0 ? "WHERE " . implode(" AND ", $where) : "";

        // count
        $totalStmt = $this->pdo->prepare("
            SELECT COUNT(*) 
            FROM posts p
            LEFT JOIN category c ON p.category_id = c.id
            $whereSql
        ");
        $totalStmt->execute($params);
        $totalItem = (int)$totalStmt->fetchColumn();

        // data
        $sql = "SELECT p.*, c.name AS category_name
                FROM posts p
                LEFT JOIN category c ON p.category_id = c.id
                $whereSql
                ORDER BY p.created_at $order
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


    public function get(int $id): array {
        $stmt = $this->pdo->prepare("SELECT * FROM posts WHERE id = ?");
        $stmt->execute([$id]);
        $post = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$post) return ['success' => false, 'message' => 'Post not found'];

        if (!empty($post['image'])) {
            $post['image'] = $this->encodeImage($post['image']);
        }
        return ['success' => true, 'post' => $post];
    }

    public function getBySlug(string $slug): array {
        $stmt = $this->pdo->prepare("SELECT * FROM posts WHERE slug = ?");
        $stmt->execute([$slug]);
        $post = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$post) return ['success' => false, 'message' => 'Post not found'];

        if (!empty($post['image'])) {
            $post['image'] = $this->encodeImage($post['image']);
        }
        return ['success' => true, 'post' => $post];
    }

    public function updateStatus(int $id, string $status): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Đã hết phiên làm việc, vui lòng đăng nhập lại'];

        $stmt = $this->pdo->prepare("SELECT * FROM posts WHERE id = ?");
        $stmt->execute([$id]);
        $post = $stmt->fetch();
        if (!$post) return ['success' => false, 'message' => 'Không tìm thấy bài viết'];

        $stmt = $this->pdo->prepare("UPDATE posts SET status=:status, updated_at=CURRENT_TIMESTAMP WHERE id=:id");
        $stmt->execute(['status' => $status, 'id' => $id]);

        return ['success' => true, 'message' => 'Đã cập nhật trạng thái bài viết'];
    }

    public function create(array $data, array $files = []): array {
        $title = $data['title'] ?? '';
        $description = $data['description'] ?? '';
        $content = $data['content'] ?? '';
        $category_id = isset($data['category_id']) ? (int)$data['category_id'] : 0;

        if ($category_id <= 0) {
            return ['success' => false, 'message' => 'Category is required'];
        }

        $image = null;
        if (isset($files['image']) && $files['image']['error'] === 0) {
            $image = file_get_contents($files['image']['tmp_name']);
        }

        $slug = $this->generateSlug($title);

        $stmt = $this->pdo->prepare("
            INSERT INTO posts (title, description, content, image, slug, category_id) 
            VALUES (:title, :description, :content, :image, :slug, :category_id)
        ");

        $stmt->execute([
            'title' => $title,
            'description' => $description,
            'content' => $content,
            'image' => $image,
            'slug' => $slug,
            'category_id' => $category_id,
        ]);

        return ['success' => true, 'post_id' => $this->pdo->lastInsertId()];
    }

    public function updateWithImage(int $id, array $data, array $files = []): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Đã hết phiên làm việc, vui lòng đăng nhập lại'];

        $stmt = $this->pdo->prepare("SELECT * FROM posts WHERE id = ?");
        $stmt->execute([$id]);
        $post = $stmt->fetch();
        if (!$post) return ['success' => false, 'message' => 'Không tìm thấy bài viết'];

        $title = $data['title'] ?? $post['title'];
        $content = $data['content'] ?? $post['content'];
        $description = $data['description'] ?? $post['description'];
        $status = $data['status'] ?? $post['status'];
        $category_id = isset($data['category_id']) ? (int)$data['category_id'] : $post['category_id'];
        $slug = $this->generateSlug($title);

        $image = $post['image'];
        if (isset($files['image']) && $files['image']['error'] === 0) {
            $image = file_get_contents($files['image']['tmp_name']);
        }

        $stmt = $this->pdo->prepare("
            UPDATE posts 
            SET title=:title, slug=:slug, content=:content, description=:description,
                status=:status, category_id=:category_id, image=:image, updated_at=CURRENT_TIMESTAMP
            WHERE id=:id
        ");
        $stmt->execute([
            'title' => $title,
            'slug' => $slug,
            'content' => $content,
            'description' => $description,
            'status' => $status,
            'category_id' => $category_id,
            'image' => $image,
            'id' => $id
        ]);

        return ['success' => true, 'message' => 'Đã cập nhật bài viết!'];
    }

    public function update(int $id, array $data): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Đã hết phiên làm việc, vui lòng đăng nhập lại'];

        $stmt = $this->pdo->prepare("SELECT * FROM posts WHERE id = ?");
        $stmt->execute([$id]);
        $post = $stmt->fetch();
        if (!$post) return ['success' => false, 'message' => 'Không tìm thấy bài viết'];

        $title = $data['title'] ?? $post['title'];
        $content = $data['content'] ?? $post['content'];
        $status = $data['status'] ?? $post['status'];
        $category_id = isset($data['category_id']) ? (int)$data['category_id'] : $post['category_id'];
        $slug = $this->generateSlug($title);

        $stmt = $this->pdo->prepare("
            UPDATE posts 
            SET title=:title, slug=:slug, content=:content, status=:status, category_id=:category_id, updated_at=CURRENT_TIMESTAMP
            WHERE id=:id
        ");
        $stmt->execute([
            'title' => $title,
            'slug' => $slug,
            'content' => $content,
            'status' => $status,
            'category_id' => $category_id,
            'id' => $id
        ]);

        return ['success' => true, 'message' => 'Đã cập nhật bài viết'];
    }

    public function delete(int $id): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Đã hết phiên làm việc, vui lòng đăng nhập lại'];

        $stmt = $this->pdo->prepare("DELETE FROM posts WHERE id = ?");
        $stmt->execute([$id]);

        return ['success' => true, 'message' => 'Đã xoá bài viết'];
    }

    private function generateSlug(string $title): string {
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
}
