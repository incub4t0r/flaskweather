![](/static/img/malgalogo.PNG)

## What is malga?

malga is a simple flask server web app that displays a clock with the weather for a display.

## What does it do & how does it work?

This is my first web app working with JavaScript, that displays weather data as well as a clock. It performs as follows:

- Users are provided with the `landing.html` page, prompting them to enter a city name.
- The city name is passed along to `index.html`, where I use an api call to `openweathermap` for weather data.
- `jQuery` parses the `JSON` provided by the api calls, and populates `index.html` by `id` name.

## What does the name mean?

맑아 (malg-a) is a korean word that means clear/fine. Since this is a weather app, I thought it fit for clear weather.

## Where is it running?

Currently, the webpage runs at [43y3s.pythonanywhere.com](http://43y3s.pythonanywhere.com) and is being displayed on a couple old tablets I have that cannot run anything more than the browser.

## I want to run it!

If you want to run this project, simply clone the repo, but please change out the api keys for your own. Go to https://openweathermap.org to generate your own free api key.

