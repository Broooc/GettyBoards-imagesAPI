const axios = require('axios')


class UnsplashRequests {
    static async unsplashRequest({ search, page, searchphotoOrientation, searchphotoColorTheme }) {

        const Access_Key = process.env.UNSPLASH_ACCESS_KEY

        let search_api_unsplash = `https://api.unsplash.com/search/photos?page=${page}&query=${search}&client_id=${Access_Key}&per_page=30`

        if (searchphotoOrientation) { search_api_unsplash += `&orientation=${searchphotoOrientation}` }
        if (searchphotoColorTheme) { search_api_unsplash += `&color=${searchphotoColorTheme}` }

        try {
            const response = await axios.get(search_api_unsplash)
            return response.data.results;
        } catch (err) {
            throw err
        }

    }

    static async unsplashMainRequest() {
        const Access_Key = process.env.UNSPLASH_ACCESS_KEY

        const main_images_api = `https://api.unsplash.com/search/photos?page=1&query=architecture%20buildings%20abstract%20interiors&client_id=${Access_Key}&per_page=30`

        try {
            const response = await axios.get(main_images_api)
            return response.data.results
        } catch (err) {
            throw err
        }
    }
}

module.exports = UnsplashRequests