import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, DollarSign, Heart } from "lucide-react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'monthly' | 'daily'>('monthly');

  // Mock data for calendar entries
  const calendarData = {
    tasks: [
      { id: 1, date: '2024-01-15', title: 'Morning workout', completed: true, priority: 'high' },
      { id: 2, date: '2024-01-16', title: 'Review budget', completed: false, priority: 'medium' },
      { id: 3, date: '2024-01-17', title: 'Dentist appointment', completed: false, priority: 'high' },
    ],
    expenses: [
      { id: 1, date: '2024-01-15', amount: 45.50, category: 'Food' },
      { id: 2, date: '2024-01-16', amount: 120.00, category: 'Healthcare' },
      { id: 3, date: '2024-01-17', amount: 25.00, category: 'Transport' },
    ],
    health: [
      { id: 1, date: '2024-01-15', type: 'Blood Pressure', value: '120/80' },
      { id: 2, date: '2024-01-16', type: 'Heart Rate', value: '72 bpm' },
    ]
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEntriesForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return {
      tasks: calendarData.tasks.filter(task => task.date === dateStr),
      expenses: calendarData.expenses.filter(expense => expense.date === dateStr),
      health: calendarData.health.filter(health => health.date === dateStr),
    };
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const MonthlyView = () => {
    const days = getDaysInMonth();
    const today = new Date();

    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Week headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="p-2" />;
          }
          
          const entries = getEntriesForDate(day);
          const isToday = formatDate(day) === formatDate(today);
          const totalExpenses = entries.expenses.reduce((sum, exp) => sum + exp.amount, 0);
          
          return (
            <Card 
              key={day.getDate()} 
              className={`min-h-24 cursor-pointer hover:shadow-md transition-all duration-200 ${
                isToday ? 'ring-2 ring-primary bg-primary/5' : ''
              }`}
              onClick={() => {
                setCurrentDate(day);
                setView('daily');
              }}
            >
              <CardContent className="p-2">
                <div className="text-sm font-medium mb-1">{day.getDate()}</div>
                <div className="space-y-1">
                  {entries.tasks.slice(0, 2).map(task => (
                    <div key={task.id} className="text-xs p-1 rounded bg-secondary/20 truncate">
                      {task.title}
                    </div>
                  ))}
                  {totalExpenses > 0 && (
                    <div className="text-xs text-expense-food font-medium">
                      ${totalExpenses.toFixed(2)}
                    </div>
                  )}
                  {entries.health.length > 0 && (
                    <Heart className="w-3 h-3 text-wellness-heart" />
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const DailyView = () => {
    const entries = getEntriesForDate(currentDate);
    const totalExpenses = entries.expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {entries.tasks.map(task => (
              <div key={task.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                <div className={`w-3 h-3 rounded-full ${
                  task.priority === 'high' ? 'bg-destructive' :
                  task.priority === 'medium' ? 'bg-accent' : 'bg-secondary'
                }`} />
                <span className={`flex-1 text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {task.title}
                </span>
                <Badge variant={task.completed ? "secondary" : "default"}>
                  {task.completed ? 'Done' : 'Pending'}
                </Badge>
              </div>
            ))}
            {entries.tasks.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No tasks for this day</p>
            )}
            <Button variant="outline" size="sm" className="w-full btn-pastel">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </CardContent>
        </Card>

        {/* Expenses */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-expense-food" />
                Expenses
              </span>
              <span className="text-lg font-bold text-expense-food">
                ${totalExpenses.toFixed(2)}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {entries.expenses.map(expense => (
              <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="text-sm font-medium">{expense.category}</p>
                  <p className="text-xs text-muted-foreground">${expense.amount.toFixed(2)}</p>
                </div>
              </div>
            ))}
            {entries.expenses.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No expenses for this day</p>
            )}
            <Button variant="outline" size="sm" className="w-full btn-pastel">
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
          </CardContent>
        </Card>

        {/* Health */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="w-5 h-5 mr-2 text-wellness-heart" />
              Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {entries.health.map(health => (
              <div key={health.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="text-sm font-medium">{health.type}</p>
                  <p className="text-xs text-muted-foreground">{health.value}</p>
                </div>
              </div>
            ))}
            {entries.health.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No health data for this day</p>
            )}
            <Button variant="outline" size="sm" className="w-full btn-pastel">
              <Plus className="w-4 h-4 mr-2" />
              Log Health Data
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Calendar</h1>
          <p className="text-muted-foreground">View your tasks, expenses, and health data by date</p>
        </div>

        {/* Calendar Controls */}
        <Card className="card-soft mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                  className="btn-pastel"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-xl font-semibold">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  {view === 'daily' && `, ${currentDate.getDate()}`}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                  className="btn-pastel"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={view === 'monthly' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setView('monthly')}
                  className="btn-pastel"
                >
                  Monthly
                </Button>
                <Button
                  variant={view === 'daily' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setView('daily')}
                  className="btn-pastel"
                >
                  Daily
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar View */}
        <Card className="card-soft">
          <CardContent className="p-6">
            {view === 'monthly' ? <MonthlyView /> : <DailyView />}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Calendar;