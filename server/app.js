const ex = require('express');
const bp = require('body-parser')
const path = require('path')
const port = process.env.PORT || 3000;
const dir = {
    public:'../public'
}

// plug express into app
const app = ex();



// middleware
app.use(ex.static(path.resolve(__dirname, dir.public)));
app.use(bp.urlencoded({extended:true}))



// listen on app
app.listen(port,() => {
    console.log('Listening on port ' + port)
})