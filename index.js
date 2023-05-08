const price= document.querySelector('.price');
const pname= document.querySelector('.name');
const btn=document.getElementById('submitbtn');
const form=document.getElementById('my-form');
const list=document.getElementById('items');
const value=document.querySelector('#value');


const obj={
    price: '',
    name: ''
    
}
 
function createli(user){
    const li=document.createElement('li');
    li.innerHTML=`${user.price} ${user.name}`;

    const deletebtn =document.createElement('button');
    deletebtn.innerHTML='Delete Product';
    deletebtn.className='delete';
    deletebtn.setAttribute('data-id',user._id);

    li.appendChild(deletebtn);
    list.appendChild(li);
}

btn.addEventListener('click',(e)=>{
     e.preventDefault();
     obj.price=price.value;
     obj.name=pname.value;

     axios.post('https://crudcrud.com/api/1f3bee212a55499e8b1acc09838c3f02/stockData',obj)
     .then((response)=>{
        createli(response.data);
        console.log(response.data);
        console.log(response.data.price);
      let val=0;
        //val+=parseInt(response.data.price);
        console.log(val);
        value.innerHTML=`${val+=(parseInt(response.data.price))}`
        form.reset();
     })
     .catch((error)=>{
        console.log(error);
     })
})

function showData(){
    axios.get('https://crudcrud.com/api/1f3bee212a55499e8b1acc09838c3f02/stockData')
    .then((response)=>{
        for(let i=0;i<response.data.length;i++){
            createli(response.data[i]);

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
        
        axios.delete(`https://crudcrud.com/api/1f3bee212a55499e8b1acc09838c3f02/stockData/${id}`)
        .then((response)=>{
            e.target.parentNode.remove();
            
        })
        .catch((error)=>{
            console.log(error);
        })

       
    }
})