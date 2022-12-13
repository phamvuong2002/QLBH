var id = null;
var count = 0;

const toText= {
    "TENQUAN": "Tên cửa hàng",
    "TENMON": "Tên món",
    "MIEUTA": "Miêu tả",
    "GIA": "Giá"
};

function getStores(){
    var brand = document.getElementsByClassName('brand');
    $('.brand').empty();

    id = document.getElementById('disk').value;
    const url = `http://localhost:8080/api/disk/${id}`;
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

        
        const branch = document.createElement('div');
        branch.setAttribute("id","branch");

        const dataTable = document.createElement('table');
        dataTable.setAttribute("id", "dataTable");

        for (let i = 0; i < key.length; i++){
            var row = dataTable.insertRow(i);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.style.width = '30%';
            cell2.style.width = '70%';
            cell1.innerHTML = toText[key[i]];
            cell2.innerHTML = values[key[i]];
        }
        
        const select = document.createElement('button');
        select.innerText = "Chọn";
        select.setAttribute("id", "select");
        select.onclick = () => {
            count += 1;
            document.getElementById("SoLuong").innerHTML = count;
        };

        branch.appendChild(dataTable);
        branch.appendChild(select);
        brand[0].appendChild(branch);
        });
    }
}


