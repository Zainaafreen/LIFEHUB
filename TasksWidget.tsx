import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TasksWidget = () => {
  const navigate = useNavigate();
  
  // Mock data - will be replaced with Supabase data
  const [tasks, setTasks] = useState([
    { id: 1, text: "Morning workout", completed: true, priority: "high" },
    { id: 2, text: "Review budget for this month", completed: false, priority: "medium" },
    { id: 3, text: "Call dentist for appointment", completed: false, priority: "high" },
    { id: 4, text: "Grocery shopping", completed: false, priority: "low" },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedCount = tasks.filter(task => task.completed).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-destructive';
      case 'medium': return 'border-l-accent';
      default: return 'border-l-secondary';
    }
  };

  return (
    <Card className="card-soft">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold">Today's Tasks</CardTitle>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {completedCount}/{tasks.length} done
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tasks')}
            className="btn-pastel"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {pendingTasks.slice(0, 3).map((task) => (
          <div
            key={task.id}
            className={`flex items-center space-x-3 p-3 rounded-lg border-l-4 ${getPriorityColor(task.priority)} bg-muted/30 hover:bg-muted/50 transition-colors`}
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <span className={`flex-1 text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
              {task.text}
            </span>
          </div>
        ))}
        
        {pendingTasks.length > 3 && (
          <div className="text-center pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/tasks')}
              className="btn-pastel text-primary"
            >
              +{pendingTasks.length - 3} more tasks
            </Button>
          </div>
        )}
        
        <Button
          variant="outline"
          size="sm"
          className="w-full btn-pastel border-dashed"
          onClick={() => navigate('/tasks')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Task
        </Button>
      </CardContent>
    </Card>
  );
};

export default TasksWidget;