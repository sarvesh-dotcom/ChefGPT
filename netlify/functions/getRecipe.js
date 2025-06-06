const { InferenceClient } = require('@huggingface/inference');

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a 
recipe they could make with some or all of those ingredients. You don't need to use every 
ingredient they mention in your recipe. The recipe can include additional ingredients they 
didn't mention, but try not to include too many extra ingredients. Format your response in 
markdown to make it easier to render to a web page`;

exports.handler = async function(event) {
  try {
    const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

    if (!HF_ACCESS_TOKEN) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing HF_ACCESS_TOKEN environment variable" }),
      };
    }

    const hf = new InferenceClient(HF_ACCESS_TOKEN);

    // Parse ingredients from POST request body
    const { ingredients } = JSON.parse(event.body);
    const ingredientsString = ingredients.join(', ');

    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
      ],
      max_tokens: 1024,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ recipe: response.choices[0].message.content }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
