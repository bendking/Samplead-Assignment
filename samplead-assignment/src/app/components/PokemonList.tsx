"use client";

import React, { useState } from "react";
import { usePokemonScroll } from "@/app/hooks/usePokemonScroll";
import { Box, CircularProgress, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { Pokemon } from "../types/pokemon";
import { PokemonCard } from "./PokemonCard";
import PokemonDetailsDialog from "./PokemonDetailsDialog";

const PokemonList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePokemonScroll();

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  // @ts-ignore
  // TODO: Fix if there's time
  const pokemons: Pokemon[] = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        py: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: 1000,
          mx: "auto",
          p: 3,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 3,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{ color: "black", fontWeight: "bold" }}
        >
          Pokédex
        </Typography>

        <InfiniteScroll
          dataLength={pokemons.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            isFetchingNextPage && (
              <Box textAlign="center" py={2}>
                <CircularProgress />
              </Box>
            )
          }
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 2,
            }}
          >
            {pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                // When a card is clicked, update the state with the selected Pokémon.
                onClick={() => setSelectedPokemon(pokemon)}
              />
            ))}
          </Box>
        </InfiniteScroll>
      </Box>

      {/* Render the dialog if a Pokémon has been selected */}
      {selectedPokemon && (
        <PokemonDetailsDialog
          open={!!selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
          pokemon={selectedPokemon}
        />
      )}
    </Box>
  );
};

export default PokemonList;
