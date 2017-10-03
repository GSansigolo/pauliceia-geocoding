![image](https://raw.githubusercontent.com/GSansigolo/PauliceiaAPI/master/logo.png)
# Web Service para Geocodificação de Endereços em Banco de Dados Espaços Temporais.

## Gabriel Sansigolo<br>

### Orientadores:

Luis Antonio Coelho Ferla, Doutor, UNIFESP<br>
Karine Reis Ferreira, Doutora, INPE<br>
Juliana Forin Pasquini Martinez, Mestre, FATEC<br>

## Resumo

Web services vem ganhando cada vez mais espaço no mercado da computação, principalmente pela sua eficiência no que diz respeito a integração de sistemas e comunicação entre aplicações diferentes (SANCHEZ, 2014). Com a transição do publico de aplicações locais para aplicações web permitiu-se uma evolução na questão de compartilhamento de dados e uma necessidade de melhor distribuição na internet. Este trabalho tem como principal objetivo o desenvolvimento de um web service para distribuição dos dados e um projeto de mapeamento histórico da cidade de São Paulo. O serviço vai oferecer, além de acesso aos dados, ferramentas de geocodificação de endereços já desenvolvidas para trabalhar com o banco de dados histórico do projeto. Esse projeto está associado ao projeto: “Pauliceia 2.0: Geocodificação de Endereços em Banco de Dados Espaço Temporais.”

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
