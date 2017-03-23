SELECT name, year, type, region, filename AS image, to_char(AVG(rating),'9.9') AS rating FROM data.wines AS wines
LEFT JOIN data.images AS images ON images.wine_id = wines.wine_id
LEFT JOIN data.ratings AS ratings ON ratings.wine_id = wines.wine_id
WHERE wines.wine_id = ${wine_id} 
GROUP BY name, year, type, region, filename
