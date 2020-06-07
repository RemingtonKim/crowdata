# crowdata

The platform to collect data for machine and deep learning while eliminating middlemene through crowdsourcing. You make the listing. You set the price. You get the data <br>
Crowdata allows you to request specific data for you machine or deep learning needs while supplying datat to those who need it and making money in the process!
<br>

## Instructions
1. In root directoy run `npm install` to install dependencies.
2. In client directory, run `npm install to install dependencies.
3. Go to `client\src\components\googleButton.jsx`. This is where the Google OAuth is handled. Create your [Google OAuth](https://developers.google.com/identity/protocols/oauth2) credentials and set `CLIENT_ID` to it.
4. Go to `./server.js` and replace `uri` with your MongoDB database URI.
5. In root directory run `npm start` to start backend express server. 
6. `cd client` and run `npm start` to start frontend. Navigate to the port it starts on to view website.