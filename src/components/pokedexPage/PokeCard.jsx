import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom"; // Use 'useNavigate' instead of 'useNavigation'
import "./styles/PokeCard.css";

const PokeCard = ({ url }) => {
  const [pokemon, getSinglePokemon] = useFetch(url);

  useEffect(() => {
    getSinglePokemon(); // Invoke the 'getSinglePokemon' function
  }, []);

  const navigate = useNavigate(); // Use 'useNavigate' instead of 'useNavigation'

  const handleClick = () => {
    navigate(`/pokedex/${pokemon.id}`);
  };

  // Make sure to check if 'pokemon' is not null or undefined before accessing its properties
  if (!pokemon) {
    return null; // Return null or a loading component while data is being fetched
  }

  const firstType = pokemon.types[0].type.name;

  return (
    <div className="container_pokemon">
      <article className={`pokecard ${firstType}-border`} onClick={handleClick}>
        <header className={`pokecard_header ${firstType}-gradient`}>
          <img
            className="pokecard_image"
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt="Image"
          />
        </header>
        <section className="pokecard_body">
          <h3 className={`pokecard_name ${firstType}-color`}>
            {pokemon?.name}
          </h3>
          <ul className="pokecard_types">
            {pokemon?.types.map((typeInfo) => (
              <li className="pokecard_typename" key={typeInfo.type.url}>
                {typeInfo.type.name}
              </li>
            ))}
          </ul>
          <hr className="pokecard_hr" />
          <ul className="pokecard_stats">
            {pokemon?.stats.map((statInfo) => (
              <li className="pokecard_stat" key={statInfo.stat.url}>
                <h4 className="pokecard_stat_name">{statInfo.stat.name}</h4>
                <span className={`pokecard_stat_value ${firstType}-color`}>
                  {statInfo.base_stat}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
};

export default PokeCard;
