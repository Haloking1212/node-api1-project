// implement your API here
const express = require("express");
const server = express();
const Db = require("./data/db");
const port = 5000;


server.use(express.json());

server.listen(port, () => {
    console.log(`api is running on port ${port}`)
 })

 //getting all users -- get request

 server.get("/api/users", (req, res) => {
     Db.find()
     .then(users => {
         res.status(200).json(users)
     })
     .catch( err => {
         res.status(500).json({ errorMessage: "The users information could not be retrieved." })
     })
 })

 server.get("/api/users/:id", (req, res) => {
    if(!req.id) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." })
    }

    Db.findById(id)
    .then(userId => {
        res.status(200).json(userId)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The user information could not be retrieved."  })
    })
 })

 //create users -- post request

 server.post("/api/users", (req, res) => {
     const { name, bio } = req.body

     if(!name || !bio) {
         return res.status(500).json({ errorMessage: "Please provide name and bio for the user." })
     }
    Db.insert({ name, bio })
    .then(createUser => {
        res.status(201).json(createUser)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database." })
    })
 })
