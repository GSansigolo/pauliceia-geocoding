--1o adicionar o .shp no banco com nome de tabela 'tb_street1924' 

--2o renomear coluna 'nome rua' para 'nome' na 'tb_street1924' 

--3o inserir o seguinte código. Ele Irá atualizard todos os anos dos dados já existentes.
UPDATE tb_street
SET first_year = 1920
FROM tb_street1924
WHERE tb_street.geom = tb_street1924.geom
  AND  tb_street.name = tb_street1924.nome;

--4o inserir o seguinte código. Ele irá criar no 'tb_street' os dados que só existem em 1920.
INSERT INTO tb_street(name, obs, geom, perimeter, id_type, first_year, last_year)
(
	select nome, obs, geom, 0.0, tb_type_logradouro.id, 1920, 1920  FROM tb_street1924 JOIN tb_type_logradouro ON tb_type_logradouro.type = tb_street1924.tipo WHERE geom not in (select geom from tb_street) or nome not in (select name from tb_street)
)

--5o inserir o seguinte código. Ele ele adicionará os itens incompletos que não entraram no último código. São os com tipo = null. Assumi que são ruas (1)
INSERT INTO tb_street(name, obs, geom, perimeter, id_type, first_year, last_year)
(
	select nome, obs, geom, 0.0, 1, 1920, 1920  FROM tb_street1924  WHERE geom not in (select geom from tb_street) or nome not in (select name from tb_street)
)
