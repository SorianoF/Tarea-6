import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Cloud, Droplets, Wind, Eye, Gauge } from "lucide-react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
}

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      // Using Open-Meteo API (free, no API key required)
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=18.4861&longitude=-69.9312&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timezone=America%2FNew_York"
      );
      const data = await response.json();
      
      // Transform to weather-like format
      const transformedData: WeatherData = {
        name: "Santo Domingo, RD",
        main: {
          temp: data.current.temperature_2m,
          feels_like: data.current.apparent_temperature,
          humidity: data.current.relative_humidity_2m,
          pressure: 1013, // Default value
        },
        weather: [{
          main: getWeatherDescription(data.current.weather_code),
          description: getWeatherDescription(data.current.weather_code),
          icon: "01d"
        }],
        wind: {
          speed: data.current.wind_speed_10m,
        },
        visibility: 10000,
      };
      
      setWeather(transformedData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al obtener el clima",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getWeatherDescription = (code: number): string => {
    if (code === 0) return "Despejado";
    if (code <= 3) return "Parcialmente nublado";
    if (code <= 48) return "Nublado";
    if (code <= 67) return "Lluvia";
    if (code <= 77) return "Nieve";
    if (code <= 82) return "Lluvia intensa";
    return "Tormenta";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Clima en República Dominicana</h1>
        <p className="text-muted-foreground">Condiciones actuales en Santo Domingo</p>
      </div>

      {weather && (
        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">{weather.name}</CardTitle>
            <CardDescription className="text-lg">
              {new Date().toLocaleDateString("es-ES", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <Cloud className="h-24 w-24 mx-auto text-primary" />
              <div className="text-6xl font-bold text-foreground">
                {Math.round(weather.main.temp)}°C
              </div>
              <p className="text-xl text-muted-foreground capitalize">
                {weather.weather[0].description}
              </p>
              <p className="text-sm text-muted-foreground">
                Sensación térmica: {Math.round(weather.main.feels_like)}°C
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Droplets className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{weather.main.humidity}%</p>
                  <p className="text-xs text-muted-foreground">Humedad</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Wind className="h-8 w-8 mx-auto mb-2 text-secondary" />
                  <p className="text-2xl font-bold">{Math.round(weather.wind.speed)} km/h</p>
                  <p className="text-xs text-muted-foreground">Viento</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Eye className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <p className="text-2xl font-bold">{(weather.visibility / 1000).toFixed(1)} km</p>
                  <p className="text-xs text-muted-foreground">Visibilidad</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Gauge className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{weather.main.pressure} hPa</p>
                  <p className="text-xs text-muted-foreground">Presión</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Weather;
