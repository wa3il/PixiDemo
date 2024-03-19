export function addspacecrafts(app, spacecrafts, scoreRef,spacecraftCount) {
    // Create a container to hold all the spacecraft sprites.
    const spacecraftContainer = new PIXI.Container();

    // Add the spacecraft container to the stage.
    app.stage.addChild(spacecraftContainer);

   

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

         // Add the spacecraft sprite to the spacecraft container.
         spacecraftContainer.addChild(spacecraft);

         // Add the spacecraft sprite to the spacecraft array.
         spacecrafts.push(spacecraft);
 
        // Destruction of spacecraft
        spacecraft.interactive = true;
        spacecraft.buttonMode = true;
        spacecraft.on('pointerdown', (event) => {
            event.preventDefault(); // Prevent default click behavior
            spacecraftContainer.removeChild(spacecraft); // Remove the spacecraft
            scoreRef.value += 10; // Add points (assuming scoreRef is an object with a value property)
            spacecrafts.pop(spacecraft)
            console.log(spacecrafts)
        });

       
    }
}
export function updatelevel(spacecrafts,level,score,app,spacecraftsCount){
    console.log(level.value)
        if (spacecrafts.length == 0 && level.value < 3 && level.value > 0){
            
            level.value += 1;   
            addspacecrafts(app, spacecrafts, score,spacecraftsCount); // 
            
        }
        else if (spacecrafts.length == 0 && level.value == 3 ){
            level.value += 1;
        }
        else if (spacecrafts.length == 0 && level.value >= 4){
            level.value = 0;
            score.value = 0;
           console.log("THE END");
        }
}


export function animateSpacecrafts(spacecrafts, level, app, time, timeCounter) {
    
    if (level.value === 1) {
        // Level 1: The spacecrafts do not move.
        return;
    } else if (level.value === 2) {
        // Level 2: The spacecrafts move from left to right.
        spacecrafts.forEach((spacecraft) => {
            spacecraft.x += spacecraft.speed * spacecraft.direction;
            // Check if spacecraft is out of bounds
            if (spacecraft.x < 0 || spacecraft.x > app.screen.width) {
                spacecraft.direction *= -1; // Reverse direction
            }
        });
    } else if (level.value === 3) {
         // Level 2: The spacecrafts move from left to right.
         spacecrafts.forEach((spacecraft) => {
            spacecraft.x += spacecraft.speed * spacecraft.direction;
            spacecraft.y += spacecraft.speed * spacecraft.direction;

            // Check if spacecraft is out of bounds
            if ((spacecraft.x < 0 || spacecraft.x > app.screen.width) || (spacecraft.y < -10 || spacecraft.y > app.screen.length)){
                spacecraft.direction *= -1; // Reverse direction
            }
        });
    }
}
