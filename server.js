// load environment variables
// check to see if are running in production environment or development environment 
// dotenv library only used for development. if production, we need to remove dotenv library
// NODE_ENV variable that is set by Node to tell you what environment you are on
if (process.env.NODE_ENV !== 'production'){
    // the below will load all the variables in .env and put them inside process.env variable in the server
    require('dotenv').config()
}

// reference environment variables inside the server
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

console.log(stripeSecretKey, stripePublicKey)

const express = require('express')
const app = express()

// set the view engine for the application. Allows server-side code inside front-end HTML pages
// here front-end will use ejs to render the views
app.set('view engine', 'ejs')
// mark all the files in public folder as static. They are going to be available in front-end
app.use(express.static('public'))

// create different views for the server by making it listen
app.listen(3000)