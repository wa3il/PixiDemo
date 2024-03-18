export let scoreText; // Declare scoreText globally

export function addscore(app)
{
    
    // Create a PIXI text object for the score
    scoreText = new PIXI.Text('Score: 0', {
        fill: '#ffffff', // Color of the text
        fontSize: 24,    // Size of the text
        fontFamily: 'Arial', // Font family
        fontWeight: 'bold'   // Font weight
    });

    // Position the text
    scoreText.x = 10;
    scoreText.y = 10;

    // Add the score text to the stage AFTER the background
    app.stage.addChild(scoreText);
}