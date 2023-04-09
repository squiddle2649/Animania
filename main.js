

let zzz = 0
scenesNumber = scenesList.children.length
colorChange = false
canvasContainer = document.querySelector('#canvasContainer')
canvas = document.querySelector('#canvas0')
canvases = [canvas]
realCanvasId = 'canvas0'
cloneDiv()
currentScene =  scenesList.children[scenesNumber-1].children[0]
backgroundToShape()
list = []
shapeTimelines = []
shapeClicked = false
elements = document.getElementsByClassName("shape");
canvas.style.zIndex = zzz

backgroundStyle = document.querySelector('#backgroundStyle')
shapeStyle = document.querySelector('#styleMenu')
let rectangleMode;let circleMode;let pencilMode;


document.getElementById(realCanvasId).addEventListener('mousedown',function(){
  if(shapeClicked == false && document.getElementsByClassName("dot-left-bottom").length >0){
      document.getElementsByClassName("dot-left-bottom")[0].remove();
      document.getElementsByClassName("rotate-link")[0].remove();
      document.getElementsByClassName("dot-rotate")[0].remove();  
      backgroundToShape()    
  }
})

activateRectangle = () =>{
  rectangleMode = true
}
activateCircle = () =>{
  circleMode = true
}
const canvasTop = canvas.getBoundingClientRect().top;
const canvasLeft = canvas.getBoundingClientRect().left;
let creating;let resizingBox; let myright; let myleft;
let originalY; let originalX; let midPoint; 
let handlingResize;var myScenes;
var startX, startY;

document.querySelector(`#${realCanvasId}`).addEventListener("mousedown", startDrawing);
document.querySelector(`#${realCanvasId}`).addEventListener("mousemove", drawRectangle);
document.querySelector(`#${realCanvasId}`).addEventListener("mouseup", stopDrawing);

