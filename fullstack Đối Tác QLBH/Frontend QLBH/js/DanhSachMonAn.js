var id = null;
var order = [];

const toText= {
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

function getDiskes(){
    var food = document.getElementsByClassName('food');
    $('.food').empty();

    id = document.getElementById('store').value;
    const url = `http://localhost:8080/api/store/${id}`;
    // alert(url);

    fetch(url)
    .then(response => response.json()) //convert to object
    .then(data => handleData(data));

    function handleData(data) {
        let tableData = "";   
        data.map((values) => {        
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
            var name = dataTable.rows[0].cells[1].innerHTML;
            var price = dataTable.rows[2].cells[1].innerHTML;
            var column = getCol(order, 0);
            var index = column.indexOf(name);

            if (index != -1){
                order[index][2] += 1;
                order[index][3] += order[index][1];
            }
            else
                order.push([name, parseInt(price), 1, parseInt(price)]);

            document.getElementById("SoLuong").innerHTML = order.length;
            console.log(order.length);
            console.log(order);
            return order;
        };

        disk.appendChild(dataTable);
        disk.appendChild(select);
        food[0].appendChild(disk);
        });
    }
}

module.exports = {order}