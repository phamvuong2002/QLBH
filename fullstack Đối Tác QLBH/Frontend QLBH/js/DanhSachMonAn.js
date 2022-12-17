var id = null;

var order = JSON.parse(localStorage.getItem('order') || '[]');

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

function start(){
    document.getElementById("SoLuong").innerHTML = order.length;
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
            // console.log("a", column);
            var index = column.indexOf(name);
            // console.log("i", index);

            if (index != -1){
                order[index][2] += 1;
                order[index][3] += order[index][1];
            }
            else
                // order.push({"TENMON": name, "GIA": parseInt(price),"SOLUONG": 1, "THANHTIEN": parseInt(price)});
                order.push([name, parseFloat(price), 1, parseFloat(price)]);

            document.getElementById("SoLuong").innerHTML = order.length;
            // console.log("LENGTH", order.length);
            console.log("ORDER", order);
            localStorage.setItem('order', JSON.stringify(order));
        };

        disk.appendChild(dataTable);
        disk.appendChild(select);
        food[0].appendChild(disk);
        });
    }
}
