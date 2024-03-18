import { addBackground } from './game/background.js';
import { addspacecrafts, animateSpacecrafts } from './game/spacecraft.js';
import { addscore, scoreText } from './game/score.js';

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
    addscore(app);
    addspacecrafts(app, spacecrafts, score, updateScoreText); // Pass updateScoreText function
    app.ticker.add((time) => {
        animateSpacecrafts(spacecrafts, 2, app, time, timeCounter);
        timeCounter += time.deltaTime;
    });
})();

/* // Asynchronous IIFE
(async () => {

    // Charger la texture de l'image de fond
    const bgTexture = await PIXI.Assets.load('data/bg.png');
    // Créer un sprite avec la texture chargée
    const background = new PIXI.Sprite(bgTexture);

    // Étirer le sprite pour remplir l'écran
    background.width = app.screen.width;
    background.height = app.screen.height;

    // Ajouter le sprite au stage
    app.stage.addChild(background);

    // Appendre l'application au corps du document
    document.body.appendChild(app.canvas);

    // Charger la texture de l'objet à détruire
    const texture = await PIXI.Assets.load('data/sample.png');

    // Créer une fonction pour générer une position aléatoire
    function getRandomPosition(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Créer une fonction pour générer une échelle aléatoire
    function getRandomScale() {
        return Math.random() * 0.5 + 0.5; // Échelle aléatoire entre 0.5 et 1
    }

    // Créer une fonction pour générer une rotation aléatoire
    function getRandomRotation() {
        return Math.random() * Math.PI * 2; // Rotation aléatoire entre 0 et 2pi
    }

    // Créer une fonction pour créer un objet à détruire
    function createDestroyableObject() {
        const object = new PIXI.Sprite(texture);

        // Définir la position aléatoire
        object.x = getRandomPosition(0, app.screen.width);
        object.y = getRandomPosition(0, app.screen.height);

        // Définir l'échelle aléatoire
        object.scale.set(getRandomScale());

        // Définir la rotation aléatoire
        object.rotation = getRandomRotation();

        // Ajouter un événement de clic pour détruire l'objet
        object.interactive = true;
        object.buttonMode = true;
        object.on('pointerdown', () => {
            app.stage.removeChild(object); // Supprimer l'objet
            score += 10; // Ajouter des points
        });

        app.stage.addChild(object);
    }

    let score = 0;
    const gameDuration = 300; // Durée du jeu en secondes
    const maxObjects = 20; // Nombre maximal d'objets à l'écran

    // Fonction de mise à jour du jeu
    function updateGame() {
        // Ajouter de nouveaux objets à détruire
        while (app.stage.children.length < maxObjects) {
            createDestroyableObject();
        }

        // Décrémenter le score avec le temps
        score -= 1;

        // Mettre à jour l'affichage du score
        // (vous devez implémenter cette fonctionnalité)

        // Vérifier la fin du jeu
        if (score <= 0 || score >= 1000) {
            endGame();
            return;
        }

        // Répéter la mise à jour du jeu
        requestAnimationFrame(updateGame);
    }

    // Fonction de fin de jeu
    function endGame() {
        // Afficher le message de fin de jeu
        // (vous devez implémenter cette fonctionnalité)
    }

    // Lancer le jeu
    updateGame();
})(); */
