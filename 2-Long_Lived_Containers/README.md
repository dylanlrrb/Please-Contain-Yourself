# Module 2 - Long Lived Containers

#### A note about the semantic formatting in this tutorial:

- [ ] Check boxes are steps that need to be completed.

Text that looks `like this --for --example` are commands that you should type into your terminal. Or else.

---
>Asides: Side notes to ponder while staring off into the distance.

---

**Bold text: Gotchas that are gonna getcha if you don't heed this advice**

**Click on an image if you need a larger view**

## With that out of the way, let's get started!


**Beware: this module picks up where Module 1 left off**

- [ ] Let's jump right in by spinning up a brand new container from a brand new image! Run:
```sh
docker run -d -p 80:80 --name webserver nginx
```
**As was the case the first time you ran the hello-world image; it looks for the 'nginx' image cached locally and when it cannot find it, Docker downloads it from Dockerhub... which will take just a bit of time**

- [ ] We'll break down that command we just used piece by piece in a bit, but for now run `docker ps` and note that this container shows up in the report despite the fact that we did not add the ` -a` flag.

- [ ] This is because 'docker ps' displays only the containers currently running on your machine and the nginx container we just spun up is still running! Go ahead and check this out by opening up a web browser and navigating to `localhost:80`

![dockernginx](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/2/dockernginx.png?raw=true)

That message displayed in your browser is being served from the container you just spun up, and will continue to do so as long as it's running! Cool!

---
>You can use this nginx server without actually having nginx installed on your computer! That is what I mean when I say that containers do not rely on outside dependencies to run; everything is bundled into your image; running it will always create the same independent container, all while remaining very lightweight.

---

- [ ] Let's also experiment to see what logs when we run `docker ps -a`. If you just came from the first module then you should see something like this:

![dockerpsa](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/2/dockerpsa.png?raw=true)

**you can click the image to get a better view**

The nginx container we just spun up (named 'webserver') is listed here along with all the other containers that are not running.

---
>Take note that one defining characteristic of our webserver container is that under 'STATUS' the report lists it as 'Up'. This is also observable by running `docker info`. You'll see that, of the 6 containers on your machine, 1 is 'RUNNING' and 5 are 'STOPPED'
>
>![dockerinfo](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/2/dockerinfo.png?raw=true)
>
>You can also see that you now have two images on your machine. As before you can look at your cached images with `docker images`
>

---

Let's break down that command that we used to spin up the nginx container:

```sh
docker run -d -p 80:80 --name webserver nginx
```

`docker run` : You've used this one before, it creates a new container from an image

`nginx` : The name of the image to spin into a container

` --name webserver` : Gives the container a unique name to identify it

`-p 80:80` : This command basically says ‘connect port 80 on the host to port 80 on the container’. We will get deeper into this later, but if you want a container to contact the outside world (as you would need a webserver to do) you have to set up your image with an exposed port ready to broadcast and receive data.

Then, when you want to make a container out of it, you simply map the container's port to a port on the host so the host can talk to the outside world on the container's behalf (since the container is still 'virtual', after all). This command pretty much lets your container plug and play.

`-d` : This command indicates that you want to run your container in a detached state; which means it just runs in the background. Keep reading for more information on this ->

- [ ] Try spinning up another webserver on the host's port 100 without the ` -d` flag to see what happens:

`docker run -p 100:80 --name webserver2 nginx`

**Notice that the ` -d` flag is gone, but also the changed port mapping and the modified container name**

If it's not immediately obvious, notice that the terminal is not ready to accept new commands and is instead in a logging mode:

![dockerlog](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/2/dockerlog.png?raw=true)

- [ ] Visit `localhost:100` in your browser and then return to your terminal. You will see that it logged information about your visit from inside the container:

![dockervisit](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/2/dockervisit.png?raw=true)

- [ ] To exit press 'ctrl+C'. This stops the container. Visiting 'localhost:100' will give you an error. Run `docker ps -a` and you will see that 'webserver2' has the status of 'Exited':

![dockerexit](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/2/dockerexit.png?raw=true)

- [ ] Great! The next important thing we need to be able to do with containers is start and stop them whenever we want. To stop our first webserver container which is still running, run `docker stop webserver`

You can confirm that it is no longer running in several ways. For example, visiting `localhost:80` in your browser will give you an error, running `docker ps` will show no running containers on your machine, `docker ps -a` will show 'webserver' with a status of 'Exited', and `docker info` will report no running containers.

- [ ] Since the container is still present on our machine (just stopped) we can restart it anytime with the command `docker start <container-name>`. Go ahead and restart webserver2 by running `docker start webserver2`

