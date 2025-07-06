import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface WeightLogEntry {
  date: string;
  weight: number;
}

interface CoachingAdvice {
  category: "motivation" | "workout" | "nutrition" | "progress" | "adaptation";
  title: string;
  message: string;
  priority: "high" | "medium" | "low";
  actionable: boolean;
  adaptation?: {
    type: "diet" | "workout";
    changes: string[];
  };
}

export const SmartAICoach = ({ currentWeight }: { currentWeight: number }) => {
  const [advice, setAdvice] = useState<CoachingAdvice[]>([]);
  const [weightHistory, setWeightHistory] = useState<WeightLogEntry[]>([]);
  const [adaptationSuggested, setAdaptationSuggested] = useState(false);
  const { toast } = useToast();

  const startWeight = 135;
  const targetWeight = 90;

  useEffect(() => {
    // Load weight history
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

  useEffect(() => {
    generateIntelligentAdvice();
  }, [weightHistory, currentWeight]);

  const analyzeProgress = () => {
    if (weightHistory.length < 2) return null;

    const recentEntries = weightHistory.slice(-7); // Last 7 days
    const weeklyChange = recentEntries[recentEntries.length - 1]?.weight - recentEntries[0]?.weight;
    const averageWeeklyLoss = -weeklyChange; // Negative because we want loss
    
    const totalProgress = startWeight - currentWeight;
    const progressPercentage = (totalProgress / (startWeight - targetWeight)) * 100;
    
    const daysElapsed = Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24));
    const weeksElapsed = Math.max(1, Math.floor(daysElapsed / 7));
    const targetWeeklyLoss = (startWeight - targetWeight) / 26; // 6 months = 26 weeks
    
    return {
      weeklyChange: averageWeeklyLoss,
      progressPercentage,
      isOnTrack: averageWeeklyLoss >= targetWeeklyLoss * 0.8, // 80% of target is acceptable
      isTooFast: averageWeeklyLoss > targetWeeklyLoss * 1.5,
      targetWeeklyLoss,
      weeksElapsed
    };
  };

  const generateWorkoutAdaptation = (analysis: any): string[] => {
    const changes = [];
    
    if (!analysis.isOnTrack) {
      changes.push("Increase workout intensity by 10-15%");
      changes.push("Add 10 minutes of cardio to each session");
      changes.push("Reduce rest time between sets by 15 seconds");
    }
    
    if (analysis.progressPercentage > 25) {
      changes.push("Progress to intermediate exercises");
      changes.push("Add resistance bands or light weights");
    }
    
    if (analysis.progressPercentage > 50) {
      changes.push("Introduce compound movements");
      changes.push("Add high-intensity interval training (HIIT)");
    }
    
    return changes;
  };

  const generateDietAdaptation = (analysis: any): string[] => {
    const changes = [];
    
    if (!analysis.isOnTrack) {
      changes.push("Reduce daily calories by 100-150");
      changes.push("Increase protein intake by 20g daily");
      changes.push("Add more fiber-rich vegetables");
    }
    
    if (analysis.isTooFast) {
      changes.push("Increase daily calories by 100-200");
      changes.push("Add healthy fats (nuts, avocado)");
      changes.push("Include more complex carbohydrates");
    }
    
    if (analysis.progressPercentage > 40) {
      changes.push("Implement intermittent fasting (16:8)");
      changes.push("Focus on whole, unprocessed foods");
    }
    
    return changes;
  };

  const generateIntelligentAdvice = () => {
    const analysis = analyzeProgress();
    const newAdvice: CoachingAdvice[] = [];

    // Progress-based motivational coaching
    const progressPercentage = ((startWeight - currentWeight) / (startWeight - targetWeight)) * 100;
    
    if (progressPercentage < 5) {
      newAdvice.push({
        category: "motivation",
        title: "Your Journey Begins! 🚀",
        message: "The first step is always the hardest. Your body is already starting to adapt to the new routine. Focus on consistency over perfection.",
        priority: "high",
        actionable: false
      });
    } else if (progressPercentage >= 5 && progressPercentage < 20) {
      newAdvice.push({
        category: "progress",
        title: "Early Progress Detected! 📈",
        message: "Great job! Your metabolism is responding. This is the critical phase - maintain your routine for compound benefits.",
        priority: "medium",
        actionable: false
      });
    } else if (progressPercentage >= 20 && progressPercentage < 50) {
      newAdvice.push({
        category: "adaptation",
        title: "Time for Progressive Changes 🔄",
        message: "Your body has adapted to the current routine. Let me suggest some modifications to keep your progress optimal.",
        priority: "high",
        actionable: true,
        adaptation: {
          type: "workout",
          changes: generateWorkoutAdaptation(analysis)
        }
      });
    } else if (progressPercentage >= 50) {
      newAdvice.push({
        category: "motivation",
        title: "Incredible Transformation! 🌟",
        message: "You're past the halfway point! Your dedication is remarkable. Let's fine-tune everything for the final push.",
        priority: "high",
        actionable: true,
        adaptation: {
          type: "diet",
          changes: generateDietAdaptation(analysis)
        }
      });
    }

    // Analysis-based coaching
    if (analysis) {
      if (!analysis.isOnTrack) {
        newAdvice.push({
          category: "adaptation",
          title: "Progress Needs Acceleration ⚡",
          message: `Your current weekly loss (${analysis.weeklyChange.toFixed(1)}kg) is below target (${analysis.targetWeeklyLoss.toFixed(1)}kg). Let me suggest adjustments.`,
          priority: "high",
          actionable: true,
          adaptation: {
            type: "diet",
            changes: generateDietAdaptation(analysis)
          }
        });
      }
      
      if (analysis.isTooFast) {
        newAdvice.push({
          category: "nutrition",
          title: "Pace Adjustment Needed ⚖️",
          message: "You're losing weight faster than recommended. Let's add some healthy calories to ensure you maintain muscle mass.",
          priority: "high",
          actionable: true,
          adaptation: {
            type: "diet",
            changes: generateDietAdaptation(analysis)
          }
        });
      }
    }

    // Weekly specific advice
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    if (dayOfWeek === 1) { // Monday
      newAdvice.push({
        category: "motivation",
        title: "Monday Momentum! 💪",
        message: "New week, new opportunities! Start strong with chest day. Your weekend recovery has prepared your muscles for growth.",
        priority: "medium",
        actionable: false
      });
    }

    // Hydration and sleep coaching
    newAdvice.push({
      category: "nutrition",
      title: "Hydration = Fat Burning 💧",
      message: "Proper hydration increases your metabolic rate by up to 30%. Aim for your 4L daily goal - your weight loss depends on it!",
      priority: "medium",
      actionable: false
    });

    setAdvice(newAdvice);
  };

  const applyAdaptation = (adaptation: { type: "diet" | "workout"; changes: string[] }) => {
    // In a real app, this would update the actual diet/workout plans
    // For now, we'll show success and save the adaptation
    const adaptationData = {
      date: new Date().toISOString(),
      type: adaptation.type,
      changes: adaptation.changes,
      applied: true
    };
    
    localStorage.setItem('last-adaptation', JSON.stringify(adaptationData));
    setAdaptationSuggested(true);
    
    toast({
      title: `🤖 ${adaptation.type === 'diet' ? 'Diet' : 'Workout'} Plan Updated!`,
      description: `Applied ${adaptation.changes.length} intelligent modifications based on your progress.`,
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "motivation": return "bg-progress text-progress-foreground";
      case "workout": return "bg-workout text-workout-foreground";
      case "nutrition": return "bg-nutrition text-nutrition-foreground";
      case "progress": return "bg-primary text-primary-foreground";
      case "adaptation": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "motivation": return "💪";
      case "workout": return "🏋️‍♂️";
      case "nutrition": return "🥗";
      case "progress": return "📈";
      case "adaptation": return "🤖";
      default: return "💭";
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-primary text-primary-foreground backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center space-x-2">
            <span>🤖 Smart AI Coach</span>
            <Badge className="bg-background/20 text-primary-foreground">
              Adaptive
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm opacity-90">
            Analyzing your progress data to provide intelligent, personalized coaching
          </p>
        </CardContent>
      </Card>

      {advice.map((tip, index) => (
        <Card key={index} className="backdrop-blur-sm bg-gradient-card border border-border/20 shadow-card animate-slide-up">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2 flex-1">
                <span className="text-lg">{getCategoryEmoji(tip.category)}</span>
                <CardTitle className="text-base">{tip.title}</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getCategoryColor(tip.category)} variant="secondary">
                  {tip.category}
                </Badge>
                {tip.priority === "high" && (
                  <Badge variant="destructive" className="text-xs">
                    High
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{tip.message}</p>
            
            {tip.adaptation && (
              <div className="space-y-2">
                <div className="text-sm font-medium">Suggested Changes:</div>
                <ul className="text-xs space-y-1">
                  {tip.adaptation.changes.map((change, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="modern"
                  size="sm"
                  onClick={() => applyAdaptation(tip.adaptation!)}
                  className="w-full mt-2"
                >
                  Apply {tip.adaptation.type === 'diet' ? 'Diet' : 'Workout'} Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <div className="text-center">
        <Button 
          onClick={() => {
            generateIntelligentAdvice();
            toast({
              title: "🤖 AI Analysis Complete",
              description: "Fresh insights based on your latest progress data",
            });
          }}
          variant="modern"
          size="sm"
        >
          🔄 Refresh Analysis
        </Button>
      </div>
    </div>
  );
};