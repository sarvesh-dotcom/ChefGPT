import { createRoot } from 'react-dom/client'
import Header from './components/Header'
import Main from './components/MainContent'

createRoot(document.getElementById('root')).render(
  <>
    <Header />
    <Main />
  </>
)
