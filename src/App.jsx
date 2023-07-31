//a
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePages from "./pages/HomePages";
import PokedexPage from "./pages/PokedexPage";
import PokeIdPages from "./pages/PokeIdPage";
import Page404 from "./pages/Page404";
import ProtectedRoutes from "./pages/ProtectedRoutes";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<PokedexPage />} />
          <Route path="/pokedex/:id" element={<PokeIdPages />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
