# Implementatie Plan
Dit hoofdstuk beschrijft het implementatie plan.

## Schaalbaarheid
Omdat het systeem draait in een docker container is het gemakkelijk om bij of af te schalen.
Dat wil zeggen dat het systeem makkelijk meeschaalt met de grootte en behoefte van het bedrijf.

## Hardware
Op dit moment draait het systeem op de lokale machines van de ontwikkelaars.
Het is de bedoeling dat wanneer het systeem wordt uitgerold er een centrale locatie in Nederland wordt gekozen waar het systeem zal komen te draaien.
Op deze manier hoeft de eigenaar van een Wobbe filiaal niet zelf hardware aan te schaffen.

Er wordt aanbeloven om een *Dell PowerEdge R430* aan te schaffen.

## Beveiliging
Het systeem bevat persoonsgegevens en boodschappen die aan personen kunnen worden gekoppeld.
Wachtwoorden staan versleuteld opgeslagen in de database middels het bcrypt algoritme.

De webservice is beveiligd middels *basic authentication*.
Het is aanbeloven om in het systeem wat landelijk zal worden uitgerold gaat worden gebruik te maken van *O.Auth 2.0*.
*OAuth 2.0* biedt een hogere beveilingsgraad dan *basic authentication*.
