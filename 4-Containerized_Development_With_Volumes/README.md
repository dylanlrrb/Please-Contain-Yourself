# Module 4 - Containerized Development With Volumes

#### A note about the symantec formatting in this tutorial:

- [ ] Check boxes are steps that need to be completed.

Text that looks `like this --for --example` are commands that you should type into your terminal. Or else.

---
>Asides: Side notes to ponder while staring off into the distance.

---

**Bold text: Gotchas that are gonna getcha if you don't heed this advice**

**Click on an image if you need a larger view**

## With that out of the way, let's get started!


- [ ] Using the `cd` command in your terminal, navigate to the '/4-Containerized_Development_With_Containers' directory

---
>Feel free to check out the app that we'll be devoloping in our containerized envirinment. Like in the previous Module, it is also a server. Rather than serving a random number, however, it will serve a webpage with the background color defined by the string on line 12 of 'index.js'
>
>Open up the Dockerfile and notice that two things have changed from the last Dockerfile we worked with
>
>First, the `EXPOSE 8080` command; containers built from this image will expose port 8080 rather than 3000 like last time
>
>Second, we are building our image off of a different version of the official node image. Rather than `:latest`, we are using `:7.6-alpine`.
>
>"This image is based on the popular Alpine Linux project, available in the alpine official image. Alpine Linux is much smaller than most distribution base images (~5MB), and thus leads to much slimmer images in general. This variant is highly recommended when final image size being as small as possible is desired." -- [Offical node image on Dokerhub](https://hub.docker.com/_/node/)
>
>I posed the question at the end of the last module, "Why might it be a bad idea to use the `:latest` version of an image?". The awnwer to that is because a big part of what makes containers great is thier consistency - they run the same everywhere. If we build two images at different points in time and the `:latest` base image version is different between builds, this has the potential to introduce varience in containers that we would otherwise expect to be identical. 
>
>The `:7.6-alpine` version will always points to a node image that is built with node version 7.6; because knowing is better than not knowing.

---

- [ ] Bundle our app into an image tagged with the name 'colorserver' by running `docker biuld -t colorserver .`

**Docker will pull the 'node:7.6-alpine' image down from Dockerhub in order to complete the build. Notice how much faster the pull went compared to 'node:latest'. This is due to the 'alpine' version being so slim**

- [ ] Spin up a new container based on the 'colorserver' image you just built, mapping it to port 8080 on the host. Run `docker -d -p 8080:8080 colorserver`

- [ ] Open up your browser and visit `locahost:8080`. Notice that the color of the webpage is 'SteelBlue'.

- [ ] Now, pretend you are in a development environmet and want to quickly test out several different colors to see which one looks best. Open up 'index.js' and change the color on line 12 from `'SteelBlue'` to the string `'SpringGreen'`

- [ ] Refresh the webpage in your browser. Just as you expect the webpage to present you with a calming pastel shade of green, your heart sinks as your eyes are assulted with same cold, hard shade of steel blue.

**This will never do; it would seem that if you want to use containers in your development, every time you make a change to the code you have to take the following steps: Change the code -> Build an image with your code -> Stop and remove the old container -> Remove the old image -> Spin up a container from the new image -> See if you like the change**

Obviously, if you had to do all this, no one would ever use Docker for Development.

**Enter Volumes...**

---
>"Docker volumes are free-floating filesystems. They don't have to be connected to a particular container. "  -- Docker Docs
>
>A simple explaination of volumes is that it is a way for a containers to interact with the host's filesystem. This is useful in several situations; persisting data that you don't want lost if the container were to stop unexpectedly, as a communication method between otherwise isolated containers, and (as in our case) having our container reference rapidly changing source code on our host.

---

- [ ] We can take our already-built colorserver image and use the ` -v` option to mount a volume. The ` -v` option expects two arguments after it; first, the path to the directory you want the spun-up container to look at, and second, the path to the directory in the container where you want those filechances to be reflected (separated by a colon)

- [ ] Reading that, you might think that running the command `docker run -d -p 1000:8080 -v ./:/src/app colorserver` would work, right? It seemed to work okay for the `COPY` command inside the Dockerfile! But you get the following message: 

```sh
$ docker run -d -p 1000:8080 -v ./:/src/app colorserver
docker: Error response from daemon: create ./: "./" includes invalid characters for a local volume name, only "[a-zA-Z0-9][a-zA-Z0-9_.-]" are allowed. If you intented to pass a host directory, use absolute path.
See 'docker run --help'.
```
**As the error mssage implies, the first argument of the ` -v` option needs to be an absolute path to the directory in question**

- [ ] How do you find the absolute path? Well do I have good news for you! As long as you are cd'd into the directory that you want the absolute path to (in this case the directory with tha app's source code), just run the command `pwd`

