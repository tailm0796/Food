
window.onscroll = () => {
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

/*  Cart   */

function popup() {
  var modal = document.querySelector("#myModal");
  var cartBtn = document.getElementById("cart-btn");
  var close = document.getElementsByClassName("close")[0];
  var close_footer = document.getElementsByClassName("close-footer")[0];
  var order = document.getElementsByClassName("order")[0];
  cartBtn.onclick = function () {
    modal.style.display = "block";
  };
  close.onclick = function () {
    modal.style.display = "none";
  };
  close_footer.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
function showCart() {
  var modal = document.querySelector("#myModal");
  modal.style.display = "block";
}
popup();
let Cart = document.querySelector("#cart");
async function addCart(id) {
  try {
    const idProduct = id;
    const response  = await axios({
      method: "GET",
      url: "http://localhost:3000/api/product/addCart/"+ idProduct,
    })
    Cart.innerHTML = "";
    Cart.innerHTML = response.data;
    showCart();
    popup();
  } catch (error) {
    console.log(error)
  }
}
async function deleteItems (id) {
  try {
    const idProduct = id;
    const response  = await axios({
      method: "GET",
      url: "http://localhost:3000/api/product/deleteItem/"+idProduct,
    })
    Cart.innerHTML = "";
    Cart.innerHTML = response.data;
    showCart();
    popup();
  } catch (error) {
    console.log(error)
  }
}
async function changeQtyItems (el) {
  try {
    const response  = await axios({
      method: "GET",
      url: `http://localhost:3000/api/product/editQtyItem/${el.id}/qty/${el.value}`,
    })
    Cart.innerHTML = "";
    Cart.innerHTML = response.data;
    showCart();
    popup();
  } catch (error) {
    console.log(error)
  }
}
//LOG OUT USER
const btnLogout = document.querySelector('.btn-logout');
const logout = async function ()  {
  try {
    const res = await axios({
    method: 'GET',
    url : 'http://localhost:3000/api/user/logout',
    });
    if (res.data.status === 'success') {
    location.assign('/home')
    }
  } catch(err) {
    alert('Try Again');
  }
}
if (btnLogout) {
  btnLogout.addEventListener('click', function (e) {
    e.preventDefault();
    logout();
  })
}
function menuToggle(){
  const toggleMenu = document.querySelector('.list');
  toggleMenu.classList.toggle('active')
}

//rate - us
const sliderHome = document.querySelector(".sliderHome");
const nextBtnHome = document.querySelector(".next-btnHome");
const prevBtnHome = document.querySelector(".prev-btnHome");
const slidesHome = document.querySelectorAll(".slideHome");
const slideIconsHome = document.querySelectorAll(".slide-iconHome");
const numberOfSlidesHome = 5;
var slideNumber = 0;
nextBtnHome.addEventListener("click", () => {
  slidesHome.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideIconsHome.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
  });
  slideNumber++;

  if (slideNumber > 4) {
    slideNumber = 0;
  }
  slidesHome[slideNumber].classList.add("active");
  slideIconsHome[slideNumber].classList.add("active");
})
prevBtnHome.addEventListener("click", () => {
  slidesHome.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideIconsHome.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
  });
  slideNumber--;

  if (slideNumber < 0) {
    slideNumber = 4;
  }
  slidesHome[slideNumber].classList.add("active");
  slideIconsHome[slideNumber].classList.add("active");
})
//auto slide
var playSlide;
var repeater = () =>{
  playSlide = setInterval(function(){
    slidesHome.forEach((slide) => {
      slide.classList.remove("active");
    });
    slideIconsHome.forEach((slideIcon) => {
      slideIcon.classList.remove("active");
    });
    slideNumber++;
  
    if (slideNumber > 4) {
      slideNumber = 0;
    }
    slidesHome[slideNumber].classList.add("active");
    slideIconsHome[slideNumber].classList.add("active");
  }, 4000);
}
repeater();
// Smooth scroll
const scrollTo = document.querySelectorAll('.scroll');
scrollTo.forEach(el => el.addEventListener('click', function(e) {
  e.preventDefault();
  const section = document.querySelector(`#${e.target.dataset.section}`);
  section.scrollIntoView({behavior: "smooth"});
}));