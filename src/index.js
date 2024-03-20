import { addBackground } from './game/background.js';
import { addspacecrafts, animateSpacecrafts, updatelevel } from './game/spacecraft.js';
import { addscore, scoreText } from './game/score.js';
import { initMenu } from './game/menu.js';


// Create a new PIXI application
const app = new PIXI.Application();

// Create an array to store the objects to destroy
let spacecrafts = [];
let spacecraftCount = 10;

let level = { value: 0 };
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
    // Ajoutez le reste du code pour lancer le jeu ici
    level.value ++;
    addspacecrafts(app, spacecrafts, score,spacecraftCount); // Pass updateScoreText function
    spacecrafts.forEach((spacecraft) => {
        spacecraft.speed = 0;
    });
    app.ticker.add((time) => {
        updateScoreText(); 
        updatelevel(spacecrafts,level,score,app,spacecraftCount)
        if (spacecrafts.length > 0){
            animateSpacecrafts(spacecrafts, level, app, time, timeCounter);
        }
        if( spacecrafts.length == 0 && level.value == 4){
            timeCounter = 0;
            initMenu(app,startGame);
        }
        timeCounter += time.deltaTime;
    });
}


