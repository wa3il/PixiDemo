import { addBackground } from './game/background.js';
import { addspacecrafts, animateSpacecrafts, updatelevel } from './game/spacecraft.js';
import { addscore, scoreText } from './game/score.js';
import { initMenu } from './game/menu.js';


// Create a new PIXI application
const app = new PIXI.Application();

// Create an array to store the objects to destroy
const spacecrafts = [];

let score = { value: 0 };
let timeCounter = 0;

async function setup() {
    // Initialize the application.
    await app.init({ background: '#1099bb', resizeTo: window });

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);
}

async function preload() {
    // Create an array of asset data to load.
    const assets = [
        { alias: 'background', src: 'data/bg.png' },
        { alias: 'spacecraft', src: 'data/alien.png' },
    ];

    // Load the assets defined above.
    await PIXI.Assets.load(assets);
}

export function updateScoreText() {
    scoreText.text = `Score: ${score.value}`;
}



// Asynchronous IIFE
(async () => {
    await setup();
    await preload();
    addBackground(app);
    initMenu(app,startGame);
    addscore(app);
})();

// Fonction pour démarrer le jeu
function startGame() {
    let level = 1;
    // Ajoutez le reste du code pour lancer le jeu ici
    addspacecrafts(app, spacecrafts, score); // Pass updateScoreText function
    app.ticker.add((time) => {
        animateSpacecrafts(spacecrafts, level, app, time, timeCounter);
        updateScoreText();
        updatelevel(spacecrafts.length,level,score,app)
        
        timeCounter += time.deltaTime;
    });
}

// Événement pour démarrer le jeu lorsqu'on appuie sur le bouton "Start"
document.getElementById('startButton').addEventListener('click', startGame);


