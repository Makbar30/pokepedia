/** @jsxImportSource @emotion/react */
import React, { Fragment, useState, useContext, useEffect } from "react";
import { css } from "@emotion/react";
import { usePalette } from "react-palette";
import { PokemonContext } from "../../pokemonContext";
import { useHistory } from "react-router-dom";

const PokemonCard = (props) => {
  let history = useHistory();
  const {
    pokemons,
    setPokemons,
    isGoDetail,
    goDetail,
    setSelectedPokemon,
    removePokemon
  } = useContext(PokemonContext);
  let pokemonsList = [...pokemons];
  const { data } = usePalette(
    props.selectedPokemon.image && props.selectedPokemon.image
  );

  const currentPokemonIndex = pokemonsList.findIndex(
    (pokemon) => pokemon.id === props.selectedPokemon.id
  );

  useEffect(() => {
    if (
      currentPokemonIndex >= 0 &&
      Object.keys(data).length &&
      !pokemonsList[currentPokemonIndex].hasOwnProperty("colorsPalette")
    ) {
      setColorsPalette(data);
      pokemonsList[currentPokemonIndex]["colorsPalette"] = data;
      setPokemons(pokemonsList);
    }
  }, [data]);

  useEffect(() => {
    if (
      pokemonsList[currentPokemonIndex] &&
      pokemonsList[currentPokemonIndex].hasOwnProperty("colorsPalette")
    ) {
      setColorsPalette(pokemonsList[currentPokemonIndex].colorsPalette);
    }
  }, []);
  const [colorsPalette, setColorsPalette] = useState(null);

  const handleClick = (e) => {
    goDetail(isGoDetail);
    setSelectedPokemon(props.selectedPokemon);
    history.push(`detail/${props.selectedPokemon.id}`);
  };

  const handleRelease = (e) => {
    console.log(props.idCatch);
    removePokemon(props.idCatch)
  };

  const renderCard = () => {
    if (colorsPalette) {
      const cardContainerStyle = css({
        display: "flex",
        width: "45%",
        flexDirection: "column",
        margin: "10px 0",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: colorsPalette.lightVibrant,
        borderRadius: "20px",
        "& .imgPokemon": {
          margin: "35px 0 30px",
          "& img": {
            maxHeight: "100px",
          },
        },
        "& .pokemonData": {
          width: "100%",
          margin: "0%",
          textAlign: "center",
          backgroundColor: colorsPalette.darkMuted,
          "& .pokemonName": {
            margin: "10px 0 8px",
            textTransform: "capitalize",
            color: "#fff",
            fontSize: "18px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            padding: "0 13px",
          },
        },
        "& .releaseContainer": {
            width: "100%",
            margin: "0%",
            textAlign: "center",
            backgroundColor: colorsPalette.darkMuted,
            "& button": {
                width: "100%",
                backgroundColor: colorsPalette.darkMuted,
                border: "0px",
                color: "white",
                fontsize: "20px",
                padding: "10px 0"
            },
          },
      });
      return (
        <Fragment>
          <div css={cardContainerStyle}>
            <div className="imgPokemon" onClick={(e) => handleClick(e)}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.selectedPokemon.id}.png`}
                alt="front"
              />
            </div>
            <div className="pokemonData">
              <h2 className="pokemonName">
                #{props.selectedPokemon.id} {props.selectedPokemon.name}
              </h2>
              {props.selectedPokemon.nickname && (
                <h2 className="pokemonName">
                  ({props.selectedPokemon.nickname})
                </h2>
              )}
            </div>
            {props.selectedPokemon.nickname && (
              <div className="releaseContainer">
                <button type="button" onClick={(e) => handleRelease(e)}>
                Release Pokemon
                </button>
              </div>
            )}
          </div>
        </Fragment>
      );
    } else {
      const cardContainerStyle = css({
        display: "flex",
        width: "45%",
        height: "100px",
        margin: "10px 0",
        backgroundColor: "grey",
        borderRadius: "20px 20px 0 0",
      });
      return (
        <Fragment>
          <div css={cardContainerStyle}></div>
        </Fragment>
      );
    }
  };

  return renderCard();
};

export default PokemonCard;
