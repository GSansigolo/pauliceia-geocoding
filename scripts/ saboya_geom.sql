--(a) Corrigir as coordenadas (x,y) de todos os places que estão
--no sistema métrico. Exemplo: o place de número 200 deve estar a
--200 metros do início da rua.
SELECT 
      q.places_id,
      st_astext(
        st_endpoint(
          st_intersection(
            st_setsrid(
              st_buffer(q.first_point, q.n), 
              4326
            ), 
            q.street
          )
        )
      )
    FROM 
      (
        SELECT
	  places.id as places_id,
          places.number AS n, 
          st_astext(
            st_startpoint(
              st_linemerge(street.geom) :: geometry
            )
          ) AS first_point, 
          st_linemerge(street.geom) :: geometry as street 
        
      ) AS q 


    SELECT 
      st_astext(st_endpoint(st_intersection(st_setsrid(st_buffer(q.first_point, p.number), 4326), q.street))) AS new_geom,
    FROM 
      (SELECT street.id AS id_street, places.geom AS first_point, street.geom AS street FROM tb_places AS places INNER JOIN tb_street AS street ON places.id_street = street.id WHERE places.number = 10) AS q, (SELECT * FROM tb_places) AS p
    GROUP BY new_geom


SELECT street.id AS id_street, places.geom AS first_point, street.geom AS street FROM tb_places AS places INNER JOIN tb_street AS street ON places.id_street = street.id WHERE places.number = 10
    


--(b) Corrigir as coordenadas (x,y) de todos os places que não estão
--no sistema métrico e que estão na mesma localização dos places
--do item (a), levando em consideração números ímpares e pares
--nas mesmas localizações


   /* ---------------------------------- */
   /* ----- Begin the PL/SQL block ----- */
   /* ---------------------------------- */
/*    EXEC SQL EXECUTE

   DECLARE
      insufficient_funds EXCEPTION;
      old_bal            NUMBER;
      min_bal            CONSTANT NUMBER := 500;
   BEGIN
      SELECT bal INTO old_bal FROM accounts
         WHERE account_id = :acct;
         -- If the account doesn't exist, the NO_DATA_FOUND
         -- exception will be automatically raised.
      :new_bal := old_bal - :debit;
      IF :new_bal >= min_bal THEN
         UPDATE accounts SET bal = :new_bal
            WHERE account_id = :acct;
         INSERT INTO journal
            VALUES (:acct, 'Debit', :debit, SYSDATE);
         :status := 'Transaction completed.';
      ELSE
         RAISE insufficient_funds;
      END IF;
      COMMIT;
   EXCEPTION
      WHEN NO_DATA_FOUND THEN
         :status := 'Account not found.';
         :new_bal := -1;
      WHEN insufficient_funds THEN
         :status := 'Insufficient funds.';
         :new_bal := old_bal;
      WHEN OTHERS THEN
         ROLLBACK;
         :status := 'Error: ' || SQLERRM(SQLCODE);
         :new_bal := -1;
   END;
  
   END-EXEC; */
