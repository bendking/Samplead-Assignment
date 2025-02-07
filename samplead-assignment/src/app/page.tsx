import PokemonList from "@/app/components/PokemonList";
import { FavoritePokemonsProvider } from "./context/FavoritePokemonsContext";

export default function Home() {
  return (
    <FavoritePokemonsProvider>
      <PokemonList />
    </FavoritePokemonsProvider>
  );
}
