//PokedexPage.jsx
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useRef } from "react";
import PokeCard from "../components/pokedexPage/PokeCard";
import { useState } from "react";
import "../components/pokedexPage/styles/PokedexPage.css";

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState("");

  const trainer = useSelector((reducer) => reducer.trainer);

  const url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";

  const [pokemons, getAllPokemons] = useFetch(url);

  useEffect(() => {
    getAllPokemons();
  }, []);

  const inputSearch = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(inputSearch.current.value.trim().toLowerCase());
  };

  const cbFilter = (poke) => poke.name.includes(inputValue);

  return (
    <div className="header">
      <img src="/img/barTopPokedex.svg" alt="img" />
      <div className="container_title">
        <img src="/img/pokedex.svg" alt=""></img>
      </div>
      <div className="container_pokedex">
        <h3>
          <span className="color_span">Welcome {trainer}</span>, here you can
          find your favorite pokemon.
        </h3>
      </div>
      <div className="grid_search">
        <form className="container_search_pokemon" onSubmit={handleSubmit}>
          <input
            required
            placeholder="look for a pokemon"
            ref={inputSearch}
            type="text"
          />
          <button className="btn_pokemon">Search</button>
        </form>
      </div>
      <div>
        {pokemons?.results.filter(cbFilter).map((poke) => (
          <PokeCard key={poke.url} url={poke.url} />
        ))}
      </div>
    </div>
  );
};

export default PokedexPage;
