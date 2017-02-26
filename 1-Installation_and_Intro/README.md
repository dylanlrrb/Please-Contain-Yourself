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

- [ ] Check to make sure that your hello-world container logged this to the console: 
![dockerhello](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/1/dockerhello.png?raw=true)

- [ ] Congradulations!! If you've made it this far you have just created your first Docker container! Don't believe me? Check out `docker info` again, you should this at the top of the report:
```sh
Dylan ~ $ docker info
Containers: 1
 Running: 0
 Paused: 0
 Stopped: 1
Images: 1
```

---
>Now, before we go any further, let's slow down and talk about 'images' and 'containers' for a bit. These are terms I'll be slinging around a lot so it's in your best interest to have a good mental model of what they are. 
>I'm going to reference my wonderful sandwich analogy that I introduced in [this repo's root README](https://github.com/dylanlrrb/Please-Contain-Yourself./tree/module1#what-is-docker) - so if you're wondering why im talking about Docker in terms of sandwiches, that's why im taking about Docker in terms of sandwiches. 
>Imagine youve made a sandwich. It is the most perfect sandwich you've ever made and you know in the very pit of your soul that you'll never make a more flawless sandwich. So naturally you dont dare eat it - so you quickly stash it in the refridgerator so you can keep your sandwich forever. 
>As time passes you can't help but wonder what your perfect sandwich tastes like. Just as your willpower is about to faulter and you destroy your immaculate creation, you find the solution to your problem advertised on a late-night infomercial- the latest advances in science have yeilded a device that can clone sandwiches, any kind, with perfect fidelity, and with unlimited frequency.
>You immediatly order this miraculus device, and with templing hands, clone your perfect sandwich. you taste it and its everything you expected! And the best part? Your original sandwich is still preserved forever in the refridgerator and you can use it in conjunction with your cloning machine to have the exact same perfect sandwich for breakfast, lunch and dinner for the rest of your life.
>
>Alright, so thats a silly example, but roll with it, like it or not I'll be using it again. In this story the 'perfect sandwich' represents an image. An image is
>The clones of the 'perfect sandwich' image represent containers and are ment to be the functional, working incarnations of the image (in the sandwich case, they are meant to be eaten). You can 'spin up' as many containers form an image as you want without affecting the image at all

---

Like I mentioned before, in the command `docker run hello-world', 'hello-world' is an image that you spun up a new container off of. It is that container which actually ran and logged that message to the console.

- [ ] There were two effects running 'docker run hello-world' the first is that it downloaded 'hello-world' image from Dockerhub onto your machine. Run `docker images` to view the images that are cached on your machine. You should see: 
![dockerimages](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/1/dockerimages.png?raw=true)