function startDrawing(event) {
  if(!shapeClicked && (rectangleMode || circleMode)){
  creating = true
  box = document.createElement("div");
  box.classList.add("shape");
  
  if(circleMode) box.classList.add("circle");
  document.querySelector(`#${realCanvasId}`).appendChild(box);
  startX = event.clientX- canvas.getBoundingClientRect().left;
  startY = event.clientY-canvas.getBoundingClientRect().top;
  box.style.left = startX;
  box.style.top = startY;
}
}
function drawRectangle(event) {
  if (creating) {
    if(rectangleMode){
      var currentX = event.clientX-canvas.getBoundingClientRect().left;
      var currentY = event.clientY-canvas.getBoundingClientRect().top;
      var width = currentX - startX;
      var height = currentY - startY;
      box.style.width = Math.abs(width) + "px";
      box.style.height = Math.abs(height) + "px";
      box.style.left = width < 0 ? currentX + "px" : startX + "px";
      box.style.top = height < 0 ? currentY + "px" : startY + "px";}
    if(circleMode){
      var currentX = event.clientX-canvas.getBoundingClientRect().left;
      var currentY = event.clientY-canvas.getBoundingClientRect().top;
      var width = currentX - startX;
      box.style.width = Math.abs(width) + "px";
      box.style.height = Math.abs(width) + "px";
    }
    
  }

}
function stopDrawing(event) {
  if(creating){
    creating = false;
  startX = null;
  startY = null;
  rectangleMode = false
  circleMode = false;
  actualLeft = box.offsetLeft
  actualTop = box.offsetTop
  properLeft = box.offsetLeft + box.offsetWidth
  properTop = box.offsetTop +box.offsetHeight

  boxWrapper = document.createElement('div')
  document.querySelector(`#${realCanvasId}`).appendChild(boxWrapper);
  boxWrapper.classList.add("box-wrapper");
  boxWrapper.appendChild(box)
  boxWrapper.style.left = properLeft + "px"
  boxWrapper.style.top = properTop + "px"
  box.style.transform = "translate(-50%,-50%)"
  box.style.left =0
  box.style.top =0
  if(box.offsetWidth < 20 && box.offsetWidth < 20){
    box.style.height = "20px"
    box.style.width= "20px"
  }
  
  addRectangle()}
}
function addRectangle() {
    repositionElement(actualLeft+box.offsetWidth/2, actualTop+box.offsetHeight/2)

  for (i = 0; i < elements.length; i++) {
    children = elements[i].children;
    for (j = 0; j < children.length; j++) {
      document.getElementsByClassName("dot-left-bottom")[0].remove();
      document.getElementsByClassName("rotate-link")[0].remove();
      document.getElementsByClassName("dot-rotate")[0].remove();
      backgroundToShape()
    }
  } // rmeove handles from the other ones


  box.addEventListener('mouseover',function(){
    shapeClicked = true //check if mouse is over box
    
  })
  box.addEventListener('mouseout',function(){
    shapeClicked = false //check if mouse is over box

  })

  box.id = elements.length.toString();
  
  rotateDot = document.createElement("div");
  rotateDot.classList.add("dot-rotate");
  box.appendChild(rotateDot);

  rotateLink = document.createElement("div");
  rotateLink.classList.add("rotate-link");
  box.appendChild(rotateLink);
  
  leftBottom = document.createElement("div");
  leftBottom.classList.add("dot-left-bottom");
  box.appendChild(leftBottom);
  backgroundToShape()

  
  addShapeTimeline(box.id, currentScene.id)

  for (i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mousedown", function () {
      for (j = 0; j < elements.length; j++) {
        children = elements[j].children;
        for (k = 0; k < children.length; k++) {
          document.getElementsByClassName("dot-left-bottom")[0].remove();
          document.getElementsByClassName("rotate-link")[0].remove();
          document.getElementsByClassName("dot-rotate")[0].remove();
        }
      }

      box = this
      boxWrapper = this.parentElement;
      
      
      rotateDot = document.createElement("div");
      rotateDot.classList.add("dot-rotate");
      box.appendChild(rotateDot);

      rotateLink = document.createElement("div");
      rotateLink.classList.add("rotate-link");
      box.appendChild(rotateLink);

      leftBottom = document.createElement("div");
      leftBottom.classList.add("dot-left-bottom");
      box.appendChild(leftBottom);
      backgroundToShape()


      boxWrapper.addEventListener(
        "mousedown",
        function (event) {
          if (event.target.className.indexOf("dot") > -1) {
            return;
          }
          for(i = 0;i<shapeTimelines.length;i++){
            if(box == shapeTimelines[i].shape){
              shapeTimelines[i].timeline.style.opacity =''
              shapeTimelines[i].timeline.style.zIndex ='1'

            }
            else{
              shapeTimelines[i].timeline.style.opacity ='0%'
              shapeTimelines[i].timeline.style.zIndex ='-1'
            }
          }

          initX = this.offsetLeft;
          initY = this.offsetTop;
          mousePressX = event.clientX;
          mousePressY = event.clientY;
    
          function eventMoveHandler(event) {
            // the divs are colliding
            repositionElement(
              initX + (event.clientX - mousePressX),
              initY + (event.clientY - mousePressY)
            );
          }
    
          // boxWrapper.addEventListener("mousemove", eventMoveHandler, false);
          window.addEventListener("mousemove", eventMoveHandler, false);
          window.addEventListener(
            "mouseup",
            function eventEndHandler() {
              // boxWrapper.removeEventListener("mousemove", eventMoveHandler, false);
              handlingResize = false;
              window.removeEventListener("mousemove", eventMoveHandler, false);
              window.removeEventListener("mouseup", eventEndHandler);
            },
            false
          );
        },
        false
      );
      rotateDot.addEventListener(
        "mousedown",
        function (event) {
          // if (event.target.className.indexOf("dot") > -1) {
          //     return;
          // }

          initX = this.offsetLeft;
          initY = this.offsetTop;
          mousePressX = event.clientX;
          mousePressY = event.clientY;

          var arrow = box;
          var arrowRects = box.getBoundingClientRect();
          var arrowX = arrowRects.left + arrowRects.width / 2;
          var arrowY = arrowRects.top + arrowRects.height / 2;

          function eventMoveHandler(event) {
            var angle =
              Math.atan2(event.clientY - arrowY, event.clientX - arrowX) +
              Math.PI / 2;
            rotateBox((angle * 180) / Math.PI);
          }

          window.addEventListener("mousemove", eventMoveHandler, false);

          window.addEventListener(
            "mouseup",
            function eventEndHandler() {
              handlingResize = false;
              window.removeEventListener("mousemove", eventMoveHandler, false);
              window.removeEventListener("mouseup", eventEndHandler);
            },
            false
          );
        },
        false
      );
      leftBottom.addEventListener("mousedown", (e) =>  {
      handlingResize = true;
        resizeHandler(e, true, false, true, true) 

     });
    }
    );
  }

  boxWrapper.addEventListener(
    "mousedown",
    function (event) {
      if (event.target.className.indexOf("dot") > -1) {
        return;
      }

      initX = this.offsetLeft;
      initY = this.offsetTop;
      mousePressX = event.clientX;
      mousePressY = event.clientY;

      function eventMoveHandler(event) {
        // the divs are colliding
        repositionElement(
          initX + (event.clientX - mousePressX),
          initY + (event.clientY - mousePressY)
        );
      }


      window.addEventListener("mousemove", eventMoveHandler, false);
      window.addEventListener(
        "mouseup",
        function eventEndHandler() {
          handlingResize = false;
          window.removeEventListener("mousemove", eventMoveHandler, false);
          window.removeEventListener("mouseup", eventEndHandler);
        },
        false
      );
    },
    false
  );
  rotateDot.addEventListener(
    "mousedown",
    function (event) {
      // if (event.target.className.indexOf("dot") > -1) {
      //     return;
      // }

      initX = this.offsetLeft;
      initY = this.offsetTop;
      mousePressX = event.clientX;
      mousePressY = event.clientY;

      var arrow = box;
      var arrowRects = arrow.getBoundingClientRect();
      var arrowX = arrowRects.left + arrowRects.width / 2;
      var arrowY = arrowRects.top + arrowRects.height / 2;

      function eventMoveHandler(event) {
        var angle =
          Math.atan2(event.clientY - arrowY, event.clientX - arrowX) +
          Math.PI / 2;
        rotateBox((angle * 180) / Math.PI);
      }

      window.addEventListener("mousemove", eventMoveHandler, false);

      window.addEventListener(
        "mouseup",
        function eventEndHandler() {
          window.removeEventListener("mousemove", eventMoveHandler, false);
          window.removeEventListener("mouseup", eventEndHandler);
        },
        false
      );
    },
    false
  );
  leftBottom.addEventListener("mousedown", function(e){
    handlingResize = true;
    resizeHandler(e, true, false, true, true)
  } );
  
  
}
const minWidth = 5;
const minHeight = 5;

