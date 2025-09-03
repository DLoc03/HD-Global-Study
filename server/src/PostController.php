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

    public function list(int $page = 1, int $limit = 10): array {
    $offset = ($page - 1) * $limit;

    $totalStmt = $this->pdo->query("SELECT COUNT(*) FROM posts");
    $totalItem = (int)$totalStmt->fetchColumn();

    $stmt = $this->pdo->prepare("SELECT * FROM posts ORDER BY created_at DESC LIMIT :limit OFFSET :offset");
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

    if (!$post) {
        return ['success' => false, 'message' => 'Post not found'];
    }

    if (!empty($post['image'])) {
        $post['image'] = 'data:image/jpeg;base64,' . base64_encode($post['image']);
    }

    return ['success' => true, 'post' => $post];
}

public function getBySlug(string $slug): array {
    $stmt = $this->pdo->prepare("SELECT * FROM posts WHERE slug = ?");
    $stmt->execute([$slug]);
    $post = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$post) {
        return ['success' => false, 'message' => 'Post not found'];
    }

    if (!empty($post['image'])) {
        $post['image'] = 'data:image/jpeg;base64,' . base64_encode($post['image']);
    }

    return ['success' => true, 'post' => $post];
}

public function getListByType(string $type, int $page = 1, int $limit = 10): array {
    $offset = ($page - 1) * $limit;

    $totalStmt = $this->pdo->prepare("SELECT COUNT(*) FROM posts WHERE type = :type");
    $totalStmt->execute(['type' => $type]);
    $totalItem = (int)$totalStmt->fetchColumn();

    $stmt = $this->pdo->prepare("SELECT * FROM posts WHERE type = :type ORDER BY created_at DESC LIMIT :limit OFFSET :offset");
    $stmt->bindValue(':type', $type);
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

public function getListByTitle(string $keyword, string $status = '', int $page = 1, int $limit = 10): array {
    $offset = ($page - 1) * $limit;
    $search = "%$keyword%";

    $where = "title LIKE :keyword";
    $params = ['keyword' => $search];

    if ($status !== '') {
        $where .= " AND status = :status";
        $params['status'] = $status;
    }

    // count total
    $totalStmt = $this->pdo->prepare("SELECT COUNT(*) FROM posts WHERE $where");
    $totalStmt->execute($params);
    $totalItem = (int)$totalStmt->fetchColumn();

    // get items
    $stmt = $this->pdo->prepare("SELECT * FROM posts WHERE $where ORDER BY created_at DESC LIMIT :limit OFFSET :offset");
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


public function getListByStatus(string $status, int $page = 1, int $limit = 10, string $order = 'DESC', string $title = ''): array {
    $offset = ($page - 1) * $limit;
    $order = strtoupper($order) === 'ASC' ? 'ASC' : 'DESC';

    $totalSql = "SELECT COUNT(*) FROM posts WHERE status = :status";
    if ($title !== '') {
        $totalSql .= " AND title LIKE :title";
    }
    $totalStmt = $this->pdo->prepare($totalSql);
    $totalStmt->bindValue(':status', $status);
    if ($title !== '') {
        $totalStmt->bindValue(':title', "%$title%");
    }
    $totalStmt->execute();
    $totalItem = (int)$totalStmt->fetchColumn();

    $sql = "SELECT * FROM posts WHERE status = :status";
    if ($title !== '') {
        $sql .= " AND title LIKE :title";
    }
    $sql .= " ORDER BY created_at $order LIMIT :limit OFFSET :offset";

    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':status', $status);
    if ($title !== '') {
        $stmt->bindValue(':title', "%$title%");
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


public function sortByDate(array $posts, string $order = 'DESC'): array {
    usort($posts, function($a, $b) use ($order) {
        $timeA = strtotime($a['created_at']);
        $timeB = strtotime($b['created_at']);
        return $order === 'ASC' ? $timeA - $timeB : $timeB - $timeA;
    });
    return $posts;
}

public function updateStatus(int $id, string $status): array {
    $admin = $this->auth->getAdminFromToken();
    if (!$admin) return ['success' => false, 'message' => 'Unauthorized'];

    $stmt = $this->pdo->prepare("SELECT * FROM posts WHERE id = ?");
    $stmt->execute([$id]);
    $post = $stmt->fetch();
    if (!$post) return ['success' => false, 'message' => 'Không tìm thấy bài viết'];

    $stmt = $this->pdo->prepare("UPDATE posts SET status=:status, updated_at=CURRENT_TIMESTAMP WHERE id=:id");
    $stmt->execute([
        'status' => $status,
        'id' => $id
    ]);

    return ['success' => true, 'message' => 'Đã cập nhật trạng thái bài viết'];
}

   public function create(array $data, array $files = []): array {
    $title = $data['title'] ?? '';
    $description = $data['description'] ?? ''; 
    $content = $data['content'] ?? '';
    
    $image = null;
    if (isset($files['image']) && $files['image']['error'] === 0) {
        $image = file_get_contents($files['image']['tmp_name']);
    }

    $stmt = $this->pdo->prepare("
        INSERT INTO posts (title, description, content, image, slug) 
        VALUES (:title, :description, :content, :image, :slug)
    ");
    $slug = $this->generateSlug($title);

   $stmt->execute([
        'title' => $title,
        'description' => $description,
        'content' => $content,
        'image' => $image,
        'slug' => $slug
    ]);

    return ['success' => true, 'post_id' => $this->pdo->lastInsertId()];
}

public function updateWithImage(int $id, array $data, array $files = []): array {
    $admin = $this->auth->getAdminFromToken();
    if (!$admin) return ['success' => false, 'message' => 'Unauthorized'];

    $stmt = $this->pdo->prepare("SELECT * FROM posts WHERE id = ?");
    $stmt->execute([$id]);
    $post = $stmt->fetch();
    if (!$post) return ['success' => false, 'message' => 'Không tìm thấy bài viết'];

    $title = $data['title'] ?? $post['title'];
    $content = $data['content'] ?? $post['content'];
    $description = $data['description'] ?? $post['description'];
    $type = $data['type'] ?? $post['type'];
    $status = $data['status'] ?? $post['status'];
    $slug = $this->generateSlug($title);

    $image = $post['image'];
    if (isset($files['image']) && $files['image']['error'] === 0) {
        $image = file_get_contents($files['image']['tmp_name']);
    }

    $stmt = $this->pdo->prepare("
        UPDATE posts 
        SET title=:title, slug=:slug, content=:content, description=:description,
            type=:type, status=:status, image=:image, updated_at=CURRENT_TIMESTAMP
        WHERE id=:id
    ");
    $stmt->execute([
        'title' => $title,
        'slug' => $slug,
        'content' => $content,
        'description' => $description,
        'type' => $type,
        'status' => $status,
        'image' => $image,
        'id' => $id
    ]);

    return ['success' => true, 'message' => 'Đã cập nhật bài viết!'];
}

    public function update(int $id, array $data): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Unauthorized'];

        $stmt = $this->pdo->prepare("SELECT * FROM posts WHERE id = ?");
        $stmt->execute([$id]);
        $post = $stmt->fetch();
        if (!$post) return ['success' => false, 'message' => 'Không tìm thấy bài viết'];

        $title = $data['title'] ?? $post['title'];
        $content = $data['content'] ?? $post['content'];
        $type = $data['type'] ?? $post['type'];
        $status = $data['status'] ?? $post['status'];
        $slug = $this->generateSlug($title);

        $stmt = $this->pdo->prepare("
            UPDATE posts SET title=:title, slug=:slug, content=:content, type=:type, status=:status, updated_at=CURRENT_TIMESTAMP
            WHERE id=:id
        ");
        $stmt->execute([
            'title' => $title,
            'slug' => $slug,
            'content' => $content,
            'type' => $type,
            'status' => $status,
            'id' => $id
        ]);

        return ['success' => true, 'message' => 'Đã cập nhật bài viết'];
    }

    public function delete(int $id): array {
        $admin = $this->auth->getAdminFromToken();
        if (!$admin) return ['success' => false, 'message' => 'Unauthorized'];

        $stmt = $this->pdo->prepare("DELETE FROM posts WHERE id = ?");
        $stmt->execute([$id]);

        return ['success' => true, 'message' => 'Đã xoá bài viết'];
    }

    // --- Generate slug ---
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
