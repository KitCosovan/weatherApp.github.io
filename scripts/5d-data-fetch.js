document.addEventListener('DOMContentLoaded', function() {
    const btn5Days = document.querySelector('#day-data');

    btn5Days.addEventListener('click', function() {
        fetch('db/5d-data.json')
            .then(response => response.json())
            .then(data => {
                display5DayData(data);
            })
            .catch(error => console.error('Ошибка чтения файла: ', error));
    });
    
    function display5DayData(days) {
        const container = document.querySelector('.future-data__slides');
        container.innerHTML = '';

        Object.values(days).forEach(dayData => {

            const slide = document.createElement('div');
            slide.classList.add('future-data__slide', 'day-data');

            const slideInfo = document.createElement('div');
            slideInfo.classList.add('future-data__slide_info');

            const dayElement = document.createElement('div');
            dayElement.classList.add('future-data__day');
            dayElement.innerText = dayData.day;

            const dateElement = document.createElement('div');
            dateElement.classList.add('future-data__date');
            dateElement.innerText = dayData.date;

            slideInfo.appendChild(dayElement);
            slideInfo.appendChild(dateElement);

            const icon = document.createElement('div');
            icon.classList.add('future-data__icon');
            const img = document.createElement('img');
            img.src = dayData.icon;
            img.alt = 'weather-icon';
            icon.appendChild(img);

            const range = document.createElement('div');
            range.classList.add('future-data__range');
            range.innerHTML = `от <div class="future-data__low-level">${dayData['low-level']}</div> до <div class="future-data__high-level">${dayData['high-level']}</div>`;

            slide.appendChild(slideInfo);
            slide.appendChild(icon);
            slide.appendChild(range);

            container.appendChild(slide);
        });
    }
})