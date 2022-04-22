const changeData = (val) => {

    let corporation = val.corporation=="TETRA"? "tetraline" : val.corporation.toLowerCase()
    let minhp,maxhp,minatt,maxatt,mindef,maxdef;
    let maxlvl

    switch(val.rarity){
        case "SSR": maxlvl = 200;
        case "SR" : maxlvl = 120;
    }

    //change char name
    document.querySelector("#charNameH1").innerHTML = val.name

    //change char description
    if(val.description===undefined){
        document.querySelector("#charDescription").innerHTML = "Missing description"
    }else{
        document.querySelector("#charDescription").innerHTML = val.description
    }

    document.querySelector("#wr2div1 img").src = "images/gun/full/icn_weapon_"+val.weapon.weapon_type.toLowerCase()+"_full.png"

    document.querySelector("#wr2div2 img").src = "images/rarity/"+val.rarity.toLowerCase()+".png"

    document.querySelector("#wr2div3 img").src = "images/manufacturer/icn_corp_"+corporation+".png"

    document.querySelector("#character-FB img").src = "images/FB/"+val.id+"_00.png"

}

document.querySelector("#character-FB img").addEventListener("click", (e)=>{
    window.location.href = document.querySelector("#character-FB img").src
})