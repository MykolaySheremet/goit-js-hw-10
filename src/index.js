import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce'
import {fetchCountries} from './fetchCountries'

// console.log(fetchCountries);
// console.log('hi artem');

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const listOfCountry = document.querySelector('.country-list');
const cardOfContryInfo = document.querySelector('.country-info');


input.addEventListener('input', debounce(serchCountries, DEBOUNCE_DELAY));

let serchCountry = '';

function serchCountries(e) {
    e.preventDefault();

    clearCardandListCounries()
    
    serchCountry = input.value.trim();


    fetchCountries(serchCountry)
        .then((data => {
            generateContent(data);

            if (data.status === 404) {
                Notiflix.Notify.failure("Oops, there is no country with that name")
                return
            }
        }))
        .catch(eror=> Notiflix.Notify.failure("Error, try again"))
};

    // fetch(`${BASE_URL}/name/${serchCountry}?fields=name,capital,population,flags,languages`)
    //     .then(response => response.json())
    //     .then((data => {
    //         generateContent(data);
    //         if (data.status === 404) {
    //             Notiflix.Notify.failure("Oops, there is no country with that name")
    //             return
    //         }
    //     }))
    //     .catch(eror=> Notiflix.Notify.failure("Error, try again"))
// }

function generateContent(array) {
    const lengthOfArray = array.length
    
    if (lengthOfArray === 1) {
        createCardOfCountry(array)
        return
    }
    else if (lengthOfArray > 1 & lengthOfArray <= 10) {
        createListOfCountries(array);
        return
    }
    else if (lengthOfArray > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        return
    }
    
}

function createListOfCountries(array) {
    for (const item of array) {
        const rezult =
        `<li class="country-list_item"> 
        <img class="country-list_img" src="${item.flags.svg}" alt="${item.name.official}">
        <h2 class="country-list_titel"> ${item.name.official}</h2>
        </li>`

        listOfCountry.insertAdjacentHTML('beforeend', rezult )
    }
    
}

function createCardOfCountry(array) {
    for (const item of array) {
        const cardOfCountry =
        `<li class="country-list_item"> 
        <img class="country-list_img" src="${item.flags.svg}" alt="${item.name.official}">
        <h2 class="country-list_titel"> ${item.name.official}</h2></li>
        <p class="country-list_paragraph">Capital: <span class="country-list_span"> ${item.capital}  </span>  </p>
        <p class="country-list_paragraph"> Population: <span class="country-list_span"> ${item.population}</span></p>
        <p class="country-list_paragraph"> Languages:  <span class="country-list_span">${Object.values(item.languages)}</span> </p>`
        
        cardOfContryInfo.insertAdjacentHTML('beforeend', cardOfCountry )
    }
}

function clearCardandListCounries() {
    listOfCountry.innerHTML = '';
    cardOfContryInfo.innerHTML = '';
}