import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gavel, Menu, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  // Mock authentication state
  const isLoggedIn = false;

  const navLinks = [
    { href: '/#categories', label: 'Categories' },
    { href: '/#featured', label: 'Featured' },
    { href: '/add-product', label: 'Sell Item' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Gavel className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-white">BidVerse</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted-foreground transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          ) : (
            <div className="hidden md:flex gap-2">
                <Button asChild variant="ghost" className="hover:bg-accent hover:text-accent-foreground">
                    <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 mb-4">
                    <Gavel className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold text-white">BidVerse</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  ))}
                </nav>
                {!isLoggedIn && (
                  <div className="flex flex-col gap-2 mt-auto">
                    <Button asChild size="lg"><Link href="/login">Log In</Link></Button>
                    <Button asChild size="lg" variant="secondary"><Link href="/signup">Sign Up</Link></Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
