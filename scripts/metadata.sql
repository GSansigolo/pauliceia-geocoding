/*               metadata            */

/* Create a "metadata" holder table */

    CREATE TABLE metadata (
        tname text, 
        created timestamptz, 
        column_details json
    );

/* Insert into "metadata" holder table */

    INSERT INTO metadata 
        SELECT 'tb_places', now(), '{"name_column":"name", "number_column":"number", "firstYear_column":"first_year", "lastYear_column":"last_year", "geom_column":"geom"}';

/* Insert into "metadata" holder table */

    INSERT INTO metadata 
        SELECT 'tb_places2', now(), '{"name_column":"name", "number_column":"number", "firstYear_column":"first_year", "lastYear_column":"last_year", "geom_column":"geom"}';

/* View the "metadata" holder table */

    SELECT * FROM metadata ;
