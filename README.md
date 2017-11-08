![image](https://raw.githubusercontent.com/GSansigolo/PauliceiaAPI/master/logo.png)
# Web Service para Geocodificação de Endereços em Banco de Dados Espaços-Temporais.

## Gabriel Sansigolo<br>

### Autores:

Gabriel Sansigolo, INPE <br>
Carlos A. Noronha, INPE<br>
Gilberto R. de Queiroz, INPE<br>
Karine R. Ferreira, INPE<br>

## Resumo

Web services vem ganhando cada vez mais atenção na área da computação, principalmente pela sua eficiência na integração de sistemas e na comunicação entre aplicações diferentes. A transição de aplicações locais para aplicações web promoveu uma evolução no compartilhamento e distribuição de dados na internet. O objetivo desse trabalho é desenvolver uma ferramenta para geocodificação de endereços em banco de dados espaço-temporais para o projeto Pauliceia 2.0. Esse projeto visa produzir um conjunto de dados digitais históricos da cidade de São Paulo no período de 1870 a 1940 e desenvolver uma plataforma computacional para manipulação desses dados históricos e mapeamento colaborativo. A ferramenta de geocodificação está sendo desenvolvida como um serviço web e será integrada na plataforma do projeto Pauliceia 2.0 para trabalhar com os dados históricos da cidade de São Paulo. Atualmente existem ferramentas eficientes para a geocodificação de endereços. Porém, nenhuma delas trabalha com dados espaço-temporais, ou seja, não considera a componente temporal dos dados espaciais. Como o objetivo é a geocodificação de endereços históricos no município de São Paulo durante os anos de 1870 a 1940, é essencial que a ferramenta de geocodificação considere a componente temporal dos dados espaciais. No que diz respeito aos resultados obtidos, testou-se a ferramenta desenvolvida com uma série de dados históricos fornecidos pela pesquisadora Ayala Levy. Os resultados obtidos até o momento levam a concluir que a média das distâncias entre os dados obtidos pela ferramenta e os dados esperados pela pesquisa foram de 0.00029 metros. Diante dos resultados das análises, pode-se concluir que a ferramenta de geocodificação de endereço funcionou de forma exemplar entregando uma localização espacial precisa dentro da faixa temporal buscada.

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
