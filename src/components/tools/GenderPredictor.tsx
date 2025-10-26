import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User } from "lucide-react";

interface GenderResponse {
  name: string;
  gender: "male" | "female";
  probability: number;
  count: number;
}

const GenderPredictor = () => {
  const [name, setName] = useState("");
  const [result, setResult] = useState<GenderResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const predictGender = async () => {
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
      const response = await fetch(`https://api.genderize.io/?name=${name}`);
      const data = await response.json();
      
      if (!data.gender) {
        toast({
          title: "No se encontró información",
          description: "No se pudo determinar el género para este nombre",
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

  const genderColor = result?.gender === "male" 
    ? "bg-[hsl(var(--male-color))]" 
    : "bg-[hsl(var(--female-color))]";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Predictor de Género</h1>
        <p className="text-muted-foreground">Descubre el género más probable según el nombre</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Ingresa un nombre</CardTitle>
          <CardDescription>Usa nombres en inglés para mejores resultados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ejemplo: Irma, John, Maria..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && predictGender()}
            />
            <Button onClick={predictGender} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Predecir"}
            </Button>
          </div>

          {result && (
            <div className={`p-8 rounded-lg ${genderColor} text-white space-y-4 animate-in slide-in-from-bottom duration-500`}>
              <div className="flex items-center justify-center gap-4">
                <User className="h-16 w-16" />
                <div className="text-center">
                  <h3 className="text-3xl font-bold capitalize">{result.name}</h3>
                  <p className="text-xl opacity-90">
                    {result.gender === "male" ? "👨 Masculino" : "👩 Femenino"}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg opacity-90">
                  Probabilidad: {(result.probability * 100).toFixed(1)}%
                </p>
                <p className="text-sm opacity-75">
                  Basado en {result.count.toLocaleString()} registros
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GenderPredictor;
