//const { data } = require("@tensorflow/tfjs-node");

//const { data } = require("@tensorflow/tfjs-node")

const url_search = "http://localhost:8080/api/partner/findmenuitem"
const url_delete = "http://localhost:8080/api/deletemenuitem/"
const url_update = "http://localhost:8080/api/partner/updatemenuitem/"

//---------------TEST public API-------------

// const url = "https://a4b7-1-52-147-128.ap.ngrok.io/api/getnumeitembyname/"
// const url_delete = "https://a4b7-1-52-147-128.ap.ngrok.io/api/deletemenuitem/"
// const url_update = "https://a4b7-1-52-147-128.ap.ngrok.io/api/updatemenuitem/"



var toTextForMonAn = {
    "TENMON": "Ten Mon",
    "MIEUTA": "Mieu Ta",
    "GIA": "Gia",
    "TINHTRANG" : "Tinh Trang",
    "SLDABAN": "So Luong Da Ban",
    "GHICHU": "Ghi Chu"
}

function cancleButton(){
    location.href = "manage_menu.html"
}
function getData(form) {
    var formData = new FormData(form);
    const values = Object.fromEntries(formData)
    return values
}
function updateFood(masothue,tenmon){
    const updateform = document.getElementById("updateform")
    updateform.addEventListener("submit", async (e) => {
        e.preventDefault();
        const jsonObject = getData(e.target);
        const newjsonObject = {
            "masothue": masothue,
            "tenmon": tenmon,
            "mieuta": jsonObject.MIEUTA,
            "gia": jsonObject.GIA,
            "tinhtrang": jsonObject.TINHTRANG,
            "sldaban": jsonObject.SLDABAN,
            "ghichu" : jsonObject.GHICHU
        }
        console.log("update Object:",newjsonObject)
        try {
            const response = await fetch(url_update, {
            method: "PUT",
            body: JSON.stringify(newjsonObject),
            headers: {
                "Content-Type": "application/json",
            },
        });
    
            //return update results 
            const json = await response.json();
            
            console.log(json);
    
            //check error update
            let keys = Object.keys(json[0])
            if (keys[0] === "ERROR"){
                let data = JSON.stringify(json[0].ERROR)
                alert(keys[0] + ' : ' + data)
                console.log(data)
            }
            else {
                alert("UPDATED SUCCESSFULLY")
                location.reload()
            }
            
        } catch (e) {
            formEl.innerHTML = e.message;
        }
    });
}

async function deleteDish(masothue,tenmon){
    const url_delete_item = url_delete + tenmon
    const response = await fetch(url_delete_item, {
        method: 'DELETE',
    })
    const data = await response.json();
    console.log(Object.keys(data[0]))

    if(Object.keys(data[0]) == 'ERROR'){
        alert("ERROR: " + data[0].ERROR)
    }
    else{
        keys = Object.keys(data[0])
        alert("Deleted " + JSON.stringify(tenmon) + " Successfully")
        const url_searchItem = url + masothue
        const response = await fetch(url_searchItem);
        const newdata = await response.json();
        console.log(newdata)
        returnMenu(newdata,masothue)
    }

}

function returnMenuItem(masothue,responseData){
    //if exists previous data --> remove previous card
    const oldContainer = document.getElementsByClassName("container")
    // console.log("oldContainer:", oldContainer.length)
    for (var i = oldContainer.length - 1; i >= 0; --i) {
        oldContainer[i].remove();
      }
    // check menu items
    if(responseData.length === 0){
        alert("Not Exists Menu Item To Display")
        return  
    }

    // display
    //-----get keys of data json
    const keys = Object.keys(responseData)
    //console.log(keys)

    //get form
    const updateform = document.getElementById("updateform")
    //create class = "container"
    const containerClass = document.createElement("div")
    containerClass.setAttribute("class", "container")
    
    //--------------------create search_result_card-------------
    const search_result_card = document.createElement("div")
    search_result_card.setAttribute("class", "search_result_card")

    
    for(let i = 0; i < keys.length; i++)
    {   
        const search_colum = document.createElement("div")
        search_colum.setAttribute("class", "search_colum")
        const label = document.createElement("label")
        let content = toTextForMonAn[keys[i]] + ": " + responseData[keys[i]]
        //console.log(content)
        label.appendChild(document.createTextNode(content))
        search_colum.appendChild(label)
        search_result_card.appendChild(search_colum)
    }
    

    //-----------------------create  update_card----------------
    const update_card = document.createElement("div")
    update_card.setAttribute("class", "update_card")

    const h3 = document.createElement("h3")
    h3.appendChild(document.createTextNode("Nhung Thong Tin Duoc Phep Cap Nhat:"))
    update_card.appendChild(h3)

    for(let i = 1; i< keys.length; i++){
        const update_colum = document.createElement("div")
        update_colum.setAttribute("class", "update_colum")
        const label = document.createElement("label")
        label.appendChild(document.createTextNode(toTextForMonAn[keys[i]])) 
        const input = document.createElement("input")
        input.type = "text"
        input.placeholder = responseData[keys[i]]
        input.name = keys[i]

        update_colum.appendChild(label)
        update_colum.appendChild(input)
        update_card.appendChild(update_colum)

        if(i === keys.length - 1)
        {   
            const update_colum = document.createElement("div")
            update_colum.setAttribute("class", "update_colum")
            const button = document.createElement("button")
            button.type = "submit"
            button.name = "Submit"
            button.id = "updatebutton"
            button.innerHTML = "Cap Nhat"
            button.onclick = function(){updateFood(masothue,responseData.TENMON)}
            update_colum.appendChild(button)
            update_card.appendChild(update_colum)
        }
    }
    


    //appendChild for container
    containerClass.appendChild(search_result_card)
    containerClass.appendChild(update_card)

    //appendChild For updateform
    updateform.appendChild(containerClass)
    
}

//main
const formEl = document.querySelector("form");
formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const jsonObject = getData(e.target);
    console.log(jsonObject)

    if(jsonObject.masothue === "" || jsonObject.tenmon === ""){
        alert("Can't Search With Null Value")
    }
    else{
        try {
            const response = await fetch(url_search, {
            method: "POST",
            body: JSON.stringify(jsonObject),
            headers: {
                "Content-Type": "application/json",
            },
        });
    
            //return results of inserted parner 
            const json = await response.json();
            console.log(json);
            const data = json[0]
            //check error insert parner into db
            let keys = Object.keys(json[0])
            if (keys[0] === "ERROR"){
                let data = JSON.stringify(json[0].ERROR)
                alert(keys[0] + ' : ' + data)
                console.log(data)
            }
            else {
                returnMenuItem(jsonObject.masothue,data)
            }
            
        } catch (e) {
            formEl.innerHTML = e.message;
        } 
    }
})