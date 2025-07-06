# 💪 FitJourney - Personal Fitness App

Your personalized Android fitness companion to help reduce weight from 135kg to 90kg in 6 months.

## 🌟 Features

### 🟢 WORKOUT SYSTEM
- ✅ Full weekly workout schedule (7 days with different focus areas)
- ✅ Daily workout plans with 6-8 strength exercises per day
- ✅ Sets and reps for each exercise
- ✅ Clickable YouTube video links for exercise demonstrations
- ✅ Focus areas: Chest, Back, Legs, Arms, Shoulders, Full Body, Cardio

### 🍛 DIET PLANNER
- ✅ Complete daily meal schedule with exact timings
- ✅ Detailed food items, quantities, and calorie counts
- ✅ Optimized meal timings:
  - Pre-Workout: 5:15 AM
  - Post-Workout: 7:30 AM
  - Breakfast: 8:00 AM
  - School Snack: 11:00 AM
  - Lunch: 1:30 PM
  - Evening Snack: 4:30 PM
  - Dinner: 8:00 PM
- ✅ 1,800 daily calorie target

### 📊 WEIGHT TRACKING & PROGRESS
- ✅ Daily weight logging system
- ✅ Visual progress charts and percentages
- ✅ Weight loss predictions based on current pace
- ✅ Weekly performance analysis
- ✅ Progress history with date tracking

### ⏰ SMART REMINDERS
- ✅ Daily alarms for:
  - Wake-up (5:00 AM)
  - All meal times
  - Sleep reminder (9:45 PM)
- ✅ Web notifications (with user permission)
- ✅ Customizable reminder settings

### 🧠 AI FITNESS COACH
- ✅ Personalized advice based on progress
- ✅ Motivational messages adapted to weight loss stage
- ✅ Weekly challenges and tips
- ✅ Workout and nutrition recommendations
- ✅ Recovery and sleep guidance

### 📱 MOBILE-OPTIMIZED
- ✅ Beautiful dark theme with fitness-focused colors
- ✅ Responsive design optimized for mobile
- ✅ PWA (Progressive Web App) capabilities
- ✅ Offline data storage using localStorage
- ✅ Tab-based navigation for easy access

## 🚀 Building Android APK

### Prerequisites
1. Node.js and npm installed
2. Android Studio installed (for Android development)
3. Java Development Kit (JDK) 11 or higher

### Steps to Build APK

1. **Export to GitHub**: Click the "Export to GitHub" button in Lovable to get your code

2. **Clone and Install**:
   ```bash
   git clone <your-github-url>
   cd <your-project-name>
   npm install
   ```

3. **Initialize Capacitor** (already configured):
   ```bash
   npx cap init
   ```

4. **Add Android Platform**:
   ```bash
   npx cap add android
   ```

5. **Build the Web App**:
   ```bash
   npm run build
   ```

6. **Sync with Capacitor**:
   ```bash
   npx cap sync android
   ```

7. **Open in Android Studio**:
   ```bash
   npx cap open android
   ```

8. **Build APK in Android Studio**:
   - In Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)
   - Find the APK in: `android/app/build/outputs/apk/debug/`

### Alternative: Direct APK Build
```bash
cd android
./gradlew assembleDebug
```

## 🎯 Usage Guide

1. **Start**: Log your current weight (135kg) on the Home tab
2. **Workout**: Follow the daily workout schedule with video guides
3. **Diet**: Follow the meal plan with precise timings and portions
4. **Progress**: Track your weight daily and monitor progress charts
5. **Coach**: Get personalized AI advice based on your progress
6. **Reminders**: Enable notifications for meal and sleep reminders

## 🔧 Technical Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui with custom fitness variants
- **Mobile**: Capacitor for native Android features
- **Storage**: localStorage for offline data persistence
- **Notifications**: Web Notifications API + Capacitor Local Notifications
- **PWA**: Service Worker ready, installable on Android

## 🎨 Design System

- **Primary**: Deep navy blue (#3b4764) - Trust and stability
- **Progress**: Vibrant green (#22c55e) - Success and growth
- **Nutrition**: Energetic orange (#f97316) - Energy and nutrition
- **Background**: Dark gradients for better mobile viewing
- **Animations**: Smooth transitions and micro-interactions

## 📈 Expected Results

Following this 6-month plan consistently should help you:
- Lose 45kg (135kg → 90kg)
- Build lean muscle mass
- Develop healthy eating habits
- Establish a consistent exercise routine
- Improve overall fitness and energy levels

## 🆘 Support

- All workout videos are linked to YouTube demonstrations
- Progress tracking helps monitor if you're on target
- AI Coach provides adaptive advice based on your results
- Reminders help maintain consistency

---

**Start your fitness journey today! Every step counts toward your 90kg goal. 💪🎯**