import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootComponent from './components/RootComponent/RootComponent'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  return (
     <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<RootComponent />} />
      </Routes>
    </div>
  </BrowserRouter>
  )
}
