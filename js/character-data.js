const progress_value = (val, type)=>{
    let maxstat
    switch(type){
        case "hp":
            maxstat = 350000
            break;
        case "att":
            maxstat = 5000
            break;
        case "def":
            maxstat = 750
            break;
    }
    return percentage = 100*val/maxstat
}

const changeData = async (val) => {

    let corporation = val.corporation=="TETRA"? "tetraline" : val.corporation.toLowerCase()
    let minhp,maxhp,minatt,maxatt,mindef,maxdef;
    let maxlvl

    switch(val.rarity){
        case "SSR": maxlvl = 200; break;
        case "SR" : maxlvl = 120; break;
        case "R"  : maxlvl = 80 ; break;
    }

    const response = await fetch('js/json/CharacterStatTable.json');
    const json = await response.json()
    json.records.map((valstat)=>{
        if(valstat.level === 1 && valstat.group === val.stat_enhance_id){
            minhp = valstat.level_hp
            minatt= valstat.level_attack
            mindef= valstat.level_defence
        }
        if(valstat.level === maxlvl && valstat.group === val.stat_enhance_id){
            maxhp = valstat.level_hp
            maxatt= valstat.level_attack
            maxdef= valstat.level_defence
        }
    })

    //change char name
    document.querySelector("#charNameH1").innerHTML = val.name

    //change char description
    if(val.description===undefined){
        document.querySelector("#charDescription").innerHTML = "Missing description"
    }else{
        document.querySelector("#charDescription").innerHTML = val.description
    }

    //change weapon icon, rarity icon , manufacturer icon
    document.querySelector("#wr2div1 img").src = "images/gun/full/icn_weapon_"+val.weapon.weapon_type.toLowerCase()+"_full.png"

    document.querySelector("#wr2div2 img").src = "images/rarity/"+val.rarity.toLowerCase()+".png"

    document.querySelector("#wr2div3 img").src = "images/manufacturer/icn_corp_"+corporation+".png"

    // change side image ( full body )
    document.querySelector("#character-FB img").src = "images/FB/"+val.id+"_00.png"
    document.querySelector("#character-FB img").alt = "Missing image for " +val.name

    // change the stat progress bars with written values, and different sizes 
    document.querySelector("#prog-min-hp").innerHTML  = "Lv.1 Health: "+minhp
    document.querySelector("#prog-min-hp").style.width= progress_value(minhp, "hp")+"%"

    document.querySelector("#prog-max-hp").innerHTML  = "Lv."+maxlvl+" Health: "+maxhp
    document.querySelector("#prog-max-hp").style.width= progress_value(maxhp, "hp")+"%"

    document.querySelector("#prog-min-att").innerHTML = "Lv.1 Attack: "+minatt
    document.querySelector("#prog-min-att").style.width= progress_value(minatt, "att")+"%"
    
    document.querySelector("#prog-max-att").innerHTML = "Lv."+maxlvl+" Attack: "+maxatt
    document.querySelector("#prog-max-att").style.width= progress_value(maxatt, "att")+"%"

    document.querySelector("#prog-min-def").innerHTML = "Lv.1 Defense: "+mindef
    document.querySelector("#prog-min-def").style.width= progress_value(mindef, "def")+"%"

    document.querySelector("#prog-max-def").innerHTML = "Lv."+maxlvl+" Defense: "+maxdef
    document.querySelector("#prog-max-def").style.width= progress_value(maxdef, "def")+"%"

}

document.querySelector("#character-FB img").addEventListener("click", (e)=>{
    window.location.href = document.querySelector("#character-FB img").src
})