do $$
declare new_wine_id int8;
BEGIN
  INSERT INTO
    data.wines ( name, year, type, region)
  VALUES
     (${name}, ${year}, ${type}, ${region})
  RETURNING wine_id INTO new_wine_id;

  INSERT INTO
    data.comments ( user_id, wine_id, comment )
  VALUES
    (0, new_wine_id, ${comment} );


  INSERT INTO
    data.ratings (user_id, wine_id, rating )
  VALUES
    (0, new_wine_id, ${rating} );

END $$
