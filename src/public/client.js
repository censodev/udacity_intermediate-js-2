const RoverDetail = (rover) => {
    return `
        <div>
            <p>Name: ${rover.name}</p>
            <p>Landing date: ${rover.landing_date}</p>
            <p>Launch date: ${rover.launch_date}</p>
            <p>Status: ${rover.status}</p>
        </div>
    `
}

const TabPane = (photos) => {
    const imgs = photos.slice(0, 12)
        .map(p => p.img_src)
        .reduce((acc, cur) => `${acc}<img src="${cur}" class="img-thumbnail w-25" />`, '')
    return `
        ${RoverDetail(photos[0].rover)}
        <div class="flex">
            ${imgs}
        </div>
    `
}

const render = (rover) => {
    fetch(`http://localhost:3000/rover/${rover}/photos`)
        .then(res => res.json())
        .then(photos => document.querySelector(`#${rover}`).innerHTML = TabPane(photos))
}

document.querySelectorAll('.nav-link')
    .forEach(s => s.addEventListener('click', e => render(e.target.dataset.rover)))

window.addEventListener('load', () => render('curiosity'))