//HomePages.jsx
import { useRef } from "react"; // Importa useRef desde react
import { useSelector, useDispatch } from "react-redux";
import { setTrainerG } from "../store/slices/trainer.slice";
import { useNavigate } from "react-router-dom";
import "../components/pokedexPage/styles/HomePages.css";

const HomePages = () => {
  const trainer = useSelector((reducer) => reducer.trainer);

  console.log(trainer);

  const inputTrainer = useRef(); // Usa useRef para inputTrainer
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerG(inputTrainer.current.value.trim()));
    navigate("/pokedex");
  };

  return (
    <div className="container">
      <div className="container_info">
        <img src="/img/pokedex.svg" alt="" />
        <div className="container_text">
          <h1 className="title">Hi trainer</h1>
          <h2>To start with the app, give me your name trainer 😊</h2>
        </div>
        <form className="container_input_name" onSubmit={handleSubmit}>
          <input
            id="inputTrainer"
            required
            placeholder="Your name..."
            ref={inputTrainer}
            type="text"
          />
          <button className="btn_name">Start!</button>
        </form>
      </div>
      <img className="container_bar" src="/img/barPokedex.svg" alt="" />
    </div>
  );
};

export default HomePages;
