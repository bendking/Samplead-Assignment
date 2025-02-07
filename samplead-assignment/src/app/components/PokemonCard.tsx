import { Pokemon } from "../types/pokemon";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Avatar,
} from "@mui/material";

interface PokemonCard {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCard) => {
  const getPokemonId = (url: string) => url.split("/").filter(Boolean).pop();

  const pokemonId = getPokemonId(pokemon.url);
  const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  return (
    <Card
      key={pokemonId}
      sx={{
        textAlign: "center",
        p: 2,
        borderRadius: 2,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardContent>
        <Avatar
          alt={pokemon.name}
          src={pokemonImageUrl}
          sx={{ width: 96, height: 96, mx: "auto", mb: 1 }}
        />
        <Typography
          variant="h6"
          sx={{
            textTransform: "capitalize",
            fontWeight: "medium",
          }}
        >
          {pokemon.name}
        </Typography>
      </CardContent>
    </Card>
  );
};
