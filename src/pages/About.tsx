import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Award, Trophy, Shield, Gamepad2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  const stats = [
    { icon: Users, label: "Active Players", value: "2.5M+" },
    { icon: Award, label: "Games Available", value: "15K+" },
    { icon: Trophy, label: "Tournaments", value: "500+" },
    { icon: Shield, label: "Years of Trust", value: "8+" },
  ];

  const values = [
    {
      icon: Gamepad2,
      title: "Gaming First",
      description: "Every decision we make is centered around creating the best gaming experience for our community."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Our platform is built by gamers, for gamers. Your feedback shapes our future."
    },
    {
      icon: Heart,
      title: "Passion Powered",
      description: "We're not just a business - we're passionate gamers who love what we do."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Your gaming experience should be secure and worry-free. We've got your back."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 px-4 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-space-blue/20 via-space-purple/10 to-space-cyan/20" />
          <div className="container mx-auto relative z-10">
            <h1 className="text-6xl md:text-8xl font-bold font-orbitron bg-gradient-to-r from-space-blue via-space-purple to-space-cyan bg-clip-text text-transparent mb-6">
              About Ready Up
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're building the ultimate community-driven gaming platform where players connect, compete, and create unforgettable experiences together.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all duration-300 group-hover:scale-105">
                    <stat.icon className="w-8 h-8 mx-auto mb-4 text-space-cyan group-hover:text-space-blue transition-colors" />
                    <div className="text-3xl font-bold font-orbitron text-space-blue mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-6 bg-gradient-to-r from-space-purple to-space-cyan bg-clip-text text-transparent">
                Our Story
              </h2>
            </div>
            
            <div className="glass-card p-8 md:p-12 rounded-3xl">
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-foreground/90 mb-6">
                  Ready Up was born from a simple frustration: finding the right gaming community shouldn't be harder than beating the final boss. In 2016, a group of passionate gamers came together with a vision to create a platform that puts community first.
                </p>
                <p className="text-lg leading-relaxed text-foreground/90 mb-6">
                  What started as a small Discord server has evolved into a thriving ecosystem where millions of players discover new games, form lasting friendships, and compete in tournaments that matter. We've always believed that gaming is better together.
                </p>
                <p className="text-lg leading-relaxed text-foreground/90">
                  Today, Ready Up continues to push the boundaries of what a gaming platform can be. We're not just selling games - we're cultivating experiences, fostering connections, and building the future of community-driven gaming.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-6 bg-gradient-to-r from-space-blue to-space-purple bg-clip-text text-transparent">
                What Drives Us
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our core values shape every feature we build and every decision we make.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-all duration-300 group hover:scale-105">
                  <div className="flex items-start space-x-4">
                    <div className="glass-card p-3 rounded-xl group-hover:bg-space-blue/20 transition-colors">
                      <value.icon className="w-6 h-6 text-space-cyan group-hover:text-space-blue transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-orbitron mb-3 text-foreground">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto text-center">
            <div className="glass-card p-12 rounded-3xl bg-gradient-to-r from-space-blue/10 via-space-purple/10 to-space-cyan/10">
              <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-6 bg-gradient-to-r from-space-blue to-space-cyan bg-clip-text text-transparent">
                Ready to Join Us?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Become part of the gaming community that's shaping the future of interactive entertainment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-space-blue to-space-cyan hover:opacity-90 transition-opacity font-orbitron">
                  Join the Community
                </Button>
                <Button variant="outline" size="lg" className="border-space-purple/50 text-space-purple hover:bg-space-purple/10 font-orbitron">
                  Browse Games
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;