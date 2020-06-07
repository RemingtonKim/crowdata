# crowdata
## A Hack the Northeast submission<br>
![](https://raw.githubusercontent.com/RemingtonKim/crowdata/master/client/src/imgs/logo.png?token=AMV4ACLCEMRJQXRVKWF4HMS64YNHG)

The platform to collect data for machine and deep learning while eliminating middlemene through crowdsourcing. You make the listing. You set the price. You get the data <br>
Crowdata allows you to request specific data for you machine or deep learning needs while supplying datat to those who need it and making money in the process!
<br>

## Business plan
Crowdata users list a price that they will pay for each piece of data they get. It can be $0.1, $0.5, or anything else. As a business, crowdata can take a percentage of these price listings as a fee for using the platform. This allows crowdata to make revenue. Services like Amazon Mechanical Turk exist but that is mostly for annotating data and classifying images, not requesting specific data that you need for your project. Also, Amazon Mechanical Turk requires training and a registration process, but crowdata is a simple Google login. This allows users to get right to asking for data or supplying data and making some money on the side. 


## Instructions

crowdata is not hosted anymore, but you can clone the repo and run it on localhost yourself
1. In root directoy run `npm install` to install dependencies.
2. In client directory, run `npm install to install dependencies.
3. Go to `client\src\components\googleButton.jsx`. This is where the Google OAuth is handled. Create your [Google OAuth](https://developers.google.com/identity/protocols/oauth2) credentials and set `CLIENT_ID` to it.
4. Go to `./server.js` and replace `uri` with your MongoDB database URI.
5. In root directory run `npm start` to start backend express server. 
6. `cd client` and run `npm start` to start frontend. Navigate to the port it starts on to view website.
