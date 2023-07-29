import { useSelector } from "react-redux/es/hooks/useSelector";

const HomePages = () => {
  const trainer = useSelector((reducer) => reducer.trainer);

  console.log(trainer);

  return (
    <div>
      <h1>Pokedex</h1>
      <h2>Hi trainer</h2>
      <p>To start with the app, give me your name trainer 😊</p>
      <form >
        <input type="text" />
        <button>Gotta catch me all</button>
      </form>
    </div>
  );
};

export default HomePages;
