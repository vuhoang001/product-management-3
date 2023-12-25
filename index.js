const express = require("express")
const app = express();
const port = 3000 || 3001;
const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route")
const systemPath = require("./config/system")
const database = require("./config/database");
require("dotenv").config();

app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "pug");

database.connect();

app.locals.prefixAdmin = systemPath.admin_path
routeClient(app);
routeAdmin(app)
app.listen(port, () => {
    console.log("Successfully!");
})