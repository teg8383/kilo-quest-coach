import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface WeightLoggerProps {
  onWeightUpdate: (weight: number) => void;
}

export const WeightLogger = ({ onWeightUpdate }: WeightLoggerProps) => {
  const [weight, setWeight] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const { toast } = useToast();

  const handleLogWeight = () => {
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0 || weightNum > 300) {
      toast({
        title: "Invalid Weight",
        description: "Please enter a valid weight between 1-300 kg",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage
    const today = new Date().toISOString().split('T')[0];
    const weightData = JSON.parse(localStorage.getItem('weightLog') || '{}');
    weightData[today] = weightNum;
    localStorage.setItem('weightLog', JSON.stringify(weightData));
    
    onWeightUpdate(weightNum);
    setWeight("");
    setIsLogging(false);
    
    toast({
      title: "Weight Logged! 🎉",
      description: `Current weight: ${weightNum} kg`,
    });
  };

  if (!isLogging) {
    return (
      <Button 
        onClick={() => setIsLogging(true)}
        className="w-full bg-gradient-progress text-progress-foreground"
      >
        📊 Log Today's Weight
      </Button>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Log Your Weight</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Enter weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="flex-1"
          />
          <span className="text-muted-foreground self-center">kg</span>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleLogWeight} className="flex-1 bg-progress text-progress-foreground">
            Save
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setIsLogging(false)}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};