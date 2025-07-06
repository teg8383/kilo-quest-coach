import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const workoutPlan = {
  "Monday": {
    focus: "Chest",
    exercises: [
      { name: "Push-ups", sets: "3x12", video: "https://youtube.com/watch?v=IODxDxX7oi4" },
      { name: "Chest Press", sets: "3x10", video: "https://youtube.com/watch?v=SrqOu55lrYU" },
      { name: "Incline Push-ups", sets: "3x8", video: "https://youtube.com/watch?v=cfns5VzPiso" },
      { name: "Chest Flyes", sets: "3x12", video: "https://youtube.com/watch?v=eozdVDA78K0" },
      { name: "Diamond Push-ups", sets: "2x8", video: "https://youtube.com/watch?v=J0DnG1_S92I" },
      { name: "Wall Push-ups", sets: "2x15", video: "https://youtube.com/watch?v=R08gYyypGto" }
    ]
  },
  "Tuesday": {
    focus: "Back",
    exercises: [
      { name: "Pull-ups", sets: "3x8", video: "https://youtube.com/watch?v=eGo4IYlbE5g" },
      { name: "Bent Over Rows", sets: "3x10", video: "https://youtube.com/watch?v=fISDoIGsOTY" },
      { name: "Superman", sets: "3x12", video: "https://youtube.com/watch?v=z6PJMT2y8GQ" },
      { name: "Reverse Flyes", sets: "3x12", video: "https://youtube.com/watch?v=T9Y4o_BqC0A" },
      { name: "Deadlifts", sets: "3x8", video: "https://youtube.com/watch?v=op9kVnSso6Q" },
      { name: "Lat Pulldowns", sets: "3x10", video: "https://youtube.com/watch?v=CAwf7n6Luuc" }
    ]
  },
  "Wednesday": {
    focus: "Legs",
    exercises: [
      { name: "Squats", sets: "3x15", video: "https://youtube.com/watch?v=aclHkVaku9U" },
      { name: "Lunges", sets: "3x12", video: "https://youtube.com/watch?v=QE6E5oWFWZs" },
      { name: "Calf Raises", sets: "3x20", video: "https://youtube.com/watch?v=gwLzBJYoWlI" },
      { name: "Wall Sits", sets: "3x30s", video: "https://youtube.com/watch?v=y-wV4Venusw" },
      { name: "Leg Raises", sets: "3x12", video: "https://youtube.com/watch?v=JB2oyawG9KI" },
      { name: "Glute Bridges", sets: "3x15", video: "https://youtube.com/watch?v=OUgsJ8-Vi0E" }
    ]
  },
  "Thursday": {
    focus: "Arms",
    exercises: [
      { name: "Bicep Curls", sets: "3x12", video: "https://youtube.com/watch?v=ykJmrZ5v0Oo" },
      { name: "Tricep Dips", sets: "3x10", video: "https://youtube.com/watch?v=6kALZikXxLc" },
      { name: "Hammer Curls", sets: "3x10", video: "https://youtube.com/watch?v=zC3nLlEvin4" },
      { name: "Overhead Press", sets: "3x8", video: "https://youtube.com/watch?v=M2rwvNhTOu0" },
      { name: "Tricep Extensions", sets: "3x12", video: "https://youtube.com/watch?v=nRiJVZDpdL0" },
      { name: "Arm Circles", sets: "2x20", video: "https://youtube.com/watch?v=3-8pOJ6W8Y8" }
    ]
  },
  "Friday": {
    focus: "Shoulders",
    exercises: [
      { name: "Shoulder Press", sets: "3x10", video: "https://youtube.com/watch?v=qEwKCR5JCog" },
      { name: "Lateral Raises", sets: "3x12", video: "https://youtube.com/watch?v=3VcKaXpzqRo" },
      { name: "Front Raises", sets: "3x10", video: "https://youtube.com/watch?v=qzaKesWKYJ4" },
      { name: "Rear Delt Flyes", sets: "3x12", video: "https://youtube.com/watch?v=T9Y4o_BqC0A" },
      { name: "Pike Push-ups", sets: "3x8", video: "https://youtube.com/watch?v=x1KoTALiKbs" },
      { name: "Shrugs", sets: "3x15", video: "https://youtube.com/watch?v=g6qbq4Lf1FI" }
    ]
  },
  "Saturday": {
    focus: "Full Body",
    exercises: [
      { name: "Burpees", sets: "3x8", video: "https://youtube.com/watch?v=auBLPXO8Fww" },
      { name: "Mountain Climbers", sets: "3x20", video: "https://youtube.com/watch?v=kLh-uczlPLg" },
      { name: "Plank", sets: "3x30s", video: "https://youtube.com/watch?v=pSHjTRCQxIw" },
      { name: "Jumping Jacks", sets: "3x30", video: "https://youtube.com/watch?v=c4DAnQ6DtF8" },
      { name: "High Knees", sets: "3x20", video: "https://youtube.com/watch?v=8opcQdC-V-U" },
      { name: "Russian Twists", sets: "3x20", video: "https://youtube.com/watch?v=wkD8rjkodUI" }
    ]
  },
  "Sunday": {
    focus: "Cardio",
    exercises: [
      { name: "Walking", sets: "30 min", video: "https://youtube.com/watch?v=9FQM82h5ovI" },
      { name: "Jogging", sets: "15 min", video: "https://youtube.com/watch?v=Cg2ZKxPH8dE" },
      { name: "Jump Rope", sets: "3x2min", video: "https://youtube.com/watch?v=1BZM2Vre5oc" },
      { name: "Stair Climbing", sets: "10 min", video: "https://youtube.com/watch?v=qLp36gEal5M" },
      { name: "Dancing", sets: "20 min", video: "https://youtube.com/watch?v=gC_L9qAHVJ8" },
      { name: "Stretching", sets: "10 min", video: "https://youtube.com/watch?v=g_tea8ZNk5A" }
    ]
  }
};

export const WorkoutSchedule = () => {
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return today;
  });

  const currentWorkout = workoutPlan[selectedDay as keyof typeof workoutPlan];

  return (
    <div className="space-y-4">
      {/* Day Selector */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {Object.entries(workoutPlan).map(([day, workout]) => (
              <Button
                key={day}
                variant={selectedDay === day ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDay(day)}
                className="text-xs p-2 h-auto"
              >
                <div className="text-center">
                  <div>{day.slice(0, 3)}</div>
                  <div className="text-xs opacity-70">{workout.focus}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Day Workout */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{selectedDay}</CardTitle>
            <Badge className="bg-workout text-workout-foreground">
              {currentWorkout.focus}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentWorkout.exercises.map((exercise, index) => (
            <div key={index} className="animate-slide-up">
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <div className="font-medium">{exercise.name}</div>
                  <div className="text-sm text-muted-foreground">{exercise.sets}</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(exercise.video, '_blank')}
                  className="ml-2"
                >
                  ▶️ Video
                </Button>
              </div>
              {index < currentWorkout.exercises.length - 1 && (
                <Separator className="my-3" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gradient-primary text-primary-foreground">
        <CardContent className="p-4 text-center">
          <p className="text-sm opacity-90">
            🔥 Complete today's workout to stay on track for your 45kg weight loss goal!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};