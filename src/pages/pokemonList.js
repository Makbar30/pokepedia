/** @jsxImportSource @emotion/react */
import React, { useContext, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { PokemonCard, MenuBar } from "../components";
import { css } from "@emotion/react";
import { PokemonContext } from "../pokemonContext";

const PokemonList = () => {
  const [callingApi, setcallingApi] = useState(false);
  const {
    pokemons,
    setPokemons,
    apiCallsCounter,
    setApiCallsCounter,
    isGoDetail,
    goDetail,
  } = useContext(PokemonContext);

  const handleScroll = (event) => {
    const bottomMargin = event.srcElement.documentElement.offsetHeight - 20;
    if (
      window.pageYOffset + window.innerHeight >= bottomMargin &&
      !callingApi
    ) {
      setcallingApi(true);
    }
  };

  const GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        count
        next
        previous
        status
        message
        results {
          id
          url
          name
          image
        }
      }
    }
  `;

  let gqlVariablesPokemons = {
    limit: 10,
    offset: apiCallsCounter * 10,
  };
  const { error, data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: gqlVariablesPokemons,
  });

  useEffect(() => {
    if (data && !isGoDetail) {
      let pokemonsList = [...JSON.parse(JSON.stringify(data.pokemons.results))];
      setPokemons([...pokemons, ...pokemonsList]);
    }
    if (isGoDetail) goDetail(isGoDetail);
  }, [data]);

  useEffect(() => {
    if (callingApi) {
      setApiCallsCounter(apiCallsCounter + 1);
    }
  }, [callingApi]);

  useEffect(() => {
    if (apiCallsCounter > 0) {
      fetchMore({ variables: gqlVariablesPokemons }).then((results) => {
        setcallingApi(false);
      });
    }
  }, [apiCallsCounter]);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      handleScroll(e);
    });
  }, []);

  if (error) return `Error! ${error.message}`;

  return (
    <div css={containerStyle}>
      <MenuBar />
      {pokemons &&
        pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} selectedPokemon={pokemon} path="list" />
        ))}
    </div>
  );
};

const containerStyle = css({
  margin: "10px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
});
export default PokemonList;