var initX, initY, mousePressX, mousePressY, initW, initH, initRotate;

let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

function repositionElement(x, y) {
  boxWrapper.style.left = x + "px";
  boxWrapper.style.top = y + "px";
  cloneDiv()

  
}
function resize(w, h) {
  if(!handlingResize) return
  box.style.width = w + "px";
  box.style.height = h + "px";
  

}
function getCurrentRotation(el) {
  var st = window.getComputedStyle(el, null);
  var tm =
    st.getPropertyValue("-webkit-transform") ||
    st.getPropertyValue("-moz-transform") ||
    st.getPropertyValue("-ms-transform") ||
    st.getPropertyValue("-o-transform") ||
    st.getPropertyValue("transform");
  ("none");
  if (tm != "none") {
    var values = tm.split("(")[1].split(")")[0].split(",");
    var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
    return angle < 0 ? angle + 360 : angle;
  }
  return 0;
}
function rotateBox(deg) {
  cloneDiv() 
  boxWrapper.style.transform = `rotate(${deg}deg)`;
  // cloneDiv() 
}
function sliderHandler(input) {
  if (input.id == "borderColorPicker") {
    box.style.borderColor = input.value;
    
  }
  if (input.id == "backgroundColorPicker") {
    box.style.backgroundColor = input.value;
  }
  
}
function canvasHandler(input){
  if (input.id == "backgroundColorAdjustment") {
    canvas.style.backgroundColor = input.value;

    colorChange = true
  }

}
function timesPx(value, factor){
  const numericValue = parseInt(value); // extract numeric value
  const dividedValue = numericValue * factor;
  const result = dividedValue + "px";
  return result;
}
function resizeHandler(
  event,
  left = false, //true
  top = false,
  xResize = false,//true
  yResize = false//true
) {

  initX = boxWrapper.offsetLeft;
  initY = boxWrapper.offsetTop;

  mousePressX = event.clientX;
  mousePressY = event.clientY;

  initW = box.offsetWidth;
  initH = box.offsetHeight;

  initRotate = getCurrentRotation(boxWrapper);
  var initRadians = (initRotate * Math.PI) / 180;
  var cosFraction = Math.cos(initRadians);
  var sinFraction = Math.sin(initRadians);
  function eventMoveHandler(event) {
    var wDiff = event.clientX - mousePressX;
    var hDiff = event.clientY - mousePressY;
    var rotatedWDiff = cosFraction * wDiff + sinFraction * hDiff;
    var rotatedHDiff = cosFraction * hDiff - sinFraction * wDiff;

    var newW = initW,
      newH = initH,
      newX = initX,
      newY = initY;

    if (xResize) {
      if (left) {
        newW = initW - rotatedWDiff;
        if (newW < minWidth) {
          newW = minWidth;
          rotatedWDiff = initW - minWidth;
        }
      }
      newX += 0.5 * rotatedWDiff * cosFraction;
      newY += 0.5 * rotatedWDiff * sinFraction;
    }

    if (yResize) {
      if (top) {
        newH = initH - rotatedHDiff;
        if (newH < minHeight) {
          newH = minHeight;
          rotatedHDiff = initH - minHeight;
        }
      } 
      else {
        newH = initH + rotatedHDiff;
        if (newH < minHeight) {
          newH = minHeight;
          rotatedHDiff = minHeight - initH;
        }
      }
      
      newX -= 0.5 * rotatedHDiff * sinFraction;
      newY += 0.5 * rotatedHDiff * cosFraction;
    }
    resize(newW, newH);
    repositionElement(newX, newY); 
  }
window.addEventListener("mousemove", eventMoveHandler,false);//getaddEventListener("mousemove", eventMoveHandler,false)
  window.addEventListener(
    "mouseup",
    function eventEndHandler() {
      window.removeEventListener("mousemove", eventMoveHandler, false);
      window.removeEventListener("mouseup", eventEndHandler);
      handlingResize = false;
    },
    false
  );
}
function deleteDiv() {
  box.parentElement.remove();
  backgroundToShape( document.querySelector("#styleMenuContainer"),document.querySelector("#backgroundStyleContainer") )
  cloneDiv()
  for(i=0;i<shapeTimelines.length;i++){
    if(shapeTimelines[i].shape==box){
      shapeTimelines[i].timeline.remove()
      shapeTimelines[i] = 1
      shapeTimelines.splice(i,1)
    }

  }
  shapeTimelines[0].timeline.style.opacity = '100%'
  shapeTimelines[0].timeline.style.zIndex = '1'
}
function backgroundToShape(hide=null,show=null){
  if(hide ==null)
  {if(document.querySelectorAll('.dot-rotate').length > 0 ){
    hide = document.querySelector("#backgroundStyleContainer")
    show = document.querySelector("#styleMenuContainer")
  }
  else{
    show = document.querySelector("#backgroundStyleContainer")
    hide = document.querySelector("#styleMenuContainer")
  }}
  hide.style.visibility = "hidden"
  show.style.visibility = ""
}
function cloneDiv() {

  originalCanvas = document.getElementById(realCanvasId);
  scenesList = document.querySelector("#scenesList");
  scenes = scenesList.children
  sceneContainer = document.getElementById('scene'+ realCanvasId.substring(6))
  // if(scenes.length>1) sceneContainer = newClonedScene
  var clonedCanvas = originalCanvas.cloneNode(true);
  clonedCanvas.style.width = originalCanvas.offsetWidth
  clonedCanvas.style.height = originalCanvas.offsetHeight

  scenesList.style.transform = "scale(10%)"

  if(scenes.length !=1){
    sceneContainer.style.top = timesPx("400px",realCanvasId.substring(6))+900;
  }
  else{sceneContainer.style.top = "500px";} //I don't know why I did this but I guess it works.
  
  
  if(colorChange == true){
    clonedCanvas.style.backgroundColor= document.querySelector("#backgroundColorAdjustment").value
  }
  else{
    clonedCanvas.style.backgroundColor = 'white'
  }
  
  clonedCanvas.style.border = '18px solid blue'
  


  
  if(sceneContainer.children[0] != undefined){
    sceneContainer.children[0].remove()
  }
  
  sceneContainer.appendChild(clonedCanvas);

  if(document.getElementsByClassName('dot-rotate')[1] != undefined){
    document.getElementsByClassName('dot-rotate')[1].remove()
    document.getElementsByClassName('dot-left-bottom')[1].remove()
    document.getElementsByClassName('rotate-link')[1].remove()

  }

  myScenes = document.getElementById('scenesList').children
  for(i = 0;i<myScenes.length;i++){
    myScenes[i].children[0].addEventListener('mousedown',function(){
      changeScene(this)
    } )
  }
} 
function addScene(){ 
  myScenes = document.getElementById("scenesList").children

  newCanvas = document.getElementById(realCanvasId).cloneNode()
  canvases.push(newCanvas)
  newCanvas.id = `canvas${canvases.length-1}`
  realCanvasId=newCanvas.id

  newClonedScene = document.querySelector('.clonedScene').cloneNode()
  let newClonedCanvas = document.querySelector('.clonedScene').children[0].cloneNode()
  newClonedCanvas.id = realCanvasId
  document.querySelector("#scenesList").appendChild(newClonedScene)
  newClonedScene.appendChild(newClonedCanvas)
  newClonedCanvas.addEventListener('mousedown',function(){
    changeScene(this)
  } )

  changeScene(newClonedCanvas)

  newClonedScene.id =  'scene'+ realCanvasId.substring(6)
  document.querySelector('#canvasContainer').appendChild(newCanvas)
  newClonedScene.style.top = `${(canvases.length)*900-400}px`
  

  document.querySelector(`#${realCanvasId}`).addEventListener("mousedown", startDrawing);
  document.querySelector(`#${realCanvasId}`).addEventListener("mousemove", drawRectangle);
  document.querySelector(`#${realCanvasId}`).addEventListener("mouseup", stopDrawing);
  document.getElementById(realCanvasId).addEventListener('click',function(){
    if(shapeClicked == false){
        document.getElementsByClassName("dot-left-bottom")[0].remove();
        document.getElementsByClassName("rotate-link")[0].remove();
        document.getElementsByClassName("dot-rotate")[0].remove();  
        backgroundToShape()    
  
  }})  
  

  
  
}
let zxx = 1
let theCanvas
function changeCanvas(canvasId){
  
  //   if(canvases[i].id == realCanvas.id){
    //     canvases[i].style.zIndex = 1
    //   }
  //   else{
      
    //     canvases[i].style.zIndex = 0
      
  //   }
  
  // }


  zxx+=1
  canvases[canvasId].style.zIndex = zxx

// console.log(canvases[1].id == canvasId)

}


