const inputSearch = document.querySelector('.search-input')
const searchButton = document.querySelector('.search-button')
const mainContainer = document.querySelector('.main-container')
const showWeather = document.querySelector('.show-weather')
const cityName = document.querySelector('.city-name')
const sunrise = document.querySelector('.sunrise')
const statusWeather = document.querySelector('.status')
const sunset = document.querySelector('.sunset')
const temp = document.querySelector('.temperature')
const body = document.querySelector('body')

searchButton.addEventListener('click', searchSubmit)
body.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        searchSubmit()
    }
})

function searchSubmit(){
    if (inputSearch.value) {
        let str = `https://api.openweathermap.org/data/2.5/weather?q=${inputSearch.value}&appid=4038f19d52cdc6e11177eecd892ef3df&units=metric`;

        cityName.innerHTML = ''
        statusWeather.innerHTML = ''
        temp.innerHTML = ''
        sunrise.innerHTML = ''
        sunset.innerHTML = ''

        const request = fetch(str);
        const response = request.then((rawResponse) => {
            return rawResponse.json()
        })
        response.then(data => {
            console.log(data) //data це object
            if (data.cod != 404) {
                cityName.append(data.name)
                statusWeather.append(data.weather[0].main)

                let plus = '+'
                if (Math.round(data.main.temp) <= 0) {
                    plus = ''
                }

                temp.append('Temperature '+ plus + Math.round(data.main.temp))

                let s1 = new Date(data.sys.sunrise * 1000)
                let s2 = new Date(data.sys.sunset * 1000)

                const arr1 = s1.toString().split(' ')
                const arr2 = s2.toString().split(' ')

                sunrise.append('Sunrise at '+ arr1[4])
                sunset.append('Sunset at '+ arr2[4])
            } else {
                cityName.append('Ми не знайшли такого міста')
            }
        })

        setTimeout(() => {
            showWeather.style.opacity = '.9'
        }, 500)
    }
}