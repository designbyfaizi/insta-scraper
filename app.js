const express = require("express");
const path = require("path");
const storyRoutes = require("./routes/story");

require('dotenv').config({path: __dirname + '/.env'})

const app = express();
const PORT = 3030;


app.use("/instagram", storyRoutes);

app.use("*", (req, res, next) => {
    console.log("404");
    res.send("404")
})


app.listen(3030, () => {
    console.log(`Server running on localhost:${PORT}`);
});