changeScene = (el)=>{

  for(i = 0;i<myScenes.length;i++){
    if(myScenes[i].children[0] == el){
      myScenes[i].children[0].style.borderColor = "blue"
      myId = myScenes[i].children[0].id
      changeCanvas(i)
      realCanvasId = myId
    }
    else{
      myScenes[i].children[0].style.borderColor = "white"
    }
  }


}

class shapeTimeline {
    constructor(canvasID, shapeID) {
      this.canvas = document.getElementById(canvasID);
      this.shape = document.getElementById(shapeID);
      this.timeline = document.createElement('div')
      this.timeline.classList.add('shapeTimeline')  
      document.querySelector("#shapeTimelineContainer").appendChild(this.timeline)
      let myClass = this;
      let myTimeline = this.timeline;

      const rightHandle = document.createElement('div')
      this.timeline.appendChild(rightHandle)
      rightHandle.classList.add('rightHandle')
      
      const leftHandle = document.createElement('div')
      this.timeline.appendChild(leftHandle)
      leftHandle.classList.add('leftHandle')

      
      let resizing; let startX; let side;; let differenzX;let startLeft;let startRight;let startWidth;
      let newWidth; let newLeft; let endX;let newRight;
      // leftHandle.addEventListener("mousedown", (e) => {
      //    resizing = true;
      //   startX = e.clientX;
      // });
      rightHandle.addEventListener("mousedown", (e) => {
        // this.timeline.style.right = findSide("right",timeline,this.timeline)
        resizing = true;
        startX = e.clientX;
        startWidth = this.timeline.offsetWidth
        startRight = parseInt(getComputedStyle(this.timeline).right, 10);
        side = 'right'

      });
      leftHandle.addEventListener("mousedown", (e) => {
        // this.timeline.style.left = findSide("left",timeline,this.timeline)
        resizing = true;
        startX = e.clientX;
        startWidth = this.timeline.offsetWidth
        startLeft = parseInt(getComputedStyle(this.timeline).left, 10);
        side = "left"
      });
      

      window.addEventListener("mousemove", (e) => {
        if (resizing) {
          if(side =="right"){
            endX = e.clientX;
            differenzX = startX - endX;
            newWidth = startWidth - differenzX;
             newLeft = startLeft + differenzX;
            this.timeline.style.width = newWidth + "px";
            this.timeline.style.right = newRight + "px";
            myClass.hideShow()
          }
          if(side =="left"){
            endX = e.clientX;
            differenzX = endX - startX;
          newWidth = startWidth - differenzX;
           newLeft = startLeft + differenzX;
           this.timeline.style.width = newWidth + "px";
           this.timeline.style.left = newLeft + "px";
           myClass.hideShow()
          }
        }
      });
      window.addEventListener("mouseup", () => {
        resizing = false;
      });




      //start of mess
      let resizingTimeline;let lastX;let lastLeft;let el; let differenceX; let amount
      
      this.timeline.addEventListener('mousedown',function(event){

        resizingTimeline = true
        lastX = event.clientX
        lastLeft = circle.offsetLeft
        el = this

      })
      window.addEventListener("mousemove", function (event) {
        
        if(resizingTimeline && !resizing){

        colidingLeft = el.getBoundingClientRect().left <= timeline.getBoundingClientRect().left+2
        colidingRight = el.getBoundingClientRect().right >= timeline.getBoundingClientRect().right
        differenceX = lastX - event.clientX
        amount = el.offsetLeft - differenceX
        if(event.clientX > lastX && colidingRight){
  
          return                
        }
        if(event.clientX < lastX && colidingLeft){
  
          return                
        }
        el.style.left = amount


        myClass.hideShow()
        if(elements.length >0){
        }
        
        lastX = event.clientX
  
      }
      });      
      window.addEventListener("mouseup", function (event) {
        resizingTimeline = false;
        
      });
      //end of mess
    }
    hideShow(){
      var overlap = areElementsTouching(this.timeline, line)
      if(overlap){
         this.shape.parentElement.style.display = ""
    
        cloneDiv()
      }
      else{
        this.shape.parentElement.style.display = 'none'
    
        cloneDiv()
      }

    }
    
  }

