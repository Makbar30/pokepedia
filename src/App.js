/** @jsxImportSource @emotion/react */
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { PokemonDetail, PokemonList, PokemonMe } from "./pages";
import { PokemonProvider } from "./pokemonContext";
import { Global } from "@emotion/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});



function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <PokemonProvider>
          <div>
            <Global
              styles={{
                "*": {
                  fontFamily: "Monaco, monospace",
                },
                body: {
                  margin: 0,
                  padding: 0,
                  boxSizing: "border-box"
                },
                html: {
                  margin: 0,
                  padding: 0,
                  boxSizing: "border-box"
                },
              }}
            />
            <Switch>
              <Route exact path="/">
                <Redirect to="/list" />
              </Route>
              <Route path="/list">
                <PokemonList />
              </Route>
              <Route path="/detail/:id">
                <PokemonDetail />
              </Route>
              <Route path="/me">
                <PokemonMe />
              </Route>
            </Switch>
          </div>
        </PokemonProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;
