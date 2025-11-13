import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload, Shield, Heart, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import Navbar from "@/components/Navbar";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
        </div>
        
        <div className="container relative z-10 px-4 text-center pt-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Your Story,
            <br />
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Forever On-Chain
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Mint your tattoos as soul-bound NFTs. Share the stories and meanings behind your ink with the world.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/discover">
              <Button variant="hero" size="lg" className="gap-2">
                <Sparkles className="w-5 h-5" />
                Explore Gallery
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" size="lg">
                Upload Tattoo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gradient-card border border-border">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload & Mint</h3>
              <p className="text-muted-foreground">
                Share your tattoo photo and story. Mint it as a unique NFT on-chain.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gradient-card border border-border">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Soul Bound</h3>
              <p className="text-muted-foreground">
                Your tattoo NFT is bound to your identity. Non-transferable but can be burned.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gradient-card border border-border">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share & Tip</h3>
              <p className="text-muted-foreground">
                Let others appreciate your art. Receive tips and connect with the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Tattoos.lib. Built on-chain with purpose.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
