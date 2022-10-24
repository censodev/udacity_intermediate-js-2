const {default: fetch} = require("node-fetch")

module.exports = {
    getMarsRoverPhotos: (params, callback) => {
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${params.rover}/photos?sol=1000&api_key=${params.key ?? 'DEMO_KEY'}`)
            .then(res => res.json())
            .then(callback)
    }
}