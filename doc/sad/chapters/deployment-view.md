# Deployment View

Voor deployment wordt Docker gebruikt. Met Docker is het mogelijk om de software in losse 
containers te draaien. Al deze containers werken met elkaar samen. Deze containers kunnen op
dezelfde fysieke servers draaien, maar ze kunnen ook op verschillende servers gedeployed worden.

De mobiele app zal worden aangeboden aan de opdrachtgever. kan de app zelf verspreiden. 
Na de testfase zal de applicatie in de downloadwinkels van de verschillende platformen
verschijven. 

## Web- en applicatieserver
HTTP-requests voor de website of de API worden afgehandeld door een Nginx. Nginx draait
in een Dockercontainer. Poort 80 van de hostmachine is verbonden met poort 80 van deze container. 
Nginx stuurt de requests door naar de naar de PHP-applicatie die een reponse genereert.

## Databaseserver

De webapplіcatie gebruikt een MySQL-database. De database draait in een eigen container en is
benaderbaar via poort 3306. De Dockercontainer moet geconfigureerd worden zodat deze poort
bereikbaar is voor andere containers.

<hr>
## Deploymentdiagram
In onderstaande afbeelding is weergegeven hoe de diverse onderdelen met elkaar verband houden.

!["Deployment Diagram"](assets/deployment_diagram.png)
