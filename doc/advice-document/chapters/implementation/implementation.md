# Implementatie Plan
Dit hoofdstuk beschrijft het implementatie plan.

## Schaalbaarheid
Omdat het systeem draait in een docker container is het gemakkelijk om bij of af te schalen.
Dat wil zeggen dat het systeem makkelijk meeschaalt met de grootte en behoefte van het bedrijf.
De schaalbaarheid van het systeem is in principe onafhankelijk van de hardware van de server(s).
Omdat het systeem zoals hierboven beschreven in geisoleerde containers draait is het alleen afhankelijk van de capaciteit van de server in geheugen en schrijfruimte.

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

## Points of Contact
Mocht er zich een calamiteit voordoen dan kunnen de volgende mensen worden bereikt voor ondersteuning.

| Naam | Email |
| --- | --- |
| Malcolm Kindermans | m.s.kindermans@st.hanze.nl |
| Maurits van Mastrigt | m.van.mastrigt@st.hanze.nl |
| Auke Willem Oosterhoff | a.w.oosterhoff@st.hanze.nl |
| Jeroen Kruis | j.kruis@st.hanze.nl |
