const div = document.getElementById("visualiserMain");

async function initJSON(){
    const response = await fetch('js/json/l2d.json');
    const json = await response.json()
    json.sort(function(a, b){
        return a.name.localeCompare(b.name);
        
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
let currentid = ""
let current_color= ""

const changeSpine = (id) => {

      // empties the div to clear the current spine
      // every listeners MUST be in changeSpine because
      // there are any spine currently, so the listened divs
      // doesn't exist, thus will break the code and nothing will really work

      document.querySelector("#player-container").innerHTML = " "

      currentid = id
      currentspine = new spine.SpinePlayer("player-container", {
      skelUrl: "/l2d/"+id+"/"+id+"_00.skel",
      atlasUrl: "/l2d/"+id+"/"+id+"_00.atlas",
      animation: "idle",
      skin: "00",
      backgroundColor: current_color,
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
})

let rgbPanelVisible=document.querySelector("#colorChangePanel").hidden

document.querySelector("#l2dbgcolorchanger button").addEventListener("click",(e)=>{
      if (rgbPanelVisible){
            document.querySelector("#colorChangePanel").hidden = false
      }else{
            document.querySelector("#colorChangePanel").hidden = true
      }
      rgbPanelVisible = document.querySelector("#colorChangePanel").hidden
})

let r = parseInt(document.querySelector("#customRangeRed").value)
let g = parseInt(document.querySelector("#customRangeGreen").value)
let b = parseInt(document.querySelector("#customRangeBlue").value)


const rgb2hex = (v) => {
      let val = v.toString(16);
      return val.length == 1 ? "0" + val : val 
}

let hex = "#"+rgb2hex(r)+rgb2hex(g)+rgb2hex(b)

const updateHex = () => {
      localhex = rgb2hex(r)+rgb2hex(g)+rgb2hex(b)
      document.querySelector("#inputhex").value = localhex
}

const updateRgb = () => {
      console.log("test")
      document.querySelector("#customRangeRed").value = r
      document.querySelector("#labelred").innerHTML = "Red - " + document.querySelector("#customRangeRed").value
      document.querySelector("#customRangeGreen").value = g
      document.querySelector("#labelgreen").innerHTML = "Green - " + document.querySelector("#customRangeGreen").value
      document.querySelector("#customRangeBlue").value = b 
      document.querySelector("#labelblue").innerHTML = "Blue - " + document.querySelector("#customRangeBlue").value
}

updateHex()

const setColorPreview = (r,g,b)=> {
      document.querySelector(".progress-rgb").style.backgroundColor = `rgb(${r},${g},${b})`
}

document.querySelector("#customRangeRed").addEventListener("input",(e)=>{
      document.querySelector("#labelred").innerHTML = "Red - " + document.querySelector("#customRangeRed").value
      r = parseInt(document.querySelector("#customRangeRed").value)
      setColorPreview(r,g,b)
      updateHex()
})
document.querySelector("#customRangeGreen").addEventListener("input",(e)=>{
      document.querySelector("#labelgreen").innerHTML = "Green - " + document.querySelector("#customRangeGreen").value
      g = parseInt(document.querySelector("#customRangeGreen").value)
      setColorPreview(r,g,b)
      updateHex()
})
document.querySelector("#customRangeBlue").addEventListener("input",(e)=>{
      document.querySelector("#labelblue").innerHTML = "Blue - " + document.querySelector("#customRangeBlue").value
      b = parseInt(document.querySelector("#customRangeBlue").value)
      setColorPreview(r,g,b)
      updateHex()
})
document.querySelector("#ColorApply").addEventListener("click", (e)=>{
      document.querySelector("body").style.backgroundColor = `rgb(${r},${g},${b})`
      hex = "#"+rgb2hex(r)+rgb2hex(g)+rgb2hex(b)
      current_color = hex
      if (currentid){
            changeSpine(currentid)
      }
})

let oldhex= document.querySelector("#inputhex").value

document.querySelector("#inputhex").addEventListener("input",(e)=>{
      currenthex = document.querySelector("#inputhex").value
      newhex=""
      for (let i = 0; i < currenthex.length; i++){
            if (currenthex.charAt(i)==="#" || 
                i > 5 || /^[g-zG-Z]+$/.test(currenthex.charAt(i))){
                  
            }else{
                  newhex+=currenthex.charAt(i)
            }
      }
      document.querySelector("#inputhex").value = newhex
      if(newhex.length===6){
            r = parseInt(newhex.slice(0,2), 16)
            g = parseInt(newhex.slice(2,4), 16)
            b = parseInt(newhex.slice(4,6), 16)
            updateRgb()
            setColorPreview(r,g,b)
      }
      oldhex=newhex
})

