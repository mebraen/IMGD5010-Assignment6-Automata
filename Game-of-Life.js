//initial cells array and size
let cells = []
let cellSize = 20

function setup() {
  createCanvas(400, 400);
  
  //populate cells
  for(let x = 0; x < width/cellSize; x++) {
    cells[x] = []
    for(let y = 0; y < height/cellSize; y++) {
      
      //determine if cell is on the border
      let left = (x === 0)
      let right = (x === width/cellSize - 1)
      let top = (y === 0)
      let bottom = (y === height/cellSize - 1)
      
      let cell = new Cell(x*cellSize, y*cellSize, x, y, floor(random(2)), 0, left, right, top, bottom, floor(random(85,255/2)))
      
      cells[x][y] = cell
    }
  }
  frameRate(30)
}

function draw() {
  background(220);
  
  //for each cell:
  cells.forEach( col => {
    col.forEach( cell => {
      //draw the cell
      cell.drawCell()
      //calculate the next generation using neighborsSum
      let neighborsSum = cell.getNeighborsSum()
      cell.calculateNextGen(neighborsSum)
      //check the age
      cell.ageCheck()
    })
  })
  
  //set the next generation cells
  nextGeneration()

}

class Cell {
  
  constructor(x, y, arrX, arrY, state, newState, left, right, top, bottom, lifespan) {
    this.x = x
    this.y = y
    this.arrX = arrX
    this.arrY = arrY
    this.state = state
    this.newState = newState
    this.left = left
    this.right = right
    this.top = top
    this.bottom = bottom
    this.lifespan = lifespan
    
    //initialize lifespanCount to be either 0 or 1 depending on state
    let age = state
  }
  
  drawCell() {
    //cell gets more red with age
    if(this.state === 1) {
      fill(this.age*2,0,0)
    }
    else {
      fill(255)
    }
    square(this.x, this.y, cellSize)
  }
  
  getNeighborsSum() {
    
    //corner neighbors
    let topLeft
    let topRight
    let bottomLeft
    let bottomRight
    
    //topleft
    if(this.top && this.left) {
      topLeft = 
          cells[width/cellSize - 1][height/cellSize - 1].state
    }
    else if(this.top) {
      topLeft = 
          cells[this.arrX - 1][height/cellSize - 1].state
    }
    else if(this.left) {
      topLeft = 
          cells[width/cellSize - 1][this.arrY - 1].state
    }
    else {
      topLeft = cells[this.arrX - 1][this.arrY - 1].state
    }
    
    //top
    let top = this.top ? 
        cells[this.arrX][height/cellSize - 1].state : 
        cells[this.arrX][this.arrY - 1].state
    
    //topright
    if(this.top && this.right) {
      topRight = 
          cells[0][height/cellSize - 1].state
    }
    else if(this.top) {
      topRight = 
          cells[this.arrX + 1][height/cellSize - 1].state
    }
    else if(this.right) {
      topRight = 
          cells[0][this.arrY - 1].state
    }
    else {
      topRight = cells[this.arrX + 1][this.arrY - 1].state
    }
    
    //left
    let left = this.left ?
        cells[width/cellSize - 1][this.arrY].state : 
        cells[this.arrX - 1][this.arrY].state
    
    //right
    let right = this.right ?
        cells[0][this.arrY].state : 
        cells[this.arrX + 1][this.arrY].state
    
    //bottomleft
    if(this.bottom && this.left) {
      bottomLeft = 
          cells[width/cellSize - 1][0].state
    }
    else if(this.bottom) {
      bottomLeft = 
          cells[this.arrX - 1][0].state
    }
    else if(this.left) {
      bottomLeft = 
          cells[width/cellSize - 1][this.arrY + 1].state
    }
    else {
      bottomLeft = cells[this.arrX - 1][this.arrY + 1].state
    }
    
    //bottom
    let bottom = this.bottom ? 
        cells[this.arrX][0].state : 
        cells[this.arrX][this.arrY + 1].state
    
    //bottomRight
    if(this.bottom && this.right) {
      bottomRight = 
          cells[0][0].state
    }
    else if(this.bottom) {
      bottomRight = 
          cells[this.arrX + 1][0].state
    }
    else if(this.right) {
      bottomRight = 
          cells[0][this.arrY + 1].state
    }
    else {
      bottomRight = cells[this.arrX + 1][this.arrY + 1].state
    }
    
    //return sum of neighbors
    return topLeft + top + topRight + 
      left + right + 
      bottomLeft + bottom + bottomRight
  }
  
  calculateNextGen(sum) {
    
    //chance of death is higher than chance of birth
    let chanceOfBirth = 0.7
    let chanceOfDeath = 0.8
    
    //death
    if(this.state === 1) {
      if((sum > 3 || sum < 2) && random() < chanceOfDeath) {
        this.newState = 0
      }
      else {
        this.newState = 1
      }
    }
    
    //birth
    if(this.state === 0) {
      if(sum === 3 && random() < chanceOfBirth) {
        this.newState = 1
      }
      else {
        this.newState = 0
      }
    }
  }
  
  ageCheck() {
    //if the new cell state is 0, start age from 0
    if(this.newState === 0) {
      this.age = 0
    }
    
    //if the cell is being born, set age to 1
    if(this.newState === 1 && this.state === 0) {
      this.age = 1
    }
    //otherwise increase the age if cell is still alive
    else if(this.newState === 1) {
      this.age++
    }
    
    //if the age is greater than the cell's lifespan, the cell dies
    if(this.age > this.lifespan) {
      this.newState = 0
    }
  }
  
}

function nextGeneration() {
  //for each cell: set the state for next generation
  cells.forEach( col => {
    col.forEach( cell => {
      cell.state = cell.newState
    })
  })
}
