import axios from "axios";
const baseUrl = "https://pixabay.com/api/";
axios.defaults.baseURL = baseUrl;
const apiKey = "22651538-53630abe578d2561aeb41817a";


export async function fetchImages(name, page) {
    const queryParams = `?key=${apiKey}&q=${name}&image_type=photo&per_page=12&page=${page}&orientation=horizontal&safesearch=true`;
    const url = baseUrl + queryParams;
    return await fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(
                        new Error('Извините, по вашему запросу ничего не найдено'),
                    );
                })
}