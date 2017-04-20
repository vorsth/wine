SELECT comment, time, first_name, image_url, time
FROM data.comments AS comments
JOIN users.users AS users ON users.google_user_id = comments.google_user_id
WHERE wine_id = ${wine_id}
