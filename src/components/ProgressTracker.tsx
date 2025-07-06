import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  currentWeight: number;
}

interface WeightEntry {
  date: string;
  weight: number;
}

export const ProgressTracker = ({ currentWeight }: ProgressTrackerProps) => {
  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([]);
  const startWeight = 135;
  const targetWeight = 90;
  const targetDate = new Date();
  targetDate.setMonth(targetDate.getMonth() + 6);

  useEffect(() => {
    // Load weight history from localStorage
    const savedData = localStorage.getItem('weightLog');
    if (savedData) {
      const weightData = JSON.parse(savedData);
      const history = Object.entries(weightData).map(([date, weight]) => ({
        date,
        weight: weight as number
      })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setWeightHistory(history);
    }
  }, [currentWeight]);

  const weightLost = startWeight - currentWeight;
  const totalToLose = startWeight - targetWeight;
  const progressPercentage = (weightLost / totalToLose) * 100;
  
  const daysElapsed = Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24));
  const totalDays = 180; // 6 months
  const timeProgressPercentage = (daysElapsed / totalDays) * 100;
  
  // Calculate weekly average weight loss
  const weeklyGoal = totalToLose / 26; // 6 months = ~26 weeks
  const actualWeeklyLoss = weightLost / (daysElapsed / 7);
  
  // Prediction based on current pace
  const projectedFinalWeight = startWeight - (actualWeeklyLoss * 26);
  
  return (
    <div className="space-y-4">
      {/* Main Progress Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-progress text-progress-foreground">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{weightLost.toFixed(1)} kg</div>
            <div className="text-sm opacity-90">Weight Lost</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{(totalToLose - weightLost).toFixed(1)} kg</div>
            <div className="text-sm opacity-90">To Go</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Progress Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Weight Progress</span>
              <span>{Math.max(0, progressPercentage).toFixed(1)}%</span>
            </div>
            <Progress value={Math.max(0, progressPercentage)} className="h-3" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Time Progress</span>
              <span>{Math.min(100, timeProgressPercentage).toFixed(1)}%</span>
            </div>
            <Progress value={Math.min(100, timeProgressPercentage)} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Weekly Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weekly Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Target per week</span>
            <Badge variant="outline">{weeklyGoal.toFixed(1)} kg</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Current pace</span>
            <Badge className={actualWeeklyLoss >= weeklyGoal ? "bg-progress text-progress-foreground" : "bg-destructive text-destructive-foreground"}>
              {actualWeeklyLoss.toFixed(1)} kg
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Projected final weight</span>
            <Badge className="bg-muted text-muted-foreground">
              {projectedFinalWeight.toFixed(1)} kg
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recent Weight History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Entries</CardTitle>
        </CardHeader>
        <CardContent>
          {weightHistory.length > 0 ? (
            <div className="space-y-2">
              {weightHistory.slice(-7).reverse().map((entry, index) => (
                <div key={entry.date} className="flex justify-between items-center p-2 rounded bg-muted/30">
                  <span className="text-sm">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  <Badge variant="secondary">{entry.weight} kg</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-4">
              <p>No weight entries yet.</p>
              <p className="text-sm">Start logging your daily weight to see progress!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Motivation Card */}
      <Card className="bg-gradient-nutrition text-nutrition-foreground">
        <CardContent className="p-4 text-center">
          <div className="text-lg font-medium mb-2">
            {progressPercentage > 10 ? "🔥 Great Progress!" : 
             progressPercentage > 0 ? "🌟 Keep Going!" : "💪 Let's Start!"}
          </div>
          <div className="text-sm opacity-90">
            {progressPercentage > 50 ? "You're more than halfway there!" :
             progressPercentage > 25 ? "You're building great momentum!" :
             progressPercentage > 0 ? "Every step counts toward your goal!" :
             "Your fitness journey starts with the first step!"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};