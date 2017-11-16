--1o Passo: adicionar o .shp no banco com name de tabela 'tb_street1924' 

--2o Passo:  renamear coluna 'name rua' para 'name' na 'tb_street1924' 

--3o Passo:  inserir o seguinte código. Ele Irá atualizard todos os anos dos dados já existentes.
    UPDATE tb_street
    SET first_year = 1920
    FROM tb_streets
    WHERE (
        (tb_street.geom = tb_streets.geom AND tb_street.name = tb_streets.name)
        OR
        (tb_street.geom = tb_streets.geom AND tb_street.name IS NULL AND  tb_streets.name IS NULL)
    );

--3.5 Passo: colocar o .shp de 24 velho com name perimeter_1924

--4o Passo: inserir o seguinte código. Ele irá criar no 'tb_street' os dados que só existem em 1920.
INSERT INTO tb_street(name, obs, geom, perimeter, id_type, first_year, last_year)
(
	select tb_streets.name, tb_streets.obs, tb_streets.geom, perimeter_1924.perimeter, tb_type_logradouro.id, 1920, 1920  FROM tb_streets JOIN tb_type_logradouro ON tb_type_logradouro.type = tb_streets.tipo JOIN perimeter_1924 ON tb_streets.id = perimeter_1924.id WHERE tb_streets.geom not in (select geom from tb_street) or tb_streets.name not in (select name from tb_street)
)

--5o Passo: inserir o seguinte código. Ele ele adicionará os itens incompletos que não entraram no último código. São os com tipo = null. Assumi que são ruas (1)
INSERT INTO tb_street(name, obs, geom, perimeter, id_type, first_year, last_year)
(
	select tb_streets.name, tb_streets.obs, tb_streets.geom, perimeter_1924.perimeter, 0, 1920, 1920  FROM tb_streets JOIN perimeter_1924 ON tb_streets.id = perimeter_1924.id WHERE tb_streets.geom not in (select geom from tb_street) or tb_streets.name not in (select name from tb_street)
)
