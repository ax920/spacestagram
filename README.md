# Spacestagram - Shopify 2022

This is my application for the front-end developer intern position at Shopify, where I chose to use the Astronomy Picture of the Day API. I would like to share some of my thought process as I went through this project!

Check it out here: **https://alvin-spacestagram.herokuapp.com/**

## What I included

- The daily image's title
- The image itself
- A like button
- The date of the image
- Infinite scroll (new posts will continue to load as you keep scrolling)

## Approach

I chose to use React for this project as a way to improve my React skills, as well as to make my life a lot easier. Right off the bat, I realized that I could componentize each daily image into its own "post" by feeding the data dynamically to a Post component, which is definitely better than creating each post manually.

Upon load, the idea was to fetch a set amount of images, say 3, from the API, and store the JSON data using React's useState hook. With this data, I fed it to a Post component which takes in a _**title**, **image**, and **date**._

I wanted to mimic Instagram's infinite scroll functionality, which loads more images as you scroll to the bottom. So, I found that I could create a scroll listener that checks if you have scrolled to the bottom of the page and if so, executes a function that queries and renders 3 more images from the API.

## Some challenges I ran into

One of the problems that had me stuck was that some posts would appear twice in a row. After some thinking, I realized that my implementation of the scroll listener was a bit flawed. The scroll listener fires many times a second, and caused the app to query the same picture multiple times. To solve this issue, I learned about throttling. Basically, throttling means limiting the amount of times you can execute a function to once every second or whichever value you want. Lodash's throttle method was super easy to implement and solved this issue. No more duplicated pictures!

## Things I would add if I had more time

It would have been cool to add the ability to save posts, perhaps in localstorage, or for a more long-term solution, in a database. I could see myself saving posts in a key-value pair with the key being the post's date, as this uniquely identifies a daily picture. Localstorage would be a nice short-term solution as a proof of concept since it's easy to implement, and performs well in terms of speed. It would even allow the user to save their likes even if they leave the page.

I would also improve the UI to be more sophisticated, for example adding a loading animation when images are in the process of being queried.
In the future, I would also like to experiment with drawing my own logo and placing it to the left of the "Spacestagram" header.

The website only looks good on desktop, and I would make it responsive to fit smaller devices.

# Takeaways

This project was a great chance to work on my React skills. I definitely learned how to use Hooks more effectively, and in using them, it has definitely made me more appreciative of React as a framework. It's easy to learn with great documentation, and I find that the ideology behind functional components results in more clean code.

I'm proud of how this project came out, especially in terms of the UI. I used Figma to mock-up a design and found it to be much more efficient than designing with code. It's much easier to make small changes in a drag-and-drop editor than to go back and forth between the code and the browser.

