import { FC } from 'react';
import Image from 'next/image';

interface PokemonData {
  name: string;
  height: number;
  abilities: { ability: { name: string } }[];
  moves: { move: { name: string } }[];
  sprites: { front_default: string };
}

interface PokemonCardProps {
  pokemonData: PokemonData;
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemonData }) => (
  <div style={{ border: '1px solid #000', padding: '20px', borderRadius: '10px' }}>
    <h3>{pokemonData.name}</h3>
    <Image src={pokemonData.sprites.front_default} alt={pokemonData.name} width={96} height={96} />
    <p>Height: {pokemonData.height}</p>
    <p>Abilities: {pokemonData.abilities.map((ability) => ability.ability.name).join(', ')}</p>
    <p>Moves: {pokemonData.moves.map((move) => move.move.name).join(', ')}</p>
  </div>
);

export default PokemonCard;