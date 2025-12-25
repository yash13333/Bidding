import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import CountdownTimer from '@/components/countdown-timer';
import BiddingTool from '@/components/bidding-tool';
import { format } from 'date-fns';

type ProductPageProps = {
  params: { id: string };
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const timeRemaining = new Date(product.endDate).getTime() - new Date().getTime();

  return (
    <div className="container py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((img, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <div className="relative aspect-[4/3]">
                        <Image
                            src={img}
                            alt={`${product.name} image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            data-ai-hint="product image"
                        />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <Badge variant="secondary" className="mb-2 capitalize">{product.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
            <p className="mt-4 text-muted-foreground">{product.description}</p>
          </div>

          <Card className="bg-card">
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle>Live Auction</CardTitle>
              <CountdownTimer endDate={product.endDate} />
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-baseline justify-between">
                <p className="text-muted-foreground">Current Bid</p>
                <p className="text-4xl font-bold text-primary">${product.currentBid.toLocaleString()}</p>
              </div>
              <form className="grid gap-4">
                <div className="grid grid-cols-3 gap-2">
                    <Button type="button" variant="outline">+ $10</Button>
                    <Button type="button" variant="outline">+ $50</Button>
                    <Button type="button" variant="outline">+ $100</Button>
                </div>
                <div className="flex gap-2">
                  <Label htmlFor="bid-amount" className="sr-only">Bid amount</Label>
                  <Input id="bid-amount" type="number" placeholder={`$${product.currentBid + 10} or more`} />
                  <Button type="submit" className="px-8">Place Bid</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <BiddingTool 
            currentBid={product.currentBid}
            productValue={product.value}
            timeRemaining={timeRemaining > 0 ? timeRemaining / 1000 : 0}
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Bid History</CardTitle>
              <CardDescription>See the latest bidding activity.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[...product.bidHistory].reverse().map((bid, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{bid.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{bid.user}</p>
                        <p className="text-sm text-muted-foreground">{format(new Date(bid.timestamp), "MMM d, yyyy 'at' h:mm a")}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-lg">${bid.amount.toLocaleString()}</p>
                  </li>
                ))}
                {product.bidHistory.length === 0 && <p className="text-muted-foreground text-center py-4">No bids yet. Be the first!</p>}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
