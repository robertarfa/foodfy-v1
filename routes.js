const express = require('express')
const routes = express.Router()
const data = require('./data.json')
const recipes = require('./controllers/admRecipe')

routes.get('/', function (req, res) {
    res.render('index', { recipes: data.recipes })
})

routes.get('/about', function (req, res) {
    res.render('about')
})

routes.get('/recipes-page', function (req, res) {
    res.render('recipes-page', { recipes: data.recipes })
})

routes.get('/recipes/:id', function (req, res) {
    const { id } = req.params

    const foundRecipe = data.recipes.find(function (recipe) {
        return recipe.id == id
    })

    if (!foundRecipe) return res.send('Receita não encontrada!')

    res.render('recipes', { recipe: foundRecipe })
})

routes.get("/admin", function (req, res) {
    res.redirect('/admin/recipes')
})

routes.get("/admin/recipes", recipes.index) // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create) // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show) // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit) // Mostrar formulário de edição de receita
routes.post("/admin/recipes", recipes.post) // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put) // Editar uma receita
routes.delete("/admin/recipes", recipes.delete) // Deletar uma receita

module.exports = routes