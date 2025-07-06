import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const dietPlan = [
  {
    time: "5:15 AM",
    meal: "Pre-Workout",
    items: [
      { food: "Banana", quantity: "1 medium", calories: 105 },
      { food: "Black Coffee", quantity: "1 cup", calories: 5 }
    ]
  },
  {
    time: "7:30 AM",
    meal: "Post-Workout",
    items: [
      { food: "Protein Shake", quantity: "1 scoop", calories: 120 },
      { food: "Almonds", quantity: "10 pieces", calories: 70 }
    ]
  },
  {
    time: "8:00 AM",
    meal: "Breakfast",
    items: [
      { food: "Oatmeal", quantity: "1 cup", calories: 150 },
      { food: "Berries", quantity: "1/2 cup", calories: 40 },
      { food: "Greek Yogurt", quantity: "1/2 cup", calories: 100 }
    ]
  },
  {
    time: "11:00 AM",
    meal: "School Snack",
    items: [
      { food: "Apple", quantity: "1 medium", calories: 80 },
      { food: "Peanut Butter", quantity: "1 tbsp", calories: 95 }
    ]
  },
  {
    time: "1:30 PM",
    meal: "Lunch",
    items: [
      { food: "Grilled Chicken", quantity: "100g", calories: 165 },
      { food: "Brown Rice", quantity: "1/2 cup", calories: 110 },
      { food: "Mixed Vegetables", quantity: "1 cup", calories: 50 },
      { food: "Salad", quantity: "1 cup", calories: 20 }
    ]
  },
  {
    time: "4:30 PM",
    meal: "Evening Snack",
    items: [
      { food: "Carrot Sticks", quantity: "1 cup", calories: 50 },
      { food: "Hummus", quantity: "2 tbsp", calories: 70 }
    ]
  },
  {
    time: "8:00 PM",
    meal: "Dinner",
    items: [
      { food: "Grilled Fish", quantity: "100g", calories: 180 },
      { food: "Quinoa", quantity: "1/2 cup", calories: 110 },
      { food: "Steamed Broccoli", quantity: "1 cup", calories: 55 },
      { food: "Green Salad", quantity: "1 cup", calories: 15 }
    ]
  }
];

export const DietPlanner = () => {
  const totalCalories = dietPlan.reduce((total, meal) => 
    total + meal.items.reduce((mealTotal, item) => mealTotal + item.calories, 0), 0
  );

  const currentTime = new Date().getHours() * 100 + new Date().getMinutes();
  const getCurrentMeal = () => {
    for (let i = 0; i < dietPlan.length; i++) {
      const mealTime = parseInt(dietPlan[i].time.replace(':', '').replace(' AM', '').replace(' PM', ''));
      const adjustedMealTime = dietPlan[i].time.includes('PM') && !dietPlan[i].time.includes('12:') 
        ? mealTime + 1200 : mealTime;
      
      if (currentTime <= adjustedMealTime) {
        return i;
      }
    }
    return 0; // Next day's first meal
  };

  const currentMealIndex = getCurrentMeal();

  return (
    <div className="space-y-4">
      {/* Daily Overview */}
      <Card className="bg-gradient-nutrition text-nutrition-foreground">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{totalCalories} cal</div>
            <div className="text-sm opacity-90">Daily Target</div>
          </div>
        </CardContent>
      </Card>

      {/* Meal Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Today's Meal Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {dietPlan.map((meal, index) => {
            const mealCalories = meal.items.reduce((total, item) => total + item.calories, 0);
            const isCurrentMeal = index === currentMealIndex;
            
            return (
              <div 
                key={index} 
                className={`${isCurrentMeal ? 'animate-pulse-glow bg-muted/30' : ''} rounded-lg p-3`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{meal.time}</span>
                    <Badge variant={isCurrentMeal ? "default" : "secondary"}>
                      {meal.meal}
                    </Badge>
                    {isCurrentMeal && <span className="text-xs text-progress">← Next</span>}
                  </div>
                  <Badge className="bg-nutrition text-nutrition-foreground">
                    {mealCalories} cal
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  {meal.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between text-sm">
                      <span>{item.food} ({item.quantity})</span>
                      <span className="text-muted-foreground">{item.calories} cal</span>
                    </div>
                  ))}
                </div>
                
                {index < dietPlan.length - 1 && <Separator className="mt-3" />}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Hydration Reminder */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">💧 Water Goal</div>
              <div className="text-sm opacity-90">4 liters daily</div>
            </div>
            <div className="text-2xl font-bold">4L</div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground text-center">
            💡 <strong>Pro Tip:</strong> Eat slowly and mindfully. It takes 20 minutes for your brain to register fullness!
          </div>
        </CardContent>
      </Card>
    </div>
  );
};