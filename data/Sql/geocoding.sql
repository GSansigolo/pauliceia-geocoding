---------------------------------------------------------------------------------------------------------------------------
#FUNÇÃO PARA SEPARAR OS DADOS PARA GEOCODIFICAÇÃO
---------------------------------------------------------------------------------------------------------------------------

SELECT geometry , nf, nl, (38) AS num 
FROM 
	(SELECT 
		(SELECT ST_AsText(ST_Line_SubString(street, startfraction, endfraction)) as geometry FROM
	(SELECT
		(SELECT St_AsText(a.geom) FROM tb_street AS a WHERE a.name LIKE ('%rua quinze de novembro%')) AS street,
			(SELECT ST_LineLocatePoint(line, point) FROM
				(SELECT
	(SELECT St_AsText(ST_LineMerge(a.geom)) AS street FROM tb_street AS a WHERE a.name LIKE ('%rua quinze de novembro%')) AS line,	
		(SELECT
			(SELECT ST_AsText(ST_ClosestPoint(line, pt)) FROM 
				(SELECT 
	(SELECT st_astext(a.geom) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE a.number = 
		(SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id 
			WHERE b.name LIKE ('%rua quinze de novembro%') AND a.number > (38) AND a.first_year >= (1900) AND a.last_year >= (1900) LIMIT 1) 
			AND b.name LIKE ('%rua quinze de novembro%')  ) As pt, 
	(SELECT ST_AsText(geom) FROM tb_street 
		WHERE name LIKE ('%rua quinze de novembro%')) As line) As foo)) AS point)AS foo) AS startfraction,
	(SELECT ST_LineLocatePoint(line, point) FROM 
		(SELECT
			(SELECT St_AsText(ST_LineMerge(a.geom)) AS street FROM tb_street AS a WHERE a.name LIKE ('%rua quinze de novembro%')) AS line,	
				(SELECT
	(SELECT ST_AsText(ST_ClosestPoint(line, pt)) FROM 
		(SELECT 
			(SELECT st_astext(a.geom) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE a.number = 
	(SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id 
		WHERE b.name LIKE ('%rua quinze de novembro%') AND a.number < (38) AND a.first_year >= (1900) AND a.last_year >= (1900) LIMIT 1) AND b.name LIKE ('%rua quinze de novembro%')  ) As pt, 
	(SELECT ST_AsText(geom) FROM tb_street WHERE name LIKE ('%rua quinze de novembro%')  ) As line) As foo)) AS point) AS foo) AS endfraction) AS foo) AS geometry, 
		(SELECT number_max FROM 
			(SELECT 
				(SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id 
						WHERE b.name LIKE ('%rua quinze de novembro%') AND a.number > (38) AND a.first_year >= (1900) AND a.last_year >= (1900) LIMIT 1) as number_max) AS foo) As nf, 
		(SELECT number_min FROM 
			(SELECT 
				(SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id 
						WHERE b.name LIKE ('%rua quinze de novembro%') AND a.number < (38) AND a.first_year >= (1900) AND a.last_year >= (1900) LIMIT 1) as number_min) AS foo) AS nl) 
	As foo;

---------------------------------------------------------------------------------------------------------------------------
#FUNÇÃO CORTAR A LINHA
---------------------------------------------------------------------------------------------------------------------------

