/* eslint-disable react-refresh/only-export-components */
import { type FC } from "react";
import { Link } from "@tanstack/react-router";
import { LazyLoadImage, trackWindowScroll, type LazyComponentProps } from "react-lazy-load-image-component";
import usePokedex from "../../contexts/pokedex/usePokedex";
import pikaNotFound from "../../assets/pika-not-found.png";

const PokedexList: FC<LazyComponentProps> = ({ scrollPosition }) => {
  const { dex } = usePokedex();

  return (
    <ul className="flex gap-4 flex-wrap justify-center p-6">
      {dex.map(pokemon => (
        <Link key={`poke-${pokemon.id}`} to="/pokemon/$name" params={{ name: pokemon.name }} >
          <li className="w-50 h-50 card bg-amber-100 hover:bg-amber-200 shadow-sm">
            <figure className="px-5 pt-10">
              <LazyLoadImage
                alt={pokemon.name}
                src={pokemon.artwork}
                scrollPosition={scrollPosition}
                effect="black-and-white"
                wrapperProps={{
                  style: { transitionDelay: "1s" },
                }}
                height={80}
                width={80}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.alt = "Image not found";
                  // currentTarget.width = 150;
                  currentTarget.src = pikaNotFound;
                }}
              />
            </figure>
            <div className="card-body items-center text-center px-2">
              <h2 className="card-title">
                {pokemon.name.replace("-", " ").toUpperCase()}
              </h2>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default trackWindowScroll(PokedexList);