/* Create a "metadata" holder table */

    CREATE TABLE geocode_metadata (
        tname text, 
        created timestamptz, 
        ttype text,
        column_details json
    );

/* Insert into "metadata" holder table */

    INSERT INTO geocode_metadata 
        SELECT 'places_pilot_area', now(), 'places', '{"joinStreet_column": "street_id", "placeNumber_column":"number", "firstYear_column":"first_year", "lastYear_column":"last_year"}';

/* Insert into "metadata" holder table */

    INSERT INTO geocode_metadata
        SELECT 'streets_pilot_area', now(), 'streets', '{"streetId_column": "id", "streetName_column":"name"}';

/* View the "metadata" holder table */

    SELECT * FROM geocode_metadata ;
