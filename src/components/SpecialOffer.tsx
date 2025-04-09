
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SpecialOffer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 8,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-tech-darkcharcoal/50 border-y border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Special Summer Sale
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Get up to <span className="text-tech-red font-bold">30% OFF</span> on selected gaming PCs and laptops!
            </p>
            
            <div className="flex space-x-4 mb-8">
              <div className="text-center">
                <div className="bg-tech-black w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold animate-pulse-glow">
                  {timeLeft.days}
                </div>
                <span className="text-sm mt-1 block text-gray-400">Days</span>
              </div>
              
              <div className="text-center">
                <div className="bg-tech-black w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold animate-pulse-glow">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <span className="text-sm mt-1 block text-gray-400">Hours</span>
              </div>
              
              <div className="text-center">
                <div className="bg-tech-black w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold animate-pulse-glow">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <span className="text-sm mt-1 block text-gray-400">Minutes</span>
              </div>
              
              <div className="text-center">
                <div className="bg-tech-black w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold animate-pulse-glow">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <span className="text-sm mt-1 block text-gray-400">Seconds</span>
              </div>
            </div>
            
            <Button size="lg" className="bg-tech-red hover:bg-tech-red/90 text-white">
              <Link to="/deals">View All Deals</Link>
            </Button>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-r from-tech-blue/20 to-tech-purple/20 p-1 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Gaming PC on sale" 
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div className="absolute -top-5 -right-5 bg-tech-red text-white text-xl font-bold h-20 w-20 rounded-full flex items-center justify-center transform rotate-12 animate-pulse">
              -30%
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
