# Module 3 - Bundle Your App into an Image

#### A note about the semantic formatting in this tutorial:

- [ ] Check boxes are steps that need to be completed.

Text that looks `like this --for --example` are commands that you should type into your terminal. Or else.

---
>Asides: Side notes to ponder while staring off into the distance.

---

**Bold text: Gotchas that are gonna getcha if you don't heed this advice**

**Click on an image if you need a larger view**

## With that out of the way, let's get started!


- [ ] If you have not already cloned this repo onto your computer, do so now. You will be making use of files in this repo during this module

- [ ] `cd` into the repo and then `cd` into the directory '/3-Bundle_Your_App_Into_An_Image'

---
>If you haven't already guessed - this repo comes with a little app that we're going to containerize with Docker. The app uses node.js and express to create a server that assigns itself a random number and then serves that random number to whoever asks for it.
>
>*You don't have to,* but if you want to see this app in action before you containerize it, you will have to have node and npm installed on your machine. From inside the '/3-Bundle_Your_App_Into_An_Image' directory, run `npm install` and then `npm start`.
>
>Visiting `localhost:3000` in your browser will serve the message:
```sh
Hello! This server's random number is: <randomNumber>
```
>
>Notice that even if you keep refreshing the page, it will continue to serve the same random number. The number is assigned when the server is started up and it persists as long as it is running. Restarting the app, however, will cause it to reassign and serve a different random number. This feature of our app will be important for demonstration purposes.

---

