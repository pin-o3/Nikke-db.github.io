let currentSkill = 0;
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

const hideSkill = () => {
    for (let i = 0; i<4; i++){
        document.querySelectorAll(".activeHeader")[i].hidden = true
        document.querySelectorAll(".activeDesc")[i].hidden = true
        document.querySelectorAll("#wr3div1 .btn")[i].classList.remove("activeskill")
    }
}
const showSkill = (index) => {
    hideSkill()
    document.querySelectorAll(".activeHeader")[index].hidden = false
    document.querySelectorAll(".activeDesc")[index].hidden = false
    document.querySelectorAll("#wr3div1 .btn")[index].classList.add("activeskill")
}
const formatSkill = (skill) =>{
    skill = skill.replaceAll("■", "<br>■");
    skill = skill.replaceAll("[Own]", "");
    skill = skill.replaceAll("[Apply on all enemies]","");
    skill = skill.replaceAll("] [lasts","")
    skill = skill.replaceAll("[Apply on target]", "")
    return skill.slice(4)
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
    // lazy to automate using arrays and several if & switch

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

    // show skills
    hideSkill()

    document.querySelector("#SkillRegularHeader").innerHTML = "TO BE ADDED WITH RELEASE";
    document.querySelector("#Skill1Header").innerHTML = val.skill1_name;
    document.querySelector("#Skill2Header").innerHTML = val.skill2_name;
    document.querySelector("#SkillBurstHeader").innerHTML = val.ulti_name;

    document.querySelector("#SkillRegularDesc").innerHTML = "TO BE ADDED WITH RELEASE";
    document.querySelector("#Skill1Desc").innerHTML   =   formatSkill(val.skill1_description);
    document.querySelector("#Skill2Desc").innerHTML   =   formatSkill(val.skill2_description);
    document.querySelector("#SkillBurstDesc").innerHTML = formatSkill(val.ulti_description);

    showSkill(currentSkill)

    //show the class image, next to stats
    document.querySelector("#class-img img").src = "images/classes/"+val.class+".png"

}

document.querySelector("#character-FB img").addEventListener("click", (e)=>{
    window.location.href = document.querySelector("#character-FB img").src
})
document.querySelector("#btn-regular-attack").addEventListener("click", (e)=>{
    currentSkill=0
    showSkill(currentSkill)
})
document.querySelector("#btn-skill-1").addEventListener("click", (e)=>{
    currentSkill=1
    showSkill(currentSkill)
})
document.querySelector("#btn-skill-2").addEventListener("click", (e)=>{
    currentSkill=2
    showSkill(currentSkill)
})
document.querySelector("#btn-burst-skill").addEventListener("click", (e)=>{
    currentSkill = 3
    showSkill(currentSkill)
})
