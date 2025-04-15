import React from 'react';
import { Activity, BarChart2, Clock, Heart, Smartphone, Users } from 'lucide-react';

const features = [
  {
    icon: <Activity className="w-10 h-10 text-primary" />,
    title: "Crop Health Tracking",
    description: "Monitor plant vitals and health metrics with precision and ease."
  },
  {
    icon: <BarChart2 className="w-10 h-10 text-primary" />,
    title: "Data Analytics",
    description: "Gain insights through powerful analytics and personalized reports."
  },
  {
    icon: <Clock className="w-10 h-10 text-primary" />,
    title: "Real-time Monitoring",
    description: "Track crop health in real-time with instant notifications and alerts."
  },
  {
    icon: <Heart className="w-10 h-10 text-primary" />,
    title: "AI-Powered Crop Disease Detection",
    description: "Access AI-tailored disease detection system."
  },
  {
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    title: "Mobile Integration",
    description: "Seamlessly sync across all your devices with our mobile-first approach."
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "Community Support",
    description: "Connect with like-minded individuals on our platform."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Comprehensive Features for both Domestic as well as Rural Agriculture
          </h2>
          <p className="mt-4 text-muted-foreground">
            Discover how Vitalis can transform modern agricultural methods with innovative features.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;