document.addEventListener('DOMContentLoaded', function() {
    const btn24Hours = document.querySelector('#time-data');

    function fetchData() {
        fetch('db/24h-data.json')
            .then(response => response.json())
            .then(data => {
                display24HourData(data);
            })
            .catch(error => console.error('Ошибка чтения файла: ', error));
    }

    fetchData();

    btn24Hours.addEventListener('click', function() {        
        fetchData();
    });
    
    function display24HourData(hours) {
        const container = document.querySelector('.future-data__slides');
        container.innerHTML = '';

        Object.values(hours).forEach(hour => {

            const slide = document.createElement('div');
            slide.classList.add('future-data__slide', 'time-data');

            const timeElement = document.createElement('div');
            timeElement.classList.add('future-data__time');
            timeElement.innerText = hour.time;

            const icon = document.createElement('div');
            icon.classList.add('future-data__icon');
            const img = document.createElement('img');
            img.src = hour.icon;
            img.alt = 'weather-icon';
            icon.appendChild(img);

            const weatherElement = document.createElement('div');
            weatherElement.classList.add('future-data__weather');
            weatherElement.innerText = hour.weather;

            slide.appendChild(timeElement);
            slide.appendChild(icon);
            slide.appendChild(weatherElement);

            container.appendChild(slide);
        });
    }
})