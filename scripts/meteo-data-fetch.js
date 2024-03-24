document.addEventListener('DOMContentLoaded', function() {
    fetch('db/meteo-data.json')
        .then(response => response.json())
        .then(data => {
            const humidity = {
                value: data.humidity.value,
                unit: data.humidity.unit 
            };

            const pressure = {
                value: data.pressure.value
            }

            const visibility = {
                value: data.visibility.value,
                unit: data.visibility.unit
            }

            const sunriseTime = formatTime(parseTime(data.sunrise.time));
            const sunsetTime = formatTime(parseTime(data.sunset.time));

            const timeSinceSunrise = formatTimeWithZero(parseTime(data.sunrise.since));
            const timeSinceSunset = formatTimeWithZero(parseTime(data.sunset.since));

            const wind = {
                speed: data.wind.speed,
                unit: data.wind.unit,
                direction: data.wind.direction
            }

            displayData(humidity, pressure, visibility, sunriseTime, timeSinceSunrise, sunsetTime, timeSinceSunset, wind);
        })
        .catch(error => console.error('Ошибка чтения файла: ', error));

    function parseTime(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return { hours, minutes };
    }

    function formatTime(time) {
        return `${time.hours.toString()}:${time.minutes.toString().padStart(2, '0')}`;
    }

    function formatTimeWithZero(time) {
        return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`;
    }

    function displayData(humidity, pressure, visibility, sunriseTime, timeSinceSunrise, sunsetTime, timeSinceSunset, wind) {

        document.querySelector('#humidity-value').innerText = `${humidity.value}`;
        document.querySelector('#humidity-unit').innerText = `${humidity.unit}`;
        document.querySelector('#pressure-value').innerText = `${pressure.value}`;
        document.querySelector('#visibility-value').innerText = `${visibility.value}`;
        document.querySelector('#visibility-unit').innerText = `${visibility.unit}`;
        document.querySelector('#sunrise-time').innerText = `${sunriseTime}`;
        document.querySelector('#sunrise-since').innerText = `Прошло ${timeSinceSunrise}`;
        document.querySelector('#sunset-time').innerText = `${sunsetTime}`;
        document.querySelector('#sunset-since').innerText = `Осталось ${timeSinceSunset}`;
        document.querySelector('#wind-value').innerText = `${wind.speed}`;
        document.querySelector('#wind-unit').innerText = `${wind.unit}`;
        document.querySelector('#wind-direction').innerText = `${wind.direction}`;
    }
});