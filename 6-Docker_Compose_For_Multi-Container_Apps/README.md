# Module 6 - Docker-Compose For Multi-Container Apps

#### A note about the semantic formatting in this tutorial:

- [ ] Check boxes are steps that need to be completed.

Text that looks `like this --for --example` are commands that you should type into your terminal. Or else.

---
>Asides: Side notes to ponder while staring off into the distance.

---

**Bold text: Gotchas that are gonna getcha if you don't heed this advice**

## With that out of the way, let's get started!

![compose](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/6/compose.png?raw=true)

I love every logo for all the Docker services, they're all just so charmingly nautical themed. I mean look at this octopus. I can't take it.

The octopus is the logo for Docker Compose - a tool that works with Docker that makes makes your life a whole lot easier.

In the previous Module we containerized an app that was split into several microservices, each requiring its own container. But before we could get each container up and running we had to create an image for each service as well that contained each chunk of source code.

Easier said than done right? When we get down to the nitty-gritty of actually getting our whole app running we had a lot of steps to complete and things to keep track of. Things like:

- spinning up a mongodb container

- (Remembering to do this first or the other containers will crash when trying to connect to it)

- cd-ing into the survey_server directory

- building the image for the survey service

- spinning up a survey container from that image

- (remembering what ports you want to map to where on the host)

- (giving that container a distinct name for identification purposes)

- cd-ing into the results_server directory

- building the image for the results service

- spinning up a survey container from that image

- (remembering what ports you want to map to where on the host)

- (giving that container a distinct name for identification purposes)

- **OH WAIT.** The survey service container is connecting to the database with the wrong address!

- Inspecting the network to get the database container's address

- Rebuilding the image

- Spinning it up again

- Not forgetting to get rid of the old containers since they're still using the port you want!

You might feel like a super-cool hacker while frantically typing all these commands in the terminal, but be honest - **this whole process stinks like moldy gym socks.**


**And these are just the steps to bring up a simple app with 3 services. Can you imagine the kind of insane hoops you would have to jump through to run a complex application with 20+ services working together?? My eye is twitching just thinking about it.**

Come on. We're developers. When we see a repetitive, time consuming task we always ask ourselves, "Is there a way to get the computer to do this for me?"

Luckily for you, this problem had already been solved for you before you even knew it was a problem.

**Enter Docker Compose...**

- [ ] Rather than spending forever talking about what Docker Compose does and why it's great, let's just dive into a demonstration. `cd` into the directory '/6-Docker_Compose_For_Multi-Container_Apps'

- [ ] Run the command `ls` and notice that we have directories that contain the source code for the services of our polling app from the previous Module (the 'survey_server' and 'results_server'). Each of these directories contains it's own Dockerfile that defines the steps to build it's requisite image. This should all be familiar to you.

- [ ] Also notice that there is a file in Module 6 that you may not be familiar with, the one named 'docker-compose.yml'. We'll dive into this shortly.

- [ ] Let's do this thing! Run `docker-compose up` !

- [ ] After all the logging has stopped go ahead and use your browser to navigate to `localhost:8080` and `localhost:3000` in separate tabs. Mess around with the app, create some entries, and see that everything works exactly as before!

**How is this possible? We just ran a single command! This is WITCHCRAFT!**

But, no. Not witchcraft. It's the magic of Docker Compose.

- [ ] We brought up our app in an attached state so the innards of our app are still waiting for commands in the terminal. Press `Ctrl + C` to stop the containers.

- [ ] **Docker Compose uses the 'docker-compose.yml' file as instructions for how to bring up our app.** Let's take a peek at it and break down how the 'docker-compose.yml' file is interpreted! Go ahead and open it up and you'll see this:

```
version: '3'

services:
  survey:
    build: survey_server/
    depends_on:
      - 'database'
    ports:
      - '8080:8080'

  results:
    build: results_server/
    depends_on:
      - 'database'
    ports:
      - '3000:3000'

  database:
    image: mongo:latest

```

Notice that the '.yml' file is structured like a hierarchy, where lines with an indent are subordinate to the closest line with one less indent. For example, 'survey', 'results', and 'database' are all subordinate to 'services' (the closest line with one less indent). Let's break this down line by line:

- `version: 3` - This tells Docker Compose what version to run. At the time of this writing there are 3 versions available, so version 3 is the latest one. All the versions are slightly different and you can read more about the differences [here](https://docs.docker.com/compose/compose-file/compose-versioning/).

- `services:` - This tells docker that all the directly subordinate lines are going to be separate containers in our app (or 'services' if we're thinking in terms of microservice architecture).

So looking at the '.yml' file, 'survey', 'results', and 'database' are all services and Compose will spin up a separate container for each. This happens to be exactly what we did manually in the last Module!

- `survey:` - This defines the first service in our app that will be spun up into a container. The subordinate lines define how Compose will do this. Let's keep going ->

- `build: survey_server/` - Subordinate to the survey service, this line tells Compose where to find the Dockerfile that it can use to build the survey container. It is a relative file path starting from the directory containing the '.yml' file, so it is saying 'within this directory, look inside the survey_server/ directory and you will find the Dockerfile you need.'

- `depends_on: - 'database'` - I know this is actually two lines but I'm treating it as one since they go together. `depends_on` controls the startup order of the containers once Compose builds them. It's basically telling Compose, 'Don't start this container until my "database" container has been spun up'.

---
>Why do you think `depends_on` might be important? I'll give you a hint: the order that the services are listed in the '.yml' file does not indicate the order that the containers will be spun up! **What happens if the survey or results container starts up and it tries to connect to a database container that does not yet exist?**
>
>THE CONTAINER WILL CRASH. And then you are left pondering your life choices as you search through all your containers' logs for the reason why your app isn't working.
>
>Keep in mind that this only guarantees that the container is spun up (not necessarily that it will be ready to accept requests) at the time the next container is spun up. Ideally, your app's code should be robust enough that it can handle network hiccups without crashing, but the existence of the thing you are trying to connect to should never be in question. Controlling the startup order is a way to bring up first the services that other services depend on so there are no surprises. Check out [this resource](https://docs.docker.com/compose/startup-order/) for more information.

---

- `ports: - '8080:8080'` - This one is pretty self-explanatory. It maps port 8080 on the host to the exposed 8080 port on the container. Compose runs the `docker run` command for us and this is like telling it to use the `-p` option with these specific arguments.

- `results:` - Moving on to the next service, the subordinate lines will define how to go about making a results container

- `build: results_server/` - You get it, pretty much the same as when we defined where to find the survey_server Dockerfile. Again, Compose uses this information to do the `docker build` step for us. Pretty neat!

- `depends_on: - 'database'` - Same as with the survey service, the results service also connects to the database so this line makes sure the database service is spun up before spinning up the results container.

- `ports: - '3000:3000'` - Here we go with the port mapping again.

- `database:` - Let's define the database service.

- `image: mongo:latest` - We want to create a MongoDB container and use it as our database service. So rather than tell Compose to build it from a Dockerfile like before, we tell it to spin up the container from the 'mongo:latest' image cached on our machine. And if there is no 'mongo:latest' image it will pull it from Dockerhub before running.

Most of this should be old news to you, it's just formatted differently in the '.yml' file.

---

#### I Made This for You!

Let's talk briefly about all the things that Compose made for you in the process of running `docker-compose up`

- [ ] Run `docker images` and check out the images now on your machine. You should see a couple with really long names, but look at the end of the name and you'll see that Compose made an image for each service you defined in the '.yml' file. (The image names are so lengthy since it concatenates the directory name containing the '.yml' file onto the image name) If you already had the 'mongo:latest' image you will see that it didn't create a new image for the database service but opted to reuse the mongo image.

- [ ] Run `docker ps -a` to see all running and stopped containers. You will see three containers with lengthy names similar to the image names you just saw, again, one for each service.

- [ ] Lastly, run `docker network ls` to check out all the Docker Networks on your machine. You will see that it created a network exclusive to your app. All the containers that Compose created for you are attached to this network and are thus isolated from every other network on your machine. In other words, all the services in your app can talk to each other but cannot communicate with any other containers that may be running on your computer.

Now I want to talk about a unique property of this network that you'll find really useful. Remember how, in the last Module, we had to find the IP address of the mongo container with `docker network inspect` in order to connect to it properly from our other containers? **It is WAY simpler with Docker Compose**

- [ ] Open up the 'index.js' file in either the 'survey_surver' or the 'results_server' directory.

- [ ] Check out the mongoUrl we are connecting to the database container with. Notice anything different???

Instead of an IP4Address, the address is just the word 'database'. And it works. How is this possible? Well it turns out that all non-default networks ([user-defined networks](https://docs.docker.com/engine/userguide/networking/#user-defined-networks)) support something called automatic service discovery. You can read more about this [here](https://docs.docker.com/docker-cloud/apps/service-links/) but basically, **if containers are attached to networks that you made, you can reference their service name or container name rather than the IP4Address!**

This is incredibly useful for large complicated apps since you don't have to keep track of all the addresses for all your services. Additionally, it is possible that a service will be spun up at a different IP4Address between builds. Referencing the services lets the computer figure out the addresses rather than making you keep track of them and keeping them up to date!

- [ ] Next we're going to bring up the app again, but this time in a detached state. Run:

```sh
docker-compose up -d
```

Notice how much faster the app came up! This had nothing to do with the fact that we added the `-d` option (this just runs our app in the background), but rather, it came up so fast because it reused everything that it had created the first time `docker-compose up` was run.

- [ ] Let's try out another command! Run `docker-compose down`

- [ ] Read the message that it logged, you should see something like:

```sh
Stopping 6dockercomposeformulticontainerapps_survey_1 ... done
Stopping 6dockercomposeformulticontainerapps_results_1 ... done
Stopping 6dockercomposeformulticontainerapps_database_1 ... done

Removing 6dockercomposeformulticontainerapps_survey_1 ... done
Removing 6dockercomposeformulticontainerapps_results_1 ... done
Removing 6dockercomposeformulticontainerapps_database_1 ... done

Removing network 6dockercomposeformulticontainerapps_default

```

- [ ] `docker-compose down` does three things, first it stops all the app's containers

- [ ] Next it removes all the app's containers; confirm that they are gone by running `docker ps -a`-

- [ ] Finally it removes the network that your app's containers were attached to; run `docker network ls` to confirm this.

- [ ] There are some things that `docker-compose down` does not remove however. Run `docker images` and you will see that all the images are still on your machine.

---
>Since these images are cached, the next time you bring the app it will come up much faster since it doesn't have to rebuild the images, just make containers from them.
>
>**But what if you made a change in the source code and you need one or more images rebuilt?
>
>Just use the `--build` option with the `docker-compose up` command to force a rebuild of the images in your app!**

---

- [ ] Run `docker-compose up -d` again

- [ ] This time, however, bring it down with the following command:

```sh
docker-compose down --rmi all
```

The `--rmi all` option removes not only the containers and network that it created for your app, but also the images. This is a good thing to do since images take up a lot of space, if you're done with them you want to make sure to get rid of them.

- [ ] Run `docker images` to confirm that they are indeed gone.

#### Another Note About Saving Memory

**This part is important, please read.** Remember how I mentioned that Docker uses up quite a bit of memory when you forget to clean up after yourself? Well the volumes that you have been using in these containers are a chief culprit. **After messing around with Docker for the first time, I accumulated like 3 gigabytes of volumes on my machine. Oops. **Don't be like me. Clean up your volumes**

- [ ] Remove ALL your containers using `docker ps -a` and `docker rm -f <container-names>`

- [ ] Run the command `docker volume ls` to see all the volumes on your machine. Despite the fact that they there are no containers on your machine anymore, the volumes are left behind. There are some strategies you can use to clean these up:

- Use the -v option when using the `docker-compose down` command. This will delete any volumes associated with the containers you are deleting.

- Use `docker volume prune` - This will remove any dangling volumes that are not currently associated with a container. This command will ask you to confirm that you want to do this and then tell you how much memory it reclaimed. It's usually quite a lot!

- Using the `--rm` option when spinning up containers with the `docker run` command will not only remove the container when it it stopped, but it will also remove its volume! The more you know.

- [ ] Run the command `docker volume prune` to get rid of the dangling volumes on your machine. Type `y` then enter when asked to confirm.

- [ ] Revel in all the disk space you reclaimed.

That's it! I hope you enjoyed learning about Docker Compose! After typing out every command to get your apps running in the previous Modules, it's easy to appreciate all that Compose does for you. It saves a ton of time and brainpower that you could otherwise be using so solve bigger challenges... like how to scale your app! Luckily for you, that's the topic of our next Module -> [Module 7 - Docker Swarm for Scaling](https://github.com/dylanlrrb/Please-Contain-Yourself/tree/master/7-Docker_Swarm_For_Scaling)


---
#### Things we've learned:

- How to interpret a 'docker-compose.yml' file
- `docker-compose up`
- the  ` -d` option to compose app in a detached state
- the `--build` option that causes compose to rebuild the images
- `docker-compose down`
- the `--rmi all` option to remove all images that were created with the `docker-compose up` command
- the `-v` option in conjunction with `docker-compose down` to remove volumes created with the `up` command
- `docker volume ls`
- `docker volume prune`


---
#### Resources:

[Compose file version 3 reference](https://docs.docker.com/compose/compose-file/)

['docker-compose up' reference](https://docs.docker.com/compose/reference/up/)

['docker-compose down' reference](https://docs.docker.com/compose/reference/down/)

[Controlling Startup Order](https://docs.docker.com/compose/startup-order/)