// timelineLine = document.querySelector('.timelineLine')
circle = document.getElementById("wholeCursor");
cursor = document.getElementById('timelineCursor')
const timeline = document.getElementById("timeline0");
line = document.querySelector('#timelineLine')
let isDragging;

    cursor.addEventListener("mousedown", function (event) {
      
      isDragging = true;
      prevX = event.clientX
      prevLeft = circle.offsetLeft
    
    });

    window.addEventListener("mousemove", function (event) {
      colidingLeft = circle.getBoundingClientRect().left <= timeline.getBoundingClientRect().left+2
      colidingRight = circle.getBoundingClientRect().right >= timeline.getBoundingClientRect().right
      if(isDragging){
      differenceX = prevX - event.clientX
      amount = circle.offsetLeft - differenceX
      if(event.clientX > prevX && colidingRight){

        return                
      }
      if(event.clientX < prevX && colidingLeft){

        return                
      }
      circle.style.left = amount
      if(elements.length >0){
        for(i = 0;i<shapeTimelines.length;i++){
          shapeTimelines[i].hideShow()
        }

      }
      
      prevX = event.clientX

    }
    });
    
    window.addEventListener("mouseup", function (event) {
      isDragging = false;
      
    });

function addShapeTimeline(shape_id,currentScene_id){
  newShapeTimeline = new shapeTimeline(currentScene_id, shape_id)
  if(shapeTimelines.length>0){for(i =0;i<shapeTimelines.length;i++){
    shapeTimelines[i].timeline.style.opacity = "00%"
    shapeTimelines[i].timeline.style.zIndex= "-1"
  }}
  shapeTimelines.push(newShapeTimeline)


}


