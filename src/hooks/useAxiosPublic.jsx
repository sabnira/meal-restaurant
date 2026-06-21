import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://bistro-boss-server-black-eta.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;