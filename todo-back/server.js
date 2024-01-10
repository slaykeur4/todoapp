// Create express app
var express = require("express")

var app = express()
var db = require("./database.js")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});


app.get("/api/todos", (req, res, next) => {
    var sql = "select * from todo"
    var params = []
    console.log('db')
    console.log(db)
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.log('err');
            console.log(err);
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/api/todo/", (req, res, next) => {
    var errors=[]
    if (!req.body.name){
        errors.push("No name specified");
    }
    var data = {
        name: req.body.name,
    }
    var sql ='INSERT INTO todo (name) VALUES (?)'
    var params =[data.name]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.delete("/api/todo/:id", (req, res, next) => {
    db.run(
        'DELETE FROM todo WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
