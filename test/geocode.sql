# Geocode 1

	SELECT geometry, nf, nl, (40) AS num FROM (SELECT(SELECT ST_AsText(ST_LineSubstring(street, startfraction, endfraction)) as geometry FROM (SELECT(SELECT St_AsText(a.geom) FROM tb_street AS a WHERE a.name LIKE ('%rua guarany%')) AS street, (SELECT ST_LineLocatePoint(line, point) FROM (SELECT(SELECT St_AsText(ST_LineMerge(a.geom)) AS street FROM tb_street AS a WHERE a.name LIKE ('%rua guarany%')) AS line, (SELECT(SELECT ST_AsText(ST_ClosestPoint(line, pt)) FROM (SELECT (SELECT st_astext(a.geom) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE a.number = (SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua guarany%') AND a.number > (40) AND a.first_year >= (1937) AND a.last_year >= (1937) LIMIT 1) AND b.name LIKE ('%rua guarany%')  ) As pt, (SELECT ST_AsText(geom) FROM tb_street WHERE name LIKE ('%rua guarany%')) As line) As foo)) AS point)AS foo) AS startfraction, (SELECT ST_LineLocatePoint(line, point) FROM (SELECT(SELECT St_AsText(ST_LineMerge(a.geom)) AS street FROM tb_street AS a WHERE a.name LIKE ('%rua guarany%')) AS line, (SELECT (SELECT ST_AsText(ST_ClosestPoint(line, pt)) FROM (SELECT (SELECT st_astext(a.geom) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE a.number = (SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua guarany%') AND a.number < (40) AND a.first_year >= (1937) AND a.last_year >= (1937) LIMIT 1) AND b.name LIKE ('%rua guarany%')) As pt, (SELECT ST_AsText(geom) FROM tb_street WHERE name LIKE ('%rua guarany%')) As line) As foo)) AS point) AS foo) AS endfraction) AS foo) AS geometry, (SELECT number_max FROM (SELECT (SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua guarany%') AND a.number > (40) AND a.first_year >= (1937) AND a.last_year >= (1937) LIMIT 1) as number_max) AS foo) As nf, (SELECT number_min FROM (SELECT (SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua guarany%') AND a.number < (40) AND a.first_year >= (1937) AND a.last_year >= (1937) LIMIT 1) as number_min) AS foo) AS nl) As foo;

# Geom

	SELECT(SELECT ST_AsText(ST_LineSubstring(street, startfraction, endfraction)) as geometry FROM (SELECT(SELECT St_AsText(a.geom) FROM tb_street AS a WHERE a.name LIKE ('%rua guarany%')) AS street, (SELECT ST_LineLocatePoint(line, point) FROM (SELECT(SELECT St_AsText(ST_LineMerge(a.geom)) AS street FROM tb_street AS a WHERE a.name LIKE ('%rua guarany%')) AS line, (SELECT(SELECT ST_AsText(ST_ClosestPoint(line, pt)) FROM (SELECT (SELECT st_astext(a.geom) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE a.number = (SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua guarany%') AND a.number > (40) AND a.first_year >= (1937) AND a.last_year >= (1937) LIMIT 1) AND b.name LIKE ('%rua guarany%')  ) As pt, (SELECT ST_AsText(geom) FROM tb_street WHERE name LIKE ('%rua guarany%')) As line) As foo)) AS point)AS foo) AS startfraction, (SELECT ST_LineLocatePoint(line, point) FROM (SELECT(SELECT St_AsText(ST_LineMerge(a.geom)) AS street FROM tb_street AS a WHERE a.name LIKE ('%rua guarany%')) AS line, (SELECT (SELECT ST_AsText(ST_ClosestPoint(line, pt)) FROM (SELECT (SELECT st_astext(a.geom) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE a.number = (SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua guarany%') AND a.number < (40) AND a.first_year >= (1937) AND a.last_year >= (1937) LIMIT 1) AND b.name LIKE ('%rua guarany%')) As pt, (SELECT ST_AsText(geom) FROM tb_street WHERE name LIKE ('%rua guarany%')) As line) As foo)) AS point) AS foo) AS endfraction) AS foo)

#street

	SELECT St_AsText(a.geom) FROM tb_street AS a WHERE a.name LIKE ('%rua guarany%')

#startfraction

	#line - startfraction

		SELECT St_AsText(ST_LineMerge(a.geom)) AS street FROM tb_street AS a WHERE a.name LIKE ('%rua guarany%')

	#point - startfraction

		SELECT(SELECT ST_AsText(ST_ClosestPoint(line, pt)) FROM (SELECT (SELECT st_astext(a.geom) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE a.number = (SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua guarany%') AND a.number > (40) AND a.first_year >= (1937) AND a.last_year >= (1937) LIMIT 1) AND b.name LIKE ('%rua guarany%')  ) As pt, (SELECT ST_AsText(geom) FROM tb_street WHERE name LIKE ('%rua guarany%')) As line) As foo)

		#pt - point - startfraction

			 SELECT st_astext(a.geom) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE a.number = (SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua guarany%') AND a.number > (40) AND a.first_year >= (1937) AND a.last_year >= (1937) LIMIT 1) AND b.name LIKE ('%rua guarany%')

	#ST_LineLocatePoint

		SELECT ST_LineLocatePoint(ST_GeomFromText('LINESTRING(-46.6369147421413 -23.5279305042086,-46.6358213567502 -23.5282743845962,-46.6347562678222 -23.5286142256358,-46.6346231312917 -23.5286567052734,-46.6338363213192 -23.5289002507621)'), ST_GeomFromText('POINT(-46.6339180939048 -23.5288749392574)'))
#endfraction

	#line - endfraction

		SELECT St_AsText(ST_LineMerge(a.geom)) AS street FROM tb_street AS a WHERE a.name LIKE ('%rua guarany%')

	#point - endfraction

		SELECT ST_AsText(ST_ClosestPoint(line, pt)) FROM (SELECT (SELECT st_astext(a.geom) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE a.number = (SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua guarany%') AND a.number < (40) AND a.first_year >= (1937) AND a.last_year >= (1937) LIMIT 1) AND b.name LIKE ('%rua guarany%')) As pt, (SELECT ST_AsText(geom) FROM tb_street WHERE name LIKE ('%rua guarany%')) As line) As foo

		#pt - point - endfraction

			 SELECT st_astext(a.geom) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE a.number = (SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id WHERE b.name LIKE ('%rua guarany%') AND a.number > (40) AND a.first_year >= (1937) AND a.last_year >= (1937) LIMIT 1) AND b.name LIKE ('%rua guarany%')

	#ST_LineLocatePoint

		SELECT ST_LineLocatePoint(ST_GeomFromText('LINESTRING(-46.6369147421413 -23.5279305042086,-46.6358213567502 -23.5282743845962,-46.6347562678222 -23.5286142256358,-46.6346231312917 -23.5286567052734,-46.6338363213192 -23.5289002507621)'), ST_GeomFromText('POINT(-46.6339180939048 -23.5288749392574)'))