"use client"
import { useState } from 'react';
import { Boton } from '@/components/Boton';
import { InputField } from '@/components/InputField';
import { CardComponent } from '@/components/CardComponent';
import { buttonVariants } from '@/components/ui/button';

export default function IndexPage() {
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);

  const handleAddPokemon = () => {
    const inputField = document.getElementById('btn-agregar') as HTMLInputElement;
    const pokemonName = inputField.value.toLowerCase();
    setPokemonNames((prevNames) => [...prevNames, pokemonName]);
    inputField.value = '';
  };

  const handleDeletePokemon = (index: number) => {
    setPokemonNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames.splice(index, 1);
      return updatedNames;
    });
  };

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px]  items-start gap-2">
        {pokemonNames.map((pokemonName, index) => (
          <CardComponent key={index} pokemonName={pokemonName}  onDelete={() => handleDeletePokemon(index)}/>
        ))}
      </div>
      <div className="flex gap-4 items-center">
        <Boton text="Agregar Pokemon" onClick={handleAddPokemon} className={buttonVariants()} />
        <InputField
          type="text"
          placeholder="Ingresa el nombre del pokemon (en minúsculas)"
          id="btn-agregar"
        />
      </div>
    </section>
  );
}
