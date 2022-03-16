
const LoginForm = document.querySelector('#Loginform');
const Regform = document.querySelector('#Regform');
const Indicator = document.querySelector('#Indicator');          
    function register(){
      Regform.style.transform = "translateX(0px)";
      LoginForm.style.transform = "translateX(0px)";
      Indicator.style.transform = "translateX(100px)";
    }
    function login(){
      Regform.style.transform = "translateX(450px)";
      LoginForm.style.transform = "translateX(475px)";
      Indicator.style.transform = "translateX(-10px)";
    }
//DISPLAY FORM FOR USER
// ALERT ///
const hideAlert = () => { 
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};
const showAlert = (type, message) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${message}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 3000);
}
// HANDLE FORM
const loginUser = async (email, password) => {
  try {
  const response = await axios ({
    method: 'POST',
    url:'http://localhost:3000/api/user/login',
    data: {
      email,
      password,
    }
  })
  if (response.data.status === 'success'){
    showAlert('success', 'Login Successfully');
    window.setTimeout(() => {
      location.assign('/home')
    }, 1000);
  }
  } catch (err) {
    showAlert('failed', err.response.data.message);
  }
}
LoginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[name="email"]').value;
  const password = e.target.querySelector('input[name="password"]').value;
  loginUser(email,password); 
})
//RESGISTER
const registerUser = async (data) => {
  try {
  const response = await axios ({
    method: 'POST',
    url:'http://localhost:3000/api/user/signup',
    data,
  })
  if (response.data.status === 'success'){
    showAlert('success', 'Register Successfully');
    window.setTimeout(() => {
      location.assign('/home')
    }, 1000);
  }
  } catch (err) {
    showAlert('failed', err.response.data.message);
  }
}
Regform.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = e.target.querySelector('input[name="username"]').value;
  const email = e.target.querySelector('input[name="email"]').value;
  const password = e.target.querySelector('input[name="password"]').value;
  const confirmPassword = e.target.querySelector('input[name="confirmPassword"]').value;
  const phone = e.target.querySelector('input[name="phone"]').value;
  const address = e.target.querySelector('input[name="address"]').value;
  registerUser({username, email, password, confirmPassword, phone, address})
})