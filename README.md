# Daia

Daily-Automated Instagram Account is a program that automatically updates ones chosen account(s) on a schedule (preferably daily). It selects images based on category from [Unsplash](https://www.unsplash.com/) and automatically adds a matching caption including hashtags.

## Setup

For using the API you will first need to [register]('https://unsplash.com/developers') as a Unsplash developer. This requires nothing more than a regular signup and is totally free.

Next, you'll have to create a demo app which is limited to 50 requests an hour, which is more than enough, knowing that one photo-upload equals 1 request.

Thereafter, just follow the steps and get your `API KEY`, `SECRET` and `CALLBACK URL` and place them inside a `.env` file in the root directory. Just make sure the names are the same as in `main.js lines 20-22`.

To choose an account (or multiple accounts) to run Daia on, head to `main.js` and replace the data with your account(s).

## Usage

To make the app run forever, you'll ideally have to run it on a server. This can be your own, or you could host it on [Heroku]('https://heroku.com'), [DigitalOcean]('https://digitalocean.com/') or any other equivalent.
