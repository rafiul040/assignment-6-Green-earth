//Loader
const manageLoading = status => {
  if(status == true){
    document.getElementById('spinner').classList.remove('hidden')
    document.getElementById('word-container').classList.add('hidden')
  }
  else{
    document.getElementById('spinner').classList.add('hidden')
    document.getElementById('word-container').classList.remove('hidden')
    
  }
}






// remove activeClass
const removeActive = () => {
  const lessonButtons = document.querySelectorAll('.lesson-btn');
  lessonButtons.forEach(btn => btn.classList.remove('active'));
};





const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/categories')
  .then(res => res.json())
  .then(json => {
    removeActive();
    displayCategory(json.categories);
    loadPlants();
    manageLoading(true)
  });
};





// hover or active class on categories
const handleCategoryClick = (id, categoryName) => {
  removeActive();
  const clickBtn = document.getElementById(`lesson-btn-${id}`);
  if (clickBtn) {
    clickBtn.classList.add('active');
  }
  loadPlants(categoryName);
};




// all plants api
const loadPlants = (category) => {
  fetch('https://openapi.programming-hero.com/api/plants')
  .then(res => res.json())
  .then(json => {
    let filteredPlants = json.plants;
    if (category) {
      filteredPlants = filteredPlants.filter(plant => plant.category === category);
    }
    displayPlants(filteredPlants);
  });
};







// all categories
const displayCategory = (categories) => {
  const categoryContainer = document.getElementById('categories-container');
  categoryContainer.innerHTML = "";
  for (let category of categories) {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
    <p id="lesson-btn-${category.id}" 
    onclick="handleCategoryClick(${category.id}, '${category.category_name}')" 
    class="lesson-btn cursor-pointer hover:bg-[#87a193] hover:text-white p-2 rounded-lg bg-[#f0fdf4] border-none mt-4 ml-5 text-base font-medium">${category.category_name}</p>
    `;
    categoryContainer.append(newDiv);
  }
};










// card section
const displayPlants = (plants) => {
  const containerPlants = document.getElementById('allCardContainer');
  containerPlants.innerHTML = "";
  


  for (let plant of plants) {
    const modalId = `modal-${plant.id}`
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
    <div class="card bg-base-100 md:max-w-85 m-5 shadow-sm">
    <figure class="p-5 rounded-md">
    <img class="rounded-lg h-[350px] w-[250px]" src="${plant.image}" alt="trees" />
    </figure>
    <div class="card-body">
    <h2 onclick="document.getElementById('${modalId}').showModal()" class="card-title -mt-6">${plant.name}</h2>
    
    
    
    <!-- modal -->
    <dialog id="${modalId}" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
    <h3 class="text-lg mb-2 font-bold">${plant.name}</h3>
    <img class="rounded-lg h-[350px] w-full" src="${plant.image}" alt="trees" />
    <h3 class="font-bold mt-3 text-xl">Category ${plant.category}</h3>
    <span class="text-base font-semibold"><span class="pt-5 text-lg font-bold">Price:</span> ৳${plant.price}</span>
    <p class="py-4"><span class="text-lg font-semibold">Description: </span> ${plant.description}</p>
    <div class="modal-action">
    <form method="dialog">
    <button class="btn">Close</button>
    </form>
    </div>
    </div>
    </dialog>
    
    <p class="mt-1 leading-5">${plant.description}</p>
    <div class="flex mt-2 justify-between">
    <span class="text-base font-semibold bg-[#dcfce7] rounded-xl text-[#47a069] px-5">${plant.category}</span>
    <span class="text-base font-semibold">৳${plant.price}</span>
    </div>
    <div class="card-actions mt-2 justify-end">


    <button onclick='addToCart({id: ${plant.id},name: "${plant.name}",price: ${plant.price}})' class="btn bg-[#15803d] text-white w-full rounded-3xl">Add To Cart</button>



    </div>
    </div>
    </div>
    `;
    containerPlants.append(newDiv);
  }
  manageLoading(false)
};









// // this is the right side cart

let cart = [];

// this is Add item to cart or increment
const addToCart = plant => {
  const totalItem = cart.find(item => item.id === plant.id);
  if (totalItem) {
    totalItem.quantity += 1;
  } else {
    cart.push({ ...plant, quantity: 1});
  }
  updateCartDisplay();
}


const removeFromCart = plantId => {
  cart = cart.filter(item => item.id !== plantId);
  updateCartDisplay();
}


const updateCartDisplay = () => {
  const cartContainer = document.getElementById('sideCart');
  cartContainer.innerHTML = '';

  let totalPrice = 0;
  cart.forEach(item => {
    const subTotal = item.price * item.quantity;
    totalPrice = totalPrice + subTotal;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item', 'flex', 'justify-between', 'items-center', 'border-b', 'py-1');
    itemDiv.innerHTML = `
      <div>${item.name} x ${item.quantity}</div>
      <div>
        ৳${subTotal} 
        <button onclick="removeFromCart(${item.id})" style="margin-left:10px; color:red; cursor:pointer;">❌</button>
      </div>
    `;
    cartContainer.appendChild(itemDiv);
  });




// intotal prices
const cartDiv = document.getElementById('cart-right');
  cartDiv.innerHTML = `
  <p class="text-base font-medium">Total:</p>
            <p class="text-base font-semibold">৳${totalPrice}</p>
  `;



}





loadCategories();
