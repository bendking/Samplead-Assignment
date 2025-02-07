import { Pokemon } from "../types/pokemon";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import { getPokemonId, getPokemonImageUrl } from "../utils/pokemonUtils";

interface PokemonCard {
  pokemon: Pokemon;
  onClick: () => void;
}

export const PokemonCard = ({ pokemon, onClick }: PokemonCard) => {
  const pokemonId = getPokemonId(pokemon.url);
  const pokemonImageUrl = getPokemonImageUrl(pokemon);

  return (
    <Card
      key={pokemonId}
      onClick={onClick}
      sx={{
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
      <CardContent
        sx={{
          padding: "4px !important",
        }}
      >
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

          {/* <Stack direction="row" gap={1}>
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              ID
            </Typography>
            <Typography>{pokemonId}</Typography>
          </Stack> */}
        </Stack>
      </CardContent>
    </Card>
  );
};
