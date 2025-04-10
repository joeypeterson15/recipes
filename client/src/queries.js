import axios from 'axios';

axios.defaults.headers.post['Content-Type'] ='application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const SERVER_URI = 'http://localhost:3000'
  
export async function getDishes(value) {
    let endpoint = '/search'
    let param = `?dish=${value}`
    const serverURL = SERVER_URI + endpoint + param

    console.log('in queries.js - getDishes')
    
    await axios.get(serverURL)
    .then(res => {
        console.log('in queries.js - getDishes')
        return res
    })
}

export const getDishOnSubmit = (value) => {
    let endpoint = '/fin_search'
    let param = `?dish=${value}`
    const serverURL = SERVER_URI + endpoint + param

    axios.get(serverURL)
        .then(res => {
            return res
        })
}