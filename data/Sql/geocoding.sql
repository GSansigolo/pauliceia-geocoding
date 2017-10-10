---------------------------------------------------------------------------------------------------------------------------

SELECT geometry , nf, nl, (33) AS num 
FROM 
	(SELECT 
		(	SELECT St_AsText(a.geom) FROM tb_street AS a WHERE a.name LIKE ('%rua barra funda%')	) AS geometry, 
		(SELECT number_max FROM 
			(SELECT 
				(SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id 
						WHERE b.name LIKE ('%rua barra funda%') AND a.number > (33) AND a.first_year >= (1917) 
					UNION  
				 SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id 
				 		WHERE b.name LIKE ('%rua barra funda%') AND a.number > (33) AND a.last_year >= (1917) LIMIT 1) as number_max) AS foo) As nf, 
		(SELECT number_min FROM 
			(SELECT 
				(SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id 
						WHERE b.name LIKE ('%rua barra funda%') AND a.number < (33) AND a.first_year >= (1917) 
					UNION  
				 SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id 
				 		WHERE b.name LIKE ('%rua barra funda%') AND a.number < (33) AND a.last_year >= (1917) LIMIT 1) as number_min) AS foo) AS nl) 
	As foo;

---------------------------------------------------------------------------------------------------------------------------

SELECT ST_AsText(ST_Line_SubString(street, startfraction, endfraction)) as geometry
FROM
	(SELECT
		(	SELECT St_AsText(a.geom) FROM tb_street AS a WHERE a.name LIKE ('%rua barra funda%')	) AS street,
		(	0.2	  ) AS startfraction,
		(	0.8   ) AS endfraction
) AS foo
	
---------------------------------------------------------------------------------------------------------------------------

SELECT ST_LineLocatePoint(line, point) 
FROM
	(SELECT
		(SELECT ST_LineMerge(St_AsText(a.geom)) AS street FROM tb_street AS a WHERE a.name LIKE ('%rua barra funda%')) AS line,	
	(SELECT
		()) AS point
) AS foo

SELECT ST_LineLocatePoint(line, point) 
FROM
	(SELECT
		(SELECT ST_LineMerge(St_AsText(a.geom))  AS street FROM tb_street AS a WHERE a.name LIKE ('%rua barra funda%')) AS line,	
	(SELECT
		()) AS point
) AS foo

---------------------------------------------------------------------------------------------------------------------------

SELECT ST_AsText(ST_ClosestPoint(line, pt)) AS cp_pt_1
	FROM 
		(SELECT 
			(SELECT b.geom FROM tb_places AS b where b.id = ((SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number > (33) AND a.first_year >= (1917) UNION  SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number > (33) AND a.last_year >= (1917) LIMIT 1))) As pt, 
			(SELECT c.geom FROM tb_street AS c JOIN tb_places AS b ON b.id_street = c.id where b.id = ((SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number > (33) AND a.first_year >= (1917) UNION  SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number > (33) AND a.last_year >= (1917) LIMIT 1))) As line
		) As foo

SELECT ST_AsText(ST_ClosestPoint(line, pt)) AS cp_pt_2
	FROM 
		(SELECT 
			(SELECT b.geom FROM tb_places AS b where b.id = ((SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number < (33) AND a.first_year >= (1917) UNION  SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number < (33) AND a.last_year >= (1917) LIMIT 1))) As pt, 
			(SELECT c.geom FROM tb_street AS c JOIN tb_places AS b ON b.id_street = c.id where b.id = ((SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number < (33) AND a.first_year >= (1917) UNION  SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number < (33) AND a.last_year >= (1917) LIMIT 1))) As line
		) As foo
