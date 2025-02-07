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
} from "@mui/material";
// Import Grid2 from MUI – this is the recommended replacement for the deprecated Grid component.
import Grid from "@mui/material/Grid2";

import { usePokemonDetails } from "@/app/hooks/usePokemonDetails";
import { getPokemonImageUrl } from "../utils/pokemonUtils";
import { Pokemon } from "../types/pokemon";

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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          textTransform: "capitalize",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {pokemonName}
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

            {/* Grid layout for key stats using Grid2 */}
            <Grid container spacing={2} justifyContent="center">
              <Grid xs={4}>
                <Box display="flex" flexDirection="column" alignItems="center">
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
              </Grid>
              <Grid xs={4}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="subtitle2" color="text.secondary">
                    Weight
                  </Typography>
                  <Typography variant="body1">{data.weight}</Typography>
                </Box>
              </Grid>
              <Grid xs={4}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="subtitle2" color="text.secondary">
                    Height
                  </Typography>
                  <Typography variant="body1">{data.height}</Typography>
                </Box>
              </Grid>
            </Grid>

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
