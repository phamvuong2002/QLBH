const url = "http://localhost:8080/api/partner/listcontracts/"


///-------------------TEST public API-------------------
// const url = "https://a4b7-1-52-147-128.ap.ngrok.io/api/menu/"
// const url_delete = "https://a4b7-1-52-147-128.ap.ngrok.io/api/deletemenuitem/"


const toTextContacts = {
    "MAHOPDONG" : "Ma Hop Dong: ",
    "MASOTHUE" : "Ma So Thue: ",
    "MANV": "Nhan Vien QL: ",
    "NGAYLAP": "Ngay Lap: ",
    "PHANTRAMHOAHONG": "PT Hoa Hong: ",
    "SOCHINHANHDANGKY": "SLCN Dang Ky:",
    "NGAYBATDAU": "Ngay BD: ",
    "NGAYKETTHUC": "Ngay KT: ",
}


function returnMenu(data, searchItem){
    //if exists previous data --> remove previous card
    const oldcard = document.getElementsByClassName("card")
    console.log("card:", oldcard.length)
    for (var i = oldcard.length - 1; i >= 0; --i) {
        oldcard[i].remove();
      }
    // check menu items
    if(data.length === 0){
        alert("Partner Has Not Contacts")
        return  
    }

    // display
    const divcontainer = document.getElementsByClassName("container")

    for(let i = 0; i < data.length; i++){
        const divcard = document.createElement("div")
        divcard.setAttribute("class", "card")
        const keys = Object.keys(data[i])
        const contract = data[i]
        for(let j = 0; j < keys.length; j++){
            const colum = document.createElement('div')
            colum.setAttribute("class", "colum")
            const title = document.createElement('label')
            title.setAttribute("class", "title") 
            title.appendChild(document.createTextNode(toTextContacts[keys[j]]))
            const content = document.createElement('label')
            content.appendChild(document.createTextNode(contract[keys[j]]))
            
            colum.appendChild(title)
            colum.appendChild(content)
            divcard.appendChild(colum)
        }
        divcontainer[0].appendChild(divcard)
    }
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
        console.log(data[0])

        if(data.length === 0){
            alert("Not Found Contracts of Partner: " + searchItem)
        }
        else{
            if(Object.keys(data[0]) == 'ERROR'){
                alert("ERROR: " + data[0].ERROR)
            }
            else{
                returnMenu(data,searchItem)
            }
        }
        
        
    }
})