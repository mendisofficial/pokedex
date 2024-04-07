"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import Image from "next/image";
import PokemonCard from "./components/PokemonCard";

interface PokemonData {
  name: string;
  height: number;
  abilities: { ability: { name: string } }[];
  moves: { move: { name: string } }[];
  sprites: { front_default: string };
}

export default function Home() {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchPokemon = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.get<PokemonData>(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      setPokemonData(data);
    } catch (err) {
      setError(
        "An error occurred while fetching the Pokemon data. Please try again."
      );
      setPokemonData(null);
    }
  };

  return (
    <div>
      <form onSubmit={searchPokemon}>
        <input
          type="text"
          placeholder="Enter Pokemon Name"
          onChange={(e) => setPokemon(e.target.value.toLowerCase())}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {pokemonData && <PokemonCard pokemonData={pokemonData} />}
    </div>
  );
}
