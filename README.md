## Anonymyzer_AI
Anonymyzers AI is a full stack web app that uses the Clarifai API to find all the faces on a photo and blur them. Every post a picture for a review online? With this app you can protect your identity and the identify of others in your photos. You can download the edited photo and use it as you wish.

This app was built with React.js on the front-end and it leverages Node.js on back-end with Express.js. It uses a PostgreSQL database to keep track of users and how many entries they have made (how many images they have edited).

<a href="https://anonymizer-ai.herokuapp.com/">Check it out on Heroku</a>

![picture of the app](https://github.com/kpolgar/Anonymyzer_AI/blob/master/Anonymizer_AI.png)

<a href="https://github.com/kpolgar/Anonymyzer_AI_API">Server Repo</a>

## Technologies Used
### Front-End
* HTML5
* CSS3
* React.js

### Back-End
* Node.js
* Express.js
* PostgreSQL

### NPM Packages
* Create-React-App
* Knex
* Body parser
* Cors
* Tachyons
* React-tilt
* Bcrypt
* Postgresql
* Express

### APIs
* <a href="https://clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection">Clarifai</a>
* <a href="https://github.com/kpolgar/Anonymyzer_AI_API">Anonymizer API</a>
