# Implementatieplan
Dit hoofdstuk beschrijft het implementatieplan.

## Schaalbaarheid
Omdat het systeem draait in een Docker-container is het gemakkelijk om bij of af te schalen. Dat
wil zeggen dat het systeem makkelijk meeschaalt met de grootte en behoefte van het bedrijf. De
schaalbaarheid van het systeem is in onafhankelijk van de hardware van de server(s). 

## Hardware
Op dit moment draait het systeem op de lokale machines van de ontwikkelaars. Het is de bedoeling
dat wanneer het systeem wordt uitgerold er een centrale locatie in Nederland wordt gekozen waar het
systeem zal komen te draaien. Op deze manier hoeft de eigenaar van een Wobbe filiaal niet zelf
hardware aan te schaffen.

Er wordt aanbevolen om een *Dell PowerEdge R430* aan te schaffen. Deze hardware biedt veel eenvoud bij het schalen en levert goede prestaties ten opzichte van de kostprijs.

## Beveiliging
Het systeem bevat persoonsgegevens en boodschappen die aan personen kunnen worden gekoppeld.
Wachtwoorden staan versleuteld opgeslagen in de database middels het bcrypt-algoritme.

De webservice is beveiligd middels *basic authentication*. Wanneer het systeem landelijk wordt
uitgerold is het verstandig om de huidige authenticatiemethode te vervangen door *O.Auth 2.0*.
*OAuth 2.0* biedt een hogere beveilingsgraad dan *basic authentication*, de techniek die in de
PoC is toegepast.

---

## Contactgegevens
Mocht er zich een calamiteit voordoen dan kunnen de volgende mensen worden bereikt voor ondersteuning:

| Naam                   | E-mail                     |
|------------------------|----------------------------|
| Malcolm Kindermans     | m.s.kindermans@st.hanze.nl |
| Maurits van Mastrigt   | m.van.mastrigt@st.hanze.nl |
| Auke Willem Oosterhoff | a.w.oosterhoff@st.hanze.nl |
| Jeroen Kruis           | j.kruis@st.hanze.nl        |

