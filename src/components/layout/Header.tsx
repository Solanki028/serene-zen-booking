import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const handleBookNow = () => {
    window.open("https://Velorathaispa.zenoti.com", "_blank");
  };

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4">
      <div className="container mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-6">
         
        <a
  href="https://web.telegram.org/"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
>
  <span className="hidden sm:inline">Contact Us</span>
  
  <svg
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.999 15.2l-.39 5.5c.56 0 .8-.24 1.1-.53l2.6-2.5 5.4 3.9c.99.54 1.7.25 1.96-.92l3.55-16.7h-.01c.32-1.49-.53-2.08-1.5-1.72L1.53 9.68c-1.45.58-1.43 1.42-.26 1.8l5.48 1.7L18.47 5.6c.58-.38 1.1-.17.67.21L9.999 15.2z" />
  </svg>

  <span className="hidden sm:inline">Telegram</span>
</a>

        </div>
        {/* <Button 
          size="sm" 
          variant="secondary"
          onClick={handleBookNow}
          className="gap-2"
        >
          <Calendar className="h-4 w-4" />
          Book Now
        </Button> */}
      </div>
    </div>
  );
};
