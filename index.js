const app = require('./app')
const { config } = require("dotenv");

// config
config({ path: "./config.env" });
const PORT = process.env.PORT || 3000;



// server static files


// Routing
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("app is running " + PORT);
});
