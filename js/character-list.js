const div = document.getElementById("character-list");

async function initJSON(){
    const response = await fetch('js/json/Characters.json');
    const json = await response.json()
    json.sort(function(a, b){
        return a.id.localeCompare(b.id);
        
    })
    let i = 0;
    json.map((val)=>{
        i++
        const liste_item = document.createElement("li");
        // const mainImg = document.createElement("img");
        // const mainName = document.createElement("p");
        // mainImg.src="images/sprite/si_"+val.id+"_00_s.png";
        // mainName.innerHTML=val.name;
        // mainCard.appendChild(mainImg)
        // mainCard.appendChild(mainName)
        liste_item.innerHTML = "<img src='images/sprite/si_"+val.id+"_00_s.png'/>" + val.name
        //mainCard.classList.add("card")
        liste_item.classList.add("charDiv")
        
        liste_item.addEventListener("click", (e)=>{
            document.querySelector("#character-search-input").scrollIntoView()
            changeData(val)
        })
        div.appendChild(liste_item)
    })
    changeData(json[0])
}

initJSON()
let allchar 
setTimeout(() => {
    allchar = document.querySelectorAll(".charDiv")
}, 500);

const query = document.querySelector("#character-search-input")

query.addEventListener("input", (e)=>{
    
    for (let i = 0; i < allchar.length ; i++){
       if (!allchar[i].outerText.toLowerCase().includes(query.value.toLowerCase()) ){
            allchar[i].hidden = true
       }else{
           allchar[i].hidden = false
       }
    }
})