import { Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <Wrench className="relative h-32 w-32 text-primary animate-pulse" />
          </div>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Caja de Herramientas
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Una colección de utilidades prácticas para tu día a día
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <Card className="hover:shadow-lg transition-shadow hover:border-primary/50">
          <CardHeader>
            <CardTitle className="text-primary">🚻 Predictor de Género</CardTitle>
            <CardDescription>Predice el género basado en un nombre</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow hover:border-secondary/50">
          <CardHeader>
            <CardTitle className="text-secondary">👶 Predictor de Edad</CardTitle>
            <CardDescription>Estima la edad promedio de un nombre</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow hover:border-accent/50">
          <CardHeader>
            <CardTitle className="text-accent">🎓 Universidades</CardTitle>
            <CardDescription>Busca universidades por país</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow hover:border-primary/50">
          <CardHeader>
            <CardTitle className="text-primary">🌤️ Clima RD</CardTitle>
            <CardDescription>Consulta el clima en República Dominicana</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow hover:border-secondary/50">
          <CardHeader>
            <CardTitle className="text-secondary">⚡ Pokémon</CardTitle>
            <CardDescription>Información detallada de Pokémon</CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow hover:border-accent/50">
          <CardHeader>
            <CardTitle className="text-accent">📰 Noticias</CardTitle>
            <CardDescription>Últimas noticias de WordPress</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Home;
