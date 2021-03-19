export const PokemonReducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_MY_POKEMON":
      return {
        ...state,
        myPokemon: [...action.payload],
      };
    case "REMOVE_POKEMON":
      let myPokemon = [...state.myPokemon];
      let selectedPokemon = action.payload;
      myPokemon = myPokemon.filter(
        (pokemon) => pokemon.idMe !== selectedPokemon.id
      );
      window.localStorage.setItem("MY_POKEMON", JSON.stringify([...myPokemon]));
      return {
        ...state,
        myPokemon: [...myPokemon],
      };
    case "CATCH_POKEMON":
      window.localStorage.setItem(
        "MY_POKEMON",
        JSON.stringify([...state.myPokemon, action.payload])
      );
      return {
        ...state,
        myPokemon: [...state.myPokemon, action.payload],
      };

    case "SET_COUNTER":
      return {
        ...state,
        apiCallsCounter: action.payload,
      };
    case "SET_FLAG_GO_DETAIL":
      return {
        ...state,
        isGoDetail: !state.isGoDetail,
      };
    case "SET_POKEMONS":
      return {
        ...state,
        pokemons: [...action.payload],
      };
    case "SET_SELECTED_POKEMON":
      return {
        ...state,
        selectedPokemon: action.payload,
      };
    default:
      return state;
  }
};
