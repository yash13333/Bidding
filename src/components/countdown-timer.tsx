'use client';

import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';

type CountdownTimerProps = {
  endDate: Date;
};

type TimeLeft = {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
};

export default function CountdownTimer({ endDate }: CountdownTimerProps) {
  const calculateTimeLeft = (): TimeLeft => {
    try {
        const difference = +new Date(endDate) - +new Date();
        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
    } catch (error) {
        return {};
    }
    return {};
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({});

  useEffect(() => {
    // Set initial time to avoid hydration mismatch
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const timerComponents: JSX.Element[] = [];

  Object.entries(timeLeft).forEach(([interval, value]) => {
    if (value === undefined || value < 0) return;
    
    timerComponents.push(
      <div key={interval} className="flex flex-col items-center">
        <span className="font-bold text-lg">{value.toString().padStart(2, '0')}</span>
        <span className="text-xs text-muted-foreground">{interval.charAt(0).toUpperCase()}</span>
      </div>
    );
  });

  if (!timerComponents.length) {
    return <Badge variant="destructive">Auction Ended</Badge>;
  }

  return (
    <div className="flex gap-3 tabular-nums">
        {timerComponents}
    </div>
  );
}
