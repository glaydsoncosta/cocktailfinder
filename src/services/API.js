import axios from 'axios';

const Consts = require('../helpers/Consts');

// Function to provide the default HTTP request headers
function getDefaultHeaders() {
    return { headers: { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8", "Accept": "application/json" } };
}

// Default encapsulated GET request
function get(query) {
    return new Promise(resolve =>  {
        axios.get(Consts.API_BASE_URL + query, getDefaultHeaders()).then(res => {
            resolve(res);
        }).catch(err => {
            resolve(err);
        });
    });
}

export { get };