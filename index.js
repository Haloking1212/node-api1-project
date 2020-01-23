// implement your API here
require('dotenv').config()
const express = require("express");
const server = express();
const Db = require("./data/db");
// const port = 5000;

const port = process.env.PORT || 5000


server.use(express.json());


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
         return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
     }
    Db.insert({ name, bio })
    .then(createUser => {
        res.status(201).json(createUser)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database." })
    })
 })

//delete user -- delete request

server.delete(`/api/users/:id`, (req, res) => {
   const id = req.params.id
    Db.remove(id)
    .then(deleted => {
        if(deleted){
            res.status(204).end()
        } else {
            res.status(404).json( { message: "The user with the specified ID does not exist." } )
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The user could not be removed." })
    })
})

//update user -- put request

server.put(`/api/users/:id`, (req, res) => {
   const { name, bio } = req.body;

    const id = req.params.id
    //  if(!name || !bio) {
    //      return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    //  }
    Db.update(id,{ name, bio })
    .then(updated => {
        if(!name || !bio){
            return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        } else {
            return res.status(200).json(updated)
        }
        
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    })
})

server.listen(port, () => {
    console.log(`running on port ${port}`)
})