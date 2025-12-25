'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      try {
        const endDate = new Date(product.endDate);
        if (isNaN(endDate.getTime())) {
            setTimeLeft('Invalid date');
            return;
        }
        const now = new Date();
        if (endDate > now) {
          setTimeLeft(formatDistanceToNow(endDate, { addSuffix: true }));
        } else {
          setTimeLeft('Auction ended');
        }
      } catch (error) {
        setTimeLeft('Invalid date');
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [product.endDate]);

  return (
    <Card className="flex flex-col h-full bg-card overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/10">
      <Link href={`/product/${product.id}`} className="block group">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="product image"
          />
        </div>
      </Link>
      <CardHeader className="pt-4 pb-2">
        <CardTitle className="text-lg leading-tight truncate">
          <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pt-0 pb-4">
        <div className="flex justify-between items-center text-sm">
          <p className="text-muted-foreground">Current Bid</p>
          <p className="font-bold text-lg text-primary">
            ${product.currentBid.toLocaleString()}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center bg-background/50 p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{timeLeft}</span>
        </div>
        <Button asChild size="sm">
          <Link href={`/product/${product.id}`}>Bid Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
