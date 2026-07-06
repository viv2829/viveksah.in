var store = document.querySelector(':root');

function setDarkMode() {
    const checkBox = document.getElementById("darkMode");

    if (checkBox.checked) {

        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");

    } else {

        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");

    }


}

window.addEventListener("DOMContentLoaded", () => {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.documentElement.classList.add("dark");
        document.getElementById("darkMode").checked = true;

    }

});

const glow = document.getElementById("cursorGlow");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

window.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});

function animateGlow() {

    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    glow.style.left = currentX + "px";
    glow.style.top = currentY + "px";

    requestAnimationFrame(animateGlow);

}

animateGlow();

document.querySelectorAll("button,a,.chips").forEach(item => {

    item.addEventListener("mouseenter", () => {

        glow.classList.add("large");

    });

    item.addEventListener("mouseleave", () => {

        glow.classList.remove("large");

    });

});

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: .15
});

reveals.forEach(section => {

    observer.observe(section);

});

document.addEventListener('DOMContentLoaded', () => {

    const accordionItems =
        document.querySelectorAll('.accordionItem');
    const accordionImage = document.getElementById('accordionImage');

    const images = [
        "images/productDesign.png",
        "images/enterprise.png",
        "images/designSystem.png",
        "images/aiworkflows.png",
        "images/consumer.png",
        "images/motion.gif"
    ];

    accordionItems.forEach((item, index) => {

        const header =
            item.querySelector('.accordionHeader');

        header.addEventListener('click', () => {

            const isActive =
                item.classList.contains('active');

            accordionItems.forEach(acc => {
                acc.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
                accordionImage.src = images[index];
            }

        });

    });

});


const modal = document.getElementById("productModal");

const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalImg = document.getElementById("modalImg");
const modalTags = document.getElementById("modalTags");

const chips = document.querySelectorAll(".chips");

let currentIndex = 0;


// ---------- Load Project ----------

function loadProject(index) {

    const chip = chips[index];

    modalTitle.textContent = chip.dataset.title;

    modalCategory.textContent = chip.dataset.category;

    modalDescription.innerHTML = chip.dataset.description;

    modalImg.src = chip.dataset.image;

    modalImg.alt = chip.dataset.title;

    // Tags
    modalTags.innerHTML = "";

    if (chip.dataset.tags) {

        chip.dataset.tags.split(",").forEach(tag => {

            const span = document.createElement("span");

            span.textContent = tag.trim();

            modalTags.appendChild(span);

        });

    }

    currentIndex = index;

    updateNavigationButtons();

}


// ---------- Navigation Labels ----------

function updateNavigationButtons() {

    const prevIndex = (currentIndex - 1 + chips.length) % chips.length;
    const nextIndex = (currentIndex + 1) % chips.length;

    document.getElementById("prevProject").innerHTML = `
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.161041 4.61145L4.61159 0.160901C4.71465 0.0578757 4.85441 -1.77183e-07 5.00014 -1.64443e-07C5.14587 -1.51703e-07 5.28563 0.0578758 5.38869 0.160901L5.90787 0.679666C6.01065 0.782696 6.06836 0.92228 6.06836 1.0678C6.06836 1.21333 6.01065 1.35291 5.90787 1.45594L2.38069 4.99771L5.90787 8.53948C6.01065 8.64251 6.06836 8.78209 6.06836 8.92761C6.06836 9.07314 6.01065 9.21272 5.90787 9.31575L5.38911 9.8391C5.28604 9.94212 5.14628 10 5.00056 10C4.85483 10 4.71507 9.94212 4.612 9.8391L0.161041 5.38855C0.0580156 5.28549 0.000139684 5.14573 0.000139698 5C0.000139712 4.85427 0.0580156 4.71451 0.161041 4.61145Z" fill="var(--grey)"/>
</svg>


         `;

    document.getElementById("nextProject").innerHTML = `
        
        
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.90732 5.38855L1.45677 9.8391C1.35371 9.94212 1.21395 10 1.06822 10C0.922492 10 0.78273 9.94212 0.679666 9.8391L0.160484 9.32033C0.0577134 9.2173 -1.0101e-06 9.07772 -9.93908e-07 8.9322C-9.77716e-07 8.78667 0.0577135 8.64709 0.160484 8.54406L3.68767 5.00229L0.160485 1.46052C0.0577143 1.35749 -1.3552e-07 1.21791 -1.19327e-07 1.07239C-1.03134e-07 0.926863 0.0577143 0.78728 0.160485 0.68425L0.67925 0.160902C0.782314 0.057876 0.922076 1.02602e-07 1.0678 1.18817e-07C1.21353 1.35033e-07 1.35329 0.057876 1.45636 0.160902L5.90732 4.61145C6.01034 4.71451 6.06822 4.85427 6.06822 5C6.06822 5.14573 6.01034 5.28549 5.90732 5.38855Z" fill="var(--grey)"/>
</svg>



    `;
}




// ---------- Open Modal ----------

chips.forEach((chip, index) => {

    chip.addEventListener("click", () => {

        loadProject(index);

        modal.classList.add("show");

    });

});


// ---------- Close ----------

document.querySelector(".closeModal").addEventListener("click", () => {

    modal.classList.remove("show");

});

modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.classList.remove("show");

    }

});


// ---------- Next ----------

document.getElementById("nextProject").addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= chips.length) {

        currentIndex = 0;

    }

    loadProject(currentIndex);

});


// ---------- Previous ----------

document.getElementById("prevProject").addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = chips.length - 1;

    }

    loadProject(currentIndex);

});


// ---------- Keyboard ----------

document.addEventListener("keydown", (e) => {

    if (!modal.classList.contains("show")) return;

    if (e.key === "Escape") {

        modal.classList.remove("show");

    }

    if (e.key === "ArrowRight") {

        document.getElementById("nextProject").click();

    }

    if (e.key === "ArrowLeft") {

        document.getElementById("prevProject").click();

    }

});







//drawer menu

const menu = document.querySelector(".hamburgerMenu");
const drawer = document.querySelector(".drawer");
const hamburger = document.querySelector(".hamburgerIcon");
const drawerClose = document.querySelector(".drawerCloseIcon");

menu.addEventListener("click", () => {

    drawer.classList.toggle("active");

    hamburger.classList.toggle("hide");
    drawerClose.classList.toggle("show");

});




const images = document.querySelectorAll(".modalImage, .container");

images.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const img = card.querySelector("img, svg");

        const rect = card.getBoundingClientRect();

        const x = ((e.clientX-rect.left)/rect.width)*100;
        const y = ((e.clientY-rect.top)/rect.height)*100;

        img.style.transformOrigin = `${x}% ${y}%`;

    });

});