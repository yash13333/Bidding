
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

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
                  <form onSubmit={handleDeposit} className="space-y-4">
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
