const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}
const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = ``;
    // phones = phones.slice(0, 10);
    const showAll = document.getElementById("show-all");
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove("d-none");
    }
    else {
        showAll.classList.add("d-none");
    }

    const noPhone = document.getElementById("no-found-message");
    // console.log(phones.length)
    if (phones.length === 0) {
        noPhone.classList.remove("d-none");
    }
    else {
        noPhone.classList.add("d-none");
    }
    phones.forEach(phone => {
        // console.log(phone);
        const { image, phone_name, slug } = phone;
        const phoneDiv = document.createElement("div");
        phoneDiv.classList.add("col");
        phoneDiv.innerHTML = `
       <div class="card h-100">
                        <img src="${image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.</p>
                                <button onclick="loadPhoneDetail('${slug}')" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#phoneDetailModalLabel" >Show Details</button> 
                        </div>
                    </div>
       `;
        phoneContainer.appendChild(phoneDiv);
    });
    //stop loader 
    toggleSpinner(false)
}

const searchField = document.getElementById("search-field");
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
    // searchField.value = '';
}


document.getElementById("btn-search").addEventListener("click", () => {
    // start loader 
    /*  toggleSpinner(true);
     const searchField = document.getElementById("search-field");
     searchText = searchField.value;
     searchField.value = '';
     loadPhone(searchText); */
    processSearch(10)

});
document.getElementById("search-field").addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        processSearch(10);
    }
})
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById("loader");
    if (isLoading) {

        loaderSection.classList.remove("d-none");
    }
    else {
        loaderSection.classList.add("d-none")
    }
}
    
document.getElementById("button-show-all").addEventListener("click", () => {
    processSearch();
    searchField.value = '';
});
const loadPhoneDetail = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data)
}
const displayPhoneDetail = (id) => {
    console.log(id)
    const { name, releaseDate, image } = id;
    const modalTitle = document.getElementById("exampleModalLabel");
    modalTitle.innerText = name;
    const phoneDetail = document.getElementById("phone-detail");
    phoneDetail.innerHTML = `
     <img src="${image}" class="card-img-top" alt="...">
   `;
}

// loadPhone("iphone")