The concept of building an image with your app bundled into it is similar to the process of making a sandwich (yes, I'm using this analogy again - I warned you). 

If you want to build a sandwich you would use a recipe, right? Because a sandwich is built in several layers, a recipe might instruct you to lay the base layer of bread down, then a layer of mayonnaise, then a layer of pickles, then a layer lettuce, and so on and so forth. This is equivalent to how a Docker image is built - only the recipe Docker uses is called a 'Dockerfile' and the layers are changes to the filesystem rather than condiments and toppings.

"A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. Using `docker build`, users can create an automated build that executes several command-line instructions in succession." -- Docker Docs

So, if you were to build a bare bones image, your recipe (Dockerfile) would tell you to lay down the necessary ingredients (system layers) so the sandwich would have the functionality that you need. For example, to build an image from scratch that could be spun into a container that runs node.js;  instead of building layers of Bread -> Mayo -> Pickles -> Onions -> Bananas to create an image, the recipe would instruct you to build layers like:  Build from Ubuntu image -> Update Ubuntu -> Install Node -> Add Working Directory -> Copy app into Working Directory -> Install Dependencies

---

Let's get a little more familiar with layers. The images that we have used thus far were built from layers, but you didn't write the recipe (Dockerfile) for the sandwich (image), so you don't really know what the image is made of. But that's okay - this process abstracts away a lot of the complexity needed to build useful containers. You can, however get a feel for how many layers were abstracted away from you in a particular image when downloading one.

- [ ] Try this exercise: run the command `docker pull node:latest`

You will see that, in the process of pulling the node image down from Dockerhub, it lists out all the images that image is built from as it downloads

![dockerpull](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/3/dockerpull.png?raw=true)

- [ ] When the image is successfully cached on your machine, run the command `docker history node:latest` This command is used in conjunction with an image name and shows the build history of the image; you can look at the 'CREATED BY' column to see the actual ingredient in each layer of the sandwich (stated more technically - you can see the command that added each layer to the image)

![dockerhist](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/3/dockerhist.png?raw=true)

I promise I'm almost done with the sandwich metaphors.

**Images built from images build from images...**

Sounds like a pattern we can use to our advantage. Say there is a really tasty VEGAN sandwich that you can pick up from the store. It has all these exotic ingredients that you don't know how to pronounce, but one thing you know for sure is that it would taste even better with a hearty layer of sliced turkey. Yum.

You COULD scour your local health food stores to find all those exotic ingredients so you can build this sandwich from scratch. But why would you want to do that when you can just pick up that already assembled sandwich from the store and slap some turkey on it?

That is how we're going to approach bundling our app into an image. We're going to create a Dockerfile 'recipe' that uses a 'premade sandwich' image as the base ingredient and slap on our own custom ingredient (our app). Then we build from that Dockerfile and our containerized app image is ready to go! This is much easier than building that fancy sandwich from scratch! **(Then from here, that image with our app inside can then be spun into a container to be actually used)**

The base image our Dockerfile recipe will use to build our custom image is going to be the 'node:latest' image that we just pulled down from Dockerhub. Built into this image is everything we need to run a node app. Sounds tasty, so let's add it to our Dockerfile. 

- [ ] Open up the Dockerfile in Module 3's directory and under the comment '# What image do you want to start building on?' type `FROM node:latest`

- [ ] Under the comment '# Make a folder in your image where your app's source code can live'  type `RUN mkdir -p /src/app`

>`mkdir` : Creates a directory
>
>` -p` : make all the necessary parent folders automatically
>
>`/src/app` : The path of the directory you are creating

- [ ] Under the comment '# Tell your container where your app's source code will live' type `WORKDIR /src/app`

>As the comment implies, this command tells your container which directory is the working directory

- [ ] Under the comment '# What source code do you what to copy, and where to put it?' type `COPY . /src/app`

>`COPY` takes two arguments (It's a little hard to tell, but ` . ` and `/src/app` are separated by a space)
>
>The first argument (the ` . `) says where to copy the app's source code from. In this case ` . ` is a relative path that points to the directory the Dockerfile is currently in.
>
>`/src/app` is the second argument and in this case refers to the directory inside of the image that we just made a few commands ago - the working directory where we want the app's source code to live and where the source code is going to be copied to.

- [ ] Under the comment '# Does your app have any dependencies that should be installed?' type `RUN yarn install`.

>This installs all the dependencies necessary to run our node application using the yarn package manager (which was included as part of the base image, conveniently enough). You might have noticed the .dockerignore file in this repo; I won't get in depth into what it does in this guide - you can research it if you're curious. But a quick explanation of it's purpose is that it prevents any previously installed node modules in the directory from being copied into the image. This guarantees all dependencies come from the `RUN yarn install` command rather than inadvertently copied from elsewhere. 

- [ ] Under the comment '# What port will the container talk to the outside world with once created?' type `EXPOSE 3000`

>This command will expose the container's port 3000 which will need to be mapped to a port on the host when spun into a container by using the ` -p` option with the `docker run` command

- [ ] Under the comment '# How do you start your app?' type `CMD [ "npm", "start" ]`

> This command tells the image to run the command `npm start` from inside the container once it is created, which will start our application inside the newly spun-up container

- [ ] Great! Those are all the steps we need to build an image with our app inside and ready to run once spun into a container. Check to make sure your Dockerfile looks like so:

```sh
# What image do you want to start building on?
FROM node:latest

# Make a folder in your image where your app's source code can live
RUN mkdir -p /src/app

# Tell your container where your app's source code will live
WORKDIR /src/app

# What source code do you want to copy, and where to put it?
COPY . /src/app

# Does your app have any dependencies that should be installed?
RUN yarn install

# What port will the container talk to the outside world with once created?
EXPOSE 3000

# How do you start your app?
CMD [ "npm", "start" ]

```

- [ ] Once everything checks out, it's time to finally build this thing. Run the command `docker build -t nodeserver .`

**The ` . ` in the `docker build` command is a relative filepath that refers to the location of the Dockerfile you want to build. As such, MAKE SURE you are cd'd into the directory with said Dockerfile before running this command.**

After some logging to the terminal, you should see a message similar to this:

```sh
Successfully built 7e69d61fd488
```

- [ ] Congrats! You've built an image with our application inside it! Before we play with this image, let's break down the command we used to build the image:

```sh
docker build -t nodeserver .
```

`docker build` : This is a new one, but it takes in a Dockerfile and creates an image from the steps detailed therein

` -t` : The 't' stands for tag. What name do you want to tag onto this image to identify it later? In this case we tagged it with the name 'nodeserver'

`nodeserver` : The name we tagged the image with

` . ` : The relative path to the Dockerfile that we want to build into an image

- [ ] You can see that our nodeserver image is chillin' safe and sound on our machine by running `docker images`

![dockerimage](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/3/dockerimage.png?raw=true)

---
>If you had not already cached the 'node:latest' image, it would have pulled it from Dockerhub during the image building phase

---

- [ ] Your image has been assembled and saved on your machine just like your perfect sandwich stored in the fridge - now let's start creating containers from it! Run `docker run -d -p 1000:3000 --name slytherin_rulez --rm nodeserver`

- [ ] Check that it is running with `docker ps` and then visit `localhost:1000` in your browser

You'll see that our server is sending us a greeting along with a random number it was assigned when it was spun up.

- [ ] Containers are stateless; they retain information about themselves only as long as they are running. For example: try refreshing the page - it has no effect on the number. Now, back in the terminal, run `docker restart slytherin_rulez`

- [ ] Go back to the browser and refresh the page. The number changed! What?? Because containers are stateless, restarting it caused everything within it to be lost.

- [ ] And just for fun; make like, 3 more containers from our server image, each on a different port

On port 2000:
```sh
docker run -d -p 2000:3000 --rm nodeserver
```

On port 3000:
```sh
docker run -d -p 3000:3000 --rm nodeserver
```

On port 4000:
```sh
docker run -d -p 4000:3000 --rm nodeserver
```

- [ ] Open them all up on different tabs in your browser! They're all unique and independent containers serving you information! NEAT!

**Not only can you spin up as many containers as you want from the single image we made with our app (which is crazy cool and great for horizontally scaling), but all the containers are unique and don't interact with each other; the containers are identical, unique, and isolated at the same time!**

- [ ] Lastly, clean up after yourself. If you created all of the containers with the ` --rm` flag you just need to stop all the running containers with `docker stop <container-name>` and they will automatically delete themselves.

---
>Final Notes: Different base layer images have different instructions when used in Dockerfiles and require different configuration steps. For example, some images already have a working directory that you need to copy your source code into.
>
>I strongly encourage you to check out [Dockerhub](https://hub.docker.com/explore/) to marvel at the cornucopia of images to choose from. Its best to look at the official releases of any image, but find one and look at the instructions for configuring it’s environment with a Dockerfile. For example, in the official [golang image](https://hub.docker.com/_/golang/). When using the `golang:onbuild` image, almost all the commands are triggered automatically so the Dockerfile that you would have to write to bundle your app with this image would be a total of one line! ...Witchcraft.
>
>Also, we used the ':latest' version of the node image; why might this be a bad idea, do you think? 

---

- [ ] That's it! Great job powering through this module! To dive in even deeper, head on over to [Module 4](https://github.com/dylanlrrb/Please-Contain-Yourself/tree/master/4-Containerized_Development_With_Volumes) - Containerized Development with Volumes

---
#### Things we've learned:

- How to bundle an app into a pre-existing image
- What a Dockerfile is
- Several  Dockerfile commands
- Containers are stateless
- `docker pull    <image-name> : <version>`
- `docker history <image-name>`
- `docker build   <image-name>`
- ` -t` option
- `docker restart <container-name>`

---
#### Resources:

- [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
- [Dockerhub](https://hub.docker.com/)
- [Official node image on Dockerhub](https://hub.docker.com/_/node/) 
