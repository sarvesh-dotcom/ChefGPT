import ReactMarkdown from 'react-markdown';


export default function GptRecipe(props) {
    {console.log(props.recipe)}
       return ( <section className="suggested-recipe-container" aria-live="polite">
            <h2>Chef GPT Recommends:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
       )
}

