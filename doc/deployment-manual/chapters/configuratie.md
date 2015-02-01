# Configuratie
Dit hoofdstuk benoemt kort welke instellingen op welke plekken ingesteld kunnen worden. 

## HHVM
Configuratie voor HHVM kan zowel in `/src/init/web/php.ini` als in `/src/init/web/server.ini` gezet
worden. Dit geldt onder andere voor instelling met betrekking tot logfiles, error rapportage en
gebruik van hardware.

## App
De URL van de HTTP API van worden aangepast in `/src/app/www/js/app.js`. In dit bestand wordt een
constante `APIURL` gedefinieerd.

```javascript
.constant('APIURL', 'http://188.166.58.49/')
```
