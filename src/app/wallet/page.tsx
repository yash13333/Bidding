
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, ArrowDownToLine, ArrowUpFromLine, CreditCard } from 'lucide-react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const UpiIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4.5 10.5V7.5H2V16.5H4.5" />
        <path d="M21.5 10.5V7.5H19V16.5H21.5" />
        <path d="M7 7.5h2.5l1 3.5 1-3.5H14" />
        <path d="M9.5 16.5V7.5" />
        <path d="M16.5 7.5V14" />
        <path d="M16.5 16.5V16.4" />
    </svg>
);

const PayPalIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M8.32,4H17.21a2,2,0,0,1,1.93,2.49L17.5,14.61a1.2,1.2,0,0,1-1.18.91H9.84a1.86,1.86,0,0,1-1.83-2.06l.89-5.46A.6.6,0,0,0,8.32,7.5H5.5a.6.6,0,0,0-.6.55L3,18.14a.6.6,0,0,0,.6.66H7.78a.6.6,0,0,1,.6.44l.32,1.26a1.2,1.2,0,0,0,1.18.9h2.33a2.38,2.38,0,0,0,2.35-2.26l.12-.76a1.2,1.2,0,0,0-1.18-1.42H11.53a.6.6,0,0,1-.58-.71L12.3,4.92A2,2,0,0,0,10.36,3H6.12a2,2,0,0,0-2,1.72L3.17,10.5H5.43a1.86,1.86,0,0,1,1.83,2.06L6.37,18a.6.6,0,0,0,.58.55H2.33A.6.6,0,0,1,1.75,18L4.25,4.86A2,2,0,0,1,6.18,3h2.14"/>
    </svg>
);


export default function WalletPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userData } = useDoc<{ balance: number }>(userDocRef);
  const balance = userData?.balance ?? 0;

  const [depositAmount, setDepositAmount] = useState('50.00');
  const [withdrawAmount, setWithdrawAmount] = useState('50.00');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userDocRef) return;

    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Please enter a valid amount to deposit.',
      });
      return;
    }
    
    await updateDoc(userDocRef, {
        balance: increment(amount)
    });

    toast({
      title: 'Deposit Successful',
      description: `$${amount.toFixed(2)} has been added to your wallet.`,
    });
    setDepositAmount('50.00');
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userDocRef) return;
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Please enter a valid amount to withdraw.',
      });
      return;
    }
    if (amount > balance) {
        toast({
            variant: 'destructive',
            title: 'Insufficient Funds',
            description: 'You cannot withdraw more than your current balance.',
        });
        return;
    }
    
    await updateDoc(userDocRef, {
        balance: increment(-amount)
    });

    toast({
      title: 'Withdrawal Successful',
      description: `$${amount.toFixed(2)} has been withdrawn from your wallet.`,
    });
    setWithdrawAmount('50.00');
  };

  return (
    <div className="container py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">My Wallet</h1>
        <p className="mt-2 text-lg text-muted-foreground">Manage your funds and transactions.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card className="lg:col-span-1 bg-card/50">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Balance</CardTitle>
                <CardDescription className="text-xs">Available for bidding and withdrawals</CardDescription>
            </div>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold tracking-tight">
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="deposit">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="deposit">
                <ArrowDownToLine className="mr-2 h-4 w-4" />
                Deposit
              </TabsTrigger>
              <TabsTrigger value="withdraw">
                <ArrowUpFromLine className="mr-2 h-4 w-4" />
                Withdraw
              </TabsTrigger>
            </TabsList>
            <TabsContent value="deposit">
              <Card>
                <CardHeader>
                  <CardTitle>Deposit Funds</CardTitle>
                  <CardDescription>Add funds to your wallet using a saved payment method.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDeposit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="deposit-amount">Amount ($)</Label>
                        <Input
                            id="deposit-amount"
                            type="number"
                            placeholder="50.00"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            step="0.01"
                            min="1"
                        />
                    </div>

                    <div>
                        <Label className="mb-4">Select Payment Method</Label>
                        <RadioGroup
                            defaultValue="card"
                            className="grid grid-cols-3 gap-4 mt-2"
                            onValueChange={(value) => setPaymentMethod(value)}
                        >
                            <Label htmlFor="card" className={`border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer ${paymentMethod === 'card' ? 'border-primary ring-2 ring-primary' : ''}`}>
                                <RadioGroupItem value="card" id="card" className="sr-only" />
                                <CreditCard className="mb-2 h-6 w-6" />
                                Card
                            </Label>
                            <Label htmlFor="paypal" className={`border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer ${paymentMethod === 'paypal' ? 'border-primary ring-2 ring-primary' : ''}`}>
                                <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                                <PayPalIcon className="mb-2 h-6 w-6"/>
                                PayPal
                            </Label>
                            <Label htmlFor="upi" className={`border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer ${paymentMethod === 'upi' ? 'border-primary ring-2 ring-primary' : ''}`}>
                                <RadioGroupItem value="upi" id="upi" className="sr-only" />
                                <UpiIcon className="mb-2 h-6 w-6" />
                                UPI
                            </Label>
                        </RadioGroup>
                    </div>

                    <Button type="submit" className="w-full">
                      Deposit Funds
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="withdraw">
              <Card>
                <CardHeader>
                  <CardTitle>Withdraw Funds</CardTitle>
                  <CardDescription>Transfer funds from your wallet to your bank account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleWithdraw} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="withdraw-amount">Amount ($)</Label>
                      <Input
                        id="withdraw-amount"
                        type="number"
                        placeholder="50.00"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        step="0.01"
                        min="1"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Withdraw Funds
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
