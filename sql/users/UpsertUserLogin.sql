do $$
BEGIN
  INSERT INTO
    users.users ( google_user_id, image_url, first_name, last_name, email )
  VALUES
    ( ${google_user_id}, ${image_url}, ${first_name}, ${last_name}, ${email} )
  ON CONFLICT (google_user_id)
  DO UPDATE SET
    google_user_id = ${google_user_id},
    image_url = ${image_url},
    first_name = ${first_name},
    last_name = ${last_name},
    email = ${email};

END $$
