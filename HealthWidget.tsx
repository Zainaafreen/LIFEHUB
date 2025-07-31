import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Activity, Droplet, AlertTriangle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HealthWidget = () => {
  const navigate = useNavigate();
  
  // Mock data - will be replaced with Supabase data
  const healthData = {
    heartRate: { value: 72, status: "normal", unit: "bpm" },
    bloodPressure: { systolic: 120, diastolic: 80, status: "normal" },
    bloodSugar: { value: 145, status: "high", unit: "mg/dL" },
    lastCheck: "2 hours ago"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'text-destructive';
      case 'low': return 'text-accent';
      default: return 'text-wellness-heart';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'high': return 'bg-destructive/10';
      case 'low': return 'bg-accent/10';
      default: return 'bg-wellness-heart/10';
    }
  };

  const hasEmergency = healthData.bloodSugar.status === "high";

  return (
    <Card className={`card-soft ${hasEmergency ? 'emergency-pulse ring-2 ring-destructive' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Heart className="w-5 h-5 mr-2 text-wellness-heart" />
          Health Overview
          {hasEmergency && (
            <AlertTriangle className="w-4 h-4 ml-2 text-destructive" />
          )}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/health')}
          className="btn-pastel"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasEmergency && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm font-medium text-destructive">⚠️ Blood sugar elevated</p>
            <p className="text-xs text-destructive/80">Consider checking with your healthcare provider</p>
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-3">
          <div className={`p-3 rounded-lg ${getStatusBg(healthData.heartRate.status)} text-center`}>
            <Activity className={`w-4 h-4 mx-auto mb-1 ${getStatusColor(healthData.heartRate.status)}`} />
            <p className="text-lg font-bold text-foreground">{healthData.heartRate.value}</p>
            <p className="text-xs text-muted-foreground">{healthData.heartRate.unit}</p>
          </div>
          
          <div className={`p-3 rounded-lg ${getStatusBg(healthData.bloodPressure.status)} text-center`}>
            <Heart className={`w-4 h-4 mx-auto mb-1 ${getStatusColor(healthData.bloodPressure.status)}`} />
            <p className="text-lg font-bold text-foreground">
              {healthData.bloodPressure.systolic}/{healthData.bloodPressure.diastolic}
            </p>
            <p className="text-xs text-muted-foreground">mmHg</p>
          </div>
          
          <div className={`p-3 rounded-lg ${getStatusBg(healthData.bloodSugar.status)} text-center`}>
            <Droplet className={`w-4 h-4 mx-auto mb-1 ${getStatusColor(healthData.bloodSugar.status)}`} />
            <p className="text-lg font-bold text-foreground">{healthData.bloodSugar.value}</p>
            <p className="text-xs text-muted-foreground">{healthData.bloodSugar.unit}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Last check: {healthData.lastCheck}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/health')}
            className="btn-pastel"
          >
            Log New Reading
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthWidget;