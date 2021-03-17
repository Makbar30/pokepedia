/** @jsxImportSource @emotion/react */
import React, { Fragment, useContext, useState, useEffect } from "react";
import { PokemonContext } from "../pokemonContext";
import { MenuBar, PokemonCard } from "../components/";
import { css } from "@emotion/react";

const PokemonMe = () => {
  const { myPokemon, setApiCallsCounter, setPokemons } = useContext(PokemonContext);
  const [listMyPokemon, setListMyPokemon] = useState(null);
  
  useEffect(()=>{
    setListMyPokemon(myPokemon)
    setApiCallsCounter(0)
    setPokemons([])
  },[myPokemon])
  
  return (
    <Fragment>
      <div css={containerStyle}>
        <MenuBar />
        {listMyPokemon && listMyPokemon.length > 0 ? (
          <Fragment>
            {listMyPokemon &&
              listMyPokemon.map((pokemon,index) => (
                <PokemonCard key={pokemon.id} selectedPokemon={pokemon} idCatch={index} path="me"/>
              ))}
          </Fragment>
        ) : (
          <Fragment>Tidak Ada Pokemon</Fragment>
        )}
      </div>
    </Fragment>
  );
};

const containerStyle = css({
  margin: "10px",
  height: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  alignItems:"center",
  textAlign: "center"
});

export default PokemonMe;
