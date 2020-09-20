var express = require("express");
var path = require("path")
var fs = require('fs')
var notes; 


var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


var savedNotes = fs.readFileSync("./db/db.json", "UTF-8");
if (savedNotes) {
    var oldNotes = JSON.parse(savedNotes);
    notes = oldNotes;
} else {
    notes = [];
}



app.get("/api/notes", function(req, res) {

    console.log("bottom one")
    return res.json(notes);
  });

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    console.log(newNote);
    notes.push(newNote);
    res.json(newNote);
    assignID();
    fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2), function (err) {
        if (err) 
            throw err
    });
});


app.delete("/api/notes/:id", function (req, res) {
    console.log(req.params.id);
    var deleteID = req.params.id;
    notes.splice(deleteID, 1);
    assignID();
    fs.writeFileSync("./db/db.json", JSON.stringify(notes), function (err) {
        if (err) 
            throw err
        });
    res.json({deletion:"success"})
});

function assignID() {
    for (i = 0; i < notes.length; i ++) {
        notes[i].id = i;
    }
}


app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "public/index.html"));
})

//starts server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });