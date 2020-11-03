const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const response  = require('express');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();

const port = process.env.PORT || '3000';

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partials = path.join(__dirname, '../templates/partials');


// Setup handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partials);

// Setup static directory
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Muneeza Nasir'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Muneeza Nasir'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is the help page. Please post all your help querries here. Thank you.',
        name: 'Muneeza Nasir'
    });
});


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'There was an error'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if(error) {
            return res.send({ error });
        }

        forecast (latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address

            });

        });
    });

    

    // res.send({
    //     forecast: forecast,
    //     location: geocode,
    //     address: req.query.address
    // });
});

// app.get('/products', (req, res) => {
//     if(!req.query.search){
//         return res.send({
//             error: 'No search term provided.'
//         });
//     }

//     console.log(req.query.search);
//     res.send({
//         products: []
//     });
// });

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Muneeza Nasir',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Muneeza Nasir',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

