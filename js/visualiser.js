const nb = "c240"
let spinee = new spine.SpinePlayer("player-container", {
      skelUrl: "/l2d/"+nb+"/"+nb+"_00.skel",
      atlasUrl: "/l2d/"+nb+"/"+nb+"_00.atlas",
      animation: "idle",
      skin: "00",
      backgroundColor: "#00000000",
      alpha: true,
      debug: false,
});

document.querySelector(".spine-player-canvas").width = document.querySelector(".spine-player-canvas").height

 document.addEventListener("wheel", (e) => {
       
      
       canvas = document.querySelector("#player-container")
       height = canvas.style.height.replaceAll("vh","")
   
       switch(e.deltaY>0){
             case true:   
             if (parseInt(canvas.style.height.replaceAll("vh",""))<=20) return false 
             canvas.style.height = parseInt(height) - 5 +"vh" ;
             break;
             case false:  
             if (parseInt(canvas.style.height.replaceAll("vh",""))>=500) return false 
             canvas.style.height = parseInt(height) + 5 +"vh"     ;
             break;
       }
 })
document.querySelector(".zoomin").addEventListener("click", () => {
      let canvas = document.querySelector("#player-container")
      let height = document.querySelector("#player-container").style.height.replaceAll("vh", "")
      canvas.style.height = parseInt(height) + 25 + "vh";
      
})
document.querySelector(".zoomout").addEventListener("click", () => {
      let canvas = document.querySelector("#player-container")
      let height = document.querySelector("#player-container").style.height.replaceAll("vh", "")
      canvas.style.height = parseInt(height) - 25 + "vh";
      
})

document.querySelector(".spine-player-canvas").style.width = null

document.querySelector(".spine-player-canvas").style.display = "inline"

let move = false
let oldx = "";
let oldy = "";

document.addEventListener("mousedown", (e) => {
      if (e.target !== document.querySelector("#background-div") &&
          e.target !== document.querySelector(".spine-player-canvas")){
                return false
          }
      move = true
      oldx = e.clientX;
      oldy = e.clientY;
})
document.addEventListener("mouseup", (e) => {
      oldx = ""
      oldy = ""
      move = false
})

let firstmove = false
document.addEventListener("mousemove", (e) => {
      if (move) {
            
            let newx = e.clientX
            let newy = e.clientY
            let stylel;

            stylel = document.querySelector("#player-container").style.left.replaceAll("px", "")

            let stylet = document.querySelector("#player-container").style.top.replaceAll("px", "")
            if (newx > oldx) {
                  document.querySelector("#player-container").style.left = (parseInt(stylel) + (newx - oldx)) + "px"
            }
            if (newx < oldx) {
                  document.querySelector("#player-container").style.left = (parseInt(stylel) + (newx - oldx)) + "px"
            }
            if (newy < oldy) {
                  document.querySelector("#player-container").style.top = (parseInt(stylet) + (newy - oldy)) + "px"
            }
            if (newy > oldy) {
                  document.querySelector("#player-container").style.top = (parseInt(stylet) + (newy - oldy)) + "px"
            }
            oldx = newx
            oldy = newy
      }
}
)
