# Project init

## Web

1. Make sure you have docker and fig installed.
2. Run `./project.sh start` to (build and) start the project.
3. When running for the first time, also run: `docker exec -it thema42_web_1 /var/tools/update.sh`.
4. Done! Navigate to the container IP to view the website.

    - On Mac/Windows: `open http://$(boot2docker ip)`
    - On Linux: `docker inspect --format '{{ .NetworkSettings.IPAddress }}' thema42_web_1`

When finished, run `./project.sh stop` to shut it al down. Additionally run `./project.sh clean` to stop and destroy the images and containers.

Run `./project.sh ps` to see the status of the containers.

## App

Cordova and the Android SDK are installed inside de app container. The
container has been configured to build the app and push it to your phone.

1. Build the image with `$ docker build -t="thema42_app app/`
2. You can start the container by executing `$ tools/run.sh`. By default the
   build proces for the app is started. You can start a different process by
   adding options: `$ tools/run.sh /bin/bash`.
