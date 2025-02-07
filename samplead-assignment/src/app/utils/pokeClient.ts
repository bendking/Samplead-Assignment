import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";

export const pokeClient = (): AxiosInstance => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default pokeClient;