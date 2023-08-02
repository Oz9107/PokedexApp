import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import PokeCard from "../components/pokedexPage/PokeCard";
import { debounce } from "lodash";
import "../components/pokedexPage/styles/PokedexPage.css";
import SelectType from "../components/pokedexPage/SelectType";
import { Link } from "react-router-dom";

const PokedexPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("allPokemons");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const trainer = useSelector((reducer) => reducer.trainer);

  const itemsPerPage = 20;

  const url = `https://pokeapi.co/api/v2/pokemon?offset=${
    (currentPage - 1) * itemsPerPage
  }&limit=${itemsPerPage}`;

  const [pokemons, getAllPokemons, getPokemonsByType] = useFetch(url);

  useEffect(() => {
    if (selectValue === "allPokemons") {
      getAllPokemons();
    } else {
      getPokemonsByType(selectValue);
    }
  }, [selectValue, currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(pokemons?.count / itemsPerPage));
  }, [pokemons]);

  const inputSearch = useRef();

  const handleSearch = debounce(() => {
    setInputValue(inputSearch.current.value.trim().toLowerCase());
    setCurrentPage(1);
  }, 300);

  const handleSearchButtonClick = (e) => {
    e.preventDefault(); // Prevenir el envío del formulario
    setInputValue(inputSearch.current.value.trim().toLowerCase());
    setCurrentPage(1);
  };

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  const getPageRange = () => {
    const totalPagesToShow = 5;
    const totalPageGroups = Math.ceil(totalPages / totalPagesToShow);
    const currentPageGroup = Math.ceil(currentPage / totalPagesToShow);

    const startPage = (currentPageGroup - 1) * totalPagesToShow + 1;
    const endPage = Math.min(startPage + totalPagesToShow - 1, totalPages);

    return { startPage, endPage, totalPageGroups };
  };

  const { startPage, endPage } = getPageRange();

  const handleNextGroup = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 5, totalPages));
  };

  const handlePrevGroup = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 5, 1));
  };

  const cbFilter = (poke) => poke.name.includes(inputValue);

  return (
    <article className="header">
      <img src="/img/barTopPokedex.svg" alt="img" />
      <div className="container_title">
        {/* Link es un componente y debe ser importado */}
        <Link to="/">
          <img src="/img/pokedex.svg" alt="title"></img>
        </Link>
      </div>
      <div className="container_pokedex">
        <h3>
          <span className="color_span">Welcome {trainer}</span>, here you can
          find your favorite pokemon.
        </h3>
      </div>
      <div className="grid_search">
        <form
          className="container_search_pokemon"
          onSubmit={handleSearchButtonClick}
        >
          <input
            placeholder="look for a pokemon"
            ref={inputSearch}
            type="text"
            onChange={handleSearch}
          />
          <button type="submit" className="btn_pokemon">
            Search
          </button>
        </form>
        <SelectType setSelectValue={setSelectValue} />
      </div>

      <div className="target">
        {pokemons?.results.filter(cbFilter).map((poke) => (
          <PokeCard key={poke.url} url={poke.url} />
        ))}
      </div>

      <div className="pagination">
        {currentPage > 1 && (
          <button
            className="pagination-button"
            onClick={() => handlePrevGroup()}
          >
            {"<"}
          </button>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const pageNumber = startPage + index;
          return (
            <button
              className={`pagination-button ${
                pageNumber === currentPage ? "active" : ""
              }`}
              key={pageNumber}
              onClick={() => handlePaginationChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        {currentPage < totalPages && (
          <button
            className="pagination-button"
            onClick={() => handleNextGroup()}
          >
            {"+"}
          </button>
        )}
      </div>
    </article>
  );
};

export default PokedexPage;
