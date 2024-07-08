const getImages = require('../services/Images')
const { ErrorUtils } = require('../errors/errors')

class imageController {
    static async getImages(req, res) {
        const { search, page, searchphotoOrientation, searchphotoColorTheme, searchUnsplash, searchFlickr } = req.query

        try {
            const searchResult = await getImages.imagesRequest({ search, page, searchphotoOrientation, searchphotoColorTheme, searchUnsplash, searchFlickr })
            return res.status(200).json(searchResult)
        } catch (err) {
            return ErrorUtils.catchError(res, err)
        }
    }

    static async getMainUnsplash(req, res) {
        try {
            const result = await getImages.mainImagesRequest()
            return res.status(200).json(result)
        } catch (err) {
            return ErrorUtils.catchError(res, err)
        }
    }

    static async imageDownload(req, res) {

        const urls = req.body.urls

        try {
            const result = await getImages.downloadImages(urls)
            return res.status(200).json(result)
        } catch (err) {
            return ErrorUtils.catchError(res, err)
        }
    }
}

module.exports = imageController