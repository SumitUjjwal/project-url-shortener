let img_arr = ["./images/proj3img1.png","./images/proj3img2.png","./images/proj3img3.png","./images/proj3img4.png","./images/proj3img2.png"];

 
let i = 0;
let div = document.getElementById("customer_div");
function carousel(i){
   
    let img = document.createElement("img");
        img.src = img_arr[i];
        div.append(img);
}
carousel(i);
   
document.getElementById("next").addEventListener("click",next);
function next(){
    div.innerHTML=null;
    if(i===img_arr.length-1){
        carousel(i);
        i=0;
    }else{
        i++;
        carousel(i);
    }
}
document.getElementById("prev").addEventListener("click",prev);
function prev(){
    div.innerHTML=null;
    if(i===0){
        carousel(i);
        i=img_arr.length-1;
        
    }else{
        i--;
       carousel(i);
    }
}