**We are currently referencing containers by their associated names, but you can also reference them by their provided ID's**

- [ ] Confirm 'webserver2' is up and running however you see fit

- [ ] Next, we're going to learn how to do some housekeeping. We are all done with these containers and images so lets clean them up and get rid of them. Run `docker rm webserver`; this will delete the stopped 'webserver' container from your machine

- [ ] Next run `docker ps -a` and notice that ‘webserver’ is nowhere to be found!

- [ ] Next try to run `docker rm webserver2` **This command should fail if webserver2 is still up and running** the failure message should look similar to this:

```sh
Error response from daemon: You cannot remove a running container 6bae1bae658c155fb6c4bcdf8fc3211d8d37816ca4790e50bf0b855d270fe738. Stop the container before attempting removal or use -f
```

**You need to keep this in mind when deleting containers - a container has to be stopped to remove it**

- [ ] As the error message implies, there is a shortcut around this. Run `docker rm -f webserver2`. The ` -f` will 'force' it to stop and then remove it. Try it out and then run `docker ps -a` to confirm that it's gone

---
>One handy little trick that can save some time is to just create containers that delete themselves when stopped. This is great for short lived containers as well as long lived containers that you only need temporarily.
>
>You can do this by adding a ` --rm` flag to the `docker run` command. Try this out yourself; create an auto removing nginx container with:
>
>`docker run -d -p 80:80 --rm --name goodbye nginx`
>
>Use `docker ps -a` to confirm that it's running. Then stop the container with `docker stop goodbye`. Run `docker ps -a` again to confirm that it's gone for good! Amazing!

---

- [ ] The next thing to do is to clear out our nginx image. Yes - for whatever reason we need to clean out our perfect sandwich from the fridge. Maybe the refrigerator is just too full. Anyways, to delete an image from your machine run `docker rmi <image-name>` (`<image-name>` in this instance being 'nginx', of course)

- [ ] Confirm that the 'nginx' image is gone by running `docker images`. It seems that only the 'hello-world' image remains...

- [ ] It's time for the 'hello-world' image to meet its maker. Run `docker rmi hello-world`

**But wait! It looks like this image isn't going down without a fight! An error appears that looks like this:**

```sh
Error response from daemon: conflict: unable to remove repository reference "hello-world" (must force) - container 5a3be0ccd65a is using its referenced image 48b5124b2768
```

Looks like you're going to have to get rid of your 'hello-world' containers! The 'hello-world' containers may be stopped, but they still exist, which is preventing the removal of the image they are based on.

---
>You could force this by using it ` -f` flag, but I don't think this is a great idea because the image will be gone but the containers will still be on your machine. This could cause problems if you try and restart a container which you forgot you deleted the requisite image to.
>
>Plus, you should really clean up after yourself, no one else is going to keep your computer clean.
>
>**If I have one gripe about Docker, it would be how much memory it can use if you don't clean up remnants of old containers. This includes un-tagged images, stopped containers, and abandoned data volumes (we'll get to those later). Docker is an 'aggressive cacher' and will cache all sorts of stuff in order to speed things up. Leaving this stuff laying around on your computer can add up to gigabytes and gigabytes of wasted space. We'll get into more advanced methods of cleaning up in later Modules, but for now, make sure you use the strategies already outlined in this module to clean up after yourself. **

---

- [ ] You know the drill, `docker rm <container-name>` all of those stopped  'hello-world' containers. Bunch of lazy containers - just sitting around, taking up space, not doing nothin'

---
>Pro-Tip: save time by running `docker rm` just once. Simply follow the command with all the container names you would like to remove, like so:
>
>`docker rm <container-name> <container-name> <container-name> <container-name>` 

---

- [ ] Try to remove the 'hello-world' image one more time, using `docker images` and `docker info` to confirm that it's gone. Your 'docker info' report should show that everything is as immaculate as when you first installed Docker:

![dockerclear](https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/2/dockerclear.png?raw=true)

That's it! Great job getting through this module! Now that you've got a solid understanding of the basics, we can move on to the more interesting and useful features that Docker has to offer! When you're ready - [Module 3](https://github.com/dylanlrrb/Please-Contain-Yourself/tree/master/3-Bundle_Your_App_Into_An_Image) Bundle Your App Into An Image

---
####Things we've learned:

- What a long lived container is
- How to check if a container is running
- How to start and stop a container
- How to use the ` --rm` option to create containers that delete themselves when stopped
- The ` -p` option
- The ` -d` option
- `docker stop <container-name>`
- `docker start <container-name>`
- `docker rm <container-name>`
- `docker rm -f <container-name>`
- `docker rmi <image-name>`
