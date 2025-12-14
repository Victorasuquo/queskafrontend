import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Sparkles, MapPin, Calendar, Utensils, Hotel } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickActions = [
  { icon: MapPin, label: "Find destinations", query: "Show me popular destinations in Nigeria" },
  { icon: Calendar, label: "Plan trip", query: "Help me plan a 3-day trip to Lagos" },
  { icon: Utensils, label: "Food spots", query: "Recommend local restaurants in my area" },
  { icon: Hotel, label: "Accommodation", query: "Find hotels near Calabar Carnival" },
];

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your Queska Travel AI assistant. How can I help you plan your next adventure today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const simulateAIResponse = (userQuery: string): string => {
    const lowerQuery = userQuery.toLowerCase();
    
    if (lowerQuery.includes("destination") || lowerQuery.includes("where")) {
      return "I'd love to help you discover amazing destinations! Some popular spots in Nigeria include:\n\n🏖️ Ibeno Beach (Akwa Ibom) - Pristine coastline\n🎭 Calabar (Cross River) - Home of the famous carnival\n🌆 Lagos - Vibrant city with endless entertainment\n🏛️ Abuja - Cultural landmarks and museums\n\nWhich type of experience interests you most?";
    }
    
    if (lowerQuery.includes("plan") || lowerQuery.includes("trip") || lowerQuery.includes("itinerary")) {
      return "Great! Let me help you plan that trip. To create the perfect itinerary, I'll need to know:\n\n📍 Your destination\n📅 Travel dates\n👥 Number of travelers\n💰 Budget range\n🎯 Interests (culture, adventure, food, etc.)\n\nOnce you share these details, I'll create a personalized day-by-day plan for you!";
    }
    
    if (lowerQuery.includes("food") || lowerQuery.includes("restaurant") || lowerQuery.includes("eat")) {
      return "Delicious choice! Nigeria has incredible food experiences:\n\n🍲 Local Delicacies - Try Jollof rice, Suya, Pepper soup\n🍽️ Fine Dining - Upscale restaurants in major cities\n🥘 Street Food - Authentic local flavors\n🌶️ Regional Specialties - Each region has unique dishes\n\nWhich city are you exploring, and what's your cuisine preference?";
    }
    
    if (lowerQuery.includes("hotel") || lowerQuery.includes("accommodation") || lowerQuery.includes("stay")) {
      return "I can help you find the perfect place to stay! What matters most to you?\n\n⭐ Luxury hotels with premium amenities\n🏨 Mid-range comfort and value\n🏡 Local guesthouses for authentic experience\n🏖️ Beach resorts\n🌆 City center locations\n\nLet me know your destination and budget, and I'll find great options!";
    }
    
    if (lowerQuery.includes("event") || lowerQuery.includes("festival") || lowerQuery.includes("carnival")) {
      return "Nigeria has fantastic events throughout the year!\n\n🎭 Calabar Carnival (December) - Africa's biggest street party\n🎵 Felabration (October) - Music festival in Lagos\n🎨 Lagos Photo Festival - Art and photography\n🎪 Durbar Festival - Cultural celebration in the North\n\nWould you like details about any specific event or recommendations based on your travel dates?";
    }
    
    return "I'm here to help with all your travel needs - from finding the best destinations, planning itineraries, booking accommodations, to discovering local experiences. What would you like to know more about?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: simulateAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (query: string) => {
    setInput(query);
    setTimeout(() => handleSend(), 100);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl hover:shadow-[0_0_40px_rgba(var(--primary),0.4)] transition-all duration-300 z-50 group hover:scale-125 active:scale-110"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
        <span className="sr-only">Open chat</span>
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-[400px] h-[600px] shadow-2xl z-50 flex flex-col animate-scale-in">
      {/* Header */}
      <div className="p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Queska AI Assistant</h3>
              <p className="text-xs opacity-90">Always here to help</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="hover:bg-primary-foreground/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="p-4 border-t bg-muted/30">
          <p className="text-xs font-medium text-muted-foreground mb-3">Quick actions:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.query)}
                className="justify-start h-auto py-2 px-3"
              >
                <action.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me anything about travel..."
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIChat;
