import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { categories } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-16 md:py-24">
      <div className="container">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Browse Categories</h2>
            <p className="mt-2 text-lg text-muted-foreground">Find what you're looking for.</p>
          </div>
          <Button variant="ghost" asChild className="hover:bg-accent hover:text-accent-foreground">
            <Link href="/categories">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`} className="group block">
              <Card className="overflow-hidden relative aspect-square flex items-end justify-center text-center p-4 transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg border-border/50">
                <Image src={category.image} alt={category.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="category image" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <h3 className="relative text-lg font-bold text-white z-10">{category.name}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
