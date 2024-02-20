const express = require("express")
const app = express();
const port = 3000 || 3001;
const path = require('path');
const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route")
const systemPath = require("./config/system")
const database = require("./config/database");
const moment = require('moment')
const http = require('http');

const { Server } = require("socket.io");

require("dotenv").config();

const flash = require("express-flash")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static(`${__dirname}/public`));
// tinymce 
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// end tinymce 
app.use(flash())
app.use(cookieParser("Stringramdom"))
app.use(session({ cookie: { maxAge: 6000 } }));
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");


database.connect();


// Socket io
const server = http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
    console.log('a user connected');
});
// End socket io 

app.locals.prefixAdmin = systemPath.admin_path
app.locals.moment = moment
routeClient(app);
routeAdmin(app)
app.get("*", (req, res) => {
    res.render('client/pages/error/error.pug')
})

server.listen(port, () => {
    console.log("Successfully!");
})