const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lami Kabir'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Lami Kabir'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Lami Kabir'
    })
})

app.get('/weather', (req, res) => { //this is http request we send in our app.js public folder
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    //this is the data we return back to the client side javascript file in the public directory
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { //we set a default value if we don't provide the latitude, longitude etc. and that is an empty javascript object. This will prevent the terminal getting an error like undefined. longitude, latitude we didn't put a default value is because in our code if we get a value in the error variable we display that and return. its the first line in the call back function so before it can get to latitude the function is finished. therefore we dont need to define those default value for longitude, latitude etc. Our code is set up to prevent it from showing if there is an error. Do you get it think about what i said and you will understand.
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lami Kabir',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lami Kabir',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})