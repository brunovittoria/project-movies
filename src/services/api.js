import axios from 'axios'

// BASE DA URL: https://api.themoviedb.org/3/
// URL DA API: /movie/550?api_key=3028369dfc056c6679d7a180b532290f

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api