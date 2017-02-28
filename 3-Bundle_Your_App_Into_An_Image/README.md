# Module 3 - Bundle Your App into an Image

#### A note about the symantec formatting in this tutorial:

- [ ] Check boxes are steps that need to be completed.

Text that looks `like this --for --example` are commands that you should type into your terminal. Or else.

---
>Asides: Side notes to ponder while staring off into the distance.

---

**Bold text: Gotchas that are gonna getcha if you don't heed this advice**

**Click on an image if you need a larger view**

## With that out of the way, let's get started!


- [ ] If You have not already cloned this repo onto your computer, do so now. You will be making use of files in the repo during this module

- [ ] `cd` into the repo and then `cd` into the directory '/3-Bundle_Your_App_Into_An_Image'

---
>If you havent already guessed this repo comes with a little app that we're going to containerize with Docker. The app uses node.js and express to create a server that assigns itself a random number and then serves that random number to whoever asks for it.
>
>*You don't have to,* but if you want to see this app in action before you containerize it, you will have to have node and npm installed on your machine. From inside the '/3-Bundle_Your_App_Into_An_Image' directory, run `npm install` and then `npm start`.
>
>Visiting `localhost:3000` in your browser will serve the message:
```sh
Hello! This server's random number is: <randomNumber>
```
>
>Notice that even if you keep refreshing the page, it will continue to serve the same random number. The number is assigned when the server is started up and it persists as long as it is running. Restarting the app, hoverver, will cause it to reassign and serve a different random number. This feature of our app is important for demonstration purpuses.

---

The concept of bundling an image with your app bundled into it is similar to the process of making a sandwich (yes, Im using this analogy again - I warned you). 

If you want to build a sandwich you would use a recipie, right? Because a sadwich is built in several layers, A recipie might instruct you to lay the base layer of bread down, then a layer of mayonaise, then a layer of pickles, then a layer lettuce, and so on and so forth. This is eqivilant to how a docker image is built, only the recipie Docker uses is called a 'Dockerfile' and the layers are changes to the filesystem rather than condiments and toppings.

"A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. Using docker build users can create an automated build that executes several command-line instructions in succession." -- Docker Docs

So, if you were to build a bare bones image, your recipie (Dockerfile) would tell you to lay down the neccisary ingredients (system layers) so the sandwich would have the functionality that you need. For example, to build an image form scratch that could be spun into a container that runs node;  instead of building layers of Bread -> Mayo -> Pickles -> Onions -> Bananas, to create an image, the recipie would instruct you to build layers like:  Build from Ubuntu image -> Update Ubuntu -> Install Node -> Add Working Directory -> Copy app into Working Directory -> Install Dependencies

---

Let's get a little more familiar with layers. The images that we have used thus far were build from layers, but you didn't write the recipe (Dockerfile) for the sandwich (image), so you dont really know what the image is made of. But thats okay - this process abstracts away a lot of the complexity needed to build useful containers. You can, however get a feel for how many layers were abstracted away from you in a particular image when downloading one.

- [ ] Try this excersise: run the command `docker pull node:latest`

You will see that, in the process of pulling the node image down from Dockerhub, it lists out all the images that image is built from as it downloads

![dockerpull](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/3/dockerpull.png?raw=true)

- [ ] When the image is successfully cached on your machine, run the command `docker history node:latest` This command is used in conjunction with an image name and shows the build history of the image; you can look at the 'CREATED BY' column to see the the actual ingredient in each layer of the sandwich (stated more technically - you can see the command that added each layer to the image)

![dockerhist](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/3/dockerhist.png?raw=true)

I promise I'm almost done with the sandwich metaphores.

**Images built from images build from images...**

Sounds like a pattern we can use to our advantage. Say there is a really tasty VEGAN sandwich that you can pick up from the store. It has all these exotic ingredients that you dont know how to pronounce, but one thing you know for sure is that it would taste even better with a hearty layer of sliced turkey. Yum.

You COULD scour all your local health food stores to find all those exotic ingredients so you can build this sandwich from scratch. But why would you want to do that when you can just pick up that already assembled sandwich from the store and slap some turkey on it?

That is how were going to approach bundling our app into an image. We're going to create a Dockerfile 'recipie' that uses a 'premade sandwich' image as the base ingredient and slap on our own custom ingredient (our app). Then we build from that Dockerfile and our containerized app is ready to go! This is much eaisier than building that fancy sandwich from scratch!

The base image our Dockerfile recipie will use to build our custom image is going to be the 'node:latest' image that we just pulled down from Dockerhub. Built into this image is everything we need to run a node app - sounds tasty, so let's add it to our Dockerfile. 

- [ ] Open up the Dockerfile Module 3's directory and under the comment '# What image do you want to start building on?' type `FROM node:latest`

- [ ] Under the comment '# Make a folder in your image where your app's source code can live' type `RUN mkdir -p /src/app`

>`mkdir` : Creates a directory
>
>` -p` : make all the neccisary parent folders
>
>`/src/app` : The path of the directory you are creating

- [ ] Under the comment '# Tell your container where your app's source code will live' type `WORKDIR /src/app`

As the comment implies, this command tells your container which directory is the working directory

- [ ] Under the comment '# What source code do you what to copy, and where to put it?' type `COPY . /src/app`

>`COPY` takes two arguments; 
>
>The first (the ` . `) says where to copy the app's source code from. In this case ` . ` is a relitive path that points to the directory the Dockerfile is currently in.
>
>`/src/app` is the second argument and in this case refers to the directory inside of the image that we just made a few commands ago, the working directory where we want the app's source code to live.

- [ ] 

will the --rm flag get rid of it when restarting?

build it and check it out, make sure you are cd'd into the correct directory, part of the build command is a relitive path to the dockerfile you want to build

ASIDE: if you had not already cached the node:latest image, it would have pulled it from dockerhub during the image building phase

your image has been assembled just like your perfect sandwich now lets start creating containers from it

spin one up, see it in ps, then the browser, explain how the app is now in an image and why thats great

show that refreshing the page has no effect on the number 

restart the container and refresh it in the browser, note the number changed and talk about state

make a bunch of them, check in the browser and show they al have different numbers. 

talk about why this is cool. not only can you name as many containers from our app's image that you want which is great for horizontally scaling, they are all unique and don't interact with each other, both identical and unique at the same time

Final notes: images have different instructions for use in dockerfiles for example some already haave a working directory, chek out dokerhub to marvel at the plethera/ cornacopia of images to choose from. its best to look at the official releases, - look at the instruction in some ___ for example, we used the latest version why might this be a bad idea?

Takeaways:
	How to bundle an app into a container image
	What a Dockerfile is
	Several  Dockerfile commands
	docker pull    <image-name> : <version>
	docker history <image-name>
	docker build   <image-name>
	` -t` flag
	docker restart <container-name>
	docker logs    <container-name>

Resources: 
-link to dokerfile command docs
-link to dockerhub








