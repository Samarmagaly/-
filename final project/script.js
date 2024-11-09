
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let image=document.getElementById('productImage');
let sabmit = document.getElementById('submit');
let mood ='create';
let tmp;

function getTotal()
{
if(price.value !='')
{
    let reslut =(+price.value + +taxes.value + +ads.value)- +discount.value;
    total.innerHTML =reslut;
    total.style.background='#040';
} else
{
    total.innerHTML='';
    total.style.background='#a00d02';  
} 
}
//create product

if(localStorage.product !=null){
    dataPro=JSON.parse(localStorage.product)
}else
{
    dataPro = [];
}


submit.onclick = function()
{
    let newPro ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
        image:`images/${image.files[0].name}`,
    }
    if(title.value !='' 
    &&price.value !=''
    &&category.value !=''
    
    && newPro.count<100
    )
if(mood == 'create'){
    if(newPro.count>1){
        for(let i=0; i<newPro.count; i++){
            dataPro.push(newPro);
        }
      }
        else{
            dataPro.push(newPro);
        
      }
}else{
    dataPro[ tmp  ]= newPro;
    mood = 'create';
    sabmit.innerHTML = 'أضافه';
    count.style.display = 'block';

}
   

    //save data in local storage
    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData()
    showData()
}



//clear inputs
function clearData(){
title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';

total.innerHTML='';
image.value='';
count.value='';
category.value='';
}
//read data
function showData(){
let table='';
for(let i=0;i<dataPro.length;i++){
 table +=` <tr>
 <td>${i+1}</td> 
 <td>${dataPro[i].title}</td> 
 <td>${dataPro[i].price}</td> 
 <td>${dataPro[i].taxes}</td> 
 <td>${dataPro[i].ads}</td> 
 <td>${dataPro[i].discount}</td> 
 <td>${dataPro[i].total}</td>
 <td>${dataPro[i].category}</td>
 <td><img src="${dataPro[i].image}" alt="" width="50" height="50"></td>
 <td><button onclick="updateData(${i})" id="update"><i class="fa-solid fa-pen-nib"></i></button></td>
<td><button onclick="deleteData(${i})" id="delete"><i class="fa-solid fa-trash"></i></button></td> 
 
</tr>`
 
}
document.getElementById('tbody').innerHTML=table;
let btnDelete = document.getElementById('deleteAll');
 
if(dataPro.length > 0)
{
   btnDelete.innerHTML =` <button onclick="deleteAll()">ازاله الكل (${dataPro.length})</button>`
   btnDelete.innerHTML.style.background="red";
  
}else
{
    btnDelete.innerHTML='';   
}
}
showData()
//count


//delete
function deleteData(i)
{
// dataPro.splice(i);
dataPro.pop()
localStorage.product=JSON.stringify(dataPro);
showData()
}
function deleteAll(){
localStorage.clear()
dataPro.splice(0)
showData()
}
//update
function updateData(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    getTotal();
    count.style.display= 'none';
    
    category.value= dataPro[i].category;
    image.files=dataPro[0].name;
    sabmit.innerHTML='تعديل';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}
// ==========================================search===========================


let searchMood ='title';
function getSearchMood(id)
{
    
    let search=document.getElementById('search');
    if(id=="searchTitle"){
        searchMood="title";
        search.placeholder = 'search by title';
    }else
    {
        searchMood="category";
        search.placeholder = 'search by '+searchMood;
    }
    search.focus()
    search.value='';
    showData()

}
function searchData(value)
{
    let table='';
    const arabicRegex = /[\u0600-\u06FF]+/g;
    for(let i=0; i<dataPro.length; i++)
if(searchMood=='title'){
    
    {
        if(dataPro[i].title.includes(value.toLowerCase()))
            
        
        {
            table +=` <tr>
            <td>${i}</td> 
            <td>${dataPro[i].title}</td> 
            <td>${dataPro[i].price}</td> 
            <td>${dataPro[i].taxes}</td> 
            <td>${dataPro[i].ads}</td> 
            <td>${dataPro[i].discount}</td> 
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].image}</td>
            <td><button onclick="updateData(${i})" id="update"><i class="fa-solid fa-pen-nib"></i></button></td>
           <td><button onclick="deleteData(${i})" id="delete"><i class="fa-solid fa-trash"></i></button></td> 
            
           </tr>`
        }
    }
}else{
    
    {
        if(dataPro[i].category.includes(value.toLowerCase())){
            table +=` <tr>
            <td>${i}</td> 
            <td>${dataPro[i].title}</td> 
            <td>${dataPro[i].price}</td> 
            <td>${dataPro[i].taxes}</td> 
            <td>${dataPro[i].ads}</td> 
            <td>${dataPro[i].discount}</td> 
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].files.image}</td>
            <td><button onclick="updateData(${i})" id="update"><i class="fa-solid fa-pen-nib"></i></button></td>
           <td><button onclick="deleteData(${i})" id="delete"><i class="fa-solid fa-trash"></i></button></td> 
            
           </tr>`
        }
    }
}

document.getElementById('tbody').innerHTML=table;
}







//search by arabic

// function searchData(value) {
//     const arabicRegex = /[\u0600-\u06FF]+/g; // Range for Arabic characters
//     const dataPro = value.match(arabicRegex);
//     return dataPro ? dataPro : [];
// }

// // Example usage
// const text = "Here is some text with Arabic: مرحبا بكم";
// const arabicLetters = searchArabicLetters(text);
// console.log(arabicLetters); // Output: [ 'مرحبا', 'بكم' ]
// document.getElementById('tbody').innerHTML=table;



