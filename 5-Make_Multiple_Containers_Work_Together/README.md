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

- First off, layering a ton of images into one massive image that spins up into a multi-functional container is not efficient. The great thing about containers is that it tricks the computer into using it's un-utilized processing power to run many more containers at the same time than it would if they were regular pieces of software, thus getting more 'bang for your buck' out of the host machine (so-to-speak). Having your entire app's functionality in one container wastes all that precious processing power Docker could have been squeezing out of the host if you otherwise separated your app into discrete, containerized microservices.

- Secondly, the idea behind containers is that they are the smallest unit of real composition. That is, a container is the smallest thing you can produce in advance, not knowing what else it will be combined with, and have strong guarantees of how it will behave and interact with other components.

This type of softwate disign yeilds a 'monolithic' application. Think of the 'monolithic' pattern of architecture as the monolith from that movie '2001: A Space Odyssey'. It's big, it's imposing, no one quite knows how it works, and the closest any developer can come to unlocking its mysteries is throwing rocks at it like a caveman. Not a great strategy for building software that needs to be quickly iterated. Monolithic applications can evolve into a [“big ball of mud”](https://en.wikipedia.org/wiki/Big_ball_of_mud); a situation where no single developer (or group of developers) understands the entirety of the application. Scaling monolithic applications can also be challenging. And perhaps the greatest sin - the ability to reuse components is very limited in a monolith.

**Adopting a microservices architecture rather than a monolithic one offers several advantages:**

- First, it's more robust - in a microservices architecture, the monolith is “broken up” into a set of independent services that are
developed, deployed and maintained separately. If there is one part that needs to be changed or tweaked for whatever reason, you don't have to take down your entire app to change it and relaunch the entire monolithic application.

- Second, different services can be scaled differently. Say you need more servers or maybe more databases to handle a large influx of users, using the concept of 'horizontal scaling' you can just spin up more containers responsible for that function rather that duplicate or take down the entire monolith of an application.

- Third, because each container is isolated, teams can work separately on discrete parts of an app without meddling in every other team's code. This makes the entire software building process more efficient and robust. A team can just declare, "Hey, this is what information our microservice is expecting and this is what it will send out, don't worry about how - that's our job. You just worry about your microservice"

**Overall, using microservice architecture allows you to build software that is adaptable, composable, autonomous, and fault tolerant.**

Okay, so I've sold you on the fact that you should be using containers to organize your app into microservices. If you're the inquisitive type, you might be wondering, **"How on earth do I get my containers to communicate with each other, huh?"**

Well let me lay some knowledge on your brain. As the frickin' adorable image at the top of this README implies, Docker has a built in way for your containers to talk to each other.

**They're called Docker Networks - let's learn about em'!**

---
>Side note: If you were previously familiar with Docker before reading this guide, you may have been under the impression that containers were connected via the ` --link` option used during `docker run`. And you WOULD have been right, however, ` --link` has been depreciated since version 1.12 and may completely disappear at any moment... now it's hip to use Networks. Get with the times, gramps. 

---

## With that out of the way, let's get started!


Module 5 comes with yet another app, and in the spirit of using microservice archetecture, it is split into 3 services: a 'survey server', a 'results server', and a MongoDB database.

The survey server has two jobs, rendering a form that lets a user create a database entry and saving that entry to the database via an API endpint.

---
>Normally, microservices expose their interfaces with a standard protocol, such as a REST-ful API, and they can be consumed and re-used by other services and applications without direct coupling through language bindings or shared libraries.
>
>Services exist as independent deployment artifacts and can be scaled independently of other services.


---

The results server also has two jobs, retriving the saved entry data from the database and then rendering that data on a webpage via an API endpoint

The MongoDB database is... a MongoDB database. It stores stuff you tell it to store.

Now, assuming that you've got MongoDB, node.js, and npm installed on your computer this app would work flawlessly. **HOWEVER!** The beauty of containers is that you can wrap your app up and run it anywhere, regardless of if the host has the needed dependencies installed. (So, for the sake of this Module, even if you do have all the right dependencies installed, let's pretend you don't).

Docker is the only thing you need from now on! So let's get started spinning the different parts of our app into containerized microservices!


**First:** Build your images
//make sure you are cd'd intot he right directory when runnig commands that depend on your path

**Second:** Run the containers with volumes mounted
//make sure you are cd'd intot he right directory when runnig commands that depend on your path

visit the website, theres an error

use docker logs to check whats up

explain whats going on:

	talk about the different networks in docker

	introduce the 'docker network ls'

	talk about the default network and use `docker network inspect` to examine the containers attached to it


	talk about how the default bridge network (the one that containers are attached) you need to use the IPv4Address of the container you want to connect to

	ASIDE: talk about IPv4 

modify the servers to use IPv4Adress and restart

show that the app works
	
talk about user defined networks, because it supports automatic service discovery you can reference the containers' ip adderesses by the container name

make your own bridge network `docker network create --driver [OPTION] NETWORKNAME`

delete all containers, were going to spin them up agian on the network we just created that lets them communicate with each other. (sorry, to make you do it all over again. we'll see an easier way to do this in a bit but for the time being it's good practice)

with the ` --network` command, re-spin up the database on the new network with a funky name

change the address of the connection to the funky name

re-spin up the two other servers

show that its working

NEED TO KNOW IF ATTACHING A CONTAINER TO A USER DEFINED NETWORK AFTER BEING CONNECTED TO THE DEFUALT, IF IT WIIL STILL BE DISCOVERABLE?

LASTLY, CAN YOU SEE IF YOU CAN ACCESS OTHER SERVERS IN THE SAME WAYS AS YOU HAVE FIGURED OUT WITH THE DBS?


---
>**REMEMBER:** The image still has the broken code in it, so if you want to spin up a container without needing a volume mounted, you will need to build a new image with the working code

---


ASIDE: talk about cross network communication by attaching a container to multiple networks `docker network connect`


remove the containers, 
remove the networks `docker network rm`

---

extra stuff:

get into the mongo container and run commands to see whats stored in the database
Drop the entries tabeland see the effect

talk about using volumes for persistent data storage on the host
(explain the needed commands but dont require mongo to be instaled on the user's computer. offer a resource that lets them install it if they dont have it)




Wouldnt it be great if all the work that we did to orchastate the coordination between our containers could be whittled down to one command???


THINGS LEARNED	
microservices archetecture
docker networks
docker network drivers
default docker networks
IPv4 Addressing
user defined docker networks
docker network ls
docker network inspect <network-name>
docker network create [OPTION]
--driver option
docker network rm







RESOURCES
provide a good microservices resource

provide doker network resources: 
	https://docs.docker.com/engine/reference/commandline/network/#usage
	https://docs.docker.com/engine/userguide/networking/#the-default-bridge-network-in-detail










