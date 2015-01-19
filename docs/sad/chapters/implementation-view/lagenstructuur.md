# Invulling van lagenstructuur

Deze paragraaf beschrijft de technische invulling van de, in de logica view, onderscheiden lagen.

### Presentatielaag

De presentatie laag omvat de deelsystemen die een interface bieden aan de eindgebruikers van het systeem. Dit wordt gedaan door middel van een mobiele applicatie en een website. Beide onderdelen communiceren, via de service laag, met de domein (applicatie) laag voor het ophalen en muteren van gegevens.
Onderstaand worden de keuzes toegelicht (regels voor de componenten):

__Mobiele Applicatie__  
De mobiele applicatie moet een cross-platform applicatie zijn die eenvoudig is in gebruik. Hierdoor is er voor bestaande oplossingen als Cordova en OnsenUI gekozen (zie paragraaf 4.3). Dit neemt werk uit handen, waardoor er meer focus gelegd kan worden op de gebruikerservaring, terwijl de applicatie toch grafisch aantrekkelijk blijft.

__Website__  
Net als de mobiele applicatie, is ook de website met bestaande componenten geïmplementeerd. Voor een aantrekkelijk grafische interface is er Twitter Bootstrap gebruikt. De applicatielogica aan de client kant is gedaan met behulp van de template engine van Laravel. Ook deze punten worden nader toegelicht in paragraaf 4.3.

Het serveren van de webistepagina’s wordt gedaan met behulp van een webservice. Hierbij is er gekozen voor het Laravel framework, omdat dit framework makkelijk is in gebruik, geen stijle leercurve heeft, en er al de nodige ervaring in de groep aanwezig was. De keuzecriteria zijn dus met name ontwikkelsnelheid en onderhoudbaarheid (maintainability) van het systeem.

### Service laag

De communicatie gebeurd met behulp van HTTP requests. Hierbij wordt het RESTful design principe gebruikt. Dit houdt in dat alle entiteiten op één uniforme manier, via de Application Programming Interface (API), benaderd kunnen worden. Dit vereenvoudigd het redeneren over de communicatie (HTTP requests) en het opsporen en oplossen van fouten.

Het HTTP protocol heeft veel overhead, maar biedt daarentegen veel structuur en garandeert een stabiele omgeving. Tevens wordt dit protocol door webbrowsers gebruikt, waardoor er veel informatie over te vinden is, wat het implementeren eenvoudiger maakt.

### Domeinlaag

De applicatielogica is volledig uitgewerkt in de PHP scripttaal. Er is hierbij gekozen voor een framework, omdat hiermee sneller en transparanter ontwikkeld kan worden. Dit is voordelig voor alle ontwikkelaars. Tevens is het gekozen framework zeer expressief en biedt het veel mogelijkheden. Dit voorkomt dat ontwikkelaars onnodig tijd besteden aan het “opnieuw uitvinden van het wiel” - wat een gevaar voor elk project is. Het gebruiken van bestaande tools stelt de ontwikkelaars in staat zich meer te richten op de functionaliteiten en minder op implementatie technieken.

### Datalaag

Voor het persisteren van data zijn er veel opties. Omdat de gegevens het best in een relationeel model passen, is er de keuze gemaakt voor een relationele database. Hierbij is er gekozen voor MySQL, vanwege het gemak in gebruik. Er is veel documentatie beschikbaar en er zijn weinig ontwikkelaars die niet met dit softwarepakket gewerkt hebben. Ook dit scheelt ontwikkeltijd, waardoor er meer gericht kan worden op de functionaliteiten in plaats van implementatie.
Tevens is MySQL zeer ver doorontwikkeld, waardoor dingen zoals stabiliteit en hardware specificatie eigenlijk geen rol meer spelen.

