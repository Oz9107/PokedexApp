//PokeIdPages.jsx
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

const PokeIdPages = () => {
  const { id } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const [pokemon, getSinglePokemon] = useFetch(url);

  useEffect(() => {
    getSinglePokemon();
  }, [id]);


  return (
    <article>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt="Image"
      />
      <h2>{pokemon.name}</h2>
    </article>
  );
};

export default PokeIdPages;
