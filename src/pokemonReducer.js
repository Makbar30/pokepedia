export const PokemonReducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_POKEMON":
      return {
        ...state,
        myPokemon: [...action.payload]
      };
    case "CATCH_POKEMON":
      return {
        ...state,
        myPokemon: [...state.myPokemon, action.payload],
      };

    case "SET_COUNTER":
      return {
        ...state,
        apiCallsCounter: state.apiCallsCounter + 1,
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
