import SocketProvider from "./context/SocketContext"
import MapPage from "./pages/MapPage"

const App = () => {
  return (
    <AppState>
      <MapPage />
    </AppState>
  )
}

const AppState = ({children}) => {
  return (
    <SocketProvider>
      {children}
    </SocketProvider>
  )
}

export default App
