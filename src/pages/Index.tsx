import { useState } from "react";
import { Menu, Home as HomeIcon, User, Users, Cloud, Zap, Newspaper, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Home from "@/components/tools/Home";
import GenderPredictor from "@/components/tools/GenderPredictor";
import AgePredictor from "@/components/tools/AgePredictor";
import Universities from "@/components/tools/Universities";
import Weather from "@/components/tools/Weather";
import Pokemon from "@/components/tools/Pokemon";
import WordPressNews from "@/components/tools/WordPressNews";
import About from "@/components/tools/About";

type Tool = "home" | "gender" | "age" | "universities" | "weather" | "pokemon" | "news" | "about";

const Index = () => {
  const [currentTool, setCurrentTool] = useState<Tool>("home");
  const [isOpen, setIsOpen] = useState(false);

  const tools = [
    { id: "home" as Tool, name: "Inicio", icon: HomeIcon },
    { id: "gender" as Tool, name: "Género", icon: User },
    { id: "age" as Tool, name: "Edad", icon: Users },
    { id: "universities" as Tool, name: "Universidades", icon: Zap },
    { id: "weather" as Tool, name: "Clima RD", icon: Cloud },
    { id: "pokemon" as Tool, name: "Pokémon", icon: Zap },
    { id: "news" as Tool, name: "Noticias", icon: Newspaper },
    { id: "about" as Tool, name: "Acerca de", icon: Info },
  ];

  const renderTool = () => {
    switch (currentTool) {
      case "home":
        return <Home />;
      case "gender":
        return <GenderPredictor />;
      case "age":
        return <AgePredictor />;
      case "universities":
        return <Universities />;
      case "weather":
        return <Weather />;
      case "pokemon":
        return <Pokemon />;
      case "news":
        return <WordPressNews />;
      case "about":
        return <About />;
      default:
        return <Home />;
    }
  };

  const MenuContent = () => (
    <div className="flex flex-col gap-2 p-4">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Caja de Herramientas
      </h2>
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <Button
            key={tool.id}
            variant={currentTool === tool.id ? "default" : "ghost"}
            className="justify-start gap-2"
            onClick={() => {
              setCurrentTool(tool.id);
              setIsOpen(false);
            }}
          >
            <Icon className="h-5 w-5" />
            {tool.name}
          </Button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 lg:hidden">
        <div className="flex h-16 items-center px-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <MenuContent />
            </SheetContent>
          </Sheet>
          <h1 className="ml-4 text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Caja de Herramientas
          </h1>
        </div>
      </header>

      {/* Desktop Layout */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r min-h-screen sticky top-0 bg-card">
          <MenuContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {renderTool()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
