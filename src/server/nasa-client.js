const { default: fetch } = require("node-fetch")

module.exports = {
    getMarsRoverPhotos: async (rover, key = 'DEMO_KEY', page = 1) => {
        return fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=${key}`)
            .then(res => res.json())
    }
}