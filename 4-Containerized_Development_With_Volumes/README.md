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


**This tutorial is a bit shorter compared to the previous two, mainly because you are already well versed in navigating the Docker CLI. However, it covers a application of Docker and containers that is immensly useful and powerful**

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

```
**As the error mssage implies, the first argument of the ` -v` option needs to be an absolute path to the directory in question**

- [ ] 
mine looks like this
yours will look diferent











