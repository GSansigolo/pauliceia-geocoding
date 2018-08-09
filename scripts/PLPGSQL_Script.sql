--(a) Corrigir as coordenadas (x,y) de todos os places que estão
--no sistema métrico. Exemplo: o place de número 200 deve estar a
--200 metros do início da rua.

    CREATE OR REPLACE FUNCTION update_geometry(input_id_place integer) 
    RETURNS text AS $$ 
    DECLARE 
        places %ROWTYPE;
        first_points_street_datasetfirst_points_street_dataset %ROWTYPE;
        place_0 %ROWTYPE;
    BEGIN 
        EXECUTE 'SELECT * FROM tb_places WHERE id = input_id_place' 
            INTO places;
        EXECUTE 'SELECT places.id AS id_places, places.geom AS first_point, street.geom AS street FROM tb_places AS places INNER JOIN tb_street AS street ON places.id_street = street.id WHERE places.number = 0 '
            INTO first_points_street_dataset;
        
        IF first_points_street_dataset.id_places = input_id_place THEN 
            EXECUTE 'SELECT st_endpoint(st_intersection(st_setsrid(st_buffer(first_points_street_dataset.first_point, places.number), 4326), first_points_street_dataset.street)) AS new_geom ' 
                INTO place_0;
            RETURN place_0.new_geom;
        ELSE 
            RETURN places.geom;
    END;$$ LANGUAGE plpgsql;

--(b) Corrigir as coordenadas (x,y) de todos os places que não estão
--no sistema métrico e que estão na mesma localização dos places
--do item (a), levando em consideração números ímpares e pares
--nas mesmas localizações
