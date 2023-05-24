const price = document.querySelector('.price');
const pname = document.querySelector('.name');
const btn = document.getElementById('submitbtn');
const form = document.getElementById('my-form');
const list = document.getElementById('items');
const value = document.querySelector('#value');
const totalPriceSpan = document.getElementById('totalPrice');

let totalPrice = 0;

const obj = {
  price: '',
  name: '',
};

function createLi(user) {
  const li = document.createElement('li');

  li.innerHTML = `Price: ${user.price}<br>Product: ${user.name}<br>`;
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'Delete Product';

  deleteBtn.className = 'delete';
  deleteBtn.setAttribute('data-id', user._id);
  deleteBtn.style.color = 'white';
  deleteBtn.style.background = 'red';
  deleteBtn.style.width = '150px';
  deleteBtn.style.height = '25px';

  li.style.alignItems = 'center';
  li.style.padding = '5px';
  li.style.color = 'black';

  li.appendChild(deleteBtn);
  li.style.borderBottom = '3.5px solid #fff';
  list.appendChild(li);

}

function updateProduct(val) {

  totalPrice += parseInt(val);
  totalPriceSpan.innerHTML = totalPrice;
  
}

btn.addEventListener('click', async (e) => {
  e.preventDefault();

  obj.price = price.value;
  obj.name = pname.value;

  try {
    const response = await axios.post(
      'https://crudcrud.com/api/1f86148a51514816bf8b198cf56fa934/stockData',obj
    );
    createLi(response.data);
    console.log(response.data);
    console.log(response.data.price);
    updateProduct(response.data.price);

    form.reset();
  } catch (error) {
    console.log(error);
  }
});

async function showData() {
  try {
    const response = await axios.get(
      'https://crudcrud.com/api/1f86148a51514816bf8b198cf56fa934/stockData'
    );
    for (let i = 0; i < response.data.length; i++) {
      createLi(response.data[i]);
      console.log(response.data[i].price);
      updateProduct(response.data[i].price);
    }
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener('DOMContentLoaded', showData);

list.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete')) {
    const id = e.target.getAttribute('data-id');
    console.log(id);

    try {
      const response = await axios.delete(
        `https://crudcrud.com/api/1f86148a51514816bf8b198cf56fa934/stockData/${id}`
        
      );
      const list = e.target.parentElement.innerHTML;
      const text = list.split('<br>');
      const el = text[0].split(' ');
      console.log(el[1]);
      updateProduct(-el[1]);
      e.target.parentNode.remove();
    } catch (error) {
      console.log(error);
    }
  }
});



+
btn.addEventListener('mouseover',(e)=>{
  e.preventDefault();
  e.target.style.background='red';
  })
 btn.addEventListener('mouseout',(e)=>{
  e.preventDefault();
  btn.style.background='#e9045c';
 })




