import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface WaterEntry {
  time: string;
  amount: number;
  timestamp: Date;
}

export const WaterTracker = () => {
  const [todayWater, setTodayWater] = useState<WaterEntry[]>([]);
  const [dailyGoal] = useState(4000); // 4L in ml
  const { toast } = useToast();

  const totalConsumed = todayWater.reduce((total, entry) => total + entry.amount, 0);
  const progressPercentage = (totalConsumed / dailyGoal) * 100;

  useEffect(() => {
    // Load today's water data
    const today = new Date().toISOString().split('T')[0];
    const savedWater = localStorage.getItem(`water-${today}`);
    if (savedWater) {
      const parsed = JSON.parse(savedWater);
      setTodayWater(parsed.map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      })));
    }
  }, []);

  const addWater = (amount: number) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newEntry: WaterEntry = {
      time: timeString,
      amount,
      timestamp: now
    };

    const updatedWater = [...todayWater, newEntry];
    setTodayWater(updatedWater);

    // Save to localStorage
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`water-${today}`, JSON.stringify(updatedWater));

    // Show toast
    const newTotal = totalConsumed + amount;
    toast({
      title: `💧 Added ${amount}ml water!`,
      description: `Total: ${newTotal}ml / ${dailyGoal}ml (${((newTotal / dailyGoal) * 100).toFixed(1)}%)`,
    });

    // Milestone celebrations
    if (newTotal >= dailyGoal && totalConsumed < dailyGoal) {
      setTimeout(() => {
        toast({
          title: "🎉 Daily Water Goal Achieved!",
          description: "Excellent hydration! Your body thanks you!",
        });
      }, 500);
    }
  };

  const getHydrationStatus = () => {
    const percentage = progressPercentage;
    if (percentage >= 100) return { status: "Excellent", color: "bg-progress", emoji: "💪" };
    if (percentage >= 75) return { status: "Good", color: "bg-water", emoji: "😊" };
    if (percentage >= 50) return { status: "Fair", color: "bg-primary", emoji: "🙂" };
    if (percentage >= 25) return { status: "Low", color: "bg-nutrition", emoji: "😐" };
    return { status: "Critical", color: "bg-destructive", emoji: "😟" };
  };

  const hydrationStatus = getHydrationStatus();

  const quickAmounts = [250, 500, 750, 1000];

  return (
    <div className="space-y-4">
      {/* Main Water Stats */}
      <Card className="bg-gradient-water text-water-foreground">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold">
              {(totalConsumed / 1000).toFixed(1)}L
            </div>
            <div className="text-sm opacity-90">of {dailyGoal / 1000}L daily goal</div>
            <div className="flex justify-center space-x-2 items-center">
              <span className="text-2xl">{hydrationStatus.emoji}</span>
              <Badge className={`${hydrationStatus.color} text-white`}>
                {hydrationStatus.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Visualization */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Daily Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Hydration Level</span>
              <span>{Math.min(100, progressPercentage).toFixed(1)}%</span>
            </div>
            <Progress 
              value={Math.min(100, progressPercentage)} 
              className="h-3"
            />
          </div>
          
          {/* Water visualization */}
          <div className="flex justify-center">
            <div className="relative w-24 h-20 bg-muted rounded-full overflow-hidden border-2 border-border">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-water transition-all duration-1000 ease-out"
                style={{ height: `${Math.min(100, progressPercentage)}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                💧
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Add Buttons */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Add</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {quickAmounts.map((amount) => (
              <Button
                key={amount}
                variant="modern"
                onClick={() => addWater(amount)}
                className="text-sm"
              >
                +{amount}ml
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Water Log */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Today's Log</CardTitle>
        </CardHeader>
        <CardContent>
          {todayWater.length > 0 ? (
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {todayWater.slice(-5).reverse().map((entry, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center p-2 rounded bg-background/30"
                >
                  <span className="text-sm">{entry.time}</span>
                  <Badge variant="outline">+{entry.amount}ml</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <div className="text-2xl mb-2">💧</div>
              <p className="text-sm">No water logged yet today</p>
              <p className="text-xs">Start hydrating!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hydration Tips */}
      <Card className="bg-gradient-card backdrop-blur-sm border border-border/20">
        <CardContent className="p-4">
          <div className="text-sm text-center">
            <p className="font-medium mb-1">💡 Hydration Tips</p>
            <p className="text-muted-foreground text-xs">
              {progressPercentage < 25 ? "Start your day with 500ml of water!" :
               progressPercentage < 50 ? "Keep sipping throughout the day" :
               progressPercentage < 75 ? "You're doing great! Stay consistent" :
               progressPercentage < 100 ? "Almost there! Finish strong!" :
               "Perfect hydration! Your metabolism is optimized!"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};