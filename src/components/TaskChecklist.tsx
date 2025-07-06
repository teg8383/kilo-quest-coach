import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: "workout" | "diet" | "water" | "general";
  time?: string;
}

interface TaskChecklistProps {
  title: string;
  tasks: Task[];
  onTaskComplete: (taskId: string, completed: boolean) => void;
  className?: string;
}

export const TaskChecklist = ({ title, tasks, onTaskComplete, className }: TaskChecklistProps) => {
  const completedCount = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "workout": return "bg-workout text-workout-foreground";
      case "diet": return "bg-nutrition text-nutrition-foreground";
      case "water": return "bg-water text-water-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "workout": return "💪";
      case "diet": return "🍽️";
      case "water": return "💧";
      default: return "✅";
    }
  };

  return (
    <Card className={cn("backdrop-blur-sm bg-gradient-card border border-border/20 shadow-card", className)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center space-x-2">
            <span>{title}</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-background/50">
              {completedCount}/{totalTasks}
            </Badge>
            <div className="text-2xl">
              {progressPercentage === 100 ? "🎉" : "📝"}
            </div>
          </div>
        </div>
        {totalTasks > 0 && (
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-primary transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200",
              "bg-background/30 hover:bg-background/50 border border-border/10",
              task.completed && "opacity-60"
            )}
          >
            <Checkbox
              id={task.id}
              checked={task.completed}
              onCheckedChange={(checked) => onTaskComplete(task.id, !!checked)}
              className="data-[state=checked]:bg-gradient-primary data-[state=checked]:border-primary"
            />
            <div className="flex-1 min-w-0">
              <div className={cn(
                "text-sm font-medium transition-all duration-200",
                task.completed && "line-through text-muted-foreground"
              )}>
                {task.title}
              </div>
              {task.time && (
                <div className="text-xs text-muted-foreground">
                  {task.time}
                </div>
              )}
            </div>
            <Badge 
              className={cn("text-xs", getCategoryColor(task.category))}
              variant="secondary"
            >
              {getCategoryEmoji(task.category)}
            </Badge>
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-4xl mb-2">📝</div>
            <p className="text-sm">No tasks for today!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const DailyTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    // Load today's tasks
    const today = new Date().toISOString().split('T')[0];
    const savedTasks = localStorage.getItem(`tasks-${today}`);
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Generate default daily tasks
      const defaultTasks: Task[] = [
        { id: "weight-log", title: "Log morning weight", completed: false, category: "general" },
        { id: "workout", title: "Complete today's workout", completed: false, category: "workout" },
        { id: "water-1", title: "Drink 1L water (morning)", completed: false, category: "water", time: "Before 12 PM" },
        { id: "water-2", title: "Drink 1L water (afternoon)", completed: false, category: "water", time: "12 PM - 6 PM" },
        { id: "water-3", title: "Drink 1L water (evening)", completed: false, category: "water", time: "6 PM - 9 PM" },
        { id: "water-4", title: "Drink 1L water (night)", completed: false, category: "water", time: "After 9 PM" },
        { id: "breakfast", title: "Eat planned breakfast", completed: false, category: "diet", time: "8:00 AM" },
        { id: "lunch", title: "Eat planned lunch", completed: false, category: "diet", time: "1:30 PM" },
        { id: "dinner", title: "Eat planned dinner", completed: false, category: "diet", time: "8:00 PM" },
        { id: "sleep", title: "Sleep by 10:00 PM", completed: false, category: "general", time: "10:00 PM" }
      ];
      setTasks(defaultTasks);
    }
  }, []);

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed } : task
    );
    setTasks(updatedTasks);
    
    // Save to localStorage
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`tasks-${today}`, JSON.stringify(updatedTasks));
  };

  const resetTasks = () => {
    const resetTasks = tasks.map(task => ({ ...task, completed: false }));
    setTasks(resetTasks);
    
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`tasks-${today}`, JSON.stringify(resetTasks));
  };

  const workoutTasks = tasks.filter(task => task.category === "workout");
  const dietTasks = tasks.filter(task => task.category === "diet");  
  const waterTasks = tasks.filter(task => task.category === "water");
  const generalTasks = tasks.filter(task => task.category === "general");

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Daily Tasks</h2>
        <Button variant="outline" size="sm" onClick={resetTasks}>
          🔄 Reset
        </Button>
      </div>
      
      <TaskChecklist 
        title="💧 Water Goals" 
        tasks={waterTasks} 
        onTaskComplete={handleTaskComplete}
      />
      
      <TaskChecklist 
        title="💪 Workout Tasks" 
        tasks={workoutTasks} 
        onTaskComplete={handleTaskComplete}
      />
      
      <TaskChecklist 
        title="🍽️ Diet Tasks" 
        tasks={dietTasks} 
        onTaskComplete={handleTaskComplete}
      />
      
      <TaskChecklist 
        title="📅 General Tasks" 
        tasks={generalTasks} 
        onTaskComplete={handleTaskComplete}
      />
    </div>
  );
};