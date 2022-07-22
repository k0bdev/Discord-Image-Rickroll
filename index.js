const Express = require("express");
const app = Express();
var config = require("./config.json");

app.use("/", (req, res, next) => {
  if (req.path == "/") {
    return config["main-page-redirect-url"] == "" ? next() : res.redirect(config["main-page-redirect-url"]);
  }
  next();
})

app.use("/attachment/:id1/:id2/:imagename", (req, res, next) => {
  if(!req.params.id1 || !req.params.id2 || !req.params.imagename) {
    return next();
  }
  var e = [req.params.id1, req.params.id2];
  var results = [];
  e.forEach((i) => {
    /^(\d{17,19})$/.test(i) ? results.push(i) : null;
  })
  var ext = req.params.imagename.split(".").pop().toLowerCase();
  if (results.length !== 2 || !["png", "jpg", "jpeg", "gif"].includes(ext)) return next();
  if (req.headers["user-agent"].includes("Discordbot") || req.headers["user-agent"].includes("Macintosh")) return res.sendFile(__dirname + '/image.png');

  res.redirect("https://youtu.be/iik25wqIuFo");
})

app.use((req, res) => {
  return res.status(404).redirect(config["error-page-redirect-url"] || "https://discord.com")
})


app.listen(8080)