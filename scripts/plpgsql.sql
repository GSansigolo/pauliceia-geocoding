--(a) Corrigir as coordenadas (x,y) de todos os places que estão
--no sistema métrico. Exemplo: o place de número 200 deve estar a
--200 metros do início da rua.

--------------------------------------------------

CREATE OR REPLACE FUNCTION saboya_geometry(streetId integer, numberPlace Float) 
	RETURNS text
AS
$BODY$
DECLARE 
	zeroGeom text;
	streetGeom text;
	oldGeomPlace text;
	streetSize Float;
	startPoint text;
	newGeom text;
	newStreetGeom text;
	equals text; 
BEGIN
	zeroGeom := (SELECT places.geom FROM places_pilot_area AS places INNER JOIN streets_pilot_area AS street ON places.id_street = street.id WHERE places.number = 0 AND street.id = streetId ORDER BY date DESC LIMIT 1);
	streetGeom := (SELECT  ST_LineMerge(geom) FROM streets_pilot_area WHERE id = streetId);
	streetSize := (SELECT ST_Length(ST_Transform(geom, 29100)) FROM streets_pilot_area where id = streetId);
	startPoint := (SELECT  ST_StartPoint(ST_LineMerge(geom)) FROM streets_pilot_area WHERE id = streetId);
	equals := (SELECT zeroGeom ILIKE startPoint);
	IF equals LIKE 'false' THEN
		newStreetGeom := (SELECT  ST_Reverse(ST_LineMerge(geom)) FROM streets_pilot_area WHERE id = streetId);
		newGeom := (SELECT ST_LineInterpolatePoint(newStreetGeom, numberPlace/streetSize));
	ELSE
		newGeom := (SELECT ST_LineInterpolatePoint(streetGeom, numberPlace/streetSize));
	END IF;
	RETURN st_astext(newGeom);
END;
$BODY$
LANGUAGE plpgsql;

--------------------------------------------------

--(b) Corrigir as coordenadas (x,y) de todos os places que não estão
--no sistema métrico e que estão na mesma localização dos places
--do item (a), levando em consideração números ímpares e pares
--nas mesmas localizações

CREATE OR REPLACE FUNCTION updateGeometry(streetName text, numberBefore integer, numberAfter integer) 
	RETURNS text
AS
$BODY$
DECLARE 
	streetId integer;
	beforeId integer;
	afterId integer;
	afterGeom text;
BEGIN
	streetId := (SELECT id::integer FROM streets_pilot_area WHERE name LIKE streetName);
	beforeId := (SELECT places.id::integer FROM places_pilot_area AS places INNER JOIN streets_pilot_area AS street ON places.id_street::integer = street.id::integer WHERE places.id::integer = numberBefore::integer AND street.id::integer = streetId);
	afterId := (SELECT places.id::integer FROM places_pilot_area AS places INNER JOIN streets_pilot_area AS street ON places.id_street::integer = street.id::integer WHERE places.id::integer = numberBefore::integer AND street.id::integer = streetId);
	afterGeom := (SELECT geom FROM places_pilot_area WHERE id::integer = afterId::integer);
	RETURN afterGeom;
END;
$BODY$
LANGUAGE plpgsql;

--------------------------------------------------

SELECT updateGeometry("rua guarany", 3, 14);

--------------------------------------------------
