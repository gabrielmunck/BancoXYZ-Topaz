import { BancoProvider } from './contexts/BancoContext'
import Login from './components/Login'

function App() {
  return (
    <div>
      <BancoProvider>
        <Login />
      </BancoProvider>
    </div>
  )
}

export default App
