import { useMemo, useState, type FC } from "react";
import type { PokemonResponse } from "../../types";
import { useCanGoBack, useRouter } from "@tanstack/react-router";

type PokemonDetailsProps = {
  pokemon: PokemonResponse;
}

const PokemonDetails: FC<PokemonDetailsProps> = ({ pokemon }) => {  
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const [shinySprite, setShinySprite] = useState(false);
  const [femaleSprite, setFemaleSprite] = useState(false);

  console.log(pokemon);

  const sprites = useMemo(() => {
    const defaultSprites = [pokemon?.sprites.front_default, pokemon?.sprites.back_default];
    const shinySprites = [pokemon?.sprites.front_shiny, pokemon?.sprites.back_shiny];

    if (femaleSprite) {
      const femaleSprites = [
        pokemon.sprites.front_female || pokemon?.sprites.front_default,
        pokemon.sprites.back_female || pokemon?.sprites.back_default
      ]
      const femaleShinySprites = [
        pokemon.sprites.front_shiny_female || pokemon?.sprites.front_shiny,
        pokemon.sprites.back_shiny_female || pokemon?.sprites.back_shiny
      ];

      return shinySprite ? femaleShinySprites : femaleSprites;
    }

    return shinySprite ? shinySprites : defaultSprites;
  }, [
    femaleSprite,
    pokemon.sprites.back_default,
    pokemon.sprites.back_female,
    pokemon.sprites.back_shiny,
    pokemon.sprites.back_shiny_female,
    pokemon.sprites.front_default,
    pokemon.sprites.front_female,
    pokemon.sprites.front_shiny,
    pokemon.sprites.front_shiny_female,
    shinySprite
  ]);

  return (
    <div>
      <div className="flex gap-4 items-center pb-4">
        {canGoBack && <button onClick={() => router.history.back()} className="btn btn-sm">Back</button>}
        <h1 className="text-xl font-bold">
          {pokemon.name.replace("-", " ").toUpperCase()}
        </h1>
      </div>

      <div className="flex">
        <div className="w-[50%]">
          <h2 className="text-lg pb-1 font-bold">Base Stats</h2>
          <ul className="flex flex-wrap gap-3">
            {pokemon.stats.map(stat => (
              <li key={`stat-${stat.stat}`} className="w-[30%]">
                <div className="text-xs">{stat.stat.replace("-", " ").toUpperCase()}</div>
                <div className="badge badge-info">{stat.base_stat}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[50%]">
          <h2 className="text-lg pb-1 font-bold">Sprites</h2>
          <div className="flex gap-5">
            <label className="fieldset-label">
              <input
                type="checkbox"
                checked={femaleSprite}
                onChange={e => setFemaleSprite(e.target.checked)}
                className="toggle"
                disabled={!pokemon.sprites.front_female}
              />
              Female
            </label>
            <label className="fieldset-label">
              <input type="checkbox" checked={shinySprite} onChange={e => setShinySprite(e.target.checked)} className="toggle" />
              Shiny
            </label>
          </div>
          <div className="flex">
            {sprites.map(sprite => (
              <img className="w-50 h-50" key={sprite} src={sprite} alt={pokemon.name} />
            ))}
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
};

export default PokemonDetails;
