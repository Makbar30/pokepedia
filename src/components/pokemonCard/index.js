/** @jsxImportSource @emotion/react */
import React, { Fragment, useState, useContext, useEffect } from "react";
import LazyLoad from "react-lazyload";
import { css } from "@emotion/react";
import { usePalette, getPalette } from "react-palette";
import { PokemonContext } from "../../pokemonContext";
import { useHistory } from "react-router-dom";

const PokemonCard = (props) => {
  let history = useHistory();
  const {
    pokemons,
    myPokemon,
    setPokemons,
    isGoDetail,
    goDetail,
    setSelectedPokemon,
    removePokemon,
  } = useContext(PokemonContext);
  let pokemonsList = props.path === "list" ? [...pokemons] : [...myPokemon];
  // const { data } = usePalette(
  //   props.selectedPokemon.image && props.selectedPokemon.image
  // );

  const currentPokemonIndex = pokemonsList.findIndex(
    (pokemon) => pokemon.id === props.selectedPokemon.id
  );
  let countPokemon = [...myPokemon].filter(
    (pokemon) => pokemon.id === props.selectedPokemon.id
  ).length;
  const [colorsPalette, setColorsPalette] = useState(null);

  useEffect(() => {
    if (
      currentPokemonIndex >= 0 &&
      !pokemonsList[currentPokemonIndex].hasOwnProperty("colorsPalette")
    ) {
      getPalette(props.selectedPokemon.image)
        .then((color) => {
          setColorsPalette(color);
          pokemonsList[currentPokemonIndex]["colorsPalette"] = color;
        })
        .catch((err) => {
          console.log(err);
        });

      if (props.path === "list") setPokemons(pokemonsList);
    }
  }, []);

  useEffect(() => {
    if (
      pokemonsList[currentPokemonIndex] &&
      pokemonsList[currentPokemonIndex].hasOwnProperty("colorsPalette")
    ) {
      setColorsPalette(pokemonsList[currentPokemonIndex].colorsPalette);
    }
  }, []);

  const handleClick = (e) => {
    goDetail(isGoDetail);
    setSelectedPokemon(props.selectedPokemon);
    history.push(`detail/${props.selectedPokemon.id}`);
  };

  const handleRelease = async (e) => {
    let releasedPokemon = {
      id: props.selectedPokemon.idMe,
    };

    if (window.confirm(`${releasedPokemon.id} akan dilepas. Sudah yakin ? `)) {
      try {
        await removePokemon(releasedPokemon);
        alert(`${releasedPokemon.id} sudah dilepas.`);
      } catch (error) {
        console.log(error);
      }
    }
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
        position: "relative",
        // height: "100px",
        "& .imgPokemon": {
          margin: "35px 0 30px",
          height: "100px",
          "& img": {
            height: "100px",
            width: "100px",
          },
          "& h2": {
            margin: 0,
            position: "absolute",
            top: 10,
            left: 15,
            color: colorsPalette.darkMuted,
            fontSize: "15px",
          },
        },
        "& .pokemonData": {
          width: "100%",
          margin: "0%",
          textAlign: "center",
          backgroundColor: colorsPalette.darkMuted,
          "& h2": {
            margin: "10px 0 8px",
            textTransform: "capitalize",
            color: "#fff",
            fontSize: "16px",
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
            padding: "10px 0",
          },
        },
      });
      return (
        <Fragment>
          <div css={cardContainerStyle}>
            <div
              className="imgPokemon"
              onClick={(e) => handleClick(e)}
              data-testid="detail-btn"
            >
              <LazyLoad height={100}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.selectedPokemon.id}.png`}
                  alt="front"
                />
              </LazyLoad>

              {props.path === "list" && <h2>x{countPokemon}</h2>}
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
        height: "201px",
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