`pwd` stands for 'print working directory' and it does just that. Mine looks like:

```sh
/Users/Dylan/Desktop/Please-Contain-Yourself/4-Containerized_Development_With_Volumes/
```

How about yours??

- [ ] With that tidbit of inforamtion in hand we can mount a volume succesfully. Spin up a detached container based on the 'colorserver' image, that is named 'psycic_container', that is mapped to port 1000 on the host, with a volume mounted in the directory with the application's source code.

Thats a monster of a command, mine will look like this:

```sh
docker run -d -p 1000:8080 -v /Users/Dylan/Desktop/Please-Contain-Yourself/4-Containerized_Development_With_Volumes/:/src/app --name psycic_container colorserver
```

**Again, yours will look diferent depending on the path you got from `pwd`***

- [ ] In your browser, go to `localhost:1000` in a new tab. You should notice something odd... the page is the color 'SpringGreen'!

- [ ] Test to make sure that updating the application's source code updates the code running in the container by changing the color variable in 'index.js' to the string 'red'

- [ ] Make sure you save the file and then Refresh the `localhost:1000` page. 

- [ ] The page is now RED! GET PUMPED!!

- [ ] Do this however many times you fancy. check out this [web color](https://www.w3schools.com/cssref/css_colors.asp) resource and go wild.

---
> This idea that containers change might conflict with an idea that was previously established that our containers preserve their state as long as they are running. In the previous module, the random number that was assigned our app only changed when we restarted the container. We do not have to restart our container in this case because our application is configured to restart just our server (not the container) when it detects changes in its source code. The tool used to do this is called 'nodemon' and is very useful in development wether or not you use containers. It saves developers the hassle of manually restarting their application to see the changes they just made. You can check out [the nodemon docs here](https://www.npmjs.com/package/nodemon).

---

**Now, I have to admit, typing up that massive filepath when defining were to mount the volume was a PAIN.** Luckilly, there is an easier way! You can use `$(pwd)` in the argument list to ` -v` when running a container and `$(pwd)` will evaluate to the current working directory! No more typing that monster `docker run` command!

-[ ] Let's practice. I want you to use `$(pwd)` to spin up a detached container based on the 'colorserver' image, that is named 'psycic_container2', that is mapped to port 2000 on the host, with a volume mounted in the directory with the application's source code.

Such a command should look like:

```sh
docker run -d -p 2000:8080 -v $(pwd):/src/app --name psycic_container2 colorserver
```
I like the length of that a lot better!

- [ ] In a new tab in your browser, go to `localhost:2000`, miraculusly the page will be red, just like server running on 'localhost:1000`. 

- [ ] This makes sense because they are both using application code from volumes mounted in the same directory. Change the color variable in 'index.js' one final time. 

- [ ] Save the file. Check out the page served by 'psycic_container' and 'psycic_container2'. They should both reflect the new color.

- [ ] Take a final peek at the container run without a volume on `localhost:8080`. It should still be steel blue.

---
>The ability to set up a development environment this easily is immensly useful and powerful. Not only is it fast and easy, but you don't have to install or configure a single dependency on your machine to get started. This means you can immediatly get started working on a codebase that might use python, or apache, or postgreSQL even if you are not familiar with these tools, and might take hours or days setting them up on your machine. 
>
>Imagine the time and hassle you could save the next person to work on your codebase if you just include a DOckerfile with the project! All that person needs to do is build an image from that Dockerfile - then that image can be spun into a container with a development environment identical to the one you used, no suprises!

---




One additional docker command that I want to touch on in this Module is `docker logs`. When containers are detached and running in the background, if it logs something inside the container, you can't see it. `docker logs <container-name>` reveals everything that has been logged inside the container so far.

- [ ] Try it out, run `docker logs psycic_container`. you will see the message:

```sh
[nodemon] restarting due to changes...
[nodemon] starting `node index index.js`
listening on port 8080...
```
-logged for every time the app's source code was change and the server restarted. NEAT!

---
>Finalnotes befor wrapping up: this process is only sutible for development, once you are happy with the container that is spun up with your application's modified source code, you will need to build a new image that bundles the final version of your source code into said image. For example, say you finally settled on the color purple for the background. cYou need to change it to 'purple' in your scource code and run `docker build -t final_colorserver .` or something of the like. THAT image is now ready for production.

---

- [ ] An with that, Module 4 is complete. Don't forget to clean up your running containers, you crazy kids!

- [ ] When you're ready... the next module awaitsssss... -> [Module 5](https://github.com/dylanlrrb/Please-Contain-Yourself/tree/master/5-Make_Multiple_Containers_Work_Together) - Make Multiple Containers Work Together



---
####Things we've learned:

- What volumes are
- How to mount a volume when running a container
- ` -v` option
- `pwd`
- `$(pwd)`
- `docker logs <container-name>`
