const mongoose = require("mongoose");
const dotenv = require("dotenv")
const app = require("./app")

const DB = process.env.DATABASE.replace("<PASS>", process.env.DATABASE_PASS)

mongoose
    .connect(DB)
    .then(() => {
        console.log("server connected")
    })
    .catch((err) => {
        console.log("server not connected:", err)
    });

const port = process.env.PORT || 5173


app.listen(port, () => {
    console.log(`app is listening on ${port}`);
})