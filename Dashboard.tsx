import Navigation from "@/components/layout/Navigation";
import QuickStats from "@/components/dashboard/QuickStats";
import TasksWidget from "@/components/dashboard/TasksWidget";
import HealthWidget from "@/components/dashboard/HealthWidget";
import heroImage from "@/assets/hero-dashboard.jpg";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="relative mb-8 rounded-3xl overflow-hidden card-soft">
          <div 
            className="h-48 md:h-64 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
            <div className="relative h-full flex items-center justify-start p-6 md:p-8">
              <div className="text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to LifeHub</h1>
                <p className="text-lg md:text-xl opacity-90">Your personal productivity & wellness companion</p>
                <p className="text-sm md:text-base opacity-75 mt-2">Track tasks, monitor health, manage expenses - all in one place</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <QuickStats />

        {/* Main Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TasksWidget />
          <HealthWidget />
        </div>

        {/* Additional Widgets Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Calendar Preview */}
          <div className="card-soft p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              📅 Today's Schedule
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-secondary/20">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-sm">Team meeting - 10:00 AM</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-accent/20">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span className="text-sm">Gym session - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Expense Summary */}
          <div className="card-soft p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              💰 Monthly Budget
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Spent</span>
                <span className="font-semibold">$1,247</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">62% of $2,000 budget</span>
                <span className="text-xs text-muted-foreground">$753 left</span>
              </div>
            </div>
          </div>

          {/* Weather Widget */}
          <div className="card-soft p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              ☀️ Weather
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">72°F</div>
              <div className="text-sm text-muted-foreground">Sunny • San Francisco</div>
              <div className="text-xs text-muted-foreground mt-2">Perfect day for outdoor activities!</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;