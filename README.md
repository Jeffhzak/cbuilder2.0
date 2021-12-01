# CBuilder 2.0

A Challenge to myself: how much can I improve on a previous project in 2 weeks, now at the end of my General Assembly Software Engineering Immersive Bootcamp?

Original Project: https://github.com/Jeffhzak/dndcbuilder

Visit the deployment site here: cbuilder2-0.vercel.app

# Description

Version 2.0 of my original D&D Character Builder website. As before, the User will be guided through the surprisingly complicated process of creating a Level 1 Dungeons & Dragons character, using information freely available in the public API. Their abilities and skills will be displayed in a clear and easy to read format, to be able to easily plan out your character as you progress through the steps. 

# Tech Stack

>* NextJS

Chosen to leverage on NextJS's fantastic Static Site generation feature. An identified pain point of the UX of version 1.0 was the irritating load times whenenver the site had to fetch information from an API (which was very often). 

Being able to fetch all the information I need at build time, and use it as a static prop throughout the website was a godsend. The site is now incredibly snappy and responsive. 

>* Firebase

Chosen as a low maintenance, complete package to serve as a backend. I required a noSQL database to easily translate and "save" the data that comprises a "character", and Firebase provided all the functionality I needed to be able to hit the ground running and focus on developing features, saving on precious time.

## MVP
* Translate all the functionality of version 1.0 into the new React framework I'm learning, NextJS.
* Simultaneously, address fundamental planning flaws in the features I had implemented, made obvious thanks to 20/20 hindsight. 
* User authentication via Firebase => adding functionality to be able to save your created character, and easily reference it in the future. 
* Creating an easily scaleable system for *users* to be able to create and use their own custom features during character creation. 
