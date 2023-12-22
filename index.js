const express = require("express")
const app = express();
const port = 3000 || 3001;
const routeClient = require("./routes/client/index.route")

require("dotenv").config();
app.set("views", "./views")
app.set("view engine", "pug")

routeClient(app)

app.listen(port, () => {
    console.log("Successfully!")
})