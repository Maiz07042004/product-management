const express = require("express");
const app = express();
// Socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
global._io=io;
// End socket.io

const methodOverride = require("method-override")
app.use(methodOverride("_method"))

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
    extended: false
}));

const moment=require("moment")

const flash = require("express-flash")
const cookieParser = require("cookie-parser")
const session = require("express-session")

require("dotenv").config();
const port = process.env.PORT;

// Tiny MCE
var path = require('path');
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End Tiny MCE

const systemConfig = require("./config/system.js")

const database = require("./config/database.js")
database.connect()

// route
const routeAdmin = require("./routes/admin/index.route.js")
const route = require("./routes/client/index.route.js");

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// Flash
app.use(cookieParser("DANGTHANHMAI"))
app.use(session({
    cookie: {
        maxAge: 60000
    }
}));
app.use(flash());
// End Flash

app.use(express.static(`${__dirname}/public`));
routeAdmin(app);
route(app);

app.get("*",(req,res)=>{
    res.render("client/pages/errors/404",{
        pageTitle: "404 Not Found"
    })
})

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment=moment
server.listen(port, () => {
    console.log(port)
});