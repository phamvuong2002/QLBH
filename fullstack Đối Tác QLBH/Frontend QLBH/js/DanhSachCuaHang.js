var id = null;
var order = JSON.parse(localStorage.getItem('order') || '[]');

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

function start(){
    document.getElementById("SoLuong").innerHTML = order.length;
}

function emptyStorage() {
    localStorage.removeItem('order');
    location.href="DanhSachMonAn.html";
}

function getStores(){
    var brand = document.getElementsByClassName('brand');
    $('.brand').empty();
    // console.log("ORDER", order);
    order = [];
    localStorage.setItem('order', JSON.stringify(order));
    console.log(order.length);
    start();
    
    id = document.getElementById('disk').value;
    const url = `http://localhost:8080/api/disk/${id}`;
    // alert(url);

    fetch(url)
    .then(response => response.json()) //convert to object
    .then(data => handleData(data));

    function handleData(data) {  
        data.map((values) => {
        const key = Object.keys(values);

        const branch = document.createElement('div');
        branch.setAttribute("id","branch");

        const dataTable = document.createElement('table');
        dataTable.setAttribute("id", "dataTable");
        dataTable.style.textOverflow = "clip";
        
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
            var store = dataTable.rows[0].cells[1].innerHTML;
            var name = dataTable.rows[1].cells[1].innerHTML;
            var price = dataTable.rows[3].cells[1].innerHTML;
            var column = getCol(order, 1);
            // console.log("a", column);
            var index = column.indexOf(name);
            // console.log("i", index); 

            if (index != -1){
                order[index][3] += 1;
                order[index][4] = Math.round(((order[index][2] * order[index][3]) + Number.EPSILON) * 100) / 100;
            }
            else{
                order.unshift([store, name, Math.round((parseFloat(price) + Number.EPSILON) * 100) / 100, 1, Math.round((parseFloat(price) + Number.EPSILON) * 100) / 100]);
            }
            
            document.getElementById("SoLuong").innerHTML = order.length;
            // console.log("LENGTH", order.length);
            console.log("ORDER", order);
            console.log("ORDER", order[0][0]);
            localStorage.setItem('order', JSON.stringify(order));
            localStorage.setItem('order', JSON.stringify(order));
            var ifNeedCall = true;
            localStorage.setItem('ifNeedCall', JSON.stringify(ifNeedCall));
            localStorage.setItem('store', JSON.stringify(store));
            // alert(store);
            location.href="DanhSachMonAn.html";
        };

        branch.appendChild(dataTable);
        branch.appendChild(select);
        brand[0].appendChild(branch);
        });
    }
}
