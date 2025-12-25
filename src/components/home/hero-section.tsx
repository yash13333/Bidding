import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';

export default function HeroSection() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
      <Image
        src={placeholderImages.howItWorksBg.imageUrl}
        alt="Abstract background"
        fill
        className="object-cover"
        priority
        data-ai-hint={placeholderImages.howItWorksBg.imageHint}
      />
      <div className="absolute inset-0 bg-background/60 backdrop-brightness-75" />
      <div className="relative z-10 p-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter !font-headline bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Discover, Bid, Win.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-300">
          The ultimate destination for unique finds and thrilling auctions. Your next treasure is just a bid away.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="#featured">Start Bidding</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-primary text-primary hover:bg-primary/10">
            <Link href="/add-product">Sell an Item</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
