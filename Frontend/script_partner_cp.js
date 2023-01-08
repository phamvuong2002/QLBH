//const url = "https://webhook.site/f1de2a56-4094-4692-bacb-d4013b7e67de";
const url = "http://localhost:8080/api/addparner";

async function makeAPICall() {
    
}

function getData(form) {
    var formData = new FormData(form);
    const values = Object.fromEntries(formData)
    return values
}
  
const formEl = document.querySelector("form");
formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
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
        
        console.log(json);

        //check error insert parner into db
        let keys = Object.keys(json[0])
        if (keys[0] === "ERROR"){
            let data = JSON.stringify(json[0].ERROR)
            alert(keys[0] + ' : ' + data)
            console.log(data)
        }
        else {
            let myObj = json[0]

            const oldForm = document.getElementById("myform")
            oldForm.remove()

            //create button to link menu management page
            const divbutton = document.createElement("DIV")
            divbutton.setAttribute("class","Sbutton")

            const newbutton = document.createElement("BUTTON")
            newbutton.setAttribute("id", "signupButton")
            newbutton.data = "submit"
            newbutton.innerHTML = "To Menu Page"
            newbutton.onclick = function()
            {
                location.href = "http://127.0.0.1:5500/manage_menu.html"
            }
            divbutton.appendChild(newbutton)

            const container = document.createElement("DIV")
            container.setAttribute("class","container")

            
            
            //show responed JSON -- if successed
            for(const x in myObj){
                const div = document.createElement("DIV");
                div.setAttribute("class", "new_colum");

                const lable = document.createElement("LABLE");
                lable.appendChild(document.createTextNode(x + ': ' + myObj[x]));
                div.appendChild(lable);

                container.appendChild(div);
            }
            
            document.body.appendChild(container)
            document.body.appendChild(divbutton)
        }
        
    } catch (e) {
           
    }
});

