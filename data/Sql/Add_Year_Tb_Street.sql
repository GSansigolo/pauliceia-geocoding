--1o Passo: adicionar o .shp no banco com nome de tabela 'tb_street1924' 

--2o Passo:  renomear coluna 'nome rua' para 'nome' na 'tb_street1924' 

--3o Passo:  inserir o seguinte código. Ele Irá atualizard todos os anos dos dados já existentes.
UPDATE tb_street
SET first_year = 1920
FROM tb_street_24
WHERE tb_street.geom = tb_street_24.geom
  AND  tb_street.name = tb_street_24.nome
  	OR tb_street.name IS NULL 
  	AND  tb_street_24.nome IS NULL;

--4o Passo: inserir o seguinte código. Ele irá criar no 'tb_street' os dados que só existem em 1920.
INSERT INTO tb_street(name, obs, geom, perimeter, id_type, first_year, last_year)
(
	select tb_street_24.nome, tb_street_24.obs, tb_street_24.geom, perimeter_1924.perimeter, tb_type_logradouro.id, 1920, 1920  FROM tb_street_24 JOIN tb_type_logradouro ON tb_type_logradouro.type = tb_street_24.tipo JOIN perimeter_1924 ON tb_street_24.gid = perimeter_1924.gid WHERE tb_street_24.geom not in (select geom from tb_street) or tb_street_24.nome not in (select name from tb_street)
)

--5o Passo: inserir o seguinte código. Ele ele adicionará os itens incompletos que não entraram no último código. São os com tipo = null. Assumi que são ruas (1)
INSERT INTO tb_street(name, obs, geom, perimeter, id_type, first_year, last_year)
(
	select tb_street_24.nome, tb_street_24.obs, tb_street_24.geom, perimeter_1924.perimeter, 0, 1920, 1920  FROM tb_street_24 JOIN perimeter_1924 ON tb_street_24.gid = perimeter_1924.gid WHERE tb_street_24.geom not in (select geom from tb_street) or tb_street_24.nome not in (select name from tb_street)
)