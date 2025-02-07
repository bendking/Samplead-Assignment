import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import pokeClient from "@/app/utils/pokeClient";
import { Pokemon } from "@/app/types/pokemon";

interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

const fetchPokemons = async ({
  pageParam
}: QueryFunctionContext<["pokemons"], string>): Promise<PokemonResponse> => {
  const { data } = await pokeClient().get<PokemonResponse>(pageParam);
 
  return data;
};

// TODO: Fix typing if there's time left
export const usePokemonScroll = () => {
  return useInfiniteQuery<PokemonResponse, Error, Pokemon[], ["pokemons"], string>({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
    initialPageParam: "https://pokeapi.co/api/v2/pokemon",
    getNextPageParam: (lastPage) => lastPage.next,
  });
};