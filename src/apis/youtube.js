import axios from 'axios';
const KEY = 'AIzaSyA8SHz1t_-MaS4_0hEDQ78tXdnqbMIdmhc';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 50,
        q: 'searchQuery',
        type: 'video',
        key:KEY
    }


});