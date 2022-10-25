const RoverDetail = (rover, dateMostRecentPhotos) => {
    return `
        <div>
            <p>Name: ${rover.name}</p>
            <p>Landing date: ${rover.landing_date}</p>
            <p>Launch date: ${rover.launch_date}</p>
            <p>Status: ${rover.status}</p>
            <p>Most recent photos: (${dateMostRecentPhotos})</p>
        </div>
    `
}

const TabPane = (photos) => {
    const imgs = photos.slice(0, 12)
        .map(p => p.img_src)
        .reduce((acc, cur) => `${acc}<img src="${cur}" class="img-thumbnail" alt=""/>`, '')
    return `
        ${RoverDetail(photos[0].rover, photos[0].earth_date)}
        <div class="flex">
            ${imgs}
        </div>
    `
}

const getRoverPhotos = (rover, callback) => {
    fetch(`http://localhost:3000/rover/${rover}/photos`)
        .then(res => res.json())
        .then(callback)
}

const render = rover => {
    document.querySelector(`#${rover}`).innerHTML = TabPane(window.state.get(rover))
}

document.querySelectorAll('.nav-link')
    .forEach(s => s.addEventListener('click', e => render(e.target.dataset.rover)))

window.addEventListener('load', async () => {
    getRoverPhotos('curiosity', data0 => {
        getRoverPhotos('opportunity', data1 => {
            getRoverPhotos('spirit', data2 => {
                window.state = Immutable.Map({
                    curiosity: data0,
                    opportunity: data1,
                    spirit: data2,
                })
                render('curiosity')
            })
        })
    })
})