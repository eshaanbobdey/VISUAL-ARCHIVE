
const validUsername = "eshaan";
const validPassword = "1234";


function validateLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === validUsername && password === validPassword) {
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid credentials. Try again.");
    }
    return false;
}


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("uploadForm");

    
    const savedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];
    savedImages.forEach((imgData, index) => {
        createPhotoCard(imgData, index);
    });

    
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const fileInput = document.getElementById("imageInput");
            const title = document.getElementById("titleInput").value;
            const desc = document.getElementById("descInput").value;
            const file = fileInput.files[0];

            if (!file) return alert("Please select an image.");

            const reader = new FileReader();
            reader.onload = function () {
                const imgURL = reader.result;

                const imageData = {
                    imgURL,
                    title,
                    desc
                };

              
                const images = JSON.parse(localStorage.getItem("galleryImages")) || [];
                images.push(imageData);
                localStorage.setItem("galleryImages", JSON.stringify(images));

                createPhotoCard(imageData, images.length - 1);
                form.reset();
            };
            reader.readAsDataURL(file);
        });
    }
});


function createPhotoCard({ imgURL, title, desc }, index) {
    const newCard = document.createElement("div");
    newCard.classList.add("photo-card");

    newCard.innerHTML = `
        <img src="${imgURL}" alt="${title}">
        <h3>${title}</h3>
        <p>${desc}</p>
        <button class="delete-btn">Delete</button>
    `;

    
    newCard.querySelector("img").addEventListener("click", () => {
        openImageModal(imgURL);
    });

    
    newCard.querySelector(".delete-btn").addEventListener("click", () => {
        newCard.remove();
        deleteFromStorage(index);
    });

    document.querySelector(".gallery").appendChild(newCard);
}


function deleteFromStorage(index) {
    const images = JSON.parse(localStorage.getItem("galleryImages")) || [];
    images.splice(index, 1);
    localStorage.setItem("galleryImages", JSON.stringify(images));


    document.querySelector(".gallery").innerHTML = "";
    images.forEach((imgData, idx) => createPhotoCard(imgData, idx));
}


function openImageModal(src) {
    const modal = document.createElement("div");
    modal.classList.add("image-modal");
    modal.innerHTML = `
        <div class="image-modal-content">
            <span class="close-btn">&times;</span>
            <img src="${src}" alt="Full Image">
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".close-btn").addEventListener("click", () => modal.remove());
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.remove();
    });
}
