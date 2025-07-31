import { Card, CardContent } from "@/components/ui/card";
import { CheckSquare, DollarSign, Heart, Calendar } from "lucide-react";

const QuickStats = () => {
  // Mock data - will be replaced with real data from Supabase
  const stats = [
    {
      icon: CheckSquare,
      label: "Tasks Today",
      value: "3",
      total: "8",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Calendar,
      label: "Upcoming",
      value: "2",
      total: "events",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: DollarSign,
      label: "Today's Spending",
      value: "$47",
      total: "$200 budget",
      color: "text-expense-food",
      bgColor: "bg-expense-food/10"
    },
    {
      icon: Heart,
      label: "Health Status",
      value: "Good",
      total: "Last check: 2h ago",
      color: "text-wellness-heart",
      bgColor: "bg-wellness-heart/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <Card key={index} className="card-soft hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickStats;