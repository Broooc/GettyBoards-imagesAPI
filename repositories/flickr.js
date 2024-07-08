const { createFlickr } = require("flickr-sdk")
const dotenv = require('dotenv')

dotenv.config()

class FlickrRequests {
    static async flickrRequest({ search, page, searchphotoOrientation, colorCode }) {

        const { flickr } = createFlickr(process.env.FLICKR_ACCESS_KEY)

        let params = {
            safe_search: "1",
            is_getty: 'true',
            content_type: "1",
            media: 'photos',
            text: search,
            tags: search.replace(/ /g, ','),
            page: page,
            per_page: "100",
            extras: "description, license, date_upload, date_taken, owner_name, tags, views, media, path_alias, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o"
        }

        if (searchphotoOrientation == 'squarish') {
            searchphotoOrientation = 'square'
        }

        if (searchphotoOrientation) { params.orientation = searchphotoOrientation }
        if (colorCode) { params.color_codes = colorCode }

        const res = await flickr('flickr.photos.search', params).catch((err) => {
            throw err
        })
        
        return res.photos.photo
    }
}

module.exports = FlickrRequests