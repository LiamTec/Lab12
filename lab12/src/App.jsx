import { BrowserRouter, Routes , Route } from "react-router-dom"
import LoginPage  from "./pages/LoginPage"
import HomeePage from "./pages/HomPage"
import SeriePage from "./pages/SeriePage"
import SerieFormPage from "./pages/serie/SerieFormPage"
import SerieFormEditPage from "./pages/serie/Serie.EditFromPage"
import CategoryPage from "./pages/CategoryPage"
import CategoryFormPage from "./pages/category/CategoryFormPage"
import CategoryEditFormPage from "./pages/category/CategoryEditFormPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/home" element={<HomeePage/>} />
        <Route path="/series" element={<SeriePage/>} />
        <Route path="/series/new" element={<SerieFormPage/>} />
        <Route path="/series/edit/:id" element={<SerieFormEditPage />} />
        <Route path="/categories" element={<CategoryPage/>} />
        <Route path="/categories/new" element={<CategoryFormPage />} />
        <Route path="/categories/edit/:id" element={<CategoryEditFormPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
