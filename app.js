(async () => {
    // Créer une nouvelle application
    const app = new PIXI.Application();

    // Initialiser l'application avec une image de fond
    await app.init({ background: '#1099bb', resizeTo: window });

    // Charger l'image comme texture
    const bgTexture = await PIXI.Texture.from('/data/bg.jpg');

    // Créer un sprite avec la texture chargée
    const background = new PIXI.Sprite(bgTexture);

    // Étirer le sprite pour remplir l'écran
    background.width = app.screen.width;
    background.height = app.screen.height;

    // Ajouter le sprite au stage
    app.stage.addChild(background);

    // Appendre l'application au corps du document
    document.body.appendChild(app.view);

    // Charger la texture de l'objet à détruire
    const texture = await PIXI.Assets.load('https://pixijs.com/assets/bunny.png');

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
})();
