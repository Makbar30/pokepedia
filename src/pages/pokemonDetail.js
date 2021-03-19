/** @jsxImportSource @emotion/react */
import React, { Fragment, useState, useEffect, useContext } from "react";
import { css } from "@emotion/react";
import { gql, useQuery } from "@apollo/client";
import { PokemonContext } from "../pokemonContext";
import { Redirect } from "react-router-dom";

const renderTypes = (types) => {
  const typesName = types.map((typeItem) => typeItem.type.name);
  return typesName.map((typeName, index) => (
    <span className="pokemonType" key={index}>
      {typeName}
    </span>
  ));
};

const renderAbilities = (abilities) => {
  const abilitiesName = abilities.map(
    (abilityItem) => abilityItem.ability.name
  );
  return abilitiesName.map((abilityName, index) => (
    <span className="pokemonAbility" key={index}>
      {abilityName}
    </span>
  ));
};

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState(null);
  const { selectedPokemon, catchPokemon } = useContext(PokemonContext);
  const queryName = selectedPokemon ? selectedPokemon.name : "";

  const GET_POKEMONS_DETAIL = gql`
    query pokemon($name: String!) {
      pokemon(name: $name) {
        id
        name
        height
        weight
        abilities {
          ability {
            name
          }
        }
        moves {
          move {
            name
          }
        }
        types {
          type {
            name
          }
        }
        sprites {
          front_default
          back_default
        }
        stats {
          base_stat
          stat {
            name
          }
        }
        message
        status
      }
    }
  `;

  let gqlVariablesPokemons = {
    name: queryName,
  };

  const { error, data, loading } = useQuery(GET_POKEMONS_DETAIL, {
    variables: gqlVariablesPokemons,
  });

  useEffect(() => {
    if (data) {
      let pokemon = JSON.parse(JSON.stringify(data.pokemon));
      setPokemon({
        ...pokemon,
        ...selectedPokemon,
      });
    }
  }, [data]);

  if (loading) return "Loading ...";
  if (error) return `Error ${error}`;

  const tryCatchPokemon = () => {
    if (Math.random() >= 0.5) {
      return true;
    } else {
      alert("Ouch, Gagal ditangkap , Coba lagi yuk");
      return false;
    }
  };

  const renderDetail = () => {
    if (selectedPokemon && pokemon) {
      const detailStyle = css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: pokemon.colorsPalette.lightVibrant,
        "& .imgPokemon": {
          margin: "35px 0 30px",
          "& img": {
            maxHeight: "250px",
          },
        },
        "& .pokemonData": {
          width: "100%",
          margin: "0%",
          textAlign: "center",
          backgroundColor: pokemon.colorsPalette.darkMuted,
          borderRadius: "20px 20px 0 0",
          "& .pokemonName": {
            margin: "10px 0 8px",
            textTransform: "capitalize",
            color: "#fff",
            fontSize: "20px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            padding: "0 13px",
          },
          "& .typeContainer": {
            backgroundColor: "rgba(255,255,255,0.05)",
            fontSize: "0.92em",
            "& .pokemonType": {
              margin: "4px",
              display: "inline-block",
              padding: "3px 8px 5px",
              color: "#fff",
            },
          },
          "& .abilityContainer": {
            backgroundColor: "rgba(255,255,255,0.08)",
            fontSize: "0.92em",
            "& .pokemonAbility": {
              margin: "4px",
              display: "inline-block",
              padding: "3px 8px 5px",
              color: "#fff",
            },
          },
        },
        "& .pokemonBody": {
          width: "100%",
          display: "grid",
          gridTemplateColumns: "auto auto",
          textAlign: "center",
          margin: 0,
          padding: "10px 0",
          backgroundColor: "white",
          "& h2": {
            fontSize: "15px",
            margin: 0,
          },
          "& h2:nth-of-type(odd)": {
            borderRight: `5px solid ${pokemon.colorsPalette.darkMuted}`,
          },
        },
        "& .pokemonStat": {
          width: "100%",
          textAlign: "center",
          margin: 0,
          backgroundColor: "white",
          "& h2": {
            fontSize: "18px",
            margin: 0,
            padding: "10px 0 8px",
            backgroundColor: pokemon.colorsPalette.darkMuted,
            color: "white",
          },
          "& .statRow": {
            display: "grid",
            gridTemplateColumns: "45% 55%",
            "& h5": {
              fontSize: "15px",
              margin: 10,
            },
            "& h5:nth-of-type(even)": {
              backgroundColor: pokemon.colorsPalette.darkMuted,
              borderRadius: "20px",
              color: "white",
            },
          },
        },
        "& .pokemonMoves": {
          width: "100%",
          textAlign: "center",
          margin: 0,
          backgroundColor: "white",
          paddingBottom: "65px",
          "& h2": {
            fontSize: "18px",
            margin: 0,
            padding: "10px 0 8px",
            backgroundColor: pokemon.colorsPalette.darkMuted,
            color: "white",
          },
          "& .moveRow": {
            display: "grid",
            gridTemplateColumns: "50% 50%",
            "& h5": {
              fontSize: "15px",
              margin: 10,
              textAlign: "end",
            },
            "& h5:nth-of-type(even)": {
              textAlign: "start",
            },
          },
        },
        "& .catchBtn": {
          width: "100%",
          display: "flex",
          position: "fixed",
          bottom: 0,
          justifyContent: "center",
          padding: "10px 0",
          backgroundColor: "white",
          borderRadius: "20px 20px 0 0",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
          "& button": {
            width: "95%",
            backgroundColor: pokemon.colorsPalette.darkMuted,
            border: "0px",
            color: "white",
            fontsize: "20px",
            padding: "10px 0",
            borderRadius: "20px",
          },
        },
      });
      return (
        <Fragment>
          <div css={detailStyle}>
            <div className="imgPokemon">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt="front"
              />
            </div>
            <div className="pokemonData">
              <h2 className="pokemonName">{pokemon.name}</h2>
              <div className="typeContainer">
                {pokemon.types && renderTypes(pokemon.types)}
              </div>
              <div className="abilityContainer">
                {pokemon.abilities && renderAbilities(pokemon.abilities)}
              </div>
            </div>
            <div className="pokemonBody">
              <h2>{pokemon.weight} kg</h2>
              <h2>{pokemon.height} m</h2>
              <h2>Weight</h2>
              <h2>Height</h2>
            </div>
            <div className="pokemonStat">
              <h2>Base Stats</h2>
              <div className="statRow">
                {pokemon.stats &&
                  pokemon.stats.map((stats) => (
                    <Fragment key={stats.stat.name}>
                      <h5 style={{ textAlign: "end" }}>{stats.stat.name}</h5>
                      <h5
                        style={{ width: `calc(100% * ${stats.base_stat}/255)` }}
                      >
                        {stats.base_stat}
                      </h5>
                    </Fragment>
                  ))}
              </div>
            </div>
            <div className="pokemonMoves">
              <h2>List Moves</h2>
              <div className="moveRow">
                {pokemon.moves &&
                  pokemon.moves.map((moves) => (
                    <h5 key={moves.move.name}>{moves.move.name}</h5>
                  ))}
              </div>
            </div>
            <div className="catchBtn">
              <button
                type="button"
                onClick={async (e) => {
                  let isCatch = tryCatchPokemon();
                  let isValid = false;
                  if (isCatch) {
                    while (!isValid) {
                      try {
                        let nicknamePokemon = prompt(
                          "Berhasil ditangkap \n Masukan nickname untuk pokemon ini"
                        );
                        if (nicknamePokemon) {
                          let newPokemon = { ...pokemon };
                          newPokemon["nickname"] = nicknamePokemon.trim();
                          newPokemon[
                            "idMe"
                          ] = `${newPokemon.name}-${nicknamePokemon}`;
                          await catchPokemon(newPokemon);
                          isValid = true;
                          alert("Pokemon berhasil ditambahkan ke [My Pokemon]");
                        } else {
                          alert("Nickname kosong");
                          isValid = false;
                        }
                      } catch (error) {
                        alert(error);
                        isValid = false;
                      }
                    }
                    return true;
                  }
                }}
              >
                Catch Pokemon
              </button>
            </div>
          </div>
        </Fragment>
      );
    } else {
      if (queryName === "") {
        return <Redirect to="/list" />;
      }
      return "Loading...";
    }
  };

  return renderDetail();
};

export default PokemonDetail;
