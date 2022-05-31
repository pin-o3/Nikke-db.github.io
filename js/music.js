const initmusic = async () =>{
    let response = await fetch('js/json/Music.json')
    let json = await response.json()
    
    json.map((val)=>{
        let div = document.createElement("div")
        div.classList.add("onemusic")

        let name = document.createElement("span")
        name.innerHTML = val.file +"<br/>"

        let audio = document.createElement("audio")
        audio.src = "music/"+val.file
        audio.controls = true

        div.appendChild(name)
        div.appendChild(audio)

        document.querySelector("#musicfulldiv").appendChild(div)
    })
}

initmusic()