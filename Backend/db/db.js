const mongoose = require('mongoose')

function connecttodb()  {
    mongoose.connect(process.env.DB_CONNECT , {
        useNewUrlParser:true,
        useUnifiesTopology:true,
    }).then (  () => {
        console.log("Connected to DB")
    }).catch(err => console.log("Could not connect to DB"))
}

module.exports = connecttodb;