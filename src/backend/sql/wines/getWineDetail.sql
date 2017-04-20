SELECT 
    wine.name,
    wine.year,
    wine.type,
    wine.region,
    to_char(AVG(rating),'9D9') AS rating,
    COALESCE(filename, 'NO_IMAGE_WINE.svg') AS filename
FROM
    data.wines AS wine
    LEFT JOIN data.images AS images ON images.wine_id = wine.wine_id
    LEFT JOIN data.ratings AS ratings ON ratings.wine_id = wine.wine_id
WHERE wine.wine_id = ${wine_id} 
GROUP BY name, year, type, region, filename
