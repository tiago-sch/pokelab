import { PokeInfosResponse, PokedexResponse, PokemonResponse } from "./types";

const API_ENDPOINT = "/api/";

export const fetchInfos = async () => {
  const response = await fetch(
    `${API_ENDPOINT}infos`,
    { method: "GET" }
  );
  const responseJson = await response.json() as PokeInfosResponse;

  return responseJson;
};

export const fetchPokedex = async (limit?: string, offset?: string) => {
  const params = new URLSearchParams();
  params.set("limit", limit || "50");
  params.set("offset", offset || "0");

  const response = await fetch(
    `${API_ENDPOINT}pokedex?${params.toString()}`,
    { method: "GET" }
  );
  const responseJson = await response.json() as PokedexResponse;

  return responseJson;
};

export const fetchPokemon = async (name: string) => {
  const response = await fetch(
    `${API_ENDPOINT}pokemon/${name}`,
    { method: "GET" }
  );
  const responseJson = await response.json();

  if (Array.isArray(responseJson)) {
    return { error: true };
  }

  return responseJson as PokemonResponse;
}