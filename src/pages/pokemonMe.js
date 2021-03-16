/** @jsxImportSource @emotion/react */
import React, { Fragment, useContext } from "react";
import { PokemonContext } from "../pokemonContext";
import { MenuBar, PokemonCard } from "../components/";
import { css } from "@emotion/react";

const PokemonMe = () => {
  const { myPokemon } = useContext(PokemonContext);
  return (
    <Fragment>
      <div css={containerStyle}>
        <MenuBar />
        {myPokemon.length > 0 ? (
          <Fragment>
            {myPokemon &&
              myPokemon.map((pokemon,index) => (
                <PokemonCard key={pokemon.id} selectedPokemon={pokemon} idCatch={index}/>
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
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
});

export default PokemonMe;
