SELECT
    wine.wine_id,
    wine.name,
    wine.year,
    wine.type,
    wine.region,
    rating.rating,
    COALESCE(image.filename, 'NO_IMAGE_WINE.svg') as filename
FROM 
    data.wines as wine
    LEFT JOIN data.images as image ON wine.wine_id = image.wine_id
    LEFT JOIN data.ratings as rating ON wine.wine_id = rating.wine_id
