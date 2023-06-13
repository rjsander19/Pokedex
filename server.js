const express = require("express")
const methodOverride = require("method-override")
const app = express()
const pokemon = require("./models/pokemon.js")
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }))

app.use(methodOverride("_method"))

//INDUCES

//I is for index
app.get("/pokemon/", (req, res) => {
  res.render("index.ejs", { allPokemon: pokemon })
})


//N is for New
app.get("/pokemon/new", (req, res) => {
  res.render("new.ejs")
})


//D is for delete
app.delete("/pokemon/:indexOfPokemonArray", (req, res) => {
  pokemon.splice(req.params.indexOfPokemonArray, 1)
  res.redirect("/pokemon") //redirect back to index route
})

//U is for update
app.put("/pokemon/:indexOfPokemonArray", (req, res) => {
  updatedOnce=true;
  pokemon[req.params.indexOfPokemonArray] = req.body
res.redirect("/pokemon") //redirect to the index page
})

//C is for Create
app.post("/pokemon", (req, res) => {
  pokemon.push(req.body)
res.redirect('/pokemon')
})

//E is for edit
app.get("/pokemon/:indexOfPokemonArray/edit", (req, res) => {
  res.render(
    "edit.ejs", //render views/edit.ejs
    {
      //pass in an object that contains
      pokemon: pokemon[req.params.indexOfPokemonArray], //the fruit object
      index: req.params.indexOfPokemonArray, //... and its index in the array
    }
  )
  res.redirect("/pokemon") //redirect to the index page 
})

//S is for show 
app.get("/pokemon/:indexOfPokemonArray", (req, res) => {
  res.render("show.ejs", {pokemon: pokemon[req.params.indexOfPokemonArray]})
})

app.listen(3000, () => {
  console.log("listening")
})


