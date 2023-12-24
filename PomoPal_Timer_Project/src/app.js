const express = require("express")
const hbs = require("hbs")
const mongoose = require("mongoose")
const app = express()

const routes = require('./routes/main')

app.use('/static',express.static("public"))
app.use('',routes)

//Configuração do handlebars

app.set('view engine','hbs')
app.set("views","views")
hbs.registerPartials("views/partials")

// db connection 
mongoose.connect("mongodb://localhost/PomoPal_Timer")
    .then(() => {
    console.log("db connected");
    })
    .catch((error) => {
        console.error("Error connecting to the database: ",error);
    })

app.listen(process.env.PORT | 5500,()=>{
    console.log("Server started...");
})