"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const FAVORITES_KEY = "favoritePokemons";

type Favorites = Record<string, boolean>;

interface FavoritePokemonsContextProps {
  favorites: Favorites;
  toggleFavorite: (pokemonName: string) => void;
}

const FavoritePokemonsContext = createContext<
  FavoritePokemonsContextProps | undefined
>(undefined);

export const FavoritePokemonsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Favorites>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? (JSON.parse(stored) as Favorites) : {};
    }

    return {};
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemonName: string) => {
    setFavorites((prev) => {
      const newFavorites = { ...prev };

      if (newFavorites[pokemonName]) {
        delete newFavorites[pokemonName];
      } else {
        newFavorites[pokemonName] = true;
      }

      return newFavorites;
    });
  };

  return (
    <FavoritePokemonsContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritePokemonsContext.Provider>
  );
};

export const useFavoritePokemons = () => {
  const context = useContext(FavoritePokemonsContext);

  if (!context) {
    throw new Error(
      "useFavoritePokemons must be used within a FavoritePokemonsProvider"
    );
  }

  return context;
};
