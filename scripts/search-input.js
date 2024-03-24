document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.querySelector('#search');

    inputElement.addEventListener('input', function(event) {
        const inputValue = event.target.value;
        console.log('Введено: ', inputValue);
    });
});