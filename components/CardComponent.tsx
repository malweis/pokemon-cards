"use client";
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { BellRing, Check } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"



type CardProps = React.ComponentProps<typeof Card>
const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

interface CardComponentProps extends CardProps {
  pokemonName: string;
  editable: boolean;
  onEdit: () => void;
  onSave: (newPokemonName: string) => void;
  onDelete: () => void;

  }
  
  interface Ability {
    title: string;
    description: string;
  }

  export function CardComponent({ className, pokemonName,editable, onDelete, onSave, onEdit  }: CardComponentProps) {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [abilities, setAbilities] = useState<Ability[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    console.log(pokemonName)
    const [editedPokemonName, setEditedPokemonName] = useState(capitalizeFirstLetter(pokemonName));
    console.log(editedPokemonName)

   
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditedPokemonName(event.target.value);
      
    };
  
    const handleSaveClick = () => {
      onSave(editedPokemonName);
    };
    
  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSaveClick();
    }
  };
    
  useEffect(() => {
    if (editable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editable]);
  
    useEffect(() => {
      setEditedPokemonName(capitalizeFirstLetter(pokemonName)); // Set the initial value of editedPokemonName
      
        const fetchPokemonData = async () => {
          try {
            const response = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
            );
            const pokemonData = response.data;
    
            const abilitiesData = pokemonData.abilities.map(
              (ability: { ability: { name: string } }) => ability.ability.name
            );
    
            const abilities = await Promise.all(
              abilitiesData.map(async (abilityName: string) => {
                const abilityResponse = await axios.get(
                  `https://pokeapi.co/api/v2/ability/${abilityName}`
                );
                const abilityData = abilityResponse.data;
                const englishEntry = abilityData.effect_entries.find(
                  (entry: { language: { name: string } }) =>
                    entry.language.name === 'en'
                );
                return {
                  title: abilityData.name,
                  description: englishEntry?.effect || '',
                };
              })
            );
    
            const imageUrl = pokemonData.sprites.front_default;
    
            setImageUrl(imageUrl);
            setAbilities(abilities);
          } catch (error: any) {
            if (error.response && error.response.status === 404) {
              console.log('No se encontró el Pokémon');
            }
        
            console.error('Error fetching Pokemon data:', error);
          }
        };
    
        fetchPokemonData();
      }, [pokemonName]);

    
  return (
    <Card className={cn("w-[380px]", className)} >
       <CardHeader>
        {editable ? (
          <input
            type="text"
            value={capitalizeFirstLetter(editedPokemonName)}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyPress}
            className="text-xl font-medium"
            ref={inputRef}
          />
        ) : (
          <CardTitle className="place-self-center">{capitalizeFirstLetter(pokemonName)}</CardTitle>
        )}
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center place-self-center justify-center space-x-4 w-3/6 rounded-md border p-4">
        {imageUrl && (
            <Image
              src={imageUrl}
              alt="Pokemon"
              width={90}
              height={90}
              className="rounded-full"
            />
          )}
          
        </div>
        <div>
          {abilities.map((ability, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                {capitalizeFirstLetter(ability.title)}
                </p>
                <p className="text-sm text-muted-foreground">
                {capitalizeFirstLetter(ability.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        {editable ? (
          <>
            <Button className="w-3/4" onClick={handleSaveClick}>
              <Check className="mr-2 h-4 w-4" /> Guardar
            </Button>
         
          </>
        ) : (
          <>
          <Button className="w-3/4" onClick={onEdit}>
            <Check className="mr-2 h-4 w-4" /> Editar
          </Button>
          <Button className="w-3/4" onClick={onDelete}>
              <Check className="mr-2 h-4 w-4" /> Borrar
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
