#Imports
import pandas as pd
import numpy as np
import psycopg2
from sqlalchemy import create_engine

#Postgres connection
con = psycopg2.connect(host="localhost",database="db_pauliceia", user="postgres", password="teste")
cur = con.cursor()

#Dataframe Open
df = pd.read_csv('entrada/TABELAO_PARCIAL1110.csv')

#Create new collumns
df.loc[:,'cord'] = 'null'
df.loc[:,'first_day'] = np.NaN
df.loc[:,'first_month'] = np.NaN
df.loc[:,'first_year'] = np.NaN
df.loc[:,'last_day'] = np.NaN
df.loc[:,'last_month'] = np.NaN
df.loc[:,'last_year'] = np.NaN

#id_dict
id_dict = {}

#For loop
for i in range(0,len(df)):
    if(str(df['metragem'][i]) != str(df['numero'][i])):
        j = id_dict['old_id']
        print(i)
        sql = 'SELECT saboya_geometry('+str(df['id_da rua'][i])+', '+str(df['metragem'][i])+') AS saboya_geometry;'
        print(sql)
        cur.execute(sql)
        recset = cur.fetchall()
        geom = str(recset).replace("[('","").replace("',)]","")
        df['cord'][i] = geom.replace("POINT","")
        if (pd.notna(df['data inicial'][i])):
            df['first_day'][i] = df['data inicial'][i].split('/')[0]
            df['first_month'][i] = df['data inicial'][i].split('/')[1]
            df['first_year'][i] = df['data inicial'][i].split('/')[2]
        if (pd.notna(df['data_final'][i])):        
            df['last_day'][i] = df['data inicial'][j].split('/')[0]
            df['last_month'][i] = df['data inicial'][j].split('/')[1]
            df['last_year'][i] = df['data inicial'][j].split('/')[2]
        df['fonte'][i] = df['fonte'][i]
    else:
        print(i)
        id_dict['old_id'] = i
        sql = 'SELECT saboya_geometry('+str(df['id_da rua'][i])+', '+str(df['metragem'][i])+') AS saboya_geometry;'
        print(sql)
        cur.execute(sql)
        recset = cur.fetchall()
        geom = str(recset).replace("[('","").replace("',)]","")
        df['cord'][i] = geom.replace("POINT","")
        if (pd.notna(df['data inicial'][i])):
            df['first_day'][i] = df['data inicial'][i].split('/')[0]
            df['first_month'][i] = df['data inicial'][i].split('/')[1]
            df['first_year'][i] = df['data inicial'][i].split('/')[2]
        if (pd.notna(df['data_final'][i])):        
            df['last_day'][i] = df['data_final'][i].split('/')[0]
            df['last_month'][i] = df['data_final'][i].split('/')[1]
            df['last_year'][i] = df['data_final'][i].split('/')[2]
        df['fonte'][i] = df['fonte'][i]

#Drop columns
df = df.drop(['logradouro', 'metragem','sistema metrico','data_final', 'data inicial', 'Id_ponto'], axis=1)

#Rename columns
df = df.rename(columns={'id_da rua': 'id_street', 'numero': 'number', 'numero original':'original_n', 'fonte':'source', 'autor_da_alimentacao':'author', 'Data':'date'})

#Print
print(df.tail())

#Save df
df.to_csv('saida/new.csv')

#Create con
engine = create_engine(
    'postgresql+psycopg2://postgres:teste@localhost:5432/db_pauliceia'
)

#Run SQL
df.to_sql('places_pilot_area2', con=engine, schema='public')

#Fix database
statement = 'ALTER TABLE public.places_pilot_area2 ADD COLUMN geom geometry(Point, 4326);'
engine.execute(statement)
statement = "UPDATE public.places_pilot_area2 SET geom = ST_SetSRID('POINT' || cord, 4326);"
engine.execute(statement)
statement = "ALTER TABLE public.places_pilot_area2 DROP COLUMN cord;"
engine.execute(statement)
statement = "ALTER TABLE public.places_pilot_area2 ALTER COLUMN index TYPE integer;"
engine.execute(statement)
statement = "ALTER TABLE public.places_pilot_area2 ALTER COLUMN id_street TYPE integer;" 
engine.execute(statement)
statement = "ALTER TABLE public.places_pilot_area2 ALTER COLUMN number TYPE float USING number::double precision;"
engine.execute(statement)
statement = "ALTER TABLE public.places_pilot_area2 ALTER COLUMN original_n TYPE VARCHAR(255);"
engine.execute(statement)
statement = "ALTER TABLE public.places_pilot_area2 ALTER COLUMN source TYPE VARCHAR(255);"
engine.execute(statement)
statement = "ALTER TABLE public.places_pilot_area2 ALTER COLUMN author TYPE VARCHAR(255);"
engine.execute(statement)
statement = "ALTER TABLE public.places_pilot_area2 ALTER COLUMN date TYPE VARCHAR(255);"
engine.execute(statement)
statement = "ALTER TABLE public.places_pilot_area2 ALTER COLUMN first_day TYPE integer USING first_day::integer;"
engine.execute(statement)
statement = "ALTER TABLE public.places_pilot_area2 ALTER COLUMN first_month TYPE integer USING first_month::integer;;"
engine.execute(statement)
statement = "ALTER TABLE public.places_pilot_area2 ALTER COLUMN first_year TYPE integer USING first_year::integer;"
engine.execute(statement)
statement = "ALTER TABLE public.places_pilot_area2 ALTER COLUMN last_day TYPE integer USING last_day::integer;"
engine.execute(statement)
statement = "ALTER TABLE public.places_pilot_area2 ALTER COLUMN last_month TYPE integer USING last_month::integer;"
engine.execute(statement)
statement = "ALTER TABLE public.places_pilot_area2 ALTER COLUMN last_year TYPE integer USING last_year::integer;"
engine.execute(statement)
statement = "ALTER TABLE public.places_pilot_area2 ADD CONSTRAINT constraint_fk_id_street FOREIGN KEY (id_street) REFERENCES public.streets_pilot_area (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;"
engine.execute(statement)
statement = "ALTER TABLE public.places_pilot_area2 RENAME index TO id;"
engine.execute(statement)
statement = "ALTER TABLE public.places_pilot_area2 ADD CONSTRAINT places_pkey PRIMARY KEY (id);"
engine.execute(statement)
