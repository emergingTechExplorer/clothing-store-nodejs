const express = require('express')
const app = express()

// set the view engine for the application. Allows server-side code inside front-end HTML pages
// here front-end will use ejs to render the views
app.set('view engine', 'ejs')
// mark all the files in public folder as static. They are going to be available in front-end
app.use(express.static('public'))

// create different views for the server by making it listen
app.listen(3000)