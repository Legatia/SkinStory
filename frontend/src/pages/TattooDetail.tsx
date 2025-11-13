import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockTattoos } from "@/data/mockTattoos";
import { ArrowLeft, Heart, ExternalLink, Calendar, DollarSign, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePyusdTip } from "@/hooks/use-pyusd-tip";
import { PayPalOnRamp } from "@/components/PayPalOnRamp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TattooDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const tattoo = mockTattoos.find(t => t.id === id);
  const { sendTip, balance, isProcessing, isSuccess, isConnected } = usePyusdTip();
  const [tipAmount, setTipAmount] = useState("5.00");
  const [showTipDialog, setShowTipDialog] = useState(false);

  if (!tattoo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tattoo not found</h1>
          <Link to="/discover">
            <Button variant="hero">Back to Discover</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleTipClick = () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to send tips",
        variant: "destructive",
      });
      return;
    }
    setShowTipDialog(true);
  };

  const handleSendTip = async () => {
    if (!tattoo.ownerAddress) return;

    await sendTip(tattoo.ownerAddress as `0x${string}`, tipAmount);

    if (isSuccess) {
      setShowTipDialog(false);
      toast({
        title: "Tip sent successfully!",
        description: `You sent ${tipAmount} PYUSD to ${tattoo.owner}`,
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Link to="/discover" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Discover
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-border bg-card">
              <CardContent className="p-0">
                <img 
                  src={tattoo.imageUrl} 
                  alt={tattoo.title}
                  className="w-full aspect-square object-cover"
                />
              </CardContent>
            </Card>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{tattoo.title}</h1>
                  <p className="text-muted-foreground">by {tattoo.owner}</p>
                </div>
                {tattoo.isSoulBound && (
                  <Badge className="bg-primary">Soul Bound</Badge>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Minted {new Date(tattoo.mintedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Story */}
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">The Story</h2>
                <p className="text-muted-foreground leading-relaxed">{tattoo.story}</p>
              </CardContent>
            </Card>

            {/* Tags */}
            {tattoo.tags && tattoo.tags.length > 0 && (
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tattoo.tags.map(tag => (
                      <Badge key={tag.id} variant="secondary">
                        {tag.label}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Owner Info */}
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">Owner</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{tattoo.owner}</p>
                    <p className="text-sm text-muted-foreground">{tattoo.ownerAddress}</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View on Explorer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="hero"
                className="flex-1 gap-2"
                onClick={handleTipClick}
                disabled={isProcessing}
              >
                <Heart className="w-4 h-4" />
                {isProcessing ? "Processing..." : "Send Tip"}
              </Button>
              <Button variant="outline">
                Share
              </Button>
            </div>

            {isConnected && (
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg text-sm">
                <span className="text-muted-foreground">Your PYUSD Balance:</span>
                <span className="font-semibold">{balance} PYUSD</span>
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center">
              This is a soul-bound token and cannot be transferred. Only the owner can burn it by uploading a removal photo.
            </p>
          </div>
        </div>
      </main>

      {/* Tip Dialog */}
      <Dialog open={showTipDialog} onOpenChange={setShowTipDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send a Tip to {tattoo.owner}</DialogTitle>
            <DialogDescription>
              Support this artist with PYUSD. Your tip goes directly to their wallet.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Tip Amount (PYUSD)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={tipAmount}
                  onChange={(e) => setTipAmount(e.target.value)}
                  className="pl-9"
                  placeholder="5.00"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTipAmount("5.00")}
              >
                $5
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTipAmount("10.00")}
              >
                $10
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTipAmount("25.00")}
              >
                $25
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTipAmount("50.00")}
              >
                $50
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Your Balance:
              </span>
              <span className="font-semibold">{balance} PYUSD</span>
            </div>

            {parseFloat(balance) < parseFloat(tipAmount) && (
              <div className="space-y-2">
                <p className="text-sm text-destructive">
                  Insufficient PYUSD balance. Need more PYUSD?
                </p>
                <PayPalOnRamp defaultAmount={parseFloat(tipAmount)}>
                  <Button variant="outline" className="w-full gap-2">
                    <DollarSign className="h-4 w-4" />
                    Buy PYUSD
                  </Button>
                </PayPalOnRamp>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowTipDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="hero"
              onClick={handleSendTip}
              disabled={isProcessing || parseFloat(balance) < parseFloat(tipAmount)}
              className="flex-1"
            >
              {isProcessing ? "Sending..." : `Send ${tipAmount} PYUSD`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TattooDetail;
