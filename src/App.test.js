import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";
import App from "./App";

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
};

//validasi empty state pada menu My Pokemon
test("check if empty state in my pokemons works", () => {
  window.localStorage.setItem("MY_POKEMON", JSON.stringify([]));
  renderWithRouter(<App />, { route: "/me" });
  expect(screen.getByText(/Tidak ada pokemon/i)).toBeInTheDocument();
});

test("check if navbar is loaded", () => {
  renderWithRouter(<App />, { route: "/list" });
  expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/catching_pokemon/i)).toBeInTheDocument();
});

//test load menu Pokemon List
test("check if menu list is loaded (graphql)", async () => {
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
    offset: 0 * 10,
  };

  const mocks = [
    {
      request: {
        query: GET_POKEMONS,
        variables: gqlVariablesPokemons,
      },
      result: {
        data: {
          pokemons: {
            count: 1118,
            message: "",
            next: "https://pokeapi.co/api/v2/pokemon/?offset=10&limit=10",
            previous: null,
            results: [
              {
                id: 1,
                image:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/",
                __typename: "PokemonItem",
              },
            ],
            status: true,
            __typename: "PokemonList",
          },
        },
      },
    },
  ];

  renderWithRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
    { route: "/list" }
  );
  const text = await screen.findByText(/#1 bulbasaur/);
  expect(text).toBeInTheDocument();
});

//check routing dari pokemon list ke pokemon detail
test("click pokemon will go to pokemon detail work", async () => {
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
    offset: 0 * 10,
  };

  const mocks = [
    {
      request: {
        query: GET_POKEMONS,
        variables: gqlVariablesPokemons,
      },
      result: {
        data: {
          pokemons: {
            count: 1118,
            message: "",
            next: "https://pokeapi.co/api/v2/pokemon/?offset=10&limit=10",
            previous: null,
            results: [
              {
                id: 1,
                image:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/",
                __typename: "PokemonItem",
              },
            ],
            status: true,
            __typename: "PokemonList",
          },
        },
      },
    },
  ];

  renderWithRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
    { route: "/list" }
  );
  const btn = await screen.findByTestId("detail-btn");
  fireEvent.click(
    btn,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  const pokemonType = await screen.findByText(/Catch Pokemon/);
  expect(pokemonType).toBeInTheDocument();
});

//catch pokemon
test("catch pokemon", async () => {
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
    offset: 0 * 10,
  };

  const mocks = [
    {
      request: {
        query: GET_POKEMONS,
        variables: gqlVariablesPokemons,
      },
      result: {
        data: {
          pokemons: {
            count: 1118,
            message: "",
            next: "https://pokeapi.co/api/v2/pokemon/?offset=10&limit=10",
            previous: null,
            results: [
              {
                id: 1,
                image:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/",
                __typename: "PokemonItem",
              },
            ],
            status: true,
            __typename: "PokemonList",
          },
        },
      },
    },
  ];

  renderWithRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
    { route: "/list" }
  );
  const btn = await screen.findByTestId("detail-btn");
  fireEvent.click(
    btn,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  const catchBtn = await screen.findByText(/Catch Pokemon/);
  fireEvent.click(
    catchBtn,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
});
