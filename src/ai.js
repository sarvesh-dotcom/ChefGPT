export async function getRecipeFromMistral(ingredientsArr) {
  const res = await fetch('/.netlify/functions/getRecipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients: ingredientsArr })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Server error: ${err.error}`);
  }

  const data = await res.json();
  return data.recipe;
}