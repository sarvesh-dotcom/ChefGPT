import React from "react"
import GptRecipe from "./GptRecipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromMistral } from "../ai"
import Loading from "./Loading"


export default function Main() {

    const [ingredients, setIngredients] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [recipe , setRecipe] = React.useState('')

    async function getRecipe(){
        setLoading(true)
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
        setLoading(false)
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        if (newIngredient === "") alert("Please enter an ingredient")
        else setIngredients(prevIngredients => [...prevIngredients, newIngredient])

    }

    

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && 
            <IngredientsList 
                ingredients= {ingredients} 
                recipe = {getRecipe}
                />  }
            {loading && <Loading />} 
            {!loading && recipe && <GptRecipe recipe={recipe} />}
        </main>
    )
}