# IMGD5010-Assignment6-Automata
In this assignment I wrote code in P5JS to replicate John Conway’s Game of Life. I also modified my code to include a few additions to the known Game of Life.

## My Additions
The classic Game of Life includes a board in which the next state of each cell is determined by how many of its neighbors are "alive". In my version, the board itself is enhanced by allowing each cell on the border to wrap around and have neighbors on the opposite side of the board. This allows for unique sitations to occur, like this instance where the cells on the left and on the right have formed a square that wraps around the x axis of the board:

![image](https://github.com/user-attachments/assets/bc6e823a-5e51-405c-80b6-ff46a880fb0b)

My version also enhances the game of life by adding an age and lifespan to each cell. The amount of iterations that the cell is "alive" consecutively is it's age. If the age reaches the cell's lifespan, it dies in the next iteration (no matter how many alive neighbors it has). The color of the cell also is dependent on the age, getting more red as the cell ages. I also implemented a "chanceOfBirth" and "chanceOfDeath", which determine what percent chance the cells have of being born or of dying when the correct number of alive neighbors are present.

## The Code in Action
You can check out the working version of my code [here](https://editor.p5js.org/mebraen/full/3db2Wp-iW). The code itself is in the file Game-of-Life.js in this repository.
