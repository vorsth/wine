SELECT
    wine.wine_id,
    wine.name,
    wine.year,
    wine.type,
    wine.region,
    ratings.rating,
    COALESCE(images.filename, 'WineBottles/NO_IMAGE_WINE.svg') as filename
FROM 
    data.wines as wine
    LEFT JOIN data.images as images ON wine.wine_id = images.wine_id
    LEFT JOIN data.ratings as ratings ON wine.wine_id = ratings.wine_id
