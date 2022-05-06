const div = document.getElementById("character-list");

async function initJSON(){
    const response = await fetch('js/json/Characters.json');
    const json = await response.json()
    json.sort(function(a, b){
        return a.id.localeCompare(b.id);
        
    })
    json.map((val)=>{
        const liste_item = document.createElement("li");
        
        liste_item.innerHTML = "<img src='images/sprite/si_"+val.id+"_00_s.png'/>" + val.name
       
        // attributes for filters
        liste_item.setAttribute('manufacturer', val.corporation);
        liste_item.setAttribute('gun', val.weapon.weapon_type);
        liste_item.setAttribute('rarity', val.rarity);
        liste_item.setAttribute('class', val.class);

        liste_item.classList.add("charDiv")
        
        liste_item.addEventListener("click", (e)=>{
            //document.querySelector("#character-search-input").scrollIntoView()
            changeData(val)
        })
        div.appendChild(liste_item) //div character list
    })
    const paramURL= window.location.search;
    const ParsedParam = new URLSearchParams(paramURL);

    if (ParsedParam.get('id') != null ){
        let check = false 
        json.map((val)=>{
            if(val.id===ParsedParam.get('id')){
                changeData(val)
                check = true
            }
        })
        if (!check){
            changeData(json[0])
        }
    }else{
        changeData(json[0])
    }
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


