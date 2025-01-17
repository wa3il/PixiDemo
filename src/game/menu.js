export function initMenu(app, fct) {
    // Créer un conteneur pour le menu
    const menuContainer = new PIXI.Container();

    // Créer un bouton "Start"
    const startButton = new PIXI.Graphics();
    startButton.beginFill(0xFF0000); // Couleur du bouton (bleu)
    startButton.drawRect(0, 0, 200, 50); // Dimensions du bouton
    startButton.endFill();
    startButton.interactive = true;
    startButton.buttonMode = true;
    // Positionner le bouton au milieu de l'écran
    startButton.x = (app.screen.width - startButton.width) / 2;
    startButton.y = (app.screen.height - startButton.height) / 2;

    // Ajouter le bouton au conteneur du menu
    menuContainer.addChild(startButton);

    // Ajouter le texte "Start" sur le bouton
    const startText = new PIXI.Text('Start', { fill: 0xFFFFFF }); // Couleur du texte (blanc)
    startText.anchor.set(0.5); // Ancre du texte au milieu
    startText.position.set(startButton.width / 2, startButton.height / 2); // Positionner le texte au milieu du bouton
    startButton.addChild(startText); // Ajouter le texte au bouton

    // Ajouter le conteneur du menu au stage de l'application
    app.stage.addChild(menuContainer);

    startButton.on('pointerdown', () => {
        // Code à exécuter lorsque le bouton "Start" est cliqué
        startButton.interactive = false;
        menuContainer.removeChild(startButton);
        fct();
        console.log("Start button clicked!");
        return true;
    });
}
