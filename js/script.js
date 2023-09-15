const canvas = document.querySelector(".canvas");
const contxt = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
console.log(rows);
const columns = canvas.width / scale;

var snake = [];
snake[0]={
    x:Math.floor(Math.random()*scale)*columns,
    y:Math.floor(Math.random()*scale)*columns
}
food={
    x:Math.floor(Math.random()*scale)*columns,
    y:Math.floor(Math.random()*scale)*columns
}
var dir = "right";
document.onkeydown = direction;
function direction(event){
    let key = event.keyCode;
    if( key == 37 && dir != "right"){
        dir = "left";
    }else if(key == 38 && dir != "down"){
        dir = "up";
    }else if(key == 39 && dir != "left"){
        dir = "right";
    }else if(key == 40 && dir != "up"){
        dir = "down";
    }
  }

var play = setInterval(draw, 100);
function draw() {
    contxt.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.length; i++){
    contxt.fillStyle = "white";
    contxt.strokeStyle = "red";
    contxt.fillRect(snake[i].x, snake[i].y, scale, scale);
        contxt.strokeRect(snake[i].x, snake[i].y, scale, scale);
    }
    contxt.fillStyle = "yellow";
        contxt.strokeStyle = "red";
        contxt.fillRect(food.x, food.y, scale, scale);
            contxt.strokeRect(food.x, food.y, scale, scale);  

   
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
    if (dir == "right") snakeX += scale;
    if (dir == "left") snakeX -= scale;
    if (dir == "down") snakeY += scale;
    if (dir == "up") snakeY -= scale;

    if (snakeX > canvas.width) {
        snakeX = 0;
    }
    if (snakeX < 0) {
        snakeX = canvas.width;
    }
    if (snakeY > canvas.height) {
        snakeY = 0;
    }
    if (snakeY < 0) {
        snakeY =canvas.height;
    }

    if(snakeX == food.x && snakeY == food.y){
       food = {
          x : (Math.floor(Math.random() * columns)) * scale,
          y : (Math.floor(Math.random() * rows)) * scale
      } 
    } else {
        snake.pop();  
    }
    
    var newHead = {
        x:snakeX,
        y:snakeY
    }
    if(eatSelf(newHead,snake)){
        clearInterval(play);
        alert("you failed");
    }
    snake.unshift(newHead);
}
function eatSelf(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
  }

