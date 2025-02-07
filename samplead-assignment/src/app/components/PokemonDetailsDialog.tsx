"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
  Box,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { usePokemonDetails } from "@/app/hooks/usePokemonDetails";
import { getPokemonImageUrl } from "../utils/pokemonUtils";
import { Pokemon } from "../types/pokemon";
import { useFavoritePokemons } from "../context/FavoritePokemonsContext";

interface PokemonDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  pokemon: Pokemon;
}

export default function PokemonDetailsDialog({
  open,
  onClose,
  pokemon,
}: PokemonDetailsDialogProps) {
  const pokemonName = pokemon.name;
  const { data, isLoading, isError } = usePokemonDetails(pokemonName, open);
  const pokemonImageUrl = getPokemonImageUrl(pokemon);

  // Get the shared favorites state and toggle function from the context.
  const { favorites, toggleFavorite } = useFavoritePokemons();
  const isFavorited = Boolean(favorites[pokemonName]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          textTransform: "capitalize",
          textAlign: "center",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {pokemonName}
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); // Prevent the dialog from closing when clicking the icon.
            toggleFavorite(pokemonName);
          }}
          color="error"
        >
          {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {isLoading && (
          <Box textAlign="center" py={3}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Typography color="error">
            There was an error loading details for {pokemonName}.
          </Typography>
        )}

        {data && (
          <Box>
            {/* Centered Pokémon image with border & shadow */}
            <Box display="flex" justifyContent="center" mb={3}>
              <Avatar
                src={pokemonImageUrl}
                alt={pokemonName}
                sx={{
                  height: 240,
                  width: 240,
                  border: "4px solid #fff",
                  boxShadow: 3,
                }}
              />
            </Box>

            {/* Key stats displayed in a horizontal Stack */}
            <Stack direction="row" spacing={2} justifyContent="center">
              <Box flex={1} textAlign="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Species
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textTransform: "capitalize" }}
                >
                  {data.species.name}
                </Typography>
              </Box>
              <Box flex={1} textAlign="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Weight
                </Typography>
                <Typography variant="body1">{data.weight}</Typography>
              </Box>
              <Box flex={1} textAlign="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Height
                </Typography>
                <Typography variant="body1">{data.height}</Typography>
              </Box>
            </Stack>

            {/* Display Forms */}
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Forms
              </Typography>
              <Stack direction="row" spacing={1}>
                {data.forms.map((form) => (
                  <Box
                    key={form.name}
                    px={2}
                    py={1}
                    borderRadius={2}
                    bgcolor="grey.200"
                  >
                    <Typography
                      variant="body2"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {form.name}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Display Types */}
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Types
              </Typography>
              <Stack direction="row" spacing={1}>
                {data.types.map((t) => (
                  <Box
                    key={t.type.name}
                    px={2}
                    py={1}
                    borderRadius={2}
                    bgcolor="grey.200"
                  >
                    <Typography
                      variant="body2"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {t.type.name}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
