import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import profileImage from "@/assets/mario-profile.jpg";

const About = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Acerca de</h1>
        <p className="text-muted-foreground">Información del desarrollador</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              <img
                src={profileImage}
                alt="Mario Eduardo Soriano Flores"
                className="relative w-48 h-48 rounded-full object-cover border-4 border-primary shadow-lg"
              />
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Mario Eduardo Soriano Flores
              </h2>
              <p className="text-lg text-muted-foreground">Desarrollador Full Stack</p>
            </div>

            <Card className="w-full bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="text-center">Información de Contacto</CardTitle>
                <CardDescription className="text-center">
                  Disponible para oportunidades laborales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a
                    href="mailto:sorianofmario@gmail.com"
                    className="text-lg hover:text-primary transition-colors"
                  >
                    sorianofmario@gmail.com
                  </a>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a
                    href="tel:+18098652146"
                    className="text-lg hover:text-primary transition-colors"
                  >
                    809-865-2146
                  </a>
                </div>

                <div className="flex gap-2 justify-center mt-6">
                  <Button asChild>
                    <a href="mailto:sorianofmario@gmail.com">
                      Enviar Email
                    </a>
                  </Button>
                  <Button asChild variant="secondary">
                    <a href="tel:+18098652146">
                      Llamar
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-center">Sobre esta aplicación</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Esta es una aplicación de utilidades múltiples que incluye predictores de género y edad,
                  búsqueda de universidades, información del clima, Pokédex, noticias de WordPress y más.
                  Desarrollada con React, TypeScript y Tailwind CSS.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
