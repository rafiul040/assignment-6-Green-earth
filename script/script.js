const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/categories')
  .then(res => res.json())
  .then(json => displayCategory(json.categories))
}

const loadPlants = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(json => displayPlants(json.plants))
}

const displayCategory = (categories) => {
    const categoryContainer = document.getElementById('categories-container');
    categoryContainer.innerHTML = "";
    for(let category of categories){
        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
        <p class="mt-4 ml-5 text-base font-medium">${category.category_name}</p>
        `
        categoryContainer.append(newDiv)
    }
};

loadCategories()















const displayPlants = (plants) => {
    const containerPlants = document.getElementById('allCardContainer')
    containerPlants.innerHTML = "";



    for(let plant of plants){
        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
        <div class="card bg-base-100 md:max-w-85 m-5 shadow-sm">
            <figure class="p-5 rounded-md">
              <img class="rounded-lg h-[350px] w-[250px]"
                src="${plant.image}"
                alt="trees"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title -mt-6">${plant.name}</h2>
              <p class="mt-1 leading-5">${plant.description}</p>
              <div class="flex mt-2 justify-between">
                <span class="text-base font-semibold bg-[#dcfce7] rounded-xl text-[#47a069] px-5">${plant.category}</span>
                <span class="text-base font-semibold">৳${plant.price}</span>
              </div>
              <div class="card-actions mt-2 justify-end">
                <button class="btn bg-[#15803d] text-white w-full rounded-3xl">Add To Cart</button>
              </div>
            </div>
          </div>
        `


        containerPlants.append(newDiv)
    }

}


loadPlants()