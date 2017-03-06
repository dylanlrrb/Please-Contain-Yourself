# Module 5 - Make Multiple Containers Work Together

#### A note about the symantec formanting in this tutorial:

Text that looks `like this --for --example` are commands that you should type into your terminal. Or else.

---
>Asides: Side notes to ponder while staring off into the distance.

---

**Bold text: Gotchas that are gonna getcha if you don't heed this advice**

![dokernetwork](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/5/dockernetwork.png?raw=true)

## Preface: Microservices

As you can see from the the previous modules, Docker makes it really easy to isolate different parts of your app into discrete units. 

Not only is it really easy, but because the official Dockerhub images you layer your app on top of have singular purposes (e.g. postgreSQL database image, nginx server image, etc.), it sort of forces us to think about building software in descrete 'chunks' of functionality. 

These discrete chunks of functionality are called 'microservices' and are the fundamental idea behind a type of software design pattern called 'microservices archetecture'

Now, you might be wondering: **"Why not just layer everything I need into one container? I could just put build one massive container with everything I need and, BAM, I got an app"**

**Slow down there.** thats a bad Idea for a couple reasons. First off, layering a ton of images into one massive image that spins up into a multi-functional container is not efficient. The great thing about containers is that it tricks the computer its running on to use un-utilized processing power to run more containers at the same time than it would normaly, getting more 'bang for your buck' out of the host machine so-to-speak. Having all the functionality of your entire app in one container wastes all that precious processing power that Docker could be squeezing out of the host if you otherwise sparated your app into discreet, containerized microsevices .

Secondly, the idea behind containers is that they are the smallest unit of real composition. That is, a container is the smallest thing you can produce in advance, not knowing what else it will be combined with, and have strong guarantees of how it will behave and interact with other components.

This is contrary to the idea of building everything into one 'monolithic' application. Think of the 'monolithic' pattern of archetecture as the monolith from that movie 'A Space Oddesy'. It's big, its imposing, no one quite knows how it works, and the closest any developer can come to unlocking it's mysteries is throwing rocks at it like a caveman. Not a great strategy building software that needs to be quickly itereated.

**Adopting a mocroservices architecture rather than a monolythic one offers several advantages:**

Firstly, different services can be scaled differently. Say you need more servers or databases to handle a large influx of users, you can just spin up more containers responsible for that function rather that duplicate the entire monolith of an application.

Second, it's more robust - if there is one part that needs to be changed, tweaked, or scaled differently for whatever reason, you don't have to take down your entire app to change it and relaunch the entire monolith of an application

Third, because each container is isolated, teams can separatly work on discrete parts of an app without meddling in every other teams' code. This makes the entire software building process more efficient and robust. A team can just declare, "Hey, this is what information our microservice is expecting and this is what it will send out, don't worry about how - thats our job, you just worry about your microservice"

Okay, so I've sold you on the fact that you should be using containers to organize your app into microservices. If you're the inquisitive type, you might be wondering, 'How on earth do I get my containers to communicate with each other, huh?'

Well let me lay some knowledge on you brain. As the frickin' adorable image at the top of this README implies, Docker has a built in way for your containers to talk to eachother.

**They're called Docker Networks, let's learn about em'!**

---
>Side note: If you were previously familiar with Docker before reading this guide, you may have been under the impression that containers were connected via the ` --link` option used during `docker run`. And you WOULD have been right, however, ` --link` has been depreciated since version 1.12 and may completely dissapear at any moment... now it's hip to use Networks. Get with the times, gramps. 

---

## With that out of the way, lets get started!













