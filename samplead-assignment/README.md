## Loading the app

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## External Resources Used

ChatGPT
Stack Overflow

## Libraries Used

MaterialUI
React-Query
Axios

## Design Choices

I decided to use an infinite scroll list of cards instead of a table because I thought that UX-wise it would be more pleasant and user-friendly due to the usage of the pokemon's images.

Unfortunately, the API does not have a free text search function so the only way to look for a pokemon is scrolling until you see it. An alternative woudld have been to load all of the pokemons at the start, but that is bad practice for large data-sets.

Of course, I could have also implemented a psuedo-search where the user has to input the exact name of a pokemon and have its dialog loaded up, but I don't think that would make for particualrly good UX.
