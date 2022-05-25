const dotenv = require('dotenv')
dotenv.config();
const express = require("express");
const app = express();
const server = require("./src/connection/mongoDb")
const cookie = require('cookie-parser');
app.use(cookie());
app.use(express.json());

//main route require
const mainRoute = require("./src/routes/masterRoute");
//main file use
server()
app.use(mainRoute)


const port = process.env.PORT
app.listen(port, () => console.log(`Server Start on port ${port}`));    