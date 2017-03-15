# Module 6 - Docker-Compose For Multi-Container Apps

#### A note about the symantec formatting in this tutorial:

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

- cd-ing into the survey_server directory 

- building the image for the survey service

- spining up a survey container from that image 

- (remembering what ports you want to map to where on the host)

- (giving that container a distinct name for identification purposes)

- cd-ing into the results_server directory 

- building the image for the results service

- spining up a survey container from that image 

- (remembering what ports you want to map to where on the host)

- (giving that container a distinct name for identification purposes)

- spining up a mongodb container 

- (Remembering what name the mongo container)

- **OH WAIT.** The survey service container is connecting to the database with the wrong address! 

- Looks like you'll have to rebuild the image and spin it up again!

- Don't forget to get rid of the old containers since they're still using the port you want!

You might feel like a super-cool hacker while frantically typing all these commands in the terminal, but be honest - **this whole process stinks like moldy gym socks.**


**And these are just the steps to bring up a simple app with 3 services. Can you imagine the kind of insane hoops you would have to jump through to run a complex application with 20+ services working together?? My eye is twitching just thinking about it.**

Come on. We're developers. When we see a repetitive, time consuming task we always ask ourselves, "Is there a way to get the computer to do this for me?"

Luckily for you, this problem had already been solved for you before you even knew it was a problem. 

**Enter Docker Compose...**

- [ ] Rather than spending forever talking about what Docker Compose does and why it's great, let's just dive into a demonstration. `cd` into the directory '/6-Docker_Compose_For_Multi-Container_Apps'

- [ ] Run the command `ls` and notice that we have directories that contain the source code for the services of our polling app from the previous Module (the 'survey_server' and 'results_server'). Each of these directories contains it's own Dockerfile that defines the steps to build it's requisite image.

- [ ] Also notice that there is a file in Module 6 that you may not be familiar with, the one named 'docker-compose.yml'

- [ ] Let's do this thing! Run `docker-compose up` ! 

- [ ] After all the logging has stopped go ahead and use your browser to navigate to `localhost:8080` and `locakhost:3000` in separate tabs. Mess around with the app, create some entries, and see that everything works exactly as before!

**How is this possible? We just ran a single command! This is WITCHCRAFT!**

But, no. Not witchcraft. It's the magic of Docker Compose. Let's take a peek inside that 

- [ ] We brought up our app in an attached state so the innards of the container are still waiting for commands in the terminal. Press `Ctrl + C` to stop the containers.

- [ ] 




WHAT STEP IS THE BEST PLAVE TO PUT THIS BLURB?

**This part is important, please read.** Remember how I mentioned that Docker uses up quite a bit of memory when you forget to clean up after yourself? Well the volumes that you have been using in these containers are a chief culprite. **After messing around with Docker for the first time, I accumulated like 3 gigabytes of volumes on my machine. Oops. **Don't be like me. Clean up your volumes**

- [ ] Remove ALL your containers using `docker rm -f <container-names>`

- [ ] Run the command `docker volume ls` to see all the volumes on your machine. Despite the fact that they there are no containers on your machine anymore, the volumes are left behind. There are some strategies you can use to clean these up:

- Use the -v option when using the `docker rm <container-name>` command. This will delete any volumes associated with the container you are deleting.

- Use `docker volume prune` This will remove any dangling volumes that are not currently associated with  a container. this command will ask you to confirm that you want to do this and then tell you how much memory it freed up. It's usually quite a bit!

- Useing the `--rm` option when spinning up containers with the `docker run` command will not only remove the container when it it stopped, but it will also remove it's volume! The more you know.

- [ ] TALK ABOUT USING THE -V OPTION WITH DOCKER COMPOSE DOWN.

- [ ] Run the command `docker volume prune` to 



#### Things we've learned:


- `docker volume ls`
- `docker voulme prune`

