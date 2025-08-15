'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

function PokemonCard({ name, url }) {
  const id = url.split('/')[6];
  return (
    <Link href={`/pokemon/${name}`} className={styles.card}>
      <Image
        className={styles.cardImage}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        alt={name}
        width={96}
        height={96}
      />
      <h2 className={styles.cardName}>{name}</h2>
    </Link>
  );
}

export default function HomePage() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchFirstGenPokemons() {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      setAllPokemons(data.results);
      setFilteredPokemons(data.results);
    }
    fetchFirstGenPokemons();
  }, []);

  useEffect(() => {
    const results = allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPokemons(results);
  }, [search, allPokemons]);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Image 
          src="/pokemon-logo.png" 
          alt="Pokémon Logo"
          width={180}
          height={66}
          className={styles.logo}
        />
        
      </header>
      
      <input
        type="text"
        placeholder="Cari Pokémon favoritmu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.grid}>
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
    </main>
  );
}