function areElementsTouching(elem1, elem2) {
  // Get the bounding rectangles for the two elements
  var elem1Rect = elem1.getBoundingClientRect();
  var elem2Rect = elem2.getBoundingClientRect();

  // Check if the two rectangles overlap
  var overlap = !(
    elem1Rect.right < elem2Rect.left ||
    elem1Rect.left > elem2Rect.right ||
    elem1Rect.bottom < elem2Rect.top ||
    elem1Rect.top > elem2Rect.bottom
  );

  // Return true if there is an overlap, false otherwise
  return overlap;
}

circle.style.left = circle.offsetLeft+1

moveCursor = () =>{
  circle.style.left = circle.offsetLeft +1+"px"
  
  for(i = 0;i<shapeTimelines.length;i++){
    shapeTimelines[i].hideShow()

  }
}

findSide = (side,parent=timeline,child) =>{
  if(side=="right"){
    return parent.getBoundingClientRect().right - child.getBoundingClientRect().right +'px'
  }
  else{
    return  child.getBoundingClientRect().left - parent.getBoundingClientRect().left +'px'
  }
}

function play(){
  if(document.getElementsByClassName("dot-left-bottom").length>0){document.getElementsByClassName("dot-left-bottom")[0].remove();
  document.getElementsByClassName("rotate-link")[0].remove();
  document.getElementsByClassName("dot-rotate")[0].remove();  }
  difference = timeline.getBoundingClientRect().right - circle.getBoundingClientRect().right
  isDone = circle.getBoundingClientRect().right >= timeline.getBoundingClientRect().right
  for(i =0;i<difference;i++){

    setTimeout(() =>  moveCursor(), i*(difference/(1047/8))) 
    
  }
}

addEventListener('resize',function(){
  cloneDiv()
})

function checkHideShow(){
  console.log(shapeTimelines)
}