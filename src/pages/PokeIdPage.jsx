//PokeIdPages.jsx
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import "../components/pokedexPage/styles/PokeIdPages.css";

const PokeIdPages = () => {
  const { id } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const [pokemon, getSinglePokemon] = useFetch(url);

  useEffect(() => {
    getSinglePokemon();
  }, [id]);

  // Verificamos si 'pokemon' está definido antes de acceder a sus propiedades
  if (!pokemon) {
    return <div>Loading...</div>; // Muestra un componente de carga mientras se obtienen los datos
  }

  return (
    <>
      <div>
        <img src="/img/barTopPokedex.svg" alt="img" />
        <div className="container_title">
          <img src="/img/pokedex.svg" alt=""></img>
        </div>
      </div>
      <article id="head">
        <div className="StylePokemon">
          <img
            src={pokemon.sprites?.other?.["official-artwork"]?.front_default}
            alt="Image"
          />
          <div className="StylePokemon_text">
            <h2>{pokemon.name}</h2>
            <p>Base Experience: {pokemon.base_experience}</p>
            <p>
              Best Attack:{" "}
              {pokemon.moves ? pokemon.moves[0].move.name : "No move"}
            </p>
            <p>Stats:</p>
            <p>HP: {pokemon.stats ? pokemon.stats[0].base_stat : "No stats"}</p>
            <p>
              Attack: {pokemon.stats ? pokemon.stats[1].base_stat : "No stats"}
            </p>
            <p>
              Defense: {pokemon.stats ? pokemon.stats[2].base_stat : "No stats"}
            </p>
            <p>
              Type: {pokemon.types ? pokemon.types[0].type.name : "No name"}
            </p>
          </div>
        </div>
      </article>
    </>
  );
};

export default PokeIdPages;
