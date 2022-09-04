'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


class Workout {
    date = new Date();
    id = (new Date() + '').slice(-10);
    constructor(coords, distance, duration) {
        this.coords = coords;  //[lat,lng]
        this.distance = distance; // in kilometere(km)
        this.duration = duration; // in minutes (min)
    }
    _getDescription() {
        const month = ['January', 'Febrauary', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${month[this.date.getMonth()]} ${this.date.getDate()}`

    }
}


class Running extends Workout {
    name;
    type = `running`;
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._getDescription();
    }
    calcPace() {
        //min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}


class Cycling extends Workout {
    name;
    type = `cycling`;
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._getDescription();
    }
    calcSpeed() {
        //distance/time i.e km/h
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}


const run1 = new Running([39, -12], 40, 30, 178);
const cycle1 = new Cycling([40, -19], 35, 25, 20);



// console.log(run1);
// console.log(cycle1);
// console.log(run1.calcPace());
// console.log(cycle1.calcSpeed());


/* --------------------------------------------------------------------------------------*/


// Application Architecture
class App {
    #map;
    #mapEvent;
    #mapZoomLevel = 13;
    #workoutList = [];

    /* The geolocation API is a browser API 
    The getCurrentPosition method takes two callback functions 1 for successful request and 1 for rejection
    */

    constructor() {
        this._getPosition(); //getting position


        //getting local storage

        this._getLocalStorage();
        form.addEventListener('submit', this._newWorkout.bind(this)); //adding marker on the map
        inputType.addEventListener('change', this._toggleElevationField);
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    }

    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
                alert(`Could  not get your position!`)
            }
            )
        }
    }


    _loadMap(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const mapLocation = `https://www.google.com/maps/@${latitude},${longitude}`;
        console.log(mapLocation);



        //LEAFLET : An open-source javascript library for mobile-friendly interactive maps.

        this.#map = L.map('map').setView([latitude, longitude], this.#mapZoomLevel);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        this.#map.on('click', this._showForm.bind(this)); // showing the map



        this.#workoutList.forEach(work => {

            this._renderWorkoutMarker(work);
        }) 
    }


    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _hideForm() {
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);
    }
    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');

    }

    _renderWorkoutMarker(workout) //Display the marker on the map
    {
        L.marker(workout.coords).addTo(this.#map)
            .bindPopup(L.popup({  //popup setting option
                maxWidth: 250,
                minWidth: 30,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup` //giving a a specific class name for styling accordingly
            })).setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🦶🏼'} ${workout.description}`)
            .openPopup();
    }

    _renderWorkout(workOut) {

        let html = `
    <li class="workout workout--${workOut.type}" data-id="${workOut.id}">
        <h2 class="workout__title">${workOut.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${workOut.type === 'running' ? '🏃‍♂️' : '🦶🏼'}</span>
          <span class="workout__value">${workOut.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workOut.duration}</span>
          <span class="workout__unit">min</span>
        </div>  `;

        if (workOut.type === 'running') {
            html += `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workOut.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workOut.cadence}</span>
            <span class="workout__unit">spm</span>
        </div>
    </li> `
        }
        if (workOut.type === 'cycling') {
            html += `
        <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workOut.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workOut.elevationGain}</span>
            <span class="workout__unit">m</span>
        </div>
    </li>
            `;
        }
        form.insertAdjacentHTML('afterend', html);
    }



    _moveToPopup(e) {
        let workoutEl = e.target.closest('.workout');
        console.log(workoutEl);

        if (!workoutEl) return;

        const workout = this.#workoutList.find(work => work.id === workoutEl.dataset.id);

        this.#map.setView(workout.coords, this.#mapZoomLevel, { animate: true, pan: { duration: 0.25 } })

    }

    _setLocalStorage() {
        localStorage.setItem('workout', JSON.stringify(this.#workoutList));
    }


    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workout'));
        console.log(data);
        if (!data) return; 

        this.#workoutList = data;



        this.#workoutList.forEach(work => {

            this._renderWorkout(work);
        })

    }



    _restItems()
    {
        localStorage.removeItem('workout');
        location.reload(); 
    }
    _newWorkout(e) {
        e.preventDefault();
        //Task to be done!


        //Helper functions =>  isValid and allPositive
        const isValid = (...inputs) => inputs.every(inp => Number.isFinite(inp));

        const allPositive = (...inputs) => inputs.every(inp => inp > 0);

        // 1. Get Data

        const type = inputType.value;
        const distance = +inputDistance.value; //why + ? to convert it into number as input comes as a string 
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng;
        let workout;


        // 2. If workout running, create running instance

        if (type === 'running') {
            const cadence = +inputCadence.value;
            //validate data
            if (!isValid(distance, duration, cadence) || !allPositive(distance, duration, cadence)) {
                return alert('Inputs have to be positive numbers!')
            }
            workout = new Running([lat, lng], distance, duration, cadence);

        }




        // 3. If workout cycling, create cycling instance

        if (type === 'cycling') {
            const elevation = +inputElevation.value;
            //validate data
            if (!isValid(distance, duration, elevation) || !allPositive(distance, duration, elevation)) {
                return alert('Inputs have to be positive numbers!')
            }
            workout = new Cycling([lat, lng], distance, duration, elevation);
        }


        console.log(this.#workoutList);
        // 4. Add new object to workout array
        this.#workoutList.push(workout);



        // 5. Render workout on the map as a marker
        this._renderWorkoutMarker(workout);


        // 6. render workout on the list
        this._renderWorkout(workout);


        // 7.  Hide the form + Clear input field
        this._hideForm();

        //8. Set Local Storage
        this._setLocalStorage();


    }



}


const app = new App();






