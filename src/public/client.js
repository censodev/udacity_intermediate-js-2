const render = rover => {
    document.querySelector(`.tab-content`).innerHTML = TabPane(window.state.get(rover))
}

const NavTabs = (active) => {
    return ['curiosity', 'opportunity', 'spirit'].reduce((acc, cur) => `
        ${acc}
        <li class="nav-item" role="presentation">
            <a class="nav-link ${cur === active ? 'active' : ''}"
                type="button" data-rover="${cur}">${cur.toUpperCase()}</a>
        </li>
    `, '<ul class="nav nav-pills nav-fill" role="tablist">') + '</ul>'
}

const loadNavTabs = () => {
    document.querySelector('#navtabs').innerHTML = NavTabs('curiosity')
    document.querySelectorAll('.nav-link')
        .forEach(s => s.addEventListener('click', e => {
            render(e.target.dataset.rover)
            document.querySelectorAll('.nav-link').forEach(nl => nl.classList.remove('active'))
            e.target.classList.add('active')
        }))
}

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

window.addEventListener('load', async () => {
    loadNavTabs()
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