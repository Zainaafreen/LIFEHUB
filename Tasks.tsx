import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Flag, Trash2, CheckSquare } from "lucide-react";

const Tasks = () => {
  // Mock data - will be replaced with Supabase
  const [tasks, setTasks] = useState([
    { id: 1, text: "Morning workout", completed: true, priority: "high", dueDate: "2024-01-15", category: "Health" },
    { id: 2, text: "Review budget for this month", completed: false, priority: "medium", dueDate: "2024-01-16", category: "Finance" },
    { id: 3, text: "Call dentist for appointment", completed: false, priority: "high", dueDate: "2024-01-15", category: "Health" },
    { id: 4, text: "Grocery shopping", completed: false, priority: "low", dueDate: "2024-01-17", category: "Personal" },
    { id: 5, text: "Prepare presentation slides", completed: false, priority: "high", dueDate: "2024-01-18", category: "Work" },
  ]);

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority: "medium",
        dueDate: new Date().toISOString().split('T')[0],
        category: "Personal"
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Health': return 'bg-wellness-heart/20 text-wellness-heart border-wellness-heart';
      case 'Finance': return 'bg-expense-food/20 text-expense-food border-expense-food';
      case 'Work': return 'bg-primary/20 text-primary border-primary';
      default: return 'bg-muted/20 text-muted-foreground border-muted-foreground';
    }
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Task Manager</h1>
          <p className="text-muted-foreground">Stay organized and track your daily activities</p>
        </div>

        {/* Add New Task */}
        <Card className="card-soft mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-primary" />
              Add New Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="What needs to be done?"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                className="flex-1"
              />
              <Button onClick={addTask} className="btn-pastel">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Tasks */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Pending Tasks ({pendingTasks.length})</span>
                <Flag className="w-5 h-5 text-accent" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:shadow-md transition-all duration-200"
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{task.text}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className={`text-xs ${getCategoryColor(task.category)}`}>
                        {task.category}
                      </Badge>
                      <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {task.dueDate}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {pendingTasks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No pending tasks. Great job!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Completed Tasks */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Completed Tasks ({completedTasks.length})</span>
                <CheckSquare className="w-5 h-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-border bg-muted/30 opacity-75"
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground line-through">{task.text}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className={`text-xs ${getCategoryColor(task.category)} opacity-60`}>
                        {task.category}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {task.dueDate}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {completedTasks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Plus className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Complete tasks to see them here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Tasks;