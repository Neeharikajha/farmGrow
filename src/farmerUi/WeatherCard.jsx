// WeatherCard.jsx
export default function WeatherCard({ city, forecast }) {
  return (
    <div className="bg-white rounded-xl shadow px-5 py-4 mb-4 flex flex-col">
      <div className="flex items-center mb-2">
        <img src="/weather-sunny.svg" className="h-10 w-10 mr-3" alt="" />
        <div>
          <div className="text-sm text-gray-400">Good Morning!</div>
          <div className="text-lg font-semibold">{city}</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-emerald-700">{forecast.temp}°C</span>
        <span className="text-sm text-gray-500">{forecast.desc}</span>
      </div>
      <div className="text-xs text-gray-400">High: {forecast.high}°  Low: {forecast.low}°</div>
    </div>
  );
}
