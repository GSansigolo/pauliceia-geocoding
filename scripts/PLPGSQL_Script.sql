--(a) Corrigir as coordenadas (x,y) de todos os places que estão
--no sistema métrico. Exemplo: o place de número 200 deve estar a
--200 metros do início da rua.

    CREATE OR REPLACE FUNCTION update_geometry(input_id_place integer) 
    RETURNS text AS $$ 
    DECLARE 
 	    row_places places%ROWTYPE;
        row_fp_dataset fp_dataset%ROWTYPE;
        row_places_0 places_0%ROWTYPE;
    BEGIN 
        EXECUTE 'SELECT * FROM tb_places WHERE id = input_id_place'
            INTO row_places;
        EXECUTE 'SELECT places.id AS id_places, places.geom AS first_point, street.geom AS street FROM tb_places AS places INNER JOIN tb_street AS street ON places.id_street = street.id WHERE places.number = 0 '
            INTO row_fp_dataset;
        IF first_points_street_dataset.id_places = input_id_place THEN 
            EXECUTE 'SELECT st_endpoint(st_intersection(st_setsrid(st_buffer(first_points_street_dataset.first_point, places.number), 4326), first_points_street_dataset.street)) AS new_geom ' 
                INTO row_places_0;
            RETURN place_0.new_geom;
        ELSE 
            RETURN row_places.geom;
    END;$$ LANGUAGE plpgsql;

--(b) Corrigir as coordenadas (x,y) de todos os places que não estão
--no sistema métrico e que estão na mesma localização dos places
--do item (a), levando em consideração números ímpares e pares
--nas mesmas localizações
       
