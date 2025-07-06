import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CoachingAdvice {
  category: "motivation" | "workout" | "nutrition" | "progress";
  title: string;
  message: string;
  priority: "high" | "medium" | "low";
}

export const AICoach = ({ currentWeight, startWeight = 135, targetWeight = 90 }: {
  currentWeight: number;
  startWeight?: number;
  targetWeight?: number;
}) => {
  const [advice, setAdvice] = useState<CoachingAdvice[]>([]);
  const [showNewAdvice, setShowNewAdvice] = useState(false);

  const generateAdvice = () => {
    const weightLost = startWeight - currentWeight;
    const progressPercentage = (weightLost / (startWeight - targetWeight)) * 100;
    const newAdvice: CoachingAdvice[] = [];

    // Progress-based coaching
    if (progressPercentage < 5) {
      newAdvice.push({
        category: "motivation",
        title: "Getting Started Strong! 💪",
        message: "Every journey begins with a single step. Focus on building consistent habits rather than perfection. Your body is already adapting to the changes!",
        priority: "high"
      });
    } else if (progressPercentage < 25) {
      newAdvice.push({
        category: "progress",
        title: "Building Momentum 🚀",
        message: "Great progress! Your metabolism is starting to respond. Consider increasing your water intake to 4.5L daily to boost fat burning.",
        priority: "medium"
      });
    } else if (progressPercentage < 50) {
      newAdvice.push({
        category: "workout",
        title: "Level Up Your Training! 🏋️‍♂️",
        message: "Time to challenge yourself more. Add 2-3 more reps to each exercise or increase workout intensity. Your body is ready!",
        priority: "high"
      });
    } else {
      newAdvice.push({
        category: "motivation",
        title: "Incredible Transformation! 🌟",
        message: "You're more than halfway there! Your dedication is paying off. Focus on maintaining consistency to reach your goal.",
        priority: "high"
      });
    }

    // Weekly coaching tips
    const dayOfWeek = new Date().getDay();
    if (dayOfWeek === 1) { // Monday
      newAdvice.push({
        category: "workout",
        title: "Monday Motivation",
        message: "Start your week strong with chest day! Focus on proper form over heavy weights. Quality movements build lasting strength.",
        priority: "medium"
      });
    } else if (dayOfWeek === 0) { // Sunday
      newAdvice.push({
        category: "nutrition",
        title: "Sunday Prep Day",
        message: "Use today to meal prep for the week. Having healthy options ready makes it easier to stick to your nutrition goals!",
        priority: "medium"
      });
    }

    // Sleep and recovery
    newAdvice.push({
      category: "progress",
      title: "Recovery Matters 😴",
      message: "Quality sleep is when your body repairs and builds muscle. Aim for 7-9 hours nightly. Poor sleep can slow weight loss by 30%!",
      priority: "medium"
    });

    setAdvice(newAdvice);
    setShowNewAdvice(true);
  };

  useEffect(() => {
    // Generate initial advice
    generateAdvice();
  }, [currentWeight]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "motivation": return "bg-progress text-progress-foreground";
      case "workout": return "bg-workout text-workout-foreground";
      case "nutrition": return "bg-nutrition text-nutrition-foreground";
      case "progress": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "motivation": return "💪";
      case "workout": return "🏋️‍♂️";
      case "nutrition": return "🥗";
      case "progress": return "📈";
      default: return "🤖";
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center space-x-2">
            <span>🤖 AI Fitness Coach</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm opacity-90">
            Personalized advice based on your progress and goals
          </p>
        </CardContent>
      </Card>

      {advice.map((tip, index) => (
        <Card key={index} className={`animate-slide-up ${showNewAdvice ? 'animate-bounce-in' : ''}`}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span>{getCategoryEmoji(tip.category)}</span>
                <CardTitle className="text-base">{tip.title}</CardTitle>
              </div>
              <Badge className={getCategoryColor(tip.category)}>
                {tip.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{tip.message}</p>
          </CardContent>
        </Card>
      ))}

      {/* Weekly Challenge */}
      <Card className="bg-gradient-nutrition text-nutrition-foreground">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">🎯 This Week's Challenge</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm opacity-90">
            Add 5 minutes of stretching after each workout. Flexibility prevents injuries and improves recovery!
          </p>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button 
          onClick={() => {
            generateAdvice();
            setShowNewAdvice(true);
            setTimeout(() => setShowNewAdvice(false), 1000);
          }}
          variant="outline"
          size="sm"
        >
          🔄 Get Fresh Advice
        </Button>
      </div>
    </div>
  );
};