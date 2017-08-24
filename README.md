![image](https://raw.githubusercontent.com/GSansigolo/PauliceiaAPI/master/logo.png)
# Web Service para Geo Codificação de Endereços em Banco de Dados Espaços Temporais.

Gabriel Sansigolo<br>

O deste trabalho é o planejamento, arquitetura e desenvolvimento de um web service, que possibilite a colaboração com o mapeamento histórico geográfico do município de São Paulo durante os anos 1870-1940.

### Orientadores:

Luis Antonio Coelho Ferla, Doutor, UNIFESP
Karine Reis Ferreira, Doutora, INPE
Juliana Forin Pasquini Martinez, Mestre, FATEC


## Diagramas de Sequência:

http://imgur.com/a/WezFp

## Prerequisitos

```
PostgreSQL 9.5.8
PostGIS 2.3
nodejs 4.2.6

```
## Instalação


```
npm install -g express-generator@4.13.4
npm install supervisor@0.11.0 -g
npm install pg@6.1.0 --save
npm install geojson
npm install postgeo
npm install js2xmlparser

```
