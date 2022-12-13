var id = null;
var count = 0;

const toText= {
    "TENMON": "Tên món",
    "MIEUTA": "Miêu tả",
    "GIA": "Giá"
};

function getDiskes(){
    var food = document.getElementsByClassName('food');
    $('.food').empty();

    id = document.getElementById('store').value;
    const url = `http://localhost:8080/api/store/${id}`;
    // alert(url);

    fetch(url)
    .then(response => response.json()) //convert to object
    .then(data => handleData(data));
        // console.log(data.Result);
        // this.setState({
        //     list:data.Result
        // });
    function handleData(data) {
        console.log("aaaaaa",data);

        let tableData = "";   
        data.map((values) => {
            // console.log(values.MIEUTA);
        
        const key = Object.keys(values);

        
        const disk = document.createElement('div');
        disk.setAttribute("id","disk");

        const dataTable = document.createElement('table');
        dataTable.setAttribute("id", "dataTable");
        dataTable.style.textOverflow = "clip";

        for (let i = 0; i < key.length; i++){
            var row = dataTable.insertRow(i);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.style.width = '30%';
            cell2.style.width = '70%';
            cell1.innerText = toText[key[i]];
            cell2.innerText = values[key[i]];
        }
        
        const select = document.createElement('button');
        select.innerText = "Chọn";
        select.setAttribute("id", "select");
        select.onclick = () => {
            count += 1;
            document.getElementById("SoLuong").innerHTML = count;
        };

        disk.appendChild(dataTable);
        disk.appendChild(select);
        food[0].appendChild(disk);
        });
    }
}



