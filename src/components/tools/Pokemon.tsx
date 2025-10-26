import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Volume2 } from "lucide-react";

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  base_experience: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  cries: {
    latest: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

const Pokemon = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const searchPokemon = async () => {
    if (!pokemonName.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa el nombre de un Pokémon",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      
      if (!response.ok) {
        throw new Error("Pokémon no encontrado");
      }
      
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Pokémon no encontrado. Intenta con otro nombre",
        variant: "destructive",
      });
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  const playSound = () => {
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.play();
    }
  };

  const typeColors: Record<string, string> = {
    normal: "bg-gray-400",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-cyan-400",
    fighting: "bg-red-600",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-yellow-700",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-600",
    dark: "bg-gray-700",
    steel: "bg-gray-500",
    fairy: "bg-pink-400",
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Pokédex</h1>
        <p className="text-muted-foreground">Busca información de tu Pokémon favorito</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Buscar Pokémon</CardTitle>
          <CardDescription>Ingresa el nombre o número del Pokémon</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ejemplo: pikachu, charizard, 25..."
              value={pokemonName}
              onChange={(e) => setPokemonName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && searchPokemon()}
            />
            <Button onClick={searchPokemon} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buscar"}
            </Button>
          </div>

          {pokemon && (
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 animate-in slide-in-from-bottom duration-500">
              <CardContent className="pt-6 space-y-4">
                <div className="text-center">
                  <img
                    src={pokemon.sprites.other["official-artwork"].front_default}
                    alt={pokemon.name}
                    className="w-64 h-64 mx-auto object-contain"
                  />
                  <h2 className="text-3xl font-bold capitalize mt-4">{pokemon.name}</h2>
                </div>

                <div className="flex justify-center gap-2">
                  {pokemon.types.map((type) => (
                    <Badge
                      key={type.type.name}
                      className={`${typeColors[type.type.name]} text-white`}
                    >
                      {type.type.name}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Experiencia Base</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-primary">{pokemon.base_experience}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Habilidades</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {pokemon.abilities.map((ability, index) => (
                          <Badge key={index} variant="secondary" className="capitalize">
                            {ability.ability.name.replace("-", " ")}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button onClick={playSound} className="w-full" variant="outline">
                  <Volume2 className="mr-2 h-4 w-4" />
                  Escuchar sonido
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Pokemon;
