--(a) Corrigir as coordenadas (x,y) de todos os places que estão
--no sistema métrico. Exemplo: o place de número 200 deve estar a
--200 metros do início da rua.

CREATE OR REPLACE FUNCTION saboya_geometry(inputPlaceId integer) 
	RETURNS text
AS
$BODY$
DECLARE 
	street_id Integer;
	zero_geom text;
	street_geom text;
	number_place Integer;
	old_geom_place text;
	streetSize Float;
	new_geom text;
BEGIN
	street_id := (SELECT street.id FROM places_pilot_area AS places INNER JOIN streets_pilot_area AS street ON places.id_street = street.id WHERE places.id = inputPlaceId);
	zero_geom := (SELECT places.geom FROM places_pilot_area AS places INNER JOIN streets_pilot_area AS street ON places.id_street = street.id WHERE places.number = 0 AND street.id = street_id);
	street_geom := (SELECT  ST_LineMerge(geom) FROM streets_pilot_area WHERE id = street_id);
	number_place := (SELECT number FROM  places_pilot_area WHERE id = inputPlaceId);
	old_geom_place := (SELECT geom FROM  places_pilot_area WHERE id = inputPlaceId);
	streetSize := (SELECT ST_Length(ST_Transform(geom, 29100)) FROM streets_pilot_area where id = street_id);
	new_geom := (SELECT ST_LineInterpolatePoint(street_geom, number_place/streetSize));
    IF new_geom IS NOT NULL THEN
        RETURN st_astext(new_geom);
    ELSE
        RETURN st_astext(old_geom_place);
    END IF;
END;
$BODY$
LANGUAGE plpgsql;

--SELECT update_geometry(622)
SELECT saboya_geometry(622) AS saboya_geometry, st_astext(geom) AS old_geometry FROM places_pilot_area WHERE id = 622;

--(b) Corrigir as coordenadas (x,y) de todos os places que não estão
--no sistema métrico e que estão na mesma localização dos places
--do item (a), levando em consideração números ímpares e pares
--nas mesmas localizações

CREATE OR REPLACE FUNCTION update_geometry(beforeInputPlaceId integer, afterInputPlaceId integer) 
	RETURNS text
AS
$BODY$
DECLARE 

BEGIN

END;
$BODY$
LANGUAGE plpgsql;

--SELECT update_geometry(622)
SELECT update_geometry(622, 72) AS saboya_geometry, st_astext(geom) AS old_geometry FROM places_pilot_area WHERE id = 622;


	