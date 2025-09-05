CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    image LONGBLOB DEFAULT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT,
    category_id INT NULL,
    status ENUM('draft','published') DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_posts_category FOREIGN KEY (category_id) REFERENCES category(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
