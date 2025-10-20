import TitleBar from './components/layout/TitleBar'
import './main.css'
import Home from './pages/Home'

function App(): React.JSX.Element {
  return <div className="h-screen flex flex-col ">
    <TitleBar/>
    <Home className="flex-1 overflow-hidden tracking-tight"/>
  </div>
}

export default App
