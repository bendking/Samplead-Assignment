"use client";

import { usePokemonScroll } from "@/app/hooks/usePokemonScroll";
import { Box, CircularProgress, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { Pokemon } from "../types/pokemon";
import { PokemonCard } from "./PokemonCard";

// Utility function to extract Pokémon ID from the URL

const PokemonList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = usePokemonScroll();

  if (isError) {
    console.error("Error with Pokemon API:", error);

    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="error">
          Failed to load Pokémon. Please try again later.
        </Typography>
      </Box>
    );
  }

  // @ts-ignore
  // TOOD: Fix if there's time
  const pokemons: Pokemon[] = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        py: 4,
      }}
    >
      {/* Centered, semi-transparent container */}
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
        {/* Title */}
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{ color: "black", fontWeight: "bold" }}
        >
          Pokédex
        </Typography>

        {/* Infinite Scroll Container */}
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
          {/* Pokémon Cards Grid using CSS Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 2,
            }}
          >
            {pokemons.map((pokemon) => {
              return <PokemonCard pokemon={pokemon} key={pokemon.name} />;
            })}
          </Box>
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default PokemonList;
