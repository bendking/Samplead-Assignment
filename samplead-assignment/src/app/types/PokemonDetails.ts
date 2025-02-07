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
  
  export interface PokemonDetails {
    species: PokemonSpecies;
    forms: PokemonForm[];
    types: PokemonType[];
    weight: number;
    height: number;
  }
  