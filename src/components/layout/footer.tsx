import Link from 'next/link';
import { Gavel } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Gavel className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-white">Auction Hub</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">About Us</Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">Contact</Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">Terms of Service</Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">Privacy Policy</Link>
          </nav>
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Auction Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
