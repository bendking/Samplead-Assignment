"use client";

import { Pokemon } from "../types/pokemon";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getPokemonId, getPokemonImageUrl } from "../utils/pokemonUtils";
import { useFavoritePokemons } from "../context/FavoritePokemonsContext";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  const pokemonId = getPokemonId(pokemon.url);
  const pokemonImageUrl = getPokemonImageUrl(pokemon);

  const { favorites, toggleFavorite } = useFavoritePokemons();
  const isFavorited = Boolean(favorites[pokemon.name]);

  return (
    <Card
      key={pokemonId}
      onClick={onClick}
      sx={{
        position: "relative",
        cursor: "pointer",
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
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(pokemon.name);
        }}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
        color="error"
      >
        {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      <CardContent sx={{ padding: "4px !important" }}>
        <Stack alignItems="center">
          <Avatar
            alt={pokemon.name}
            src={pokemonImageUrl}
            sx={{ width: 96, height: 96, mx: "auto", mb: 1 }}
          />
          <Typography
            variant="h5"
            sx={{
              textTransform: "capitalize",
              fontWeight: "medium",
            }}
          >
            {pokemon.name}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
