const div = document.getElementById("visualiserMain");

async function initJSON(){
    const response = await fetch('js/json/l2d.json');
    const json = await response.json()
    json.sort(function(a, b){
        return a.id.localeCompare(b.id);
        
    })
    json.map((val)=>{
      if (val.available === "no" ) return false
      const liste_item = document.createElement("li");
      
      liste_item.innerHTML = "<img src='images/sprite/si_"+val.id+"_00_s.png'/>" + " " + val.name
      
      liste_item.classList.add("charDiv")
      
      liste_item.addEventListener("click", (e)=>{
         changeSpine(val.id)
      })
      div.appendChild(liste_item) //div character list
    })

}

initJSON()

let currentspine = "";

const changeSpine = (id) => {

      // empties the div to clear the current spine
      // every listeners MUST be in changeSpine because
      // there are any spine currently, so the listened divs
      // doesn't exist, thus will break the code and nothing will really work
      
      

      document.querySelector("#player-container").innerHTML = " "

      currentspine = new spine.SpinePlayer("player-container", {
      skelUrl: "/l2d/"+id+"/"+id+"_00.skel",
      atlasUrl: "/l2d/"+id+"/"+id+"_00.atlas",
      animation: "idle",
      skin: "00",
      backgroundColor: "#00000000",
      alpha: true,
      debug: false,
      });

      document.querySelector(".spine-player-canvas").width = document.querySelector(".spine-player-canvas").height

      
      
      document.querySelector(".spine-player-canvas").style.width = null
      
      document.querySelector(".spine-player-canvas").style.display = "inline"
      
      
      
}

let move = false
let oldx = "";
let oldy = "";

document.addEventListener("wheel", (e) => {
       
      if (e.target !== document.querySelector("#background-div") &&
          e.target !== document.querySelector(".spine-player-canvas")){
                return false
          }
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
