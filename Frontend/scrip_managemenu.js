const url = "http://localhost:8080/api/menu/"
function toupdateMonAn(){
    location.href = "update.html"
}
function tocreateMonAn(){
    location.href = "create.html"
}

function returnMenu(data){
    //if exists previous data --> remove previous card
    const oldcard = document.getElementsByClassName("card")
    console.log("card:", oldcard.length)
    for (var i = oldcard.length - 1; i >= 0; --i) {
        oldcard[i].remove();
      }
    // check menu items
    if(data.length === 0){
        alert("Not Exists Menu Item To Display")
        return  
    }

    // display
    const divcontainer = document.getElementsByClassName("container")

    for(let i = 0; i < data.length; i++){
        //card
        const divcard = document.createElement("div")
        divcard.setAttribute("class", "card")
        //Ten Mon
        const divcolum1 = document.createElement("div")
        divcolum1.setAttribute("class","colum")
        const lable_tenmon = document.createElement("lable")
        lable_tenmon.appendChild(document.createTextNode("Ten Mon: "))
        const lable_tenmon_result = document.createElement("lable")
        lable_tenmon_result.appendChild(document.createTextNode(data[i].TENMON))
         
        divcolum1.appendChild(lable_tenmon)
        divcolum1.appendChild(lable_tenmon_result)
        divcard.appendChild(divcolum1)

        //Tinh Trang
        const divcolum2 = document.createElement("div")
        divcolum2.setAttribute("class","colum")
        const lable_tt = document.createElement("lable")
        lable_tt.appendChild(document.createTextNode("Tinh Trang: "))
        const lable_tt_result = document.createElement("lable")
        lable_tt_result.appendChild(document.createTextNode(data[i].TINHTRANG))
         
        divcolum2.appendChild(lable_tt)
        divcolum2.appendChild(lable_tt_result)
        divcard.appendChild(divcolum2)

        //SL da ban
        const divcolum3 = document.createElement("div")
        divcolum3.setAttribute("class","colum")
        const lable_sldaban = document.createElement("lable")
        lable_sldaban.appendChild(document.createTextNode("SL Ban: "))
        const lable_sldaban_result = document.createElement("lable")
        lable_sldaban_result.appendChild(document.createTextNode(data[i].SLDABAN))
         
        divcolum3.appendChild(lable_sldaban)
        divcolum3.appendChild(lable_sldaban_result)
        divcard.appendChild(divcolum3)

        //Gia Ban
        const divcolum4 = document.createElement("div")
        divcolum4.setAttribute("class","colum")
        const lable_giaban = document.createElement("lable")
        lable_giaban.appendChild(document.createTextNode("Gia Ban: "))
        const lable_giaban_result = document.createElement("lable")
        lable_giaban_result.appendChild(document.createTextNode(data[i].GIA))
         
        divcolum4.appendChild(lable_giaban)
        divcolum4.appendChild(lable_giaban_result)
        divcard.appendChild(divcolum4)

        //Mo ta
        const divcolum5 = document.createElement("div")
        divcolum5.setAttribute("class","colum")
        const lable_mieuta = document.createElement("lable")
        lable_mieuta.appendChild(document.createTextNode("Mieu Ta: "))
        const lable_mieuta_result = document.createElement("lable")
        lable_mieuta_result.appendChild(document.createTextNode(data[i].MIEUTA))
         
        divcolum5.appendChild(lable_mieuta)
        divcolum5.appendChild(lable_mieuta_result)
        divcard.appendChild(divcolum5)

         //ghi chu
        const divcolum6 = document.createElement("div")
        divcolum6.setAttribute("class","colum")
        const lable_ghichu = document.createElement("lable")
        lable_ghichu.appendChild(document.createTextNode("Ghi Chu: "))
        const lable_ghichu_result = document.createElement("lable")
        lable_ghichu_result.appendChild(document.createTextNode(data[i].GHICHU))
         
        divcolum6.appendChild(lable_ghichu)
        divcolum6.appendChild(lable_ghichu_result)
        divcard.appendChild(divcolum6)

        // button

        const button = document.createElement("button")
        button.type = "submit"
        button.name ="Submit"
        button.id = "dbutton"
        button.innerHTML = "Xoa Mon"
        button.onclick = function() {deleteDish(data[i].TENMON)};
        divcard.appendChild(button)

         
        divcontainer[0].appendChild(divcard)
    }
}

function deleteDish(tenmon){
    alert("Xoa Mon " + tenmon)
}

//main
const formEl = document.querySelector("form");
formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    searchItem = document.getElementById("query").value
    console.log(searchItem)
    if(searchItem === ""){
        alert("Can't Search With Null Value")

    }
    else{
        console.log(url + searchItem)
        const url_searchItem = url + searchItem
        const response = await fetch(url_searchItem);
        const data = await response.json();
        console.log(Object.keys(data[0]))

        if(Object.keys(data[0]) == 'ERROR'){
            alert("ERROR: " + data[0].ERROR)
        }
        else{
            returnMenu(data)
        }
        
    }
})