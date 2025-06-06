import cheflogo from '../assets/chef-claude-logo.png';

export default function Header() {
    return (
        <header>
            <img src={cheflogo} alt="Chef GPT Logo"/>
            <h1>Chef GPT</h1>   
        </header>
    )
}