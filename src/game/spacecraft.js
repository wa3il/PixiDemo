export function addspacecrafts(app, spacecrafts, scoreRef, updateScoreText) {
    // Create a container to hold all the spacecraft sprites.
    const spacecraftContainer = new PIXI.Container();

    // Add the spacecraft container to the stage.
    app.stage.addChild(spacecraftContainer);

    const spacecraftCount = 20;

    // Create a spacecraft sprite for each spacecraft.
    for (let i = 0; i < spacecraftCount; i++) {
        // Create a spacecraft sprite.
        const spacecraft = PIXI.Sprite.from('spacecraft');

        // Center the sprite anchor.
        spacecraft.anchor.set(0.5);

        // Assign additional properties for the animation.
        spacecraft.speed = 4;
        spacecraft.direction = Math.random() < 0.5 ? -1 : 1;

        // Randomly position the spacecraft sprite around the stage.
        spacecraft.x = Math.random() * app.screen.width;
        spacecraft.y = Math.random() * app.screen.height;

        // Randomly scale the spacecraft sprite to create some variety.
        spacecraft.scale.set(0.5 + Math.random() * 0.5);

        // Destruction of spacecraft
        spacecraft.interactive = true;
        spacecraft.buttonMode = true;
        spacecraft.on('pointerdown', (event) => {
            event.preventDefault(); // Prevent default click behavior
            spacecraftContainer.removeChild(spacecraft); // Remove the spacecraft
            scoreRef.value += 10; // Add points (assuming scoreRef is an object with a value property)
            updateScoreText(); // Update score text
        });

        // Add the spacecraft sprite to the spacecraft container.
        spacecraftContainer.addChild(spacecraft);

        // Add the spacecraft sprite to the spacecraft array.
        spacecrafts.push(spacecraft);
    }
}

export function animateSpacecrafts(spacecrafts, level, app, time, timeCounter) {
    if (level === 1) {
        // Level 1: The spacecrafts do not move.
        return;
    } else if (level === 2) {
        // Level 2: The spacecrafts move from left to right.
        spacecrafts.forEach((spacecraft) => {
            spacecraft.x += spacecraft.speed * spacecraft.direction;
            // Check if spacecraft is out of bounds
            if (spacecraft.x < 0 || spacecraft.x > app.screen.width) {
                spacecraft.direction *= -1; // Reverse direction
            }
        });
    } else if (level === 3) {
        // Level 3: The spacecrafts move randomly within the screen boundaries.
        spacecrafts.forEach((spacecraft) => {
            // Check if the spacecraft has a valid direction vector, if not, create one.
            if (!spacecraft.direction) {
                spacecraft.direction = new PIXI.Point(
                    Math.random() - 0.5,
                    Math.random() - 0.5
                );
                spacecraft.direction.normalize();
            }

            // Define a turn speed for rotation
            spacecraft.turnSpeed = 0.1;

            // Update spacecraft position
            spacecraft.x += spacecraft.speed * spacecraft.direction.x;
            spacecraft.y += spacecraft.speed * spacecraft.direction.y;
            spacecraft.rotation += spacecraft.turnSpeed;

            // Check if the spacecraft is out of bounds and reposition it.
            if (spacecraft.x < 0 || spacecraft.x > app.screen.width ||
                spacecraft.y < 0 || spacecraft.y > app.screen.height) {
                spacecraft.x = Math.random() * app.screen.width;
                spacecraft.y = Math.random() * app.screen.height;
                // Recalculate direction
                spacecraft.direction = new PIXI.Point(
                    Math.random() - 0.5,
                    Math.random() - 0.5
                );
                spacecraft.direction.normalize();
            }
        });
    }
}
