const UnsplashRequests = require('../repositories/unsplash')
const FlickrRequests = require('../repositories/flickr')
const getColorCode = require('../validators/flickr')
const { Badrequest, ErrorUtils } = require('../errors/errors')
const axios = require('axios');
const logger = require("firebase-functions/logger");
const { head } = require('../server');

class getImages {
    static async imagesRequest({ search, page, searchphotoOrientation, searchphotoColorTheme, searchUnsplash, searchFlickr }) {

        if (!page && !search) {
            throw new Badrequest("No minimal search info provided")
        }

        let unsplashResponse = undefined;
 
        if (searchUnsplash == 'true') {
            unsplashResponse = await UnsplashRequests.unsplashRequest({ search, page, searchphotoOrientation, searchphotoColorTheme })
            .catch((err) => {
                logger.error("Unsplash API error: ", err)
            })
        }

        let flickrResponse = undefined;

        if (searchFlickr == 'true') {
            const colorCode = await getColorCode(searchphotoColorTheme)
            const photos = await FlickrRequests.flickrRequest({ search, page, searchphotoOrientation, colorCode })
            .catch((err) => {
                logger.error("Flickr API error: ", err)
            })
            if (photos) {
                flickrResponse = photos.map(photo => {
                    return {
                        urls: {
                            regular: photo.url_l ? photo.url_l : (photo.url_m ? photo.url_m : photo.url_s),
                            small: photo.url_m ? photo.url_m : photo.url_s
                        },
                        alt: photo.title,
                        id: photo.id
                    }
                })
            }
        }

        if (unsplashResponse || flickrResponse) {
            
            let unsplashResultArrayLenght = 0;

            if (unsplashResponse) {
                unsplashResultArrayLenght = Array.from(unsplashResponse).length
            }

            let flickrResultArrayLenght = 0;

            if (flickrResponse) {
                flickrResultArrayLenght = Array.from(flickrResponse).length
            }

            const CreatedImages = [];
        
            if (unsplashResponse) {
                unsplashResponse.forEach(i => {
                    CreatedImages.push({source: i.urls, download_location: i.links.download_location, id: i.id, alt: i.alt_description, user: {name: i.user.name, link: i.user.links.html}})
                })
            }

            if (flickrResponse) {
                flickrResponse.forEach(i => {
                    CreatedImages.push({source: i.urls, id: i.id, alt: i.alt})
                })
            }

            const usedIndexes = []

            const data = []

            while (usedIndexes.length < CreatedImages.length) {

                const index = Math.floor(Math.random() * CreatedImages.length)

                const isIndexUsed = usedIndexes.includes(index)

                if (!isIndexUsed) {
                    let item = CreatedImages[index]
                    usedIndexes.push(index)
                    data.push(item)
                }

            }
    
            return data
        } else {
            return null
        }
    }

    static async mainImagesRequest() {
        const response = await UnsplashRequests.unsplashMainRequest().catch((err) => {
            logger.error("Unsplash API error: ", err)
        })

        return response
    }

    static async downloadImages(urls) {

        const Access_Key = process.env.UNSPLASH_ACCESS_KEY

        urls.forEach(async (url) => {
            await axios.get(url + `&client_id=${Access_Key}`).then((res) => {
                
            }).catch((err) => {

            })
        })

        return {msg: 'The request was successfully sent'}

    }
}

module.exports = getImages