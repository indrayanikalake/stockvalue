const price= document.querySelector('.price');
const pname= document.querySelector('.name');
const btn=document.getElementById('submitbtn');
const form=document.getElementById('my-form');
const list=document.getElementById('items');
const value=document.querySelector('#value');
const totalPriceSpan = document.getElementById('totalPrice');
const it=document.querySelector('.list');
const login=document.querySelector('.log');
let totalPrice = 0;



const obj={
    price: '',
    name: ''
    
}
 
function createli(user){
    const li=document.createElement('li');

    li.innerHTML=`Price: ${user.price}<br>Product: ${user.name}<br>`;
    const deletebtn =document.createElement('button');
    deletebtn.innerHTML='Delete Product';

    deletebtn.className='delete';
    deletebtn.setAttribute('data-id',user._id);
    deletebtn.style.color='white';
    deletebtn.style.background='red';
    deletebtn.style.width='150px';
    deletebtn.style.height='25px';

    li.style.alignItems='center';
    li.style.padding='5px'
    li.style.color='black';
    li.appendChild(deletebtn);
    li.style.borderBottom='3.5px solid #fff';
    list.appendChild(li);
   

    if (list.scrollHeight > list.clientHeight) {
        list.style.overflowY = 'scroll';
        list.style.maxHeight = '200px';
      }

}

function updateProduct(val){
totalPrice+=parseInt(val);
totalPriceSpan.innerHTML=totalPrice;
}
btn.addEventListener('click',(e)=>{
     e.preventDefault();
     obj.price=price.value;
     obj.name=pname.value;

     axios.post('https://crudcrud.com/api/9f59aba015a34044bbadcdcd5beff14b/stockData',obj)
     .then((response)=>{
        createli(response.data);
        console.log(response.data);
        console.log(response.data.price);
        updateProduct(response.data.price);

        form.reset();
     })
     .catch((error)=>{
        console.log(error);
     })
})

function showData(){
    axios.get('https://crudcrud.com/api/9f59aba015a34044bbadcdcd5beff14b/stockData')
    .then((response)=>{
        for(let i=0;i<response.data.length;i++){
            createli(response.data[i]);
            console.log(response.data[i].price);
            updateProduct(response.data[i].price);
        }
    })
    .catch((error)=>{
        console.log(error);
    })
}
document.addEventListener('DOMContentLoaded',showData);


list.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete')){
        const id=e.target.getAttribute('data-id');
        console.log(id);
        
        axios.delete(`https://crudcrud.com/api/9f59aba015a34044bbadcdcd5beff14b/stockData/${id}`)
        .then((response)=>{
            const list=e.target.parentElement.innerHTML;
            const text=list.split('<br>'); 
            const el=text[0].split(' ');
            console.log(el[1]);
            updateProduct(-el[1]);
            e.target.parentNode.remove();
        
        })
        .catch((error)=>{
            console.log(error);
        })

       
    }
})