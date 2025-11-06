require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
const ex = require("express");
const bp = require("body-parser");
const path = require("path");
const port = process.env.PORT || 3000;
const { readFileSync } = require("node:fs");
const dir = {
  public: "../public",
};
const json_inputs = {
    json:"json/inputTypes.json"
};

// plug express into app
const app = ex();

// middleware
app.use(ex.static(path.resolve(__dirname, dir.public)));
app.use(ex.json())
app.use(ex.urlencoded({extended:true}))
app.use(bp.urlencoded({ extended: true }));

// api
app.route("/input-types").get((req, res) => {
  // method
    let readjson = readFileSync(
    require("path").resolve(__dirname, json_inputs.json),
    "utf-8"
  );
  readjson = JSON.parse(readjson);
  res.json(readjson);
});

app.route('/form/create').post((req,res) => {
    // const {text,textarea,number} = req.body;
    if(req.body && Object.keys(req.body).length > 0){
      console.log(req.body)
      res.json(req.body)
    } else {
      console.log('data not entered')
      res.send('Data not entered')
    }
})
// listen on app
app.listen(port, () => {
  console.log("Listening on port " + port);
});
