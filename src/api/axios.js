import axios from "axios";

const baseURL = 'http://localhost:3003'

export default axios.create({
    baseURL: baseURL
})