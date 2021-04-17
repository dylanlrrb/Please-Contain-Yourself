# Module 1 - Installation and Introduction

#### A note about the semantic formatting in this tutorial:

- [ ] Check boxes are steps that need to be completed.

Text that looks `like this --for --example` are commands that you should type into your terminal. Or else.

---
>Asides: Side notes to ponder while staring off into the distance.

---

**Bold text: Gotchas that are gonna getcha if you don't heed this advice**

**Click on an image if you need a larger view**

## With that out of the way, let's get started!


First things first, let's install Docker:

- [ ] Go to [Docker's website](https://www.docker.com/products/docker) and download the version that's appropriate for your operating system

- [ ] After you've dragged Docker into your Applications, find Docker in your Applications and click it to complete the installation

- [ ] Check to make sure everything worked correctly. Open up the terminal and type `docker --version`

You should see something like:
```sh
Docker version 1.13.0, build 49bf474
```
as long as it's NOT:
```sh
-bash: Docker: command not found
```
If it looks like that then something went wrong with the download or installation. Oops.

- [ ] Nice! Let's run your first Docker command! In the terminal type `docker info`

You should see something like this: 

![dockerinfo](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/1/dockerinfo.png?raw=true)

>"This command displays system wide information regarding the Docker installation. Information displayed includes the kernel version, number of containers and images, and memory allocated to running containers. The number of images shown is the number of unique images. The same image tagged under different names is counted only once." -- Docker Docs

This should make a little more sense as we go along - we'll be revisiting this command to see how our actions affect this report.

- [ ] Now we're going to actually use Docker to spin up our first container. Hold onto your butt. Type:

`docker run hello-world`

At first, you will see a disheartening message: 
```sh
Unable to find image 'hello-world:latest' locally
```
**Wait just a second and you will see something along the lines of this:**
```sh
latest: Pulling from library/hello-world
78445dd45222: Pull complete 
Digest: sha256:c5515758d4c5e1e838e9cd307f6c6a0d620b5e07e6f927b07d05f6d12a1ac8d7
Status: Downloaded newer image for hello-world:latest
```
---
>Let me explain what's going on here - when you type the `docker run` command, it expects the next argument to be the name of an image that is cached (saved) locally on your machine (we'll get into what an image is in just a little bit). IF it can't find an image with that name on your machine, it looks to Dockerhub for an image with that name and downloads it to your machine so that it can spin up a container from that image. (We'll also get into Dockerhub later, but the gist is that it is a registry where people upload images for everyone to use)

---

- [ ] Check to make sure that your hello-world container logged the following: 

![dockerhello](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/1/dockerhello.png?raw=true)

- [ ] Congratulations!! If you've made it this far you have just created your first Docker container! Don't believe me? Check out `docker info` again, you should see this at the top of the report:
```sh
$ docker info
Containers: 1
 Running: 0
 Paused: 0
 Stopped: 1
Images: 1
```

