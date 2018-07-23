--(a) Corrigir as coordenadas (x,y) de todos os places que estão
--no sistema métrico. Exemplo: o place de número 200 deve estar a
--200 metros do início da rua.

UPDATE
  tb_places
SET
  tb_places.geom = (
    SELECT
      st_astext(
        st_endpoint(
          st_intersection(
            st_setsrid(st_buffer(q.first_point, q.n), 4326),
            q.street
          )
        )
      )
    FROM
      (
        SELECT
          places.number AS n,
          st_astext(
            st_startpoint(st_linemerge(street.geom) :: geometry)
          ) AS first_point,
          st_linemerge(street.geom) :: geometry as street
        FROM
          tb_places AS places
          INNER JOIN tb_street AS street ON places.id_street = street.id
      ) AS q
  )
WHERE
  tb_places.first_year >= 1930;

--(b) Corrigir as coordenadas (x,y) de todos os places que não estão
--no sistema métrico e que estão na mesma localização dos places
--do item (a), levando em consideração números ímpares e pares
--nas mesmas localizações
