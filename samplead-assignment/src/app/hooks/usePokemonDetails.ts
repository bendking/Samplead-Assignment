import { useQuery } from "@tanstack/react-query";
import pokeClient from "@/app/utils/pokeClient";
import { PokemonDetails } from "../types/PokemonDetails";

const fetchPokemonDetail = async (pokemonName: string): Promise<PokemonDetails> => {
  const { data } = await pokeClient().get<PokemonDetails>(`/pokemon/${pokemonName}`);
  return data;
};

export const usePokemonDetails = (pokemonName: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["pokemonDetail", pokemonName],
    queryFn: () => fetchPokemonDetail(pokemonName),
    enabled
  });
};