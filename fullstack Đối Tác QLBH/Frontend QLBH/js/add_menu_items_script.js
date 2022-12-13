const url = "http://localhost:8080/api/addmenuitem";
//----------------TEST public API-----------------------
// const url = "https://a4b7-1-52-147-128.ap.ngrok.io/api/addmenuitem";

const toText = {
    "TENMON": "Ten Mon An",
    "MIEUTA": "Mieu Ta",
    "GIA": "Gia",
    "TINHTRANG" : "Tinh Trang",
    "SLDABAN": "So Luong Da Ban",
    "GHICHU":"Ghi Chu"
}

async function makeAPICall() {
    
}

function cancleButton(){
    location.href = "manage_menu.html"
}

function addMenuForResButton(){
    location.href = "add_menu_for_restaurant.html"
}

function getData(form) {
    var formData = new FormData(form);
    const values = Object.fromEntries(formData)
    return values
}


function displayInfoMonAn(data){
    const keys = Object.keys(data)

    const form = document.getElementById("myform")

    //detele input tag
    const classfield = document.getElementsByClassName("field")
    
    for(var i = classfield.length - 1; i >= 0; --i) {
        classfield[i].remove()
    }

   
    //craete annouce added successfully
    const container = document.getElementsByClassName("container")
    const p = document.createElement("P")
    p.appendChild(document.createTextNode("Them Thanh Cong! Thong Tin Mon An Cua Cua Doi Tac " + JSON.stringify(data[keys[0]])))
    container[0].appendChild(p)

    for(let i = 1; i < keys.length; i++){
        //console.log(i+"--"+ keys[i]+ ": " + JSON.stringify(data[keys[i]]))

        //create field
        let field = document.createElement("DIV")
        field.setAttribute("class","field")

        //create lable
        let titlelabel = document.createElement("label")
        let content =toText[keys[i]] + ": " + JSON.stringify(data[keys[i]])
        titlelabel.appendChild(document.createTextNode(content))
        field.appendChild(titlelabel)
        
        //append into container
        container[0].appendChild(field)
    }

    //delete add button
    const addbutton = document.getElementById("abutton")
    addbutton.remove()
}

const formEl = document.querySelector("form");
formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    let button = e.target
    console.log("button: "+button.id.name)
    const jsonObject = getData(e.target);
    console.log(jsonObject)
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(jsonObject),
            headers: {
                "Content-Type": "application/json",
            },
        });

        //return results of inserted parner 
        const json = await response.json();
        //console.log(json);

        let keys = Object.keys(json[0])
        if (keys[0] === "ERROR"){
            let data = JSON.stringify(json[0].ERROR)
            alert(keys[0] + ' : ' + data)
            //console.log(data)
        }
        else {
            displayInfoMonAn(json[0])
        }
        
    } catch (e) {
        formEl.innerHTML = e.message;
    }
});

