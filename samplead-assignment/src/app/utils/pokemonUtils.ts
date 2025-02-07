import { Pokemon } from "../types/pokemon";

const pokemonImageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

export const getPokemonId = (url: string) => url.split("/").filter(Boolean).pop();

export const getPokemonImageUrl = (pokemon: Pokemon) => `${pokemonImageUrl}${getPokemonId(pokemon.url)}.png`;
