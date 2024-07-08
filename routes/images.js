const express = require('express')
const imageController = require('../controllers/imageController')
const TokenServices = require('../services/Token')

const router = express.Router()

router.get('/result-images', imageController.getImages)

router.get('/main-images', imageController.getMainUnsplash)

router.post('/image-download', TokenServices.checkAccess, imageController.imageDownload)

module.exports = router