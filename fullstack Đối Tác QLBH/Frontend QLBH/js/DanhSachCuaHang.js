var id = null;
var order = JSON.parse(localStorage.getItem('order'));

const toText= {
    "TENQUAN": "Tên cửa hàng",
    "TENMON": "Tên món",
    "MIEUTA": "Miêu tả",
    "GIA": "Giá"
};

function getCol(matrix, col){
    var column = [];
    for(var i=0; i<matrix.length; i++){
       column.push(matrix[i][col]);
    }
    return column;
}

function getStores(){
    var brand = document.getElementsByClassName('brand');
    $('.brand').empty();
    console.log("ORDER", order);
    
    id = document.getElementById('disk').value;
    const url = `http://localhost:8080/api/disk/${id}`;
    // alert(url);

    fetch(url)
    .then(response => response.json()) //convert to object
    .then(data => handleData(data));

    function handleData(data) {
        let tableData = "";   
        data.map((values) => {
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
            var name = dataTable.rows[1].cells[1].innerHTML;
            var price = dataTable.rows[3].cells[1].innerHTML;
            var column = getCol(order, 0);
            // console.log("a", column);
            var index = column.indexOf(name);
            // console.log("i", index); 

            if (index != -1){
                order[index][2] += 1;
                order[index][3] += order[index][1];
            }
            else
                order.push([name, parseInt(price), 1, parseInt(price)]);
    
            document.getElementById("SoLuong").innerHTML = order.length;
            console.log("LENGTH", order.length);
            console.log("ORDER", order);
        };

        branch.appendChild(dataTable);
        branch.appendChild(select);
        brand[0].appendChild(branch);
        });
    }
}


