# Project init

This README decribes the process of setting up the project environment. All given paths are relative to the repositories root directory, unless stated otherwise.

## Web

1. Make sure you have [Docker][1] (also [boot2docker][2] on OS X) and [Fig][3] installed.
2. Navigate to the `src/init/` folder.
2. Run `./project.sh start` to (build and) start the project.
3. When running for the first time, also run `docker exec -it thema42_web_1 /var/tools/update.sh` to set up the web environment. This will download all Laravel dependencies (with [Composer][4]) and run the database migrations.
4. Done! Navigate to the container IP address to view the website.

    - On Mac/Windows: `boot2docker ip`
    - On Linux: `docker inspect --format '{{ .NetworkSettings.IPAddress }}' thema42_web_1`

Additionally (from the `src/init/` folder):

- When you are finished with development, run `./project.sh stop` to shut it all down.
- Run `./project.sh clean` to stop and destroy the images and containers.
- Run `./project.sh ps` to see the status of the containers.
- Use `./project.sh ssh` to get terminal access to the web container.

More information about the (standardized) Laravel project structure can be found [here][5]. The API controllers, which are central to the application (and functioning of the mobile app), can be found in the `src/www/app/controllers/Api/` folder.

## App

Building the entire app can be done by using the app container. [Cordova][6] and the [Android SDK][7] are installed inside this container. The
container has been configured to build the app and push it to your phone.

1. Build the image with `$ docker build -t="thema42_app" src/app/`.
2. Now you can start the container by executing `$ app/tools/run.sh` from the `src/init/` directory.

	- By default the build process for the app will be run.
	- You can start a different process by adding options.
	- Use `$ app/tools/run.sh bash` to get terminal access to the app container.

More information about the (standardized) Cordova project structure can be found [here][8]. Cordova will build an app that presents `src/app/www/index.html` through a [WebView][9]. This WebView will have all assets available from the `src/app/www/` folder, which is where the main logic for the app can be found (in the `.js` files).

[1]: https://www.docker.com/
[2]: http://boot2docker.io/
[3]: http://www.fig.sh/
[4]: https://getcomposer.org/
[5]: https://coderabbi.github.io/posts/an-expanded-laravel-project-structure-overview/
[6]: http://cordova.apache.org/
[7]: http://developer.android.com/sdk/index.html
[8]: http://www.informit.com/articles/article.aspx?p=2164583&seqNum=2
[9]: http://developer.android.com/reference/android/webkit/WebView.html

