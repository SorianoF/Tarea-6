import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ExternalLink } from "lucide-react";

interface NewsItem {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  date: string;
}

const WordPressNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Using WordPress.org REST API
      const response = await fetch(
        "https://wordpress.org/news/wp-json/wp/v2/posts?per_page=3"
      );
      const data = await response.json();
      setNews(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al cargar las noticias",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
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
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg className="h-16 w-16" viewBox="0 0 122.52 122.523" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M8.708 61.26c0 20.802 12.089 38.779 29.619 47.298L11.39 36.508c-1.51 8.17-2.682 16.421-2.682 24.752zm99.928-1.014c0-6.496-2.333-10.993-4.334-14.494-2.664-4.329-5.161-7.995-5.161-12.324 0-4.831 3.664-9.328 8.825-9.328.233 0 .454.029.681.042-9.35-8.566-21.807-13.796-35.489-13.796-18.36 0-34.513 9.42-43.91 23.688 1.233.037 2.395.063 3.382.063 5.494 0 14.006-.667 14.006-.667 2.833-.167 3.167 3.994.337 4.329 0 0-2.847.335-6.015.501l19.138 56.925 11.501-34.493-8.188-22.434c-2.83-.166-5.511-.501-5.511-.501-2.832-.166-2.5-4.496.332-4.329 0 0 8.679.667 13.843.667 5.496 0 14.006-.667 14.006-.667 2.835-.167 3.168 3.994.337 4.329 0 0-2.853.335-6.015.501l18.992 56.494 5.242-17.517c2.272-7.269 4.001-12.49 4.001-16.989z"/>
            <path fill="currentColor" d="M62.184 65.857l-15.768 45.819c4.708 1.384 9.687 2.141 14.846 2.141 6.12 0 11.989-1.058 17.452-2.979-.141-.225-.269-.464-.374-.724z"/>
            <path fill="currentColor" d="M107.376 36.046c.226 1.674.354 3.471.354 5.404 0 5.333-.996 11.328-3.996 18.824l-16.053 46.413c15.624-9.111 26.133-26.038 26.133-45.426.001-9.137-2.333-17.729-6.438-25.215z"/>
            <path fill="currentColor" d="M61.262 0C27.483 0 0 27.481 0 61.26c0 33.783 27.483 61.263 61.262 61.263 33.778 0 61.265-27.48 61.265-61.263C122.526 27.481 95.04 0 61.262 0zm0 119.715c-32.23 0-58.453-26.222-58.453-58.455 0-32.23 26.222-58.451 58.453-58.451 32.229 0 58.45 26.221 58.45 58.451 0 32.232-26.221 58.455-58.45 58.455z"/>
          </svg>
          <h1 className="text-4xl font-bold text-foreground">WordPress News</h1>
        </div>
        <p className="text-muted-foreground">Últimas 3 noticias de WordPress.org</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {news.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow animate-in slide-in-from-bottom duration-500">
            <CardHeader>
              <CardTitle className="text-xl">
                {stripHtml(item.title.rendered)}
              </CardTitle>
              <CardDescription>
                {new Date(item.date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {stripHtml(item.excerpt.rendered).substring(0, 200)}...
              </p>
              <Button asChild variant="default">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Visitar noticia completa
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WordPressNews;
