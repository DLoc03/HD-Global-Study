CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    image LONGBLOB DEFAULT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT,
    type VARCHAR(50) NOT NULL DEFAULT 'blog',
    status ENUM('draft','published') DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- search by status
ALTER TABLE `posts` DROP INDEX `idx_posts_status`;
CREATE INDEX idx_posts_status ON posts(status);

-- search by title
ALTER TABLE `posts` DROP INDEX `idx_posts_title`;
CREATE INDEX idx_posts_title ON posts(title);

-- search by slug
ALTER TABLE `posts` DROP INDEX `idx_posts_slug`;
CREATE INDEX idx_posts_slug ON posts(slug);

-- search by type
ALTER TABLE `posts` DROP INDEX `idx_posts_type`;
CREATE INDEX idx_posts_type ON posts(type);
