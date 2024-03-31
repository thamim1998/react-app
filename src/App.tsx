import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootComponent from './components/RootComponent/RootComponent'
import 'bootstrap/dist/css/bootstrap.min.css';
import SubfolderComponent from './components/DisplayComponent/SubfolderComponent/SubfolderComponent';


export default function App() {
  return (
     <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<RootComponent />} />
        <Route path="/:path"  element={<SubfolderComponent/>} />
      </Routes>
    </div>
  </BrowserRouter>
  )
}
