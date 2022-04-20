button = document.getElementById("work")
button.addEventListener("click", showText)

function showText() {
	newText = document.getElementById("newText")
	newText.innerHTML = "Я работаю"
}



function createFood(){
  original = document.getElementById("food_origin")
  for(var i = 0; i < 120; i++){
    clone = original.cloneNode(true)
    clone.id = 'food' + i;
    clone.style.display = ""
    clone.style.left = 20 + startL + (i % 12) * 40 + "px";
    clone.style.top = startT + 30 + 50*parseInt(i/12) + "px"
    original.parentNode.appendChild(clone)
  }
}


circle = document.getElementById("circle")
l = 150
t = 2400
startL = 50
startT = 2360
circle.style.left = 150 + "px";
circle.style.top = 2400 + "px";

createFood()
document.addEventListener('keydown', (event) => {
    move(event.key)
}, false)


function move(key){
  if (key == "d"){
    console.log("1")
    if(l < 510){
      l += 10
      circle.style.left = l + "px";
      circle.style.transform = "rotate(0deg)";
    }
  }
  if (key == "a"){
    if(l > 60){
      l -= 10
      circle.style.left = l + "px";
      circle.style.transform = "scalex(-1)";
    }
  }
  if (key == "s"){
    if(t < 2830){
      t += 10
      circle.style.top = t + "px";
      circle.style.transform = "rotate(90deg)";
    }
  }
  if (key == "w"){
    if(t > 2380){
      t -= 10
      circle.style.top = t + "px";
      circle.style.transform = "rotate(270deg)";
    }
  }
  eat()
}
function eat(){
  for(var i = 0; i < 120; i++){
    food_crnt = document.getElementById('food' + i)
    //current - нынешний
    if (food_crnt) {
      top_crnt = parseInt(food_crnt.style.top.slice(0, -2))
      left_crnt = parseInt(food_crnt.style.left.slice(0, -2))
      // Pacman 60 840      food 70 860
      if (l < left_crnt && left_crnt - l < 30) {
        if ((t < top_crnt && top_crnt - t < 30) || (t > top_crnt && t - top_crnt < 10)) {
          deleteFood(food_crnt)
        }
      }
      if (l > left_crnt && l - left_crnt < 10) {
        if ((t < top_crnt && top_crnt - t < 30) || (t > top_crnt && t - top_crnt < 10)) {
          deleteFood(food_crnt)
        }
      }
    }
  }
}
function deleteFood(food_crnt) {
  food_crnt.remove()
  score = document.getElementById('score')
  scoreNum = parseInt(score.innerHTML)
  scoreNum += 1
  score.innerHTML = scoreNum
}