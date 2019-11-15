# Course Project

## To Run the Project
Change redirect_uri in `app/app.js` to:

 `var redirect_uri = 'http://localhost:' + process.env.PORT + '/callback/';`
```
heroku local web
```
Visit localhost:5000 in browser.

## To View Deployed Site
https://spotgen-app.herokuapp.com/