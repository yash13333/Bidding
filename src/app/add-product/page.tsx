import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/lib/data";

export default function AddProductPage() {
    return (
        <div className="container py-12">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">List a New Item for Auction</CardTitle>
                    <CardDescription>Fill out the details below to put your item up for bidding.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Item Name</Label>
                            <Input id="name" placeholder="e.g., Vintage Leica M3 Camera" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Describe your item in detail." required />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Select>
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(category => (
                                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="start-bid">Starting Bid ($)</Label>
                                <Input id="start-bid" type="number" placeholder="e.g., 500" required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="images">Images</Label>
                            <Input id="images" type="file" multiple className="file:text-foreground"/>
                            <p className="text-sm text-muted-foreground">Upload up to 5 images. The first will be the main image.</p>
                        </div>
                         <div className="grid gap-2">
                                <Label htmlFor="end-date">Auction End Date</Label>
                                <Input id="end-date" type="datetime-local" required />
                            </div>
                        <Button type="submit" className="w-full">List Item</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
