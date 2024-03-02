function filter_image() {
    var lst = document.getElementsByClassName("image-line");
    var filter_situation = document.getElementById("filter-situation").value;
    console.log(filter_situation);
    for(var i = 0; i < lst.length; ++i) {
        if(filter_situation == 0){
            if(lst[i].querySelector('.pending')){
                lst[i].style.display = "block";
            }else if(lst[i].querySelector('.validated') || lst[i].querySelector('.rejected')){
                lst[i].style.display = "none";
            }
        }
        else if(filter_situation == 1){
            if(lst[i].querySelector('.validated')){
                lst[i].style.display = "block";
            }else if(lst[i].querySelector('.pending') || lst[i].querySelector('.rejected')){
                lst[i].style.display = "none";
            }
        }
        else if(filter_situation == 2){
            if(lst[i].querySelector('.rejected')){
                lst[i].style.display = "block";
            }else if(lst[i].querySelector('.validated') || lst[i].querySelector('.pending')){
                lst[i].style.display = "none";
            }
        }else{
            lst[i].style.display = "block";
        }
    }
};

function filter_situation(){
    var filter_situation = document.getElementById("filter-situation").value;

    var searchParams = new URLSearchParams(window.location.search);
    searchParams.set("situacao", filter_situation);
    searchParams.set("page", 1);
    window.location.search = searchParams.toString();
}

$( document ).ready(function() {
    var searchParams = new URLSearchParams(window.location.search);
    var situation = searchParams.get('situacao')
    document.getElementById("filter-situation").value = situation;

    if (document.getElementById("filter-situation").value == ''){
        document.getElementById("filter-situation").value = 3;
    }
});