SELECT ST_AsText(ST_Line_SubString(street, startfraction, endfraction)) as geometry
FROM
	(SELECT
		(	SELECT St_AsText(a.geom) FROM tb_street AS a WHERE a.name LIKE ('%rua barra funda%')	) AS street,
		(	SELECT ST_LineLocatePoint(line, point) FROM(SELECT(SELECT St_AsText(ST_LineMerge(a.geom)) AS street FROM tb_street AS a WHERE a.name LIKE ('%rua barra funda%')) AS line,	(SELECT(SELECT ST_AsText(ST_ClosestPoint(line, pt)) FROM (SELECT (  SELECT st_astext(a.geom) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE a.number = (SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number > (33) AND a.first_year >= (1917) UNION SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number > (33) AND a.last_year >= (1917) LIMIT 1) AND b.name LIKE ('%rua barra funda%')  ) As pt, (  SELECT ST_AsText(geom) FROM tb_street WHERE name LIKE ('%rua barra funda%')) As line) As foo)) AS point) AS foo	  ) AS startfraction,
		(	SELECT ST_LineLocatePoint(line, point) FROM (SELECT(SELECT St_AsText(ST_LineMerge(a.geom)) AS street FROM tb_street AS a WHERE a.name LIKE ('%rua barra funda%')) AS line,	(SELECT( SELECT ST_AsText(ST_ClosestPoint(line, pt)) FROM (SELECT (  SELECT st_astext(a.geom) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE a.number = (SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number < (33) AND a.first_year >= (1917) UNION SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number < (33) AND a.last_year >= (1917) LIMIT 1) AND b.name LIKE ('%rua barra funda%')  ) As pt, (  SELECT ST_AsText(geom) FROM tb_street WHERE name LIKE ('%rua barra funda%')  ) As line) As foo)) AS point) AS foo   ) AS endfraction
) AS foo
	
---------------------------------------------------------------------------------------------------------------------------
#FUNÇÃO PARA DESCOBRIR A PORCENTAGEM SELECT ST_LineLocatePoint('LINESTRING(0 0, 2 2)', 'POINT(1 1)');
---------------------------------------------------------------------------------------------------------------------------

SELECT ST_LineLocatePoint(line, point) FROM(SELECT(SELECT St_AsText(ST_LineMerge(a.geom)) AS street FROM tb_street AS a WHERE a.name LIKE ('%rua barra funda%')) AS line,	(SELECT(SELECT ST_AsText(ST_ClosestPoint(line, pt)) FROM (SELECT (  SELECT st_astext(a.geom) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE a.number = (SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number > (33) AND a.first_year >= (1917) UNION SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number > (33) AND a.last_year >= (1917) LIMIT 1) AND b.name LIKE ('%rua barra funda%')  ) As pt, (  SELECT ST_AsText(geom) FROM tb_street WHERE name LIKE ('%rua barra funda%')) As line) As foo)) AS point) AS foo

SELECT ST_LineLocatePoint(line, point) FROM (SELECT(SELECT St_AsText(ST_LineMerge(a.geom)) AS street FROM tb_street AS a WHERE a.name LIKE ('%rua barra funda%')) AS line,	(SELECT( SELECT ST_AsText(ST_ClosestPoint(line, pt)) FROM (SELECT (  SELECT st_astext(a.geom) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE a.number = (SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number < (33) AND a.first_year >= (1917) UNION SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number < (33) AND a.last_year >= (1917) LIMIT 1) AND b.name LIKE ('%rua barra funda%')  ) As pt, (  SELECT ST_AsText(geom) FROM tb_street WHERE name LIKE ('%rua barra funda%')  ) As line) As foo)) AS point) AS foo

---------------------------------------------------------------------------------------------------------------------------
#FUNÇÃO PARA PEGAR O CLOSESTPOINT
---------------------------------------------------------------------------------------------------------------------------

SELECT ST_AsText(ST_ClosestPoint(line, pt)) 
	FROM 
		(SELECT 
			(  SELECT st_astext(a.geom) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE a.number = (SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number > (33) AND a.first_year >= (1917) UNION SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number > (33) AND a.last_year >= (1917) LIMIT 1) AND b.name LIKE ('%rua barra funda%')  ) As pt, 
			(  SELECT ST_AsText(geom) FROM tb_street WHERE name LIKE ('%rua barra funda%')	) As line
		) As foo

SELECT ST_AsText(ST_ClosestPoint(line, pt)) 
	FROM 
		(SELECT 
			(  SELECT st_astext(a.geom) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE a.number = (SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number < (33) AND a.first_year >= (1917) UNION SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua barra funda%') AND a.number < (33) AND a.last_year >= (1917) LIMIT 1) AND b.name LIKE ('%rua barra funda%')  ) As pt, 
			(  SELECT ST_AsText(geom) FROM tb_street WHERE name LIKE ('%rua barra funda%')  ) As line
		) As foo
