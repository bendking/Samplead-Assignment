import { useQuery } from "@tanstack/react-query";
import pokeClient from "@/app/utils/pokeClient";
import { PokemonDetail } from "@/app/types/PokemonDetails";

const fetchPokemonDetail = async (pokemonName: string): Promise<PokemonDetail> => {
  const { data } = await pokeClient().get<PokemonDetail>(`/pokemon/${pokemonName}`);
  return data;
};

export const usePokemonDetails = (pokemonName: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["pokemonDetail", pokemonName],
    queryFn: () => fetchPokemonDetail(pokemonName),
    enabled
  });
};