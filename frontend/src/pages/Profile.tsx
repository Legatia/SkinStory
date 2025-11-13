import Navbar from "@/components/Navbar";
import TattooCard from "@/components/TattooCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Wallet } from "lucide-react";
import { mockTattoos } from "@/data/mockTattoos";

const Profile = () => {
  const userTattoos = mockTattoos.slice(0, 2);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Profile Header */}
        <div className="mb-8 flex flex-col md:flex-row gap-6 items-start">
          <div className="w-24 h-24 rounded-full bg-gradient-hero flex items-center justify-center">
            <Wallet className="w-12 h-12 text-primary-foreground" />
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Alex Chen</h1>
            <p className="text-muted-foreground mb-4">0x1234...5678</p>
            
            <div className="flex gap-6 mb-4">
              <div>
                <p className="text-2xl font-bold text-primary">{userTattoos.length}</p>
                <p className="text-sm text-muted-foreground">Tattoos Minted</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">0.5 ETH</p>
                <p className="text-sm text-muted-foreground">Tips Received</p>
              </div>
            </div>
            
            <Button variant="hero" className="gap-2">
              <Upload className="w-4 h-4" />
              Upload New Tattoo
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,234</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Community Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">#42</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Member Since</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Jan 2024</p>
            </CardContent>
          </Card>
        </div>

        {/* User's Tattoos */}
        <div>
          <h2 className="text-2xl font-bold mb-6">My Tattoos</h2>
          {userTattoos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userTattoos.map((tattoo) => (
                <TattooCard
                  key={tattoo.id}
                  id={tattoo.id}
                  imageUrl={tattoo.imageUrl}
                  title={tattoo.title}
                  owner={tattoo.owner}
                  isSoulBound={tattoo.isSoulBound}
                  tags={tattoo.tags}
                  showTags={true}
                />
              ))}
            </div>
          ) : (
            <Card className="bg-card border-border p-12 text-center">
              <p className="text-muted-foreground mb-4">You haven't minted any tattoos yet</p>
              <Button variant="hero">Upload Your First Tattoo</Button>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
