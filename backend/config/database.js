const mongose = require("mongoose")

const database = () => {
    mongose.connect(`${process.env.DB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("connected to databse")
        }).catch((err) => {
            console.log(err)
        })
}

module.exports = database