---
>Now, before we go any further, let's slow down and talk about 'images' and 'containers' for a bit. These are terms I'll be slinging around a lot so it's in your best interest to have a good mental model of what they are and how they relate to each other. 
>
>I'm going to reference my wonderful sandwich analogy that I introduced in [this repo's root README](https://github.com/dylanlrrb/Please-Contain-Yourself./tree/module1#what-is-docker) - so if you're wondering why I'm talking about Docker in terms of sandwiches... that's why I’m talking about Docker in terms of sandwiches. 
>
>Imagine you've made a sandwich. It is the most perfect sandwich you've ever made - and you know in the very pit of your soul that you'll never make a more flawless sandwich. Naturally, you do not dare eat it - so you quickly stash it in the refrigerator so you can keep your sandwich forever. 
>
>As time passes you can't help but wonder what your perfect sandwich tastes like as it sits, still pristine, in the fridge. Just as your willpower is about to falter and you eat your immaculate creation, you find the solution to your problem advertised on a late-night infomercial. The latest advances in science have yielded a device that can clone sandwiches- any kind, with perfect fidelity, and with unlimited frequency.
>
>You immediately order this miraculous device, and with trembling hands, clone your perfect sandwich. You taste it and it's everything you expected! And the best part? Your original sandwich is still preserved forever in the refrigerator and you can use it in conjunction with your cloning machine to have the exact same perfect sandwich for breakfast, lunch and dinner for the rest of your life.
>
>Alright, so that's a silly example, but roll with it. Like it or not I'll be using it again. In this story the 'perfect sandwich' represents an image. "An image is an inert, immutable, file that's essentially a snapshot of a container. Images are created with the `build` command, and they'll produce a container when started with `run`. Images are stored in a Docker registry such as Dockerhub" -- Docker Docs
>
>The clones of the 'perfect sandwich' image represent containers and are meant to be the functional, working incarnations of the image (in the sandwich example, they are meant to be eaten). You can 'spin up' as many containers from an image as you want without affecting the image at all, it's just a template.

---

Like I mentioned before, in the command `docker run hello-world`; 'hello-world' is the name of an image that you spun up a new container with. It is that container which actually ran and logged that message to the console.

- [ ] There were two effects of running 'docker run hello-world'; the first is that it downloaded the 'hello-world' image from Dockerhub onto your machine. Run `docker images` to view the images that are cached on your machine. You should see:

![dockerimages](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/1/dockerimages.png?raw=true)

- [ ] The second effect is that it created and ran a container from that image. Run `docker ps -a` to see all of the containers on your machine. You should see something similar to this:

![dockerpsa1](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/1/dockerpsa1.png?raw=true)

There's your first container! Isn't it handsome? There are several bits of information displayed with the `ps` command such as the image it was created from, how long ago it was spun up, and the container's status.

- [ ] Now let's get a little tricky. Try spinning up 3 more containers from the hello-world image cached on your machine. If you did everything correctly, you should have seen the 'Hello from Docker!' message each time you successfully spun up a container.  

---
>I want to take a moment to explain the difference between using `docker ps` with and without the ` -a` flag.
>
>Try running `docker ps` without the ` -a` flag. It would appear that there are no containers running on your machine.
>
>![dockerempty](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/1/dockerempty.png?raw=true)
>
>That's because technically there are no containers running on your machine. All the hello-world containers on your machine are short lived and are designed to stop running immediately after they are done doing their job (logging a message to the console). That's why the `docker info` report listed all of the containers on our machine as ‘STOPPED’.
>
>The ` -a` flag shows all the containers on your machine, both running and stopped. Run `docker ps -a` and you will see:

>![dockerfull](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/1/dockerfull.png?raw=true)

>But don't you worry, we'll be spinning up a longer lasting container in the next module. Hang tight.

---

Take note that, unless a name is given to the container explicitly, each container is given a random name to identify it. 

![dockernames](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/1/dockernames.png?raw=true)

- [ ] Spin up one more hello-world container and give it a name by using the ` --name` flag like so:

`docker run --name punk_rock_unicorns hello-world`  

Run `docker ps -a` again and you'll see a total of 5 containers, the most recent of which has the charmingly quirky name of 'punk_rock_unicorns'

![dockernames2](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/1/dockernames2.png?raw=true)

---
>As a final note before we wrap up this module; despite the fact that we have created a bunch of containers based off the 'hello-world' image, there is still only one image stored on our machine. Run `docker info` and `docker images` again to check if you don't believe me. 
>
>The original 'perfect sandwich' is still safe and preserved in the refrigerator. It's just waiting to spawn new sandwiches that we're allowed to eat.

---

Nice work creating your first containers! When your're ready move onto [Module2](https://github.com/dylanlrrb/Please-Contain-Yourself/tree/master/2-Long_Lived_Containers) - Long Lived Containers

---
#### Things we've learned:

- What images are
- What containers are
- `docker info`
- `docker images`
- `docker run <image-name>` 
- `docker ps`
- `docker ps -a`
- The ` --name` option
