# Configuratie

Dit hoofdstuk benoemt kort welke instellingen op welke plekken kunnen worden ingesteld. 

## HHVM

Configuratie voor HHVM kan zowel in `src/init/web/php.ini` als in `src/init/web/server.ini` worden gezet. Dit geldt onder andere voor instellingen met betrekking tot logbestanden, foutrapportage en
gebruik van hardware.

## App

De URL van de HTTP API kan worden aangepast in `src/app/www/js/app.js`. In dit bestand wordt een constante `APIURL` gedefinieerd:

```javascript
.constant('APIURL', 'http://188.166.58.49/')
```

