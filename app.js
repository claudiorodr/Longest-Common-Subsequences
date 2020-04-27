const printlcs = require('./printlcs')
const lcs = require('./lcs')
const express = require('express')
const fs = require('fs')
const upload = require('express-fileupload')
const app = express()
const port = process.env.PORT || 3000

var v, w

app.use(express.static(__dirname + '/public'));

app.use(upload()) // In order to use file upload module

app.listen(port, () => console.log(`Example app listening on port ` + port + `!: ` + `http://127.0.0.1:3000`))

app.get('/', (req, res) => res.redirect("/lcs.html")) //Getting HTML from file

app.get('/lcs.html', (req, res) => res.sendFile(__dirname + "/lcs.html")) //Getting HTML from file

app.get('/printlcs.html', (req, res) => res.sendFile(__dirname + "/printlcs.html")) //Getting HTML from file

app.post('/lcs.html', function (req, res) { //When posting from this route, from the form
    handleRequest("lcs", req, res);
})

app.post('/printlcs.html', function (req, res) { //When posting from this route, from the form
    handleRequest("printlcs", req, res);
})

function handleRequest(type, req, res) {
    var filename = req.files.file.name //Uploaded filename
    var path = './files/' + filename //Move file to local server path

    var filename2 = req.files.file2.name //Uploaded filename
    var path2 = './files/' + filename2 //Move file to local server path

    var m = req.body.m //Uploaded filename
    var n = req.body.n //Uploaded filename


    req.files.file.mv(path, function (err) { //Moving file to specified local path
        if (err)
            res.send(err)
    })

    req.files.file2.mv(path2, function (err) { //Moving file to specified local path
        if (err)
            res.send(err)
        else {
            try {
                readDNA(path, m, path2, n) //if successfully completed start reading file
            } catch (e) {
                console.error(e)
            }
            const file = `${__dirname}/filesWrite.txt`;
            if (type == "lcs") {
                lcs.main(v, w, res)
            } else {
                printlcs.main(v, w, res)
            }
        }
    })
}

function readDNA(path, m, path2, n) {

    var contents = fs.readFileSync(path, 'utf8') //Opening file 
    var contents2 = fs.readFileSync(path2, 'utf8') //Opening file 

    v = contents.substring(0, m).split("")
    w = contents2.substring(0, n).split("")

    // fs.writeFileSync("./filesWrite.txt",
    //     ""
    // );
}