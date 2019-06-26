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
	STEquals text; 
BEGIN
	zeroGeom := (SELECT places.geom FROM places_pilot_area AS places INNER JOIN streets_pilot_area AS street ON places.id_street = street.id WHERE places.number = 0 AND street.id = streetId ORDER BY date DESC LIMIT 1);
	streetGeom := (SELECT  ST_LineMerge(geom) FROM streets_pilot_area WHERE id = streetId);
	streetSize := (SELECT ST_Length(ST_Transform(geom, 29100)) FROM streets_pilot_area where id = streetId);
	startPoint := (SELECT  ST_StartPoint(ST_LineMerge(geom)) FROM streets_pilot_area WHERE id = streetId);
	STEquals := (SELECT ST_Equals(zeroGeom, startPoint));
	IF STEquals NOT ILIKE '%t%' THEN
		newGeom := (SELECT ST_LineInterpolatePoint(streetGeom, numberPlace/streetSize));
	ELSE
		newStreetGeom := (SELECT  ST_Reverse(ST_LineMerge(geom)) FROM streets_pilot_area WHERE id = streetId);
		newGeom := (SELECT ST_LineInterpolatePoint(newStreetGeom, numberPlace/streetSize));
	END IF;
	IF newGeom IS NOT NULL THEN
		RETURN st_astext(newGeom);
	ELSE
		RETURN NULL;
	END IF;
END;
$BODY$
LANGUAGE plpgsql;

--------------------------------------------------

CREATE OR REPLACE FUNCTION testSaboya() 
	RETURNS text
AS
$BODY$
DECLARE 
	test1 text;
	test2 text;
	test3 text;
	test4 text;
	test5 text;
BEGIN 

   	test1 := (SELECT saboya_geometry(296,449) AS saboya_geometry);
	test2 := (SELECT saboya_geometry(169,21) AS saboya_geometry);
	test3 := (SELECT saboya_geometry(289,172) AS saboya_geometry);
	test4 := (SELECT saboya_geometry(215,141) AS saboya_geometry);
	test5 := (SELECT saboya_geometry(22,39) AS saboya_geometry);
	
	IF test1 ILIKE '%POINT(-46.651305955235 -23.5416585809938)%' THEN
		IF test2 ILIKE '%POINT(-46.6508371415866 -23.5318644275844)%' THEN
			IF test3 ILIKE '%POINT(-46.6153375649284 -23.5348629012617)%' THEN
				IF test4 ILIKE '%POINT(-46.6330429108631 -23.5338880899783)%' THEN
							IF test5 ILIKE '%POINT(-46.6374927064274 -23.5489968662265)%' THEN
								RETURN 'TRUE';
							ELSE
								RETURN NULL;
							END IF;		
				ELSE
					RETURN NULL;
				END IF;
			ELSE
				RETURN NULL;
			END IF;	
		ELSE
			RETURN NULL;
		END IF;
	ELSE
		RETURN NULL;
	END IF;
END;
$BODY$
LANGUAGE plpgsql;

--------------------------------------------------

SELECT testSaboya();

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
