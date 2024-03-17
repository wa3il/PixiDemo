export function addspacecrafts(app, spacecrafts,score)
{
    // Create a container to hold all the spacecraft sprites.
    const spacecraftContainer = new PIXI.Container();

    // Add the spacecraft container to the stage.
    app.stage.addChild(spacecraftContainer);

    const spacecraftCount = 20;
  

    // Create a spacecraft sprite for each spacecraft.
    for (let i = 0; i < spacecraftCount; i++){

        // Create a spacecraft sprite.
        const spacecraft = PIXI.Sprite.from('spacecraft');

        // Center the sprite anchor.
        spacecraft.anchor.set(0.5);

        // Assign additional properties for the animation.
        spacecraft.speed = 0.4;
        spacecraft.direction = /*Math.random() < 0.5 ? -1 :*/ 1;

        // Randomly position the spacecraft sprite around the stage.
        spacecraft.x = Math.random() * app.screen.width;
        spacecraft.y = Math.random() * app.screen.height;

        // Randomly scale the spacecraft sprite to create some variety.
        spacecraft.scale.set(0.5 + Math.random() * 0.2);

        // destruction of spacecraft
        spacecraft.interactive = true;
        spacecraft.buttonMode = true;
        spacecraft.on('pointerdown', () => {
            spacecraftContainer.removeChild(spacecraft); // Supprimer l'objet
            score += 10; // Ajouter des points
            console.log(score);
        });

        // Add the spacecraft sprite to the spacecraft container.
        spacecraftContainer.addChild(spacecraft);

        // Add the spacecraft sprite to the spacecraft array.
        spacecrafts.push(spacecraft);

        
    }
}

export function animateSpacecrafts(spacecrafts, level, app, time, timeCounter) {
    console.log(timeCounter);
    // Check the level and animate the spacecrafts accordingly.
    if (level === 1) {
        // Level 1: The spacecrafts do not move.
        return;
    } else if (level === 2) {
        // Level 2: The spacecrafts move from left to right.
        spacecrafts.forEach((spacecraft) => {
            if (timeCounter % 60 === 0) { // Change direction chaque seconde (60 frames par seconde)
                console.log(timeCounter);
                console.log("Changing direction");
                spacecraft.direction *= -1; // Inverse la direction
            }
            spacecraft.x += spacecraft.speed * spacecraft.direction;
        });

    } else if (level === 3) {
        // Level 3: The spacecrafts move randomly within the screen boundaries.
        spacecrafts.forEach((spacecraft) => {
            spacecraft.x += spacecraft.speed * Math.cos(spacecraft.direction);
            spacecraft.y += spacecraft.speed * Math.sin(spacecraft.direction);
            spacecraft.rotation += spacecraft.turnSpeed;

            // Check if the spacecraft is out of bounds and reposition it.
            if (spacecraft.x < 0 || spacecraft.x > app.screen.width ||
                spacecraft.y < 0 || spacecraft.y > app.screen.height) {
                spacecraft.x = Math.random() * app.screen.width;
                spacecraft.y = Math.random() * app.screen.height;
            }
        });
    }
}




