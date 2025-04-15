import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; //  import for navigation

const HeroSection = () => {
  const navigate = useNavigate(); //  navigation hook

  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Launching Soon
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Vitality for the <span className="text-primary">Digital Age</span>
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Empowering agriculture with technology for seamless plant disease detection and monitoring 
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                className="gap-1"
                onClick={() => navigate('/login')} // ⬅️ redirect on click
              >
                Login <ArrowRight size={16} />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex -space-x-2">
                <img src="/api/placeholder/32/32" alt="User" className="rounded-full border-2 border-background" />
                <img src="/api/placeholder/32/32" alt="User" className="rounded-full border-2 border-background" />
                <img src="/api/placeholder/32/32" alt="User" className="rounded-full border-2 border-background" />
              </div>
              <div className="text-muted-foreground">
                Joined by over <span className="font-medium text-foreground">5,000+</span> users
              </div>
            </div>
          </div>
          <div className="relative lg:pl-6">
            <div className="relative bg-gradient-to-b from-primary/20 to-background rounded-lg overflow-hidden">
              <div className="p-3">
                <div className="aspect-video bg-muted rounded-md overflow-hidden">
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="Vitalis Dashboard" 
                    className="object-cover w-full h-full" 
                  />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 h-1/2 w-1/2 rounded-lg bg-gradient-to-br from-primary/40 to-primary/5 blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
