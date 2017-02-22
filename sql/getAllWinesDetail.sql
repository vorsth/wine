SELECT
    Wine.Name,
    Wine.Year,
    Wine.Type,
    Wine.Region,
    Wine.Rating,
    Image.FileName
FROM 
    Data.Wines as Wine
    LEFT JOIN Data.Images as Image ON Wine.WineId = Image.WineId

