document.addEventListener('DOMContentLoaded', () => {
    const background = document.querySelector('.background');
    const svgFiles = [
        'tiles/grass_c_0.svg',
        'tiles/grass_c_1.svg',
        'tiles/grass_c_2.svg',
        'tiles/grass_c_3.svg'
    ];

    const tileSize = 200;
    const cols = Math.ceil(window.innerWidth / tileSize) * 2;
    const rows = Math.ceil(window.innerHeight / tileSize) * 2;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const tile = document.createElement('div');
            tile.style.width = `${tileSize}px`;
            tile.style.height = `${tileSize}px`;
            tile.style.backgroundImage = `url(${svgFiles[Math.floor(Math.random() * svgFiles.length)]})`;
            tile.style.backgroundSize = 'cover';
            tile.style.position = 'absolute';
            tile.style.top = `${y * tileSize}px`;
            tile.style.left = `${x * tileSize}px`;
            background.appendChild(tile);
        }
    }

    let offsetX = 0;
    let offsetY = 0;
    const speed = 0.1;

    function animateBackground() {
        offsetX += speed;
        offsetY += speed;
        background.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
        requestAnimationFrame(animateBackground);
    }

    animateBackground();
});
