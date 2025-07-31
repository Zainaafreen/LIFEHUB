import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Thermometer, Droplets, Wind, Eye, Sunrise, Sunset } from "lucide-react";

const Weather = () => {
  const [city, setCity] = useState("San Francisco");
  const [searchCity, setSearchCity] = useState("");
  
  // Mock weather data - will be replaced with real API
  const [weatherData] = useState({
    city: "San Francisco",
    country: "US",
    temperature: 72,
    description: "Sunny",
    humidity: 65,
    windSpeed: 8,
    visibility: 10,
    uvIndex: 6,
    sunrise: "6:45 AM",
    sunset: "7:30 PM",
    feelsLike: 75,
    pressure: 1013,
    forecast: [
      { day: "Today", high: 75, low: 62, description: "Sunny", icon: "☀️" },
      { day: "Tomorrow", high: 73, low: 60, description: "Partly Cloudy", icon: "⛅" },
      { day: "Wednesday", high: 70, low: 58, description: "Cloudy", icon: "☁️" },
      { day: "Thursday", high: 68, low: 55, description: "Light Rain", icon: "🌧️" },
      { day: "Friday", high: 71, low: 59, description: "Sunny", icon: "☀️" },
    ]
  });

  const handleSearch = () => {
    if (searchCity.trim()) {
      setCity(searchCity);
      setSearchCity("");
      // Here you would typically make an API call to fetch weather data
    }
  };

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('sunny') || desc.includes('clear')) return '☀️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('thunder')) return '⛈️';
    return '🌤️';
  };

  const getUVLevel = (uvIndex: number) => {
    if (uvIndex <= 2) return { level: 'Low', color: 'text-secondary' };
    if (uvIndex <= 5) return { level: 'Moderate', color: 'text-accent' };
    if (uvIndex <= 7) return { level: 'High', color: 'text-expense-food' };
    if (uvIndex <= 10) return { level: 'Very High', color: 'text-destructive' };
    return { level: 'Extreme', color: 'text-destructive' };
  };

  const uvLevel = getUVLevel(weatherData.uvIndex);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Weather Forecast</h1>
          <p className="text-muted-foreground">Stay informed about current weather conditions</p>
        </div>

        {/* Search */}
        <Card className="card-soft mb-6">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter city name..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} className="btn-pastel">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Weather */}
        <Card className="card-soft mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              {weatherData.city}, {weatherData.country}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Main Weather Info */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                  <span className="text-6xl">{getWeatherIcon(weatherData.description)}</span>
                  <div>
                    <p className="text-5xl font-bold text-foreground">{weatherData.temperature}°F</p>
                    <p className="text-lg text-muted-foreground">{weatherData.description}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">Feels like {weatherData.feelsLike}°F</p>
              </div>

              {/* Weather Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <Droplets className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Humidity</p>
                    <p className="font-semibold">{weatherData.humidity}%</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <Wind className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Wind Speed</p>
                    <p className="font-semibold">{weatherData.windSpeed} mph</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <Eye className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Visibility</p>
                    <p className="font-semibold">{weatherData.visibility} mi</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <Thermometer className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pressure</p>
                    <p className="font-semibold">{weatherData.pressure} mb</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Sun Info */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sunrise className="w-5 h-5 mr-2 text-accent" />
                Sun Times
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sunrise className="w-4 h-4 text-accent" />
                    <span className="text-sm">Sunrise</span>
                  </div>
                  <span className="font-semibold">{weatherData.sunrise}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sunset className="w-4 h-4 text-expense-food" />
                    <span className="text-sm">Sunset</span>
                  </div>
                  <span className="font-semibold">{weatherData.sunset}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* UV Index */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle>UV Index</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{weatherData.uvIndex}</div>
                <div className={`text-lg font-medium ${uvLevel.color}`}>{uvLevel.level}</div>
                <div className="w-full bg-muted rounded-full h-2 mt-4">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(weatherData.uvIndex / 11) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 5-Day Forecast */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle>5-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {weatherData.forecast.map((day, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <p className="font-medium text-foreground mb-2">{day.day}</p>
                  <div className="text-3xl mb-2">{day.icon}</div>
                  <p className="text-sm text-muted-foreground mb-2">{day.description}</p>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{day.high}°</p>
                    <p className="text-sm text-muted-foreground">{day.low}°</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weather Tips */}
        <Card className="card-soft mt-6">
          <CardHeader>
            <CardTitle>Today's Weather Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-wellness-heart/10 border border-wellness-heart/20">
                <p className="text-sm font-medium text-wellness-heart mb-1">Perfect day for outdoor activities!</p>
                <p className="text-xs text-muted-foreground">The weather is ideal for walking, jogging, or cycling.</p>
              </div>
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm font-medium text-accent mb-1">Don't forget sunscreen</p>
                <p className="text-xs text-muted-foreground">UV index is moderate. Protect your skin when outdoors.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Weather;