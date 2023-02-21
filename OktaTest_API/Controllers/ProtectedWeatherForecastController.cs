using Microsoft.AspNetCore.Mvc;

namespace OktaTest_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProtectedWeatherForecastController : ControllerBase
    {

        private readonly ILogger<ProtectedWeatherForecastController> _logger;

        public ProtectedWeatherForecastController(ILogger<ProtectedWeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = 100,
                Summary = "VERY HOT"
            })
            .ToArray();
        }
    }
}