import axios from 'axios'
/* connect to backend  */
const instance = axios.create({
    baseURL: 'http://localhost:4444'
})


export default instance