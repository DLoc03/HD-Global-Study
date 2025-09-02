<?php
function generateSlug(string $title): string {
    // Chuyển về lowercase
    $slug = mb_strtolower($title, 'UTF-8');

    // Bỏ dấu tiếng Việt
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

    // Chuyển khoảng trắng và ký tự đặc biệt thành dấu '-'
    $slug = preg_replace('/[^a-z0-9]+/i', '-', $slug);

    // Xóa dấu '-' ở đầu và cuối
    $slug = trim($slug, '-');

    return $slug;
}
