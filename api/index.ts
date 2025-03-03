import express from 'express'

const router = express.Router();

const POKEAPI_GRAPHQL = "https://graphql-pokeapi.graphcdn.app"; // https://github.com/mazipan/graphql-pokeapi
const GRAPHQL_POKEMON = "https://graphqlpokemon.favware.tech/v8"; // https://github.com/favware/graphql-pokemon

// pokedex
router.get("/pokedex", async (req, res) => {
  const limit = req.query.limit || 50;
  const offset = req.query.offset || 0;

  const request = await fetch(
    POKEAPI_GRAPHQL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `
          {
            pokemons(limit: ${limit}, offset: ${offset}) {
              count
              results {
                url
                id
                name
                artwork
                image
              }
            }
          }
        `
      })
    }
  );
  const data = await request.json();

  if (data.errors) {
    res.send(data.errors);
    return;
  }

  res.send(data.data.pokemons.results);
});

// infos
router.get("/infos", async (_, res) => {
  const request = await fetch(
    POKEAPI_GRAPHQL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `
          {
            types {
              results {
                name
                id
                url
              }
            }
          }
        `
      })
    }
  );

  const data = await request.json();

  res.send({
    types: data.data.types.results,
  })
});

// pokemon info
router.get("/pokemon/:name", async (req, res) => {
  const pokemon = req.params.name;

  const pokemonInfo = await fetch(
    POKEAPI_GRAPHQL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `
          {
            pokemon(name: "${pokemon}") {
              id
              sprites {
                front_default
                front_female
                front_shiny
                front_shiny_female
                back_default
                back_female
                back_shiny
                back_shiny_female
              }
              height
              weight
              name
              forms {
                id
                url
                name
              }
              is_default
              types {
                type {
                  name
                }
              }
              location_area_encounters
              stats {
                stat {
                  name
                }
                base_stat
              }
              base_experience
              location_area_encounters
              abilities {
                ability {
                  name
                  url
                }
              }
              order
              message
              moves {
                move {
                  name
                  url
                }
              }
            }
          }
        `
      })
    }
  );
  const data = await pokemonInfo.json();

  if (data.errors) {
    res.send(data.errors);
    return;
  }

  try {
    const pokemonData = data.data.pokemon;
    
    res.send({
      ...pokemonData,
      types: pokemonData.types.map(({ type }) => type.name),
      stats: pokemonData.stats.map(({ stat, base_stat}) => ({ stat: stat.name, base_stat })),
      abilities: pokemonData.abilities.map(({ ability }) => ability),
      moves: pokemonData.moves.map(({ move }) => move),
    });
  } catch (err) {
    res.send(err);
  }
});

// matchup
router.post("/matchup/", async (req, res) => {
  const body = req.body;
  const primary = body.primary;
  const secondary = body.secondary;

  console.log(body);

  const request = await fetch(
    GRAPHQL_POKEMON,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `
          {
            getTypeMatchup(primaryType: ${primary}${ secondary ? `, secondaryType:${secondary}` : ""}) {
              attacking {
                doubleEffectiveTypes
                doubleResistedTypes
                effectiveTypes
                effectlessTypes
                normalTypes
                resistedTypes
              }
              defending {
                doubleEffectiveTypes
                doubleResistedTypes
                effectiveTypes
                effectlessTypes
                normalTypes
                resistedTypes
              }
            }
          }
        `
      })
    }
  );
  const data = await request.json();

  if (data.errors) {
    res.send(data.errors);
    return;
  }
  
  res.send(data.data.getTypeMatchup);
});

// API fallback
router.get("*", (_, res) => res.redirect("/"))

export default router;
