const express = require("express")
const app = express();
const port = 3000 || 3001;
const path = require('path');
const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route")
const systemPath = require("./config/system")
const database = require("./config/database");
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

app.locals.prefixAdmin = systemPath.admin_path
routeClient(app);
routeAdmin(app)
app.listen(port, () => {
    console.log("Successfully!");
})