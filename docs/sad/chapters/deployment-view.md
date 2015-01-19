# Deployment View

Voor deployment wordt Docker gebruikt. Met Docker is het mogelijk om de software in losse 
containers te draaien. Al deze containers werken met elkaar samen. Deze containers kunnen op
dezelfde fysieke servers draaien, maar ze kunnen ook op verschillende servers gedeployed worden.

| Naam                     | Type            | Omschrijving
|--------------------------|-----------------|--------------|
| Web- en applicatieserver | Dockercontainer | 5.1          |
| Databaseserver           | Dockercontainer | 5.2          |
| Applicatie               | Dockercontainer | 5.3          |

[De mobiele applicatie ..]

## Webserver

HTTP-requests voor de website of de API worden afgehandeld door een Nginx. Nginx draait
in een Dockercontainer. Poort 80 van de hostmachine is verbonden met poort 80 van deze container. 
Nginx stuurt de requests door naar de applicatiecontainer

## Applicatie

De webapplicatie is geschreven in PHP. De applicatie draait in een Dockercontainer. Requests op de
webserver worden doorgestuurd naar de webapplicatie welke een response geneert en deze terug
stuurt.

## Databaseserver

De webapplіcatie gebruikt een MySQL-database. De database draait in een eigen container en is
benaderbaar via poort 3306. De Dockercontainer moet geconfigureerd worden zodat deze poort
bereikbaar is voor andere containers.

## Deployment-Diagram

[...]

