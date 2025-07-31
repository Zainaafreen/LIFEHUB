import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, DollarSign, TrendingUp, Calendar, Edit, Trash2 } from "lucide-react";

const Expenses = () => {
  // Mock data - will be replaced with Supabase
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2024-01-15', amount: 45.50, category: 'Food', description: 'Lunch at cafe', recurring: false },
    { id: 2, date: '2024-01-16', amount: 120.00, category: 'Healthcare', description: 'Doctor visit', recurring: false },
    { id: 3, date: '2024-01-14', amount: 25.00, category: 'Transport', description: 'Gas', recurring: false },
    { id: 4, date: '2024-01-13', amount: 85.20, category: 'Food', description: 'Grocery shopping', recurring: false },
    { id: 5, date: '2024-01-12', amount: 1200.00, category: 'Housing', description: 'Monthly rent', recurring: true },
    { id: 6, date: '2024-01-11', amount: 35.00, category: 'Entertainment', description: 'Movie tickets', recurring: false },
  ]);

  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = ['Food', 'Healthcare', 'Transport', 'Housing', 'Entertainment', 'Shopping', 'Bills', 'Other'];

  const addExpense = () => {
    if (newExpense.amount && newExpense.category && newExpense.description) {
      const expense = {
        id: Date.now(),
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        description: newExpense.description,
        date: newExpense.date,
        recurring: false
      };
      setExpenses([...expenses, expense]);
      setNewExpense({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Food': 'bg-expense-food/20 text-expense-food border-expense-food',
      'Healthcare': 'bg-wellness-heart/20 text-wellness-heart border-wellness-heart',
      'Transport': 'bg-primary/20 text-primary border-primary',
      'Housing': 'bg-secondary/20 text-secondary border-secondary',
      'Entertainment': 'bg-accent/20 text-accent border-accent',
      'Shopping': 'bg-purple-500/20 text-purple-500 border-purple-500',
      'Bills': 'bg-orange-500/20 text-orange-500 border-orange-500',
      'Other': 'bg-muted/20 text-muted-foreground border-muted-foreground'
    };
    return colors[category] || colors['Other'];
  };

  // Calculate statistics
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyBudget = 2000;
  const budgetUsed = (totalExpenses / monthlyBudget) * 100;

  // Category breakdown for pie chart
  const categoryData = categories.map(category => {
    const categoryTotal = expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return {
      name: category,
      value: categoryTotal,
      color: getCategoryColor(category).split(' ')[0].replace('bg-', '').replace('/20', '')
    };
  }).filter(item => item.value > 0);

  // Daily spending for bar chart
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const dailyData = last7Days.map(date => {
    const dayTotal = expenses
      .filter(expense => expense.date === date)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return {
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      amount: dayTotal
    };
  });

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#64748b'];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Expense Tracker</h1>
          <p className="text-muted-foreground">Monitor your spending and stay within budget</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="card-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold text-expense-food">${totalExpenses.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-expense-food" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Budget Used</p>
                  <p className="text-2xl font-bold text-primary">{budgetUsed.toFixed(1)}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className="text-2xl font-bold text-secondary">${(monthlyBudget - totalExpenses).toFixed(2)}</p>
                </div>
                <Calendar className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add New Expense */}
        <Card className="card-soft mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-primary" />
              Add New Expense
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                type="number"
                placeholder="Amount"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
              />
              <Select value={newExpense.category} onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="Description"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
              />
              <Button onClick={addExpense} className="btn-pastel">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Category Breakdown */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Daily Spending */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle>Daily Spending (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Expenses */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expenses.slice().reverse().map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-expense-food">${expense.amount.toFixed(2)}</p>
                      {expense.recurring && (
                        <Badge variant="secondary" className="text-xs">Recurring</Badge>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{expense.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className={`text-xs ${getCategoryColor(expense.category)}`}>
                          {expense.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{expense.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteExpense(expense.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Expenses;