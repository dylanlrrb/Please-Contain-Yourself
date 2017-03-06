# Module 5 - Make Multiple Containers Work Together

#### A note about the symantec formatting in this tutorial:

Text that looks `like this --for --example` are commands that you should type into your terminal. Or else.

---
>Asides: Side notes to ponder while staring off into the distance.

---

**Bold text: Gotchas that are gonna getcha if you don't heed this advice**

**Click on an image if you need a larger view**

![dokernetwork](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/5/dockernetwork.png?raw=true)

## Preface: Intro to Microservices

As you can see from the the previous modules, Docker makes it really easy to isolate different parts of your app into discrete units. 

Not only is it really easy, but because the official Dockerhub images you layer your app on top of have singular purposes (e.g. postgreSQL database image, nginx server image, etc.), it sort of forces us to think about building software in discrete 'chunks' of functionality. 

These discrete chunks of functionality are called 'microservices' and are the fundamental idea behind a type of software design pattern called 'microservices architecture'

Now, you might be wondering: **"Why not just layer everything I need into one container? I could just create one massive container with everything I need and, BAM, I got an app"**

**Slow down there. That's a bad idea for a couple reasons.**

First off, layering a ton of images into one massive image that spins up into a multi-functional container is not efficient. The great thing about containers is that it tricks the computer it's running on to use un-utilized processing power to run more containers at the same time than it would normally, getting more 'bang for your buck' out of the host machine so-to-speak. Having all the functionality of your entire app in one container wastes all that precious processing power that Docker could be squeezing out of the host if you otherwise separated your app into discrete, containerized microservices .

Secondly, the idea behind containers is that they are the smallest unit of real composition. That is, a container is the smallest thing you can produce in advance, not knowing what else it will be combined with, and have strong guarantees of how it will behave and interact with other components.

This is contrary to the idea of building everything into one 'monolithic' application. Think of the 'monolithic' pattern of architecture as the monolith from that movie 'A Space Odyssey'. It's big, it's imposing, no one quite knows how it works, and the closest any developer can come to unlocking its mysteries is throwing rocks at it like a caveman. Not a great strategy building software that needs to be quickly iterated. Monolithic applications can evolve into a “big ball of mud”; a situation where no single developer (or group of developers) understands the entirety of
the application. Scaling monolithic applications can be challenging. And perhaps the greatest sin, the ability to reuse components is very limited in a monolith.

**Adopting a microservices architecture rather than a monolithic one offers several advantages:**

First, it's more robust - in a microservices architecture, the monolith is “broken up” into a set of independent services that are
developed, deployed and maintained separately. If there is one part that needs to be changed or tweaked for whatever reason, you don't have to take down your entire app to change it and relaunch the entire monolithic application.

Second, different services can be scaled differently. Say you need more servers or databases to handle a large influx of users, Using the concept of 'horizontal scaling' you can just spin up more containers responsible for that function rather that duplicate the entire monolith of an application.

Third, because each container is isolated, teams can work separately on discrete parts of an app without meddling in every other team's' code. This makes the entire software building process more efficient and robust. A team can just declare, "Hey, this is what information our microservice is expecting and this is what it will send out, don't worry about how - that's our job, you just worry about your microservice"

**Overall, using microservice architecture allows you to build software that is adaptable, composable, autonomous, and fault tolerant.**

Okay, so I've sold you on the fact that you should be using containers to organize your app into microservices. If you're the inquisitive type, you might be wondering, **"How on earth do I get my containers to communicate with each other, huh?"**

Well let me lay some knowledge on your brain. As the frickin' adorable image at the top of this README implies, Docker has a built in way for your containers to talk to each other.

**They're called Docker Networks - let's learn about em'!**

---
>Side note: If you were previously familiar with Docker before reading this guide, you may have been under the impression that containers were connected via the ` --link` option used during `docker run`. And you WOULD have been right, however, ` --link` has been depreciated since version 1.12 and may completely disappear at any moment... it's hip now to use Networks. Get with the times, gramps. 

---

## With that out of the way, let's get started!














