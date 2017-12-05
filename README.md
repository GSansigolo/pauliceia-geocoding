![image](https://raw.githubusercontent.com/GSansigolo/PauliceiaAPI/master/logo.png)
# Web Service para Geocodificação de Endereços em Banco de Dados Espaços-Temporais.

## Gabriel Sansigolo<br>

### Autores:

Gabriel Sansigolo, INPE <br>
Carlos A. Noronha, INPE<br>
Gilberto R. de Queiroz, INPE<br>
Karine R. Ferreira, INPE<br>

## Resumo

	A transição de aplicações locais para aplicações web promoveu uma evolução no compartilhamento e distribuição de dados na internet. A geocodificação histórica é um exemplo disso, através de uma chamada textual composta por um endereço (nome da rua, número) e um ano a função consegue determinar a posição geográfica do endereço no ano buscado, usando uma lógica matemática através dos dados já existentes. Atualmente existem diversas ferramentas eficientes para a geocodificação de endereços, porém, nenhuma delas trabalha com dados espaço-temporais, ou seja, não considera de forma eficiente a componente temporal dos dados espaciais. O objetivo desse trabalho é desenvolver uma ferramenta para geocodificação de endereços espaço-temporais para o projeto Pauliceia 2.0. Esse projeto visa produzir um conjunto de dados digitais históricos da cidade de São Paulo no período de 1870 a 1940, desenvolver uma plataforma comp­utacional para manipulação desses dados históricos e mapeamento colaborativo. Web services vem ganhando cada vez mais atenção na área da computação, principalmente pela sua eficiência na integração de sistemas e na comunicação entre aplicações diferentes com isso em mente esse projeto foi desenvolvido em forma de serviço web e será integrado na plataforma do projeto Pauliceia 2.0 para assim trabalhar com os dados históricos do projeto. O sistema de geocodificação de endereços históricos foi testado município de São Paulo durante os anos de 1900 a 1930, os resultados obtidos até o momento levam a concluir que a ferramenta de geocodificação de endereço funcionou de forma exemplar entregando uma localização espacial dentro da faixa temporal buscada.

## Prerequisitos

```
PostgreSQL 9.5.8
PostGIS 2.3
NodeJS 4.2.6

```

## Instalação

```
npm install -g express-generator@4.13.4
npm install supervisor@0.11.0 -g
npm install pg@6.1.0 --save
npm install geojson
npm install postgeo
npm install js2xmlparser
npm install --save request
npm install --save request-promise
npm install express
npm install serve-favicon
npm install morgan
npm install cookie-parser
npm install body-parser
npm install debug
npm install jade
npm install cors
npm install mocha --save-dev
npm install mocha chai supertest --save
```
