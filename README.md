# Please-Contain-Yourself.
---

**If you have any suggestions for improvements to this guide, find mistakes, or even just notice a spelling or grammar error, please feel free to submit a pull request!**

![dokerlogo](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/0/docker.png?raw=true)

So. You've heard about this cool thing called Docker. 

And suddenly everyone is talking about it, and everyone is using it, and oh-my-gosh what do you mean you're not using it, and do you live in the stone age or something, and you're freaking out because it makes no sense, and you're scouring github for any helpful information about it as you weep and scarf down ice cream and it's dripping on your keyboard and making it all sticky.

No? Just me?

Well, I made this repo as a resource for developers ~~just like me~~ just like YOU, who know that Docker is a powerful tool but have no idea where to start.

It is designed to take you from just knowing "Docker" as a buzzword to utilizing Docker as a really useful tool in development, deployment, and scaling.

---
>Disclaimer. Sort of.
>
>To go through this tutorial you should be comfortable with topics that include, but are not limited to: 
- working in the terminal 
- git/ version control 
- servers and ports 
- horizontal scaling.
>
>The time commitment for this tutorial from start to finish  is about 3 hours. Feel free to tackle it in chunks. I do not, however, suggest jumping around the tutorial, the modules build off each other and you're gonna have a bad time if you jump around. 
>
>This tutorial is given from the perspective of a Mac user who also has never installed Docker on their machine. We will be working in the terminal A LOT so there might be some quirky little differences in the terminal commands and installation between Mac and Windows. It might take a little more effort on a Window user's part to find functional equivalents to the steps laid out.

---

### WHAT IS DOCKER?
Sure the logo is adorable, but what's all this noise about containers?

Let's get some context by comparing Docker to something that you might be familiar with -- Virtual Machines. Virtual Machines are just an emulation of another computer on a computer. Say you have a Windows computer and you wanted to run a program that is only available on Mac; one way you could get around this is by virtually running a Mac on your Windows machine. This works because the Virtual machine wraps the piece of software you want to run in a complete filesystem that contains everything needed to run: code, runtime, system tools, system libraries, etc.
 
This _'wrapping everything up into one convenient package'_ concept is called _'containerization'_ and  Docker containers do something similar with your software, albeit in a very different way. Let me try an analogy to explain. Say you and your sister both wanted to make a sandwich. You want a ham sandwich. She wants a peanut butter and jelly sandwich. Two drastically different sandwiches... but still sandwiches. Using a Virtual Machine to containerize your piece of software would be the equivalent of building an entirely new kitchen in order to accommodate the making of two different sandwiches. By this I mean Virtual Machines include the application, the necessary binaries and libraries, and an __ENTIRE__ guest operating system -- all of which can amount to tens of GBs.

Docker begs the question, why not just share the same kitchen? Containers include the application and all of its dependencies --but share the kernel with other containers, running as isolated processes in user space on the host operating system. Docker containers are not tied to any specific infrastructure: they run on any computer, on any infrastructure, and in any cloud. Check out the neat little picture below that compares a VM (left) to what Docker does (right).

![docker](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/0/sharing.png?raw=true)

[Here's a nice video](https://www.youtube.com/watch?v=RyxXe5mbzlU) that talks about this idea in a little more depth.

Because containers share a lot of their resources, they end up being very 'lightweight' so-to-speak; you can spin up a bunch of containers and it's not taxing or resource intensive at all, either memory or processing wise.

Another great feature about containers is that they wrap up everything needed to run; none of its dependancies live outside of itself. For example, that version of node you have running on your machine that you haven't updated in awhile or maybe your operating system. The container doesn't care because it doesn't use those. So if it works on your computer, it will work on your friend's computer, it will work on the cloud, it will work everywhere. The days of saying "Well it worked on my computer, I don't know why it's breaking on yours" are over!

Hopefully, I've enticed you to spend some time learning this really cool tool... if so, the first steps on your journey to Docker mastery are outlined below ->

### Tutorial Roadmap
Start at the first module. Unless you've already completed it. In that case ignore me, whatever.

- [Module 1](https://github.com/dylanlrrb/Please-Contain-Yourself/tree/master/1-Installation_and_Intro) Installation and Introduction
- [Module 2](https://github.com/dylanlrrb/Please-Contain-Yourself/tree/master/2-Long_Lived_Containers) Long Lived Containers
- [Module 3](https://github.com/dylanlrrb/Please-Contain-Yourself/tree/master/3-Bundle_Your_App_Into_An_Image) Bundle Your App into an Image
- [Module 4](https://github.com/dylanlrrb/Please-Contain-Yourself/tree/master/4-Containerized_Development_With_Volumes) Containerized Development With Volumes
- [Module 5](https://github.com/dylanlrrb/Please-Contain-Yourself/tree/master/5-Make_Multiple_Containers_Work_Together) Make Multiple Containers Work Together

**Modules 6 and above contain more advanced content. Dive in with these Modules if you've been wanting to sink your teeth into the really juicy parts of Docker!**

- [Module 6](https://github.com/dylanlrrb/Please-Contain-Yourself/tree/master/6-Docker_Compose_For_Multi-Container_Apps) Docker-Compose For Multi-Container Apps
- ~~[Module 7](https://github.com/dylanlrrb/Please-Contain-Yourself/tree/master/7-Docker_Swarm_For_Scaling) Docker Swarm For Scaling~~
- ~~[Module 8](https://github.com/dylanlrrb/Please-Contain-Yourself/tree/master/8-Deploying_With_Docker) Deploying With Docker~~
- ~~[Module 9](https://github.com/dylanlrrb/Please-Contain-Yourself/tree/master/9-Multi_Host_Clusters) Multi-Host Clusters~~

 **Modules with a ~~line through~~ are still in production and not ready yet; check back soon or hit the 'Watch' button on this repo to be notified when the modules become available!

 ---
#### Resources:

- [Docker Cheatsheet](https://github.com/wsargent/docker-cheat-sheet)
- [Awesome-Docker](https://github.com/veggiemonk/awesome-docker)
- [Dockerhub](https://hub.docker.com/)
- [Docker Pro-tips](https://nodesource.com/blog/8-protips-to-start-killing-it-when-dockerizing-node-js/)
- [Lessons from Building a Node App in Docker](http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html)
- [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
- [Microservices Cheatsheet](https://github.com/cehsu/Lightningtalk/blob/master/Microservices.md)
- [Cleaning Ice Cream off your Keyboard](https://www.howtogeek.com/forum/topic/clean-laptop-keyboard)
