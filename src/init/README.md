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

