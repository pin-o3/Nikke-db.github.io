const qs = (val) => {
    return document.querySelector(val)
}
const qsa = (val) => {
    return document.querySelectorAll(val)
}

const s2m = (s) => {
    return parseInt(s / 60)
}

let audio 
let volume = 0.2
let currentaudiostate;

let json

const everythingAboutAudio = (url) => {

    if (audio!==undefined) audio.pause()
    audio = document.createElement("audio")
    audio.volume=volume ;
    
    let totals, currents;
    
    audio.setAttribute("src", url) 
    
    qs("#songbar").style.width = "0%"
    qs("#mediaplayerdiv").hidden = false
    qs("#mediaplayerdiv label").innerHTML = audio.getAttribute("src").replace("music/","")
    qs("#volume_div").style.top = qs("#volume button").getBoundingClientRect().y-101 +"px"
    qs("#volume_div").style.left = qs("#volume button").getBoundingClientRect().x-50 +"px"
    //load the audio and play it, initiate a couples variables
    audio.addEventListener("canplaythrough", (e)=>{
        
        totals = parseInt(audio.duration - s2m(audio.duration) * 60)
        totals <10 ? totals = "0"+totals : true

        qsa(".wr1")[0].classList.add("rotate")
        qsa(".wr1")[1].classList.add("rotate")
        qs("#totaltime").innerHTML = "0"+s2m(audio.duration) + ":" + totals
        
        audio.play()
    })

    // trigerred every 0.250seconds , change values of timers 
    audio.addEventListener("timeupdate",(e)=>{
        currents = parseInt(audio.currentTime - s2m(audio.currentTime) * 60)
        currents <10 ? currents = "0"+currents : true
        if (!clickedonnav) qs("#currenttime").innerHTML = "0"+s2m(audio.currentTime) + ":" + currents
        if (!clickedonnav) qs("#songbar").style.width = audio.currentTime * 100 / audio.duration + "%"
    })

    //click on progress bar to change the current song "location"
    let clickedonnav=false

    qs("#songfullbar").addEventListener("mousedown",(e)=>{
        clickedonnav=true
        qs("#songbar").style.width = ((e.clientX-qs("#songfullbar").offsetLeft)*100/qs("#songfullbar").offsetWidth)+ "%"        
    })
    document.addEventListener("mouseup",(e)=>{
        if (clickedonnav){
            clickedonnav=false
            audio.currentTime = (audio.duration * (qs("#songbar").offsetWidth / qs("#songfullbar").offsetWidth));
            qs("#songbar").style.width = ((e.clientX-qs("#songfullbar").offsetLeft)*100/qs("#songfullbar").offsetWidth)+ "%"
        }
    })
    document.addEventListener("mousemove",(e)=>{
        if (clickedonnav){
            qs("#songbar").style.width = ((e.clientX-qs("#songfullbar").offsetLeft)*100/qs("#songfullbar").offsetWidth)+ "%"
            const time = audio.duration*(qs("#songbar").offsetWidth / qs("#songfullbar").offsetWidth)
            const currentmin = s2m(time)
            let currentsec = parseInt(time - currentmin * 60)
            currentsec < 10 ? currentsec = "0"+currentsec : true
            qs("#currenttime").innerHTML = "0"+currentmin + ":" + currentsec
        }
    })

    
    audio.addEventListener("play",(e)=>{
        currentaudiostate="play"
        qs(".btn_play_pause").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/></svg>'
    })

    audio.addEventListener("ended",(e)=>{
        currentaudiostate="ended"
        qs(".btn_play_pause").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>'

        // when a song ends , play the next one 
        let i = 0
        json.map((val)=>{
            if (val.file === url.replace("music/","")){
                if (i !== json.length-1 ) everythingAboutAudio("music/"+json[i+1].file)
                else everythingAboutAudio("music/"+json[0].file)
            } else{
                i++
            }
        })

        })
    

    audio.addEventListener("pause",(e)=>{
        currentaudiostate="paused"
        qs(".btn_play_pause").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>'
    })
}

const initmusic = async () =>{
    let response = await fetch('js/json/Music.json')
    json = await response.json()
    
    qs("#musicnb").innerHTML = "currently serving " + json.length + " songs"

    json.map((val)=>{

        let div = document.createElement("div")
        div.classList.add("onemusic")
        div.innerHTML=val.file
        div.setAttribute("file_url",val.file)

        qs("#musicfulldiv").appendChild(div)

        div.addEventListener("click",(e)=>{
            e.target.click()
            everythingAboutAudio('music/'+e.target.getAttribute("file_url"))
        })
    })
    if (!navigator.userAgent.includes("Chrome")){
        alert("This page have been reported to have issues on non-chromium based explorers, some functionnalities might not work as expected.")
    }

}

initmusic()

qs(".btn_play_pause").addEventListener("click",(e)=>{
    switch(currentaudiostate){
        case "play": audio.pause(); break;
        case "paused": audio.play(); break;
        case "ended": audio.currentTime=0; break;
    }
})

qs(".btn_volume").addEventListener("click",(e)=>{
    qs("#volume_div").hidden = !qs("#volume_div").hidden
})

qs("#volume_div input").addEventListener("input",(e)=>{
    audio.volume = e.target.value
    volume = e.target.value
})


window.addEventListener("resize",(e)=> {
    qs("#volume_div").style.top = qs("#volume button").getBoundingClientRect().y-101+"px"
    qs("#volume_div").style.left = qs("#volume button").getBoundingClientRect().x-50 +"px"
})
