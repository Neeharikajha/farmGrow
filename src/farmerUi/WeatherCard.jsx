import { Sun, Cloud, Moon } from "lucide-react";

export default function WeatherCard({ city, forecast }) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
  const getWeatherIcon = () => {
    if (forecast.desc.toLowerCase().includes("cloud")) return <Cloud className="h-10 w-10 text-gray-500" />;
    if (forecast.desc.toLowerCase().includes("clear") || forecast.desc.toLowerCase().includes("sun")) return <Sun className="h-10 w-10 text-yellow-500" />;
    if (forecast.desc.toLowerCase().includes("night")) return <Moon className="h-10 w-10 text-indigo-500" />;
    return <Sun className="h-10 w-10 text-yellow-500" />; // default
  };
  return (
    <div className="bg-white rounded-xl shadow px-6 py-5 mb-4 flex flex-col border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm text-gray-500">{today}</div>
          <div className="text-lg font-semibold text-gray-800">{city}</div>
        </div>
        <div className="bg-blue-50 rounded-full p-2 shadow-sm">
          {getWeatherIcon()}
        </div>
      </div>
      <div className="flex items-end justify-between mb-2">
        <span className="text-3xl font-bold text-blue-700">{forecast.temp}°C</span>
        <span className="text-sm text-gray-600">{forecast.desc}</span>
      </div>
      <div className="text-sm text-gray-600">
        High: <span className="font-medium">{forecast.high}°C</span> &nbsp;|&nbsp; 
        Low: <span className="font-medium">{forecast.low}°C</span>
      </div>
      <div className="mt-3 text-xs text-gray-400">
        Data as per local forecast (IMD)
      </div>
    </div>
  );
}
