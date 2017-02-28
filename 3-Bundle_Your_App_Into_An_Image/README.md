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
>You don't have to, but if you want to see this app in action before you containerize it, you will have to have node and npm installed on your machine. From inside the '/3-Bundle_Your_App_Into_An_Image' directory, run `npm install` and then `npm start`.
>
>Visiting `localhost:3000` in your browser will serve the message:
```sh
Hello! This server's random number is: <randomNumber>
```
>
>Notice that even if you keep refreshing the page, it will continue to serve the same random number. The number is assigned when the server is started up and it persists as long as it is running. Restarting the app, hoverver, will cause it to reassign and serve a different random number. This feature of our app is important for demonstration purpuses.

---

The concept of bundling an image with your app bundled into it is similar to the process of making a sandwich (yes, Im using this analogy again - I warned you). 

If you want to build a sandwich you would use a recipie, right? Because a sadwich is built in several layers, A recipie might instruct you to lay the base layer of bread down, then a layer of mayonaise, then a layer of pickles, then a layer lettuce, and so on and so forth. This eqivilant to how a docker image is built, only the recipie Docker uses is called a 'Dockerfile' and the layers are changes to the filesystem rather than condiments and toppings.

So, if you were to build a bare bones image, your recipie (Dockerfile) would have to lay down the neccisary ingredients (system layers) so it would have the functionality that you need. For example, to build an image form scratch that could be spun into a container that runs node;  instead of building layers of Bread -> Mayo -> Pickles -> Onions -> Bananas, to create an image the recipie would instruct you to build layers of  Build from Ubuntu image -> Update Ubuntu -> Install Node -> Add Working Directory -> Copy app into Working Directory -> Install Dependencies

Let's get a more in depth understanding of layers. The images that we have used thus far are build from layers, but you because you didn't write the recipe (Dockerfile) for the sandwich (image), you dont really know what the image is made of. But thats okay - this process abstracts a lot of the complexity and needed to build useful containers. You can, however get a feel for how many layers were abstracted away from you in a particular image.

- [ ] Try this excersise: run the command `docker pull node:latest`

You will see that, in the process of pulling the node image down from Dockerhub, it lists out all the images that that image is build from as it downloads

![dockerpull](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/3/dockerpull.png?raw=true)

- [ ] When the image is successfully cached on your machine, run the command `docker history node:latest` This command used in conjunction with an image name shows the build history of the image; you can look at the 'CREATED BY' column to see the the actual ingredient in each layer of the sandwich (stated more technically - you can see the command that added each layer to the image)

![dockerhist](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/3/dockerhist.png?raw=true)

I promise I'm almost done with the sandwich metaphores.

Images built from images build from images... sounds like a pattern we can use to our advantage. Say there is a really tasty vegan sandwich that you can pick up from the store. Its got all these exotic ingredients that you dont know how to pronounce, but one thing you know for sure is that it would taste even better with a layer of sliced turkey. 

You could scour all your local health food stores to find all the exotic ingredients so you can build this sandwich from scratch. But why would you want to do that when you can just pick up that already assembled sandwich from the store and slap some turkey on it?

That is how were going to approach bundling our app into an image. We're going to create a Dockerfile 'recipie' that uses a 'premade sandwich' image as the base ingredient and add our own custom ingredient (our app). This is much eaisier than building that fancy sandwich from scratch!

The base image our Dockerfile recipie will use to build our custom image is going to be the node image that we just pulled down from Dockerhub, 'node:latest'. Built into this image is everything we need to run a node app, so lets add it to our Dockerfile. 

- [ ] Open up the Dockerfile and under the comment '# What image do you want to start building on?' type `FROM node:latest`

- [ ] Under the comment '# Make a folder in your image where your app's source code can live' type `RUN mkdir -p /src/app`

`mkdir` : Creates a directory

` -p` : make all the neccisary parent folders

`/src/app` : The path of the directory you are creating

- [ ] Under the comment '# Tell your container where your app's source code will live' type `WORKDIR /src/app`

As the comment implies, this command tells your container which directory the working directory is

- [ ] The COPY is next.


















