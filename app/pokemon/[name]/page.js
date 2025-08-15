import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

async function getPokemonData(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    throw new Error('Gagal mengambil data Pokémon');
  }
  return response.json();
}

export default async function PokemonDetailPage({ params }) {
  const pokemon = await getPokemonData(params.name);
  const heightInMeters = (pokemon.height * 0.1).toFixed(1);
  const weightInKg = (pokemon.weight * 0.1).toFixed(1);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Image
          className={styles.pokemonImage}
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          width={160}
          height={160}
          priority
        />
        
        <h1 className={styles.name}>{pokemon.name}</h1>
        <div className={styles.typesContainer}>
          {pokemon.types.map((typeInfo) => (
            <span key={typeInfo.slot} className={styles.typeBadge}>
              {typeInfo.type.name}
            </span>
          ))}
        </div>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <h3>Height</h3>
            <p>{heightInMeters} m</p>
          </div>
          <div className={styles.infoItem}>
            <h3>Weight</h3>
            <p>{weightInKg} kg</p>
          </div>
        </div>
        <div className={styles.statsContainer}>
          <h2 className={styles.statsTitle}>Base Stats</h2>
          {pokemon.stats.map((statInfo) => (
            <div key={statInfo.stat.name} className={styles.statItem}>
              <span className={styles.statName}>{statInfo.stat.name.replace('-', ' ')}</span>
              <div className={styles.statBar}>
                <div
                  className={styles.statBarFill}
                  style={{ width: `${Math.min(statInfo.base_stat, 150) / 1.5}%` }} 
                ></div>
              </div>
              <span className={styles.statValue}>{statInfo.base_stat}</span>
            </div>
          ))}
        </div>
        <Link href="/" className={styles.backLink}>
          &larr; Kembali
        </Link>
      </div>
    </div>
  );
}