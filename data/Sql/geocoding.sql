SELECT geometry , nf, nl, ($3) AS num 
FROM 
	(SELECT 
		(SELECT St_AsText(a.geom) FROM tb_street AS a WHERE a.name LIKE ($1)) AS geometry, 
		(SELECT number_max FROM 
			(SELECT 
				(SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id 
						WHERE b.name LIKE ($1) AND a.number > ($3) AND a.first_year >= ($2) 
					UNION  
				 SELECT MIN(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id 
				 		WHERE b.name LIKE ($1) AND a.number > ($3) AND a.last_year >= ($2) LIMIT 1) as number_max) AS foo) As nf, 
		(SELECT number_min FROM 
			(SELECT 
				(SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id 
						WHERE b.name LIKE ($1) AND a.number < ($3) AND a.first_year >= ($2) 
					UNION  
				 SELECT MAX(number) FROM tb_places AS a JOIN tb_street AS b ON a.id_street = b.id 
				 		WHERE b.name LIKE ($1) AND a.number < ($3) AND a.last_year >= ($2) LIMIT 1) as number_min) AS foo) AS nl) 
	As foo;