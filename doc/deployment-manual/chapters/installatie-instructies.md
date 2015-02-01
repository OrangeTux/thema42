# Installatie

Wobbe 2000 bestaat uit twee componenten: een webapplicatie en een mobiele app. De webapplicatie
biedt klanten de mogelijkheid om boodschappenlijstjes samen te stellen. Tevens verschaft de
webapplicatie toegang tot de data door middel van een API. De app maakt hier gebruikt van. De app
stelt klanten in staat om in de winkel hun boodschappenlijstje af te werken en makkelijk te
betalen. 

Dit hoofdstuk beschrijft op welke wijze deze twee softwarecomponenten geïnstalleerd dienen te
worden.

## Website

De website kan alleen worden uitgerold op een Linux of iOS-systeem. Dit komt omdat voor de
installatie gebruik wordt gemaakt van Docker. Dit is niet beschikbaar voor Windows. In de map met
de broncode zit een map `src/init`. In deze map zitten diverse scripts en configuratiebestanden
voor het opzetten van de website. Bij de verdere instructies in deze paragraaf wordt deze map als
startpunt gebruikt voor nagivatie en andere acties.

Installeer [Docker][docker].

Voer het `project.sh` uit met parameter `start`. 

```bash
$ ./project.sh start
```

Dit script installeert [Fig][fig] en start het vervolgens. Fig bouwt twee _Docker images_. De
eerste image bevat de de omgeving voor de applicatie, hieronder valt [HHVM][hhvm]. De tweede image
bevat een installatie van MySQL.

Nadat de images zijn gedownload/opgezet moeten alle PHP-afhankelijkheden worden gedownload.
Daarnaast moet de database worden klaargemaakt. Voer het volgende commando uit om dit te laten
gebeuren:

```bash
$ docker exec -it thema42_web_1 /var/tools/update.sh
```

Start de containers. Hiermee wordt ook de website gestart. Op Linux kan dit met het volgende
commando:

```bash
$ docker inspect --format '{{ .NetworkSettings.IPAddress }}' thema42_web_1
```

Voor Mac of Windows geldt een ander commando:

```bash
$ open http://$(boot2docker_ip)
```

De webserver, HHVM en de applicatiecode schrijven logregels weg naar de map
`../web/app/storage/logs/`. Deze logbestanden zijn nuttig tijdens het oplossen van problemen.

Voer `./project.sh stop` uit om de containers en daarmee de website te stoppen.

## Applicatie

Het installatiebestand van de applicatie is geschikt voor Android en is te vinden op '../app/build/wobbe\_2000.apk'.

De applicatie kan ook handmatig worden gebuild en geïstalleerd. Dit kan alleen met Linux. Op OSX is
het erg lastig om de USB-poorten te benaderen vanuit de Docker container. Hierdoor kan de
applicatie niet automatisch worden geïnstalleerd op een telefoon. Ga hiervoor naar `app/` (in de
`init/` map) en bouw de image met docker:

```bash
$ docker build -t="thema42_app" .
```

De image bevat onder andere de Android SDK en andere software om de applicate te builden. Verbind
een Android-tefeloon door middel van een USB-kabel met de host. Voer het script `run.sh` uit om het
buildproces te starten.

De applicatie kan gedebugged worden door `adb logcat` in de console van de container te starten.

```bash
$ run.sh bash
root@411b4c5d7904:/data# abd logcat
```

[docker]: https://www.docker.com/
[fig]: http://www.fig.sh/
[hhvm]: http://hhvm.com/

