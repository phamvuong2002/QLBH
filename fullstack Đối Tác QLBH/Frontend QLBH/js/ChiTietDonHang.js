var order = JSON.parse(localStorage.getItem('order') || '[]');

function pay(){
    

    localStorage.removeItem('order');
    // alert("clicked");
}