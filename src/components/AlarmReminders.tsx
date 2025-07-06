import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const reminders = [
  { id: "wake", time: "5:00 AM", title: "Wake Up", description: "Start your day strong!", type: "daily" },
  { id: "preworkout", time: "5:15 AM", title: "Pre-Workout Meal", description: "Banana + Black Coffee", type: "meal" },
  { id: "postworkout", time: "7:30 AM", title: "Post-Workout", description: "Protein Shake + Almonds", type: "meal" },
  { id: "breakfast", time: "8:00 AM", title: "Breakfast", description: "Oatmeal + Berries + Yogurt", type: "meal" },
  { id: "snack1", time: "11:00 AM", title: "School Snack", description: "Apple + Peanut Butter", type: "meal" },
  { id: "lunch", time: "1:30 PM", title: "Lunch", description: "Chicken + Rice + Vegetables", type: "meal" },
  { id: "snack2", time: "4:30 PM", title: "Evening Snack", description: "Carrots + Hummus", type: "meal" },
  { id: "dinner", time: "8:00 PM", title: "Dinner", description: "Fish + Quinoa + Broccoli", type: "meal" },
  { id: "sleep", time: "9:45 PM", title: "Sleep Reminder", description: "Wind down for bed", type: "daily" }
];

export const AlarmReminders = () => {
  const [enabledReminders, setEnabledReminders] = useState<Record<string, boolean>>({});
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>("default");
  const { toast } = useToast();

  useEffect(() => {
    // Load saved preferences
    const saved = localStorage.getItem('reminderSettings');
    if (saved) {
      setEnabledReminders(JSON.parse(saved));
    } else {
      // Enable all by default
      const defaultSettings = reminders.reduce((acc, reminder) => {
        acc[reminder.id] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setEnabledReminders(defaultSettings);
    }

    // Check notification permission
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const toggleReminder = (id: string) => {
    const newSettings = {
      ...enabledReminders,
      [id]: !enabledReminders[id]
    };
    setEnabledReminders(newSettings);
    localStorage.setItem('reminderSettings', JSON.stringify(newSettings));
    
    toast({
      title: enabledReminders[id] ? "Reminder Disabled" : "Reminder Enabled",
      description: `${reminders.find(r => r.id === id)?.title} reminder updated`,
    });
  };

  const requestPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === "granted") {
        toast({
          title: "Notifications Enabled! 🔔",
          description: "You'll now receive meal and sleep reminders",
        });
      }
    }
  };

  const testNotification = () => {
    if (notificationPermission === "granted") {
      new Notification("FitJourney Reminder", {
        body: "This is a test notification!",
        icon: "/favicon.ico"
      });
    }
  };

  // Schedule notifications (simplified version - in a real app, you'd use service workers)
  useEffect(() => {
    if (notificationPermission !== "granted") return;

    const scheduleNotifications = () => {
      reminders.forEach(reminder => {
        if (!enabledReminders[reminder.id]) return;

        const [time, period] = reminder.time.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        
        const now = new Date();
        const reminderTime = new Date();
        reminderTime.setHours(period === 'PM' && hours !== 12 ? hours + 12 : hours);
        reminderTime.setMinutes(minutes);
        reminderTime.setSeconds(0);

        if (reminderTime <= now) {
          reminderTime.setDate(reminderTime.getDate() + 1); // Next day
        }

        const timeUntilReminder = reminderTime.getTime() - now.getTime();
        
        setTimeout(() => {
          new Notification(`🍽️ ${reminder.title}`, {
            body: reminder.description,
            icon: "/favicon.ico"
          });
        }, timeUntilReminder);
      });
    };

    scheduleNotifications();
  }, [enabledReminders, notificationPermission]);

  return (
    <div className="space-y-4">
      {/* Notification Permission */}
      {notificationPermission !== "granted" && (
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <p className="font-medium">🔔 Enable Notifications</p>
              <p className="text-sm opacity-90">Get timely reminders for meals and sleep</p>
              <Button 
                onClick={requestPermission}
                variant="secondary"
                size="sm"
              >
                Enable Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reminder List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Daily Reminders</CardTitle>
            {notificationPermission === "granted" && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={testNotification}
              >
                Test
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{reminder.time}</span>
                  <Badge variant={reminder.type === "meal" ? "default" : "secondary"}>
                    {reminder.type === "meal" ? "🍽️ Meal" : "⏰ Daily"}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {reminder.title} - {reminder.description}
                </div>
              </div>
              <Switch
                checked={enabledReminders[reminder.id] || false}
                onCheckedChange={() => toggleReminder(reminder.id)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sleep Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">💤 Sleep Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Aim for 7-9 hours of quality sleep</p>
          <p>• Go to bed and wake up at consistent times</p>
          <p>• Avoid screens 1 hour before bedtime</p>
          <p>• Keep your bedroom cool and dark</p>
          <p>• Regular exercise improves sleep quality</p>
        </CardContent>
      </Card>

      {/* Hydration Reminder */}
      <Card className="bg-gradient-progress text-progress-foreground">
        <CardContent className="p-4 text-center">
          <div className="text-lg font-medium">💧 Hydration Check</div>
          <div className="text-sm opacity-90 mt-1">
            Drink water throughout the day - aim for 4L total!
          </div>
        </CardContent>
      </Card>
    </div>
  );
};