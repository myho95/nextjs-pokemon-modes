import Image from "next/image";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/home.module.css";

export async function getServerSideProps() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}
export default function Home({ pokemon }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h1 className="text-3xl font-bold text-center mb-8">Pokemon List</h1>
      <div className="grid grid-cols-4 gap-28">
        {pokemon.map((pokemon) => (
          <div key={pokemon.id} className="w-full max-h-52">
            <Link href={`/pokemon/${pokemon.id}`}>
              <Image
                width="100"
                height="100"
                className="w-full h-full object-fill"
                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                alt={pokemon.name}
                quality={100}
              />
              <h3>{pokemon.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
