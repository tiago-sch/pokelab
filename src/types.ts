export type PokeInfosResponse = {
  types: {
    name: string;
    id: number;
    url: string;
  }[]
};

export type PokedexResponse = {
  url: string;
  id: number;
  name: string;
  artwork: string;
  image: string;
}[];

export type Sprites = {
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
};

export type Stat = {
  stat: string;
  base_stat: number;
};

export type Ability = {
  name: string;
  url: string;
};

export type Move = {
  name: string;
  url: string;
};

export type PokemonResponse = {
  id: number
  sprites: Sprites;
  height: number;
  weight: number;
  name: string;
  types: string[];
  location_area_encounters: string;
  stats: Stat[];
  base_experience: number;
  abilities: Ability[];
  order: number;
  message: string;
  moves: Move[];
}