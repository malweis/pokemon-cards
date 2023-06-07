"use client";
import { useEffect, useState } from 'react';
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

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]

type CardProps = React.ComponentProps<typeof Card>

interface CardComponentProps extends CardProps {
    pokemonName: string;
  }
  
  interface Ability {
    title: string;
    description: string;
  }

  export function CardComponent({ className, pokemonName }: CardComponentProps) {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [abilities, setAbilities] = useState<Ability[]>([]);
  
    useEffect(() => {
        const fetchPokemonData = async () => {
          try {
            const response = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
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
          } catch (error) {
            console.error('Error fetching Pokemon data:', error);
          }
        };
    
        fetchPokemonData();
      }, [pokemonName]);

    
  return (
    <Card className={cn("w-[380px]", className)} >
      <CardHeader>
        <CardTitle className='place-self-center'>{pokemonName}</CardTitle>
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
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {ability.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {ability.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className='flex gap-4'>
        <Button className="w-3/4">
          <Check className="mr-2 h-4 w-4" /> Borrar
        </Button>
        <Button className="w-3/4">
          <Check className="mr-2 h-4 w-4" /> Editar
        </Button>
      </CardFooter>
    </Card>
  )
}