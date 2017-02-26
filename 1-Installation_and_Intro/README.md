# Module 1 - Installation and Introduction

#### A note about the symantec formanting in this tutorial:

Text that looks `like this --for --example` are commands that you should type into your terminal. Or else.

---
>Asides: Side notes to ponder while staring off into the distance.

---

**Bold text: Gotchas that are gonna getcha if you don't heed this advice**

## With that out of the way, lets get started!


First things first, lets install Docker:

- [ ] Go to [Docker's website](https://www.docker.com/products/docker) and download the version that's appropriare for your operating system

- [ ] After you've dragged Docker into your Applications, find Docker in your applications and click it to complete the installation

- [ ] Check to make sure everything worked correctly. Open up the terminal and type `docker --version`

You should see something like:
```sh
Docker version 1.13.0, build 49bf474
```
as long as its NOT:
```sh
-bash: Docker: command not found
```
if it looks like that then something went wrong with the download or installation. Oops.

- [ ] Nice! Let's run your first Docker command! in the terminal type `docker info`

You should see something like this: 
![dockerinfo](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/1/dockerinfo.png?raw=true)

"This command displays system wide information regarding the Docker installation. Information displayed includes the kernel version, number of containers and images, and memory allocated to running containers. The number of images shown is the number of unique images. The same image tagged under different names is counted only once." -- Docker Docs

This should make a little more sense as we go along- we'll be revisitig this command to see how our actions affect this report.

- [ ] Now we're going to actually use Docker to spin up our first container. Hold onto your butt. Type:

`docker run hello-world`

At first, you will se a disheartenning message: 
```sh
Unable to find image 'hello-world:latest' locally
```
**Wait just a second an you will see something along the lines of this:**
```sh
latest: Pulling from library/hello-world
78445dd45222: Pull complete 
Digest: sha256:c5515758d4c5e1e838e9cd307f6c6a0d620b5e07e6f927b07d05f6d12a1ac8d7
Status: Downloaded newer image for hello-world:latest
```
---
>Let me explain whats going on here - when you type the 'docker run' command it expects the next parameter to be the name of an image that is cached (saved) locally on your machine (we'll get into what an image is in just a little bit). IF it can't find an image with that name on your machine it looks to Dockerhub for an image with that name and downloads it to your machine so that it can spin up a container from that image. (We'll also get into Dockerhub later, but the gist is that is is a registry where people upload images for everyone to use)

---

- [ ] Check to make sure that your hello-world container loged this to the console: 
![dockerhello](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/1/dockerhello.png?raw=true)



