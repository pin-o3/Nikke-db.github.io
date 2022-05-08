new spine.SpinePlayer("player-container", {
      jsonUrl: "/l2d/c012/c012_00.json",
      atlasUrl: "/l2d/c012/c012_00.atlas",
      animation: "idle",
      skin: "00",
      skins: ["00"],
      backgroundColor: "#00000000",
      alpha: true,
      debug: false,
});

// document.addEventListener("wheel", (e) => {
//       e.preventDefault()
//       canvas = document.querySelector("#player-container")
//       height = document.querySelector("#player-container").style.height.replaceAll("vh","")
//       switch(e.deltaY){
//             case 100:    
//             canvas.style.height = parseInt(height) + 10 +"vh" ;
//             break;
//             case -100:  
//             canvas.style.height = parseInt(height) - 10 +"vh"     ;
//             break;
//       }
//       console.log(height)
// })
document.querySelector(".zoomin").addEventListener("click", ()=>{
      let canvas = document.querySelector("#player-container")
      let height = document.querySelector("#player-container").style.height.replaceAll("vh","")
      canvas.style.height = parseInt(height) + 25 +"vh" ;
})
document.querySelector(".zoomout").addEventListener("click", ()=>{
      let canvas = document.querySelector("#player-container")
      let height = document.querySelector("#player-container").style.height.replaceAll("vh","")
      canvas.style.height = parseInt(height) - 25 +"vh" ;
})