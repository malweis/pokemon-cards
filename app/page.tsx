"use client"
import { useState } from 'react';
import { Boton } from '@/components/Boton';
import { InputField } from '@/components/InputField';
import { CardComponent } from '@/components/CardComponent';
import { buttonVariants } from '@/components/ui/button';

export default function IndexPage() {
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);
  const [editingPokemonIndex, setEditingPokemonIndex] = useState<number>(-1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage] = useState<number>(3);

  const handleAddPokemon = () => {
    const inputField = document.getElementById('btn-agregar') as HTMLInputElement;
    const pokemonName = inputField.value.toLowerCase();
    setPokemonNames((prevNames) => [...prevNames, pokemonName]);
    inputField.value = '';
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddPokemon();
    }
  };

  const handleDeletePokemon = (index: number) => {
    setPokemonNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames.splice(index, 1);
      return updatedNames;
    });
  };

  const handleEditPokemon = (index: number) => {
    setEditingPokemonIndex(index);
  };

  const handleSavePokemon = (index: number, newPokemonName: string) => {
    const adjustedIndex = (currentPage - 1) * cardsPerPage + index;
    setPokemonNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[adjustedIndex] = newPokemonName;
      return updatedNames;
    });
    setEditingPokemonIndex(-1);
  };
  
  // Calculate the index of the last card on the current page
  const lastIndex = currentPage * cardsPerPage;

  // Calculate the index of the first card on the current page
  const firstIndex = lastIndex - cardsPerPage;

  // Get the current page's cards
  const currentCards = pokemonNames.slice(firstIndex, lastIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(pokemonNames.length / cardsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-full justify-evenly items-start gap-2">
        {currentCards.map((pokemonName, index) => (
          <CardComponent
            key={index}
            pokemonName={pokemonName}
            editable={index === editingPokemonIndex}
            onDelete={() => handleDeletePokemon(index)}
            onEdit={() => handleEditPokemon(index)}
            onSave={(newPokemonName) => handleSavePokemon(index, newPokemonName)}
          />
        ))}
      </div>
      <div className="w-full flex gap-3 justify-center">
        <Boton text="<" onClick={() => handlePageChange(currentPage - 1)} className={buttonVariants()} />
        {Array.from({ length: totalPages }, (_, index) => (
          <Boton
            key={index}
            text={`${index + 1}`}
            onClick={() => handlePageChange(index + 1)}
            className={buttonVariants()}
          />
        ))}
        <Boton text=">" onClick={() => handlePageChange(currentPage + 1)} className={buttonVariants()} />
      </div>
      <div className="flex gap-4 items-center">
        <Boton text="Agregar Pokemon" onClick={handleAddPokemon} className={buttonVariants()} />
        <InputField
          type="text"
          placeholder="Ingresa el nombre del pokemon (en minúsculas)"
          id="btn-agregar"
          onKeyDown={handleKeyDown}
        />
      </div>
    </section>
  );
}
