import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Heart, Activity, Droplet, Plus, AlertTriangle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HealthReading {
  id: number;
  date: string;
  time: string;
  heartRate?: number;
  systolic?: number;
  diastolic?: number;
  bloodSugar?: number;
  notes?: string;
}

const Health = () => {
  const { toast } = useToast();
  
  // Mock data - will be replaced with Supabase
  const [readings, setReadings] = useState<HealthReading[]>([
    {
      id: 1,
      date: "2024-01-15",
      time: "08:30",
      heartRate: 72,
      systolic: 120,
      diastolic: 80,
      bloodSugar: 95,
      notes: "Morning reading"
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "14:45",
      heartRate: 78,
      systolic: 125,
      diastolic: 82,
      bloodSugar: 145,
      notes: "After lunch"
    }
  ]);

  const [newReading, setNewReading] = useState({
    heartRate: "",
    systolic: "",
    diastolic: "",
    bloodSugar: "",
    notes: ""
  });

  const checkEmergencyLevels = (reading: any) => {
    const emergencies = [];
    
    if (reading.heartRate && (reading.heartRate < 60 || reading.heartRate > 100)) {
      emergencies.push(`Heart rate: ${reading.heartRate} bpm`);
    }
    
    if (reading.systolic && reading.diastolic) {
      if (reading.systolic > 140 || reading.diastolic > 90) {
        emergencies.push(`Blood pressure: ${reading.systolic}/${reading.diastolic} mmHg`);
      }
    }
    
    if (reading.bloodSugar && (reading.bloodSugar < 70 || reading.bloodSugar > 140)) {
      emergencies.push(`Blood sugar: ${reading.bloodSugar} mg/dL`);
    }
    
    return emergencies;
  };

  const addReading = () => {
    const reading = {
      heartRate: newReading.heartRate ? parseInt(newReading.heartRate) : undefined,
      systolic: newReading.systolic ? parseInt(newReading.systolic) : undefined,
      diastolic: newReading.diastolic ? parseInt(newReading.diastolic) : undefined,
      bloodSugar: newReading.bloodSugar ? parseInt(newReading.bloodSugar) : undefined,
    };

    if (!reading.heartRate && !reading.systolic && !reading.bloodSugar) {
      toast({
        title: "Error",
        description: "Please enter at least one health metric",
        variant: "destructive"
      });
      return;
    }

    const emergencies = checkEmergencyLevels(reading);
    
    const newEntry: HealthReading = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].substring(0, 5),
      ...reading,
      notes: newReading.notes
    };

    setReadings([newEntry, ...readings]);
    setNewReading({ heartRate: "", systolic: "", diastolic: "", bloodSugar: "", notes: "" });

    if (emergencies.length > 0) {
      toast({
        title: "⚠️ Health Alert",
        description: `Abnormal readings detected: ${emergencies.join(", ")}. Consider consulting your healthcare provider.`,
        variant: "destructive"
      });
    } else {
      toast({
        title: "✅ Reading Saved",
        description: "Your health data has been recorded successfully.",
      });
    }
  };

  const getStatusColor = (value: number, type: string) => {
    switch (type) {
      case 'heartRate':
        if (value < 60 || value > 100) return 'text-destructive';
        return 'text-wellness-heart';
      case 'bloodPressure':
        if (value > 140) return 'text-destructive';
        return 'text-wellness-bp';
      case 'bloodSugar':
        if (value < 70 || value > 140) return 'text-destructive';
        return 'text-wellness-sugar';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (value: number, type: string) => {
    let status = 'Normal';
    let variant: 'default' | 'destructive' | 'secondary' = 'default';

    switch (type) {
      case 'heartRate':
        if (value < 60) { status = 'Low'; variant = 'destructive'; }
        else if (value > 100) { status = 'High'; variant = 'destructive'; }
        break;
      case 'bloodPressure':
        if (value > 140) { status = 'High'; variant = 'destructive'; }
        else if (value < 90) { status = 'Low'; variant = 'secondary'; }
        break;
      case 'bloodSugar':
        if (value < 70) { status = 'Low'; variant = 'destructive'; }
        else if (value > 140) { status = 'High'; variant = 'destructive'; }
        break;
    }

    return <Badge variant={variant} className="text-xs">{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Health Tracker</h1>
          <p className="text-muted-foreground">Monitor your vital signs and track your wellness journey</p>
        </div>

        {/* Add New Reading */}
        <Card className="card-soft mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-primary" />
              Log New Health Reading
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heartRate" className="flex items-center">
                  <Activity className="w-4 h-4 mr-1 text-wellness-heart" />
                  Heart Rate (bpm)
                </Label>
                <Input
                  id="heartRate"
                  type="number"
                  placeholder="72"
                  value={newReading.heartRate}
                  onChange={(e) => setNewReading({...newReading, heartRate: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="systolic" className="flex items-center">
                  <Heart className="w-4 h-4 mr-1 text-wellness-bp" />
                  Systolic (mmHg)
                </Label>
                <Input
                  id="systolic"
                  type="number"
                  placeholder="120"
                  value={newReading.systolic}
                  onChange={(e) => setNewReading({...newReading, systolic: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="diastolic" className="flex items-center">
                  <Heart className="w-4 h-4 mr-1 text-wellness-bp" />
                  Diastolic (mmHg)
                </Label>
                <Input
                  id="diastolic"
                  type="number"
                  placeholder="80"
                  value={newReading.diastolic}
                  onChange={(e) => setNewReading({...newReading, diastolic: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bloodSugar" className="flex items-center">
                  <Droplet className="w-4 h-4 mr-1 text-wellness-sugar" />
                  Blood Sugar (mg/dL)
                </Label>
                <Input
                  id="bloodSugar"
                  type="number"
                  placeholder="95"
                  value={newReading.bloodSugar}
                  onChange={(e) => setNewReading({...newReading, bloodSugar: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input
                id="notes"
                placeholder="Morning reading, after exercise, etc."
                value={newReading.notes}
                onChange={(e) => setNewReading({...newReading, notes: e.target.value})}
              />
            </div>
            
            <Button onClick={addReading} className="btn-pastel">
              <Plus className="w-4 h-4 mr-2" />
              Save Reading
            </Button>
          </CardContent>
        </Card>

        {/* Recent Readings */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Recent Readings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {readings.map((reading) => {
              const emergencies = checkEmergencyLevels(reading);
              const hasEmergency = emergencies.length > 0;
              
              return (
                <div
                  key={reading.id}
                  className={`p-4 rounded-lg border ${hasEmergency ? 'border-destructive bg-destructive/5' : 'border-border'} hover:shadow-md transition-all duration-200`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{reading.date}</span>
                      <span className="text-sm text-muted-foreground">{reading.time}</span>
                      {hasEmergency && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Alert
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {reading.heartRate && (
                      <div className="flex items-center justify-between p-2 rounded bg-wellness-heart/10">
                        <div className="flex items-center">
                          <Activity className="w-4 h-4 mr-2 text-wellness-heart" />
                          <span className="text-sm">Heart Rate</span>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${getStatusColor(reading.heartRate, 'heartRate')}`}>
                            {reading.heartRate} bpm
                          </div>
                          {getStatusBadge(reading.heartRate, 'heartRate')}
                        </div>
                      </div>
                    )}
                    
                    {reading.systolic && reading.diastolic && (
                      <div className="flex items-center justify-between p-2 rounded bg-wellness-bp/10">
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-2 text-wellness-bp" />
                          <span className="text-sm">Blood Pressure</span>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${getStatusColor(reading.systolic, 'bloodPressure')}`}>
                            {reading.systolic}/{reading.diastolic}
                          </div>
                          {getStatusBadge(reading.systolic, 'bloodPressure')}
                        </div>
                      </div>
                    )}
                    
                    {reading.bloodSugar && (
                      <div className="flex items-center justify-between p-2 rounded bg-wellness-sugar/10">
                        <div className="flex items-center">
                          <Droplet className="w-4 h-4 mr-2 text-wellness-sugar" />
                          <span className="text-sm">Blood Sugar</span>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${getStatusColor(reading.bloodSugar, 'bloodSugar')}`}>
                            {reading.bloodSugar} mg/dL
                          </div>
                          {getStatusBadge(reading.bloodSugar, 'bloodSugar')}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {reading.notes && (
                    <div className="mt-3 p-2 rounded bg-muted/30">
                      <span className="text-sm text-muted-foreground">Notes: {reading.notes}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Health;