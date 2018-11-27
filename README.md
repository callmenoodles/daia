# Daia

Daily-Automated Instagram Account is a program that automatically updates ones chosen Instagram account(s) on a schedule (preferably daily). It selects images based on category from [Unsplash](https://www.unsplash.com/) and automatically adds a matching caption, including hashtags.

## Setup

1. To start things off you'll first need to [register]('https://unsplash.com/developers') as a Unsplash developer. This requires nothing more than a regular signup and is totally free.

2. Create a demo app (it's limited to 50 requests an hour, but this is more than enough, knowing that one photo-upload equals 1 request)

3. Copy your `API ID`, `SECRET` and `CALLBACK URL` and in `lines 20-22`:
```javascript
const unsplash = new Unsplash({
  applicationId: process.env.UNSPLASH_API_ID,
  secret: process.env.UNSPLASH_SECRET,
  callbackUrl: process.env.UNSPLASH_CALLBACK_URL
});
```
Replace the process.env variables with your copied values.
Alternatively you could create your own `.env` file and add this to the file:
```bash
UNSPLASH_API_ID = your_api_id
UNSPLASH_SECRET = your_api_secret
UNSPLASH_CALLBACK_URL = your_callback_url
```

4. Head to `accounts.js` and replace the values inside the array with your own in this format:
```javascript
{
  username: 'your_username',
  password: 'your_password',
  category: 'search keywords',
  popularTags: '#prefix #tags',
  searchLimit: 10000
}
```
`searchLimit` is the limit of searches in a search result.
**Make sure this is smaller than the total amount of searches in a result.**
You can check this by searching your keywords on Unsplash's website.

## Usage

The program will work after you enter `node app` in the command line. However, when you now exit the program by hitting `Ctrl+C`, by exiting the command line or closing it any other way, it will not run periodically anymore.

To do this you could run the program on a server, for example on [Heroku]('https://heroku.com') or [DigitalOcean]('https://digitalocean.com/').

## License

[MIT](LICENSE)

## End User License Agreement (EULA)
1. You may not use this repository for any spam-related actions
