import React, { createContext, useReducer, useEffect } from "react";
import { PokemonReducer } from "./pokemonReducer";

const initialState = {
  myPokemon: [],
  pokemons: [],
  selectedPokemon: null,
  apiCallsCounter: 0,
  isGoDetail: false,
};

export const PokemonContext = createContext(initialState);
export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PokemonReducer, initialState);

  useEffect(() => {
    const listMyPokemon = JSON.parse(window.localStorage.getItem("MY_POKEMON"));
    if (listMyPokemon) {
      refreshMyPokemon(listMyPokemon);
    }
  }, []);
  function removePokemon(selectedPokemon) {
    dispatch({
      type: "REMOVE_POKEMON",
      payload: selectedPokemon,
    });
  }

  function setPokemons(pokemons) {
    dispatch({
      type: "SET_POKEMONS",
      payload: pokemons,
    });
  }

  function refreshMyPokemon(pokemons) {
    dispatch({
      type: "REFRESH_MY_POKEMON",
      payload: pokemons,
    });
  }

  function setSelectedPokemon(pokemon) {
    window.localStorage.setItem("POKEMON_DETAIL", JSON.stringify(pokemon))
    dispatch({
      type: "SET_SELECTED_POKEMON",
      payload: pokemon,
    });
  }

  function setApiCallsCounter(counter) {
    dispatch({
      type: "SET_COUNTER",
      payload: counter,
    });
  }

  function goDetail(flag) {
    dispatch({
      type: "SET_FLAG_GO_DETAIL",
      payload: flag,
    });
  }

  function catchPokemon(pokemon) {
    let myPokemon = [...state.myPokemon];
    let newPokemon = pokemon;
    if (newPokemon.nickname === "") {
      throw new Error("Nickname kosong");
    }
    myPokemon = myPokemon.filter(
      (pokemon) =>
        pokemon.name === newPokemon.name &&
        pokemon.nickname === newPokemon.nickname
    );

    if (myPokemon && myPokemon.length > 0) {
      throw new Error(
        "Pokemon dengan nickname itu sudah ada , tolong ganti nickname yang lain"
      );
    } else {
      dispatch({
        type: "CATCH_POKEMON",
        payload: pokemon,
      });
    }
  }

  return (
    <PokemonContext.Provider
      value={{
        myPokemon: state.myPokemon,
        pokemons: state.pokemons,
        apiCallsCounter: state.apiCallsCounter,
        isGoDetail: state.isGoDetail,
        selectedPokemon: state.selectedPokemon,
        setSelectedPokemon,
        refreshMyPokemon,
        setApiCallsCounter,
        setPokemons,
        goDetail,
        removePokemon,
        catchPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
