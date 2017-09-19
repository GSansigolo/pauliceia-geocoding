SELECT ST_AsText(ST_ClosestPoint(line, pt)) AS cp_pt_line
FROM 
	(SELECT 
		(SELECT b.geom FROM tb_places AS b where b.id = 16) As pt, 
		(SELECT c.geom FROM tb_street AS c JOIN tb_places AS b ON b.id_street = c.id where b.id = 16) As line
	) As foo;