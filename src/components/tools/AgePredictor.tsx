import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface AgeResponse {
  name: string;
  age: number;
  count: number;
}

const AgePredictor = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState<AgeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const predictAge = async () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un nombre",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://api.agify.io/?name=${name}`);
      const data = await response.json();
      
      if (!data.age) {
        toast({
          title: "No se encontró información",
          description: "No se pudo determinar la edad para este nombre",
          variant: "destructive",
        });
        setResult(null);
      } else {
        setResult(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al consultar la API",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getAgeCategory = (age: number) => {
    if (age < 30) return { label: "Joven", emoji: "👶", color: "bg-[hsl(var(--young-color))]" };
    if (age < 60) return { label: "Adulto", emoji: "👨", color: "bg-[hsl(var(--adult-color))]" };
    return { label: "Anciano", emoji: "👴", color: "bg-[hsl(var(--old-color))]" };
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Predictor de Edad</h1>
        <p className="text-muted-foreground">Estima la edad promedio según el nombre</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Ingresa un nombre</CardTitle>
          <CardDescription>Usa nombres en inglés para mejores resultados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ejemplo: Meelad, Robert, Sarah..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && predictAge()}
            />
            <Button onClick={predictAge} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Predecir"}
            </Button>
          </div>

          {result && (() => {
            const category = getAgeCategory(result.age);
            return (
              <div className={`p-8 rounded-lg ${category.color} text-white space-y-4 animate-in slide-in-from-bottom duration-500`}>
                <div className="text-center space-y-4">
                  <div className="text-6xl">{category.emoji}</div>
                  <h3 className="text-3xl font-bold capitalize">{result.name}</h3>
                  <div className="space-y-2">
                    <p className="text-5xl font-bold">{result.age} años</p>
                    <p className="text-2xl opacity-90">{category.label}</p>
                  </div>
                  <p className="text-sm opacity-75">
                    Basado en {result.count.toLocaleString()} registros
                  </p>
                </div>
              </div>
            );
          })()}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgePredictor;
