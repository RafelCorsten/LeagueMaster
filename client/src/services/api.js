const baseURL = process.env.API_URL || 'http://localhost:3002';

export const getCertainAmountOfMatches = (limit = 1, server = 'americas') => {
  return customFetch(`/riot/${server}}/matches/amount/${limit}`);
};

export const getMatchesById = (puuid, server = 'americas') => {
  return customFetch(`/riot/${server}}/matches/${puuid}`);
};

export const register = (username, email, password) => {
  return customFetch(`/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, email, password})
  });
};

// export const postEvent = (event) => {
//   return customFetch('/events', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(event),
//   });
// };

const customFetch = (path, options) => {
  return fetch(baseURL + path, options)
    .then(res => (res >= 400 ? Promise.reject(res) : res))
    .then(res => (res.status !== 204 ? res.json() : res))
    .catch(err => console.log(`Error fetching [${options?.method || 'GET'}] ${path}: ${err}`));
};