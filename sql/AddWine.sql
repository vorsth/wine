do $$
declare new_wine_id int8;
BEGIN
  INSERT INTO
    data.wines ( name, year, type, region)
  VALUES
     (${name}, ${year}, ${type}, ${region})
  RETURNING wine_id INTO new_wine_id;

  INSERT INTO
    data.comments ( google_user_id, wine_id, comment )
  VALUES
    (${user}, new_wine_id, ${comment} );


  INSERT INTO
    data.ratings (google_user_id, wine_id, rating )
  VALUES
    (${user}, new_wine_id, ${rating} );

END $$
