/*               metadata            */

/* Create a "metadata" holder table */

    CREATE TABLE metadata (
        tname text, 
        created timestamptz, 
        details json
    );

/* Insert into "metadata" holder table */

    INSERT INTO metadata 
        SELECT 'tb_places', now(), '{"organization":"n/a","source":"manual","catalog":false}';

/* Insert into "metadata" holder table */

    INSERT INTO metadata 
        SELECT 'tb_places2', now(), '{"organization":"n/a","source":"manual","catalog":false}';

/* View the "metadata" holder table */

    SELECT * FROM metadata ;
