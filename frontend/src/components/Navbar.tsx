import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="bg-gradient-hero bg-clip-text text-transparent">Tattoos.lib</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/discover"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/discover') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Discover
            </Link>
            <Link
              to="/profile"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/profile') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Profile
            </Link>
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
