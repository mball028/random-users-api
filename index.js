const express = require("express");

route = require("./routes/routes");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(__dirname + "/public"));

app.get("/", route.index);
app.get("/users", route.api);

app.listen(3000);
