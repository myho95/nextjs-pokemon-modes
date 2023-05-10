import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const Details = () => {
  const [pokemon, setPokemon] = useState(null);
  const {
    query: { id },
  } = useRouter();
  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
      );
      setPokemon(await resp.json());
    }
    if (id) {
      getPokemon();
    }
  }, [id]);
  if (!pokemon) {
    return null;
  }
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link className="hover:text-green-400" href="/">
          &#60; Back to Home
        </Link>
      </div>
      <div className="flex flex-row gap-20 mt-20">
        <div>
          <Image
            className="max-h-96"
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            width={500}
            height={500}
            alt={pokemon.name}
          />
        </div>
        <div>
          <div className="font-bold text-2xl pb-4">{pokemon.name}</div>
          <div className="pb-4">{pokemon.type.join(", ")}</div>
          <table className="table-auto w-60 max-w-xs">
            <thead className="">
              <tr className="text-left">
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody className="font-bold">
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className="">{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Details;