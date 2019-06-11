# nycAdventure
* Background and Overview
    * On the way to work in NYC, I evade dolops of sidewalk dog poop, but sometimes in a rush, I mistakenly squash a pile. 
    * Get to work on time without stepping on dog poop on a nyc sidewalk.
* Functionality and MVP Features
    * The board consists of a NYC sidewalk, cluttered with dog poop, and a user (you) avoiding the dog poop to get to work.
    * The page consists of the board as described above, a play button, levels 1, 2, and 3 buttons, and links to Github and LinkedIn.
    * The game has three levels, each level getting progressively more difficult because of a faster pace to get to work.
    * Pressing play starts the game, defaulting to level 1 (if no level, selected).
    * Users press the spacebar to jump over poop.
    * The game ends if the user steps on poop.
    * Users win a level if they get to work without stepping on poop.

* Architecture and Technologies
    * JavaScript for game logic
    * HTML5 logic for rendering
    * Webpack to bundle various scripts into a single source
      
Implementation Timeline
    * Day 1
        * Finish project proposal
    * Day 2
        * Complete basic page skeleton
        * Complete board design and rendering
    * Day 3
        * Complete obstacle (poop) rendering and functionality
        * Complete obstacle collision (stepping on poop)
    * Day 4
        * Complete game over condition
        * Complete game win condition
    * Day 5
        * Finish styling page
        * Complete any outstanding MVPs