# Installatie
Wobbe 2000 bestaat uit twee compononten, een website en een app voor mobiele telefoon. Dit
hoofdstuk beschrijft op welke wijze deze twee componenten geïnstalleerd dienen te worden.

## Website

De website kan alleen worden uitgerold op een Linux of iOS-systeem.  De broncode bevat een map
`src/init`. In deze map zitten diverse scripts en configuratiebestanden voor het opzetten van de
website. Bij de verdere instructies in deze paragraaf wordt er vanuit gegaan men in deze map zit. 

Installeer [Docker][docker].
Voer het script `project.sh start` start uit. Dit script installeert [fig][fig] en start vervolgens
fig.  Fig bouwt twee images. De eerste image bevat de de omgeving voor de applicatie, hieronder
valt [HHVM][hhvm]. De tweede image bevat een installatie van MySQL.

Nadat de images gedownload zijn moeten alle PHP-onderdelen gedownload worden waar de applicatie van
af hangt. Daarnaast moet de database klaargemaakt worden. Voor het volgende commando uit om dit te
laten gebeuren:

    $ docker exec -it thema42_web_1 /var/tools/update.sh

Start de containers. Hiermee wordt ook de website gestart. Op Linux kan dit met het volgende
commando:

    $ docker inspect --format '{{ .NetworkSettings.IPAddress }}' thema42_web_1

Voor Mac of Windows geldt een ander commando:
    
    $ open http://$(boot2docker_ip)

De webserver, HHVM en de applicatiecode schrijven logregels weg naar de map
`/src/web/app/storage/logs/`.  Let op, dit pad begint vanuit de projectroot.  Deze logbestanden
zijn nuttig tijdens het oplossen van problemen. 

Voer `./project.sh stop` uit om de containers en daarmee de website te stoppen.

## Applicatie

Het installatiebestand van applicatie is geschikt voor Android is te vinden op
'/src/app/build/wobbe\_2000.apk`. 

De applicatie kan ook handmatig gebuild en geïstalleerd worden. Dit kan alleen met Linux. Ga
hiervoor naar `/src/init/app` en bouw de image met docker:

    $ docker build -t="thema42_app" .
    
De image bevat onder andere de Android SDK en andere software om de applicate te builden. Verbind
een Android-tefeloon door middel van een USB-kabel met de host. Voor het script `run.sh` uit 
om het buildproces te starten.

De applicatie kan gedebugged worden door `adb logcat` in de console van de container te starten.

    $ run.sh bash
    root@411b4c5d7904:/data# abd logcat 

[docker]: https://www.docker.com/
[fig]: http://www.fig.sh/
[hhvm]: http://hhvm.com/
