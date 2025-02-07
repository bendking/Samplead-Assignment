// types/PokemonDetail.ts

export interface PokemonSpecies {
    name: string;
    url: string;
  }
  
  export interface PokemonForm {
    name: string;
    url: string;
  }
  
  export interface PokemonType {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }
  
  export interface PokemonDetail {
    species: PokemonSpecies;
    forms: PokemonForm[];
    types: PokemonType[];
    weight: number;
    height: number;
  }
  