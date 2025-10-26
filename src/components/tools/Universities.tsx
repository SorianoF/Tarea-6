import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ExternalLink } from "lucide-react";

interface University {
  name: string;
  web_pages: string[];
  domains: string[];
  country: string;
}

const Universities = () => {
  const [country, setCountry] = useState("Dominican Republic");
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const searchUniversities = async () => {
    if (!country.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un país",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`
      );
      const data = await response.json();
      
      if (data.length === 0) {
        toast({
          title: "No se encontraron resultados",
          description: "No se encontraron universidades para este país",
        });
      }
      setUniversities(data);
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

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Universidades del Mundo</h1>
        <p className="text-muted-foreground">Busca universidades por país (en inglés)</p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Buscar Universidades</CardTitle>
          <CardDescription>Ingresa el nombre del país en inglés</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ejemplo: Dominican Republic, United States, Spain..."
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && searchUniversities()}
            />
            <Button onClick={searchUniversities} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buscar"}
            </Button>
          </div>

          {universities.length > 0 && (
            <div className="space-y-3 animate-in fade-in duration-500">
              <p className="text-sm text-muted-foreground">
                Se encontraron {universities.length} universidades
              </p>
              <div className="grid gap-3 max-h-[600px] overflow-y-auto">
                {universities.map((uni, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{uni.name}</CardTitle>
                      <CardDescription>
                        <span className="font-medium">Dominio:</span> {uni.domains.join(", ")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <a
                        href={uni.web_pages[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline"
                      >
                        Visitar sitio web
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Universities;
