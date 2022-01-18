const path =  require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for config
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../public/templates/views')
const partialsPath = path.join(__dirname,'../public/templates/partials')

// tells express we are using view engine called hbs
//setting name and value
//setup handle bars engine and view location
app.set('view engine', 'hbs'); 
app.set('views',viewPath )
hbs.registerPartials(partialsPath)

//set-up static directory to serve
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
	res.render('index',{
        title:'Weather app',
        name:'Ekta Kumari'
    });
})
// gets root page req, res and response renders index.hbs file with root set to viewsPath up above

app.get('/about', (req, res) => {
	res.render('about',{
        title:'About me',
        name:'Ekta Kumari'
    });
})
app.get('/help', (req, res) => {
	res.render('help',{
        msg:'Hello there , I am here to help !',
        title:'Help',
        name:'Ekta Kumari'
    });
})

app.get('/weather' , (req,res) => {
    if(!req.query.address)
        return res.send({
        error:'You must provide a location .',
    })
    console.log(req.query.address)

    //Cannot destructure property 'longitude' of 'undefined' as it is undefined

    geoCode(req.query.address , (error,{longitude,latitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error,forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                weather:forecastData,
                location,
                address:req.query.address
            })
        })
    })

    // res.send({
    //     forecaset:'It is very cold and foggy',
    //     location:req.query.address
    // })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Ekta Kumari',
        errorMessage:'Help page not found'
    });
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Ekta Kumari',
        errorMessage:'Page not found'
    });
})
//starts the server

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})