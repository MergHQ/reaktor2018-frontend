import * as axios from 'axios';

const ApiEP = process.env.NODE_ENV === 'production' ? process.env.API_ENTRYPOINT : 'http://localhost:3000';

export function addObservation(temp, location) {
  return axios.put(ApiEP + '/observations', {
    temperature: temp,
    location
  });
}

export function getLocationObservations(location) {
  return axios.get(`${ApiEP}/observations/${location}`);
}

export function getLocationStats(location) {
  return axios.get(`${ApiEP}/observations/${location}?sortTempDesc=true&filterTo24h=true`);
}