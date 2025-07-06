import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { WeightLogger } from "@/components/WeightLogger";
import { WorkoutSchedule } from "@/components/WorkoutSchedule";
import { DietPlanner } from "@/components/DietPlanner";
import { ProgressTracker } from "@/components/ProgressTracker";
import { AlarmReminders } from "@/components/AlarmReminders";
import { SmartAICoach } from "@/components/SmartAICoach";
import { DailyTaskManager } from "@/components/TaskChecklist";
import { WaterTracker } from "@/components/WaterTracker";

const Index = () => {
  const [currentWeight, setCurrentWeight] = useState(135);
  const targetWeight = 90;
  const startWeight = 135;
  const progressPercentage = ((startWeight - currentWeight) / (startWeight - targetWeight)) * 100;
  
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const [currentTab, setCurrentTab] = useState("dashboard");

  // Request notification permission on load
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2 animate-slide-up">
            💪 FitJourney
          </h1>
          <p className="text-muted-foreground text-sm">{today}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-progress text-progress-foreground">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{currentWeight} kg</div>
                <div className="text-sm opacity-90">Current Weight</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{targetWeight} kg</div>
                <div className="text-sm opacity-90">Target Weight</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overall Progress */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Weight Loss Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.max(0, progressPercentage).toFixed(1)}%</span>
              </div>
              <Progress 
                value={Math.max(0, progressPercentage)} 
                className="h-3"
              />
              <div className="text-xs text-muted-foreground text-center">
                {45 - Math.floor(progressPercentage * 0.45)} kg to go • 6 months plan
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-6">
            <TabsTrigger value="dashboard" className="text-xs">Home</TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs">Tasks</TabsTrigger>
            <TabsTrigger value="water" className="text-xs">Water</TabsTrigger>
            <TabsTrigger value="workout" className="text-xs">Workout</TabsTrigger>
            <TabsTrigger value="diet" className="text-xs">Diet</TabsTrigger>
            <TabsTrigger value="progress" className="text-xs">Progress</TabsTrigger>
            <TabsTrigger value="coach" className="text-xs">AI Coach</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Workout</span>
                  <Badge variant="secondary">Chest Day</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Calories Target</span>
                  <Badge className="bg-nutrition text-nutrition-foreground">1,800 cal</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Water Goal</span>
                  <Badge variant="outline">3L / 4L</Badge>
                </div>
                
                <WeightLogger onWeightUpdate={setCurrentWeight} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks">
            <DailyTaskManager />
          </TabsContent>

          <TabsContent value="water">
            <WaterTracker />
          </TabsContent>

          <TabsContent value="workout">
            <WorkoutSchedule />
          </TabsContent>

          <TabsContent value="diet">
            <DietPlanner />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressTracker currentWeight={currentWeight} />
          </TabsContent>

          <TabsContent value="coach">
            <SmartAICoach currentWeight={currentWeight} />
          </TabsContent>
        </Tabs>

        {/* Quick Action Button */}
        <div className="fixed bottom-6 right-6">
          <Button 
            size="lg" 
            className="rounded-full h-14 w-14 bg-gradient-primary shadow-lg animate-pulse-glow"
          >
            🏃‍♂️
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;