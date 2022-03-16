/* let menu = document.querySelector('#menu-bar');
  let navbar = document.querySelector('.navbar');

  menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
  }

  menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
  } */

window.onscroll = () => {
  /* menu.classList.remove("fa-times");
    navbar.classList.remove("active"); */

  if (window.scrollY > 60) {
    document.querySelector("#scroll-top").classList.add("active");
  } else {
    document.querySelector("#scroll-top").classList.remove("active");
  }
};

function loader() {
  document.querySelector(".loader-container").classList.add("fade-out");
}

function fadeOut() {
  setInterval(loader, 500);
}

window.onload = fadeOut();
//banner
const slider = document.querySelector(".slider");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slides = document.querySelectorAll(".slide");
const slideIcons = document.querySelectorAll(".slide-icon");
const numberOfSlides = 3;
var slideNumber = 0;

nextBtn.addEventListener("click", () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
  });
  slideNumber++;

  if (slideNumber > 2) {
    slideNumber = 0;
  }
  slides[slideNumber].classList.add("active");
  slideIcons[slideNumber].classList.add("active");
});
prevBtn.addEventListener("click", () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
  });
  slideNumber--;

  if (slideNumber < 0) {
    slideNumber = 2;
  }
  slides[slideNumber].classList.add("active");
  slideIcons[slideNumber].classList.add("active");
});
//auto slide
var playSlide;
var repeater = () => {
  playSlide = setInterval(function () {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    slideIcons.forEach((slideIcon) => {
      slideIcon.classList.remove("active");
    });
    slideNumber++;

    if (slideNumber > 2) {
      slideNumber = 0;
    }
    slides[slideNumber].classList.add("active");
    slideIcons[slideNumber].classList.add("active");
  }, 3000);
};
repeater();
//stop slider on mouseover
slider.addEventListener("mouseover", () => {
  clearInterval(playSlide);
});
slider.addEventListener("mouseout", () => {
  repeater();
});

//nav
/* navbar = document.querySelector(".menunav").querySelectorAll("a");
  //console.log(navbar);
  
  navbar.forEach(Element => {
    Element.addEventListener("click", function(){
      navbar.forEach(nav=>nav.classList.remove("active"))
  
      this.classList.add("active");
    })
  }) */

//Menu Nav
const menuNav = document.querySelector("#menunav");
const boxContainer = document.querySelector(".box-container");
const insertHTMLdishses = function (data) {
  const html = `
    <div class="box">
      <span class="price" data-price="${data.price}">${new Intl.NumberFormat(
    "vi-VN",
    { style: "currency", currency: "VND" }
  ).format(data.price)}</span>
      <a href="/product/${data.slug}">
        <img src="${data.images[0].url}" alt="${data.slug}">
      </a>
      <h3>${data.name}</h3>
      <div class="stars">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
      </div>
      <button class="btn" onclick="addCart('${
        data._id
      }')">đặt hàng ngay</button>
    </div>`;
  boxContainer.insertAdjacentHTML("beforeend", html);
};
const getCategory = async (id) => {
  try {
    const response = await axios({
      method: "GET",
      url: `http://localhost:3000/api/category/${id}`,
    });
    if (response.data.status === "success") {
      for (let product of response.data.data.products) {
        insertHTMLdishses(product);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const getAllProduct = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `http://localhost:3000/api/product/`,
    });
    if (response.data.status === "success") {
      for (let product of response.data.data) {
        insertHTMLdishses(product);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
menuNav.addEventListener("click", function (e) {
  e.preventDefault;
  //get Category ID
  const categoryId = e.target.dataset.id;
  if (!categoryId) return;
  //Change active
  const divTag = document.querySelector("#menunav").querySelectorAll("div");
  divTag.forEach((el) => el.classList.remove("active"));
  e.target.classList.add("active");
  // Remove html in box-container
  boxContainer.innerHTML = "";
  // Call API
  if (categoryId === "all") {
    getAllProduct();
  } else {
    getCategory(categoryId);
  }
});

/* When the user clicks on the button,
  toggle between hiding and showing the dropdown content */
const sort = document.querySelector("#sort");
function myFunction() {
  sort.classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
//SORT PRODUCT
sort.addEventListener("click", function (e) {
  e.preventDefault();
  const min = e.target.dataset.min * 1;
  const max = e.target.dataset.max * 1;
  const products = boxContainer.querySelectorAll(".box");
  for (let product of products) {
    product.style.display = "block";
    const price = product.querySelector(".price").dataset.price * 1;
    if (!(price > min && price < max)) {
      product.style.display = "none";
    }
  }
  sort.classList.remove("show");
  // Check if don't have product with sort
  const temp = [...products];
  if (temp.every((el) => el.style.display === "none")) {
    const message = document.createElement("h2");
    message.textContent = "Không tìm thấy kết quả";
    boxContainer.append(message);
  } else {
    if (boxContainer.hasChildNodes("h2")) {
      const h2 = boxContainer.querySelector("h2");
      boxContainer.removeChild(h2);
    }
  }
});
const sortApha = document.querySelectorAll(".sortAlpha");
//type 1 -> A-Z
//type -1 -> Z-A
const sortProduct = function (arr, type) {
  const temp = [...arr];
  temp.sort((a, b) => {
    if (a.querySelector("h3").textContent > b.querySelector("h3").textContent)
      return type === 1 ? 1 : -1;
    if (a.querySelector("h3").textContent < b.querySelector("h3").textContent)
      return type === 1 ? -1 : 1;
  });
  temp.forEach((el) => {
    boxContainer.append(el);
  });
};
for (let temp of sortApha) {
  temp.addEventListener("click", function (e) {
    const typeSort = e.target.dataset.sort * 1;
    const products = [].slice.call(boxContainer.querySelectorAll(".box"));
    products.forEach((el) => (el.style.display = "block"));
    boxContainer.innerHTML = "";
    if (typeSort === 1) {
      sortProduct(products, 1);
    }
    if (typeSort === -1) {
      sortProduct(products, -1);
    }
    e.stopPropagation();
    sort.classList.remove("show");
  });
}
