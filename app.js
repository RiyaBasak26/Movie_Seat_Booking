const name_ref = document.getElementById("nameInput");
const birthday_ref = document.getElementById("birthdayInput");
const contactNo_ref = document.getElementById("contactNumberInput");
const email_ref = document.getElementById("emailInput");
const movieList = document.getElementById("movieList");
const bookSeatContainer = document.getElementById("bookSeatContainer");
const transparent = document.getElementById("transparent");
const selected_seat = document.getElementById("selectedSeat");
const available_seat = document.getElementById("availableSeat");
const book_seat_btn = document.getElementById("book_seat_btn");
const transparent_btn = document.getElementById("transparent_btn");
const input_field = document.getElementsByTagName("input");
const displayNone = document.getElementsByClassName("displayNone");
const birthday_lable = document.getElementById("birthday_lable");
const user_name = document.getElementById("user_name");
const movie_name = document.getElementById("movie_name");
const user_contact = document.getElementById("user_contact");
const total_selected_seat = document.getElementById("total_selected_seat");
const user_email = document.getElementById("user_email");
const heading=document.getElementById("heading");
const seat_container=document.getElementById("seat_container");


 let movieNameArray = ["The Lion King", "Captain America", "Tom And Jerry","Mr. Bean","cinderella"];

for (let i = 0; i < movieNameArray.length; i++) {
  let opt = movieNameArray[i];
  let option = document.createElement("option");

  option.textContent = opt;
  option.value = i;

  movieList.appendChild(option);
}

for(let i=0; i<18; i++){

  let span= document.createElement("span");
  span.classList="material-icons seat";
  span.innerHTML="event_seat";
  if(i==2 || i==5||i==9||i==11||i==15)
  {
    span.classList.add("booked");
  }
  seat_container.appendChild(span);
}


/*-----Form validation------*/

const validateForm = () => {
  let userNameValue = name_ref.value;
  let userEmailValue = email_ref.value;
  let userContactNumber = contactNo_ref.value;
  let userMovieList = movieList.value;

  let userBirthdayValue = birthday_ref.value;
  let birth_date = new Date(userBirthdayValue);
  let birth_date_day = birth_date.getDate();
  let birth_date_month = birth_date.getMonth();
  let birth_date_year = birth_date.getFullYear();
  let age = calculate_age(
    new Date(birth_date_year, birth_date_month, birth_date_day)
  );

  const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regContactNo = /^\d{10}$/;
  if (userNameValue.length === 0) {
    alert("Please Enter Your Name!");
    return false;
  }
  if (userMovieList.length == "") {
    window.alert("Please select a Movie!");
    return false;
  }
  if (userBirthdayValue.length === 0) {
    alert("Please enter your BirthDay!");
    return false;
  } else {
    if (age < 12) {
      alert("Your age should be more than 12!");
      return false;
    }
  }
  if (userContactNumber == "" && userEmailValue == "") {
    alert("Please enter a phone number or e-mail address!");

    return false;
  } else {
    if (userContactNumber !== "") {
      if (!regContactNo.test(userContactNumber)) {
        alert("Please enter valid Contact number.");
        return false;
      }
    } else {
      if (!regEmail.test(userEmailValue)) {
        window.alert("Please enter a valid e-mail address.");
        return false;
      }
    }
  }
  bookSeatContainer.classList.remove("disable");
  transparent.style.display = "none";
  event.preventDefault();
};




/*--------- age calculation-------------*/
const calculate_age = (dob) => {
  let diff = Date.now() - dob.getTime();
  let age_dt = new Date(diff);
  let user_age = Math.abs(age_dt.getUTCFullYear() - 1970);
  return user_age;
};
const isNumber=(evt)=> {
  let charCode=evt.charCode;
 if  (charCode < 48 || charCode > 57) {
     return false;
 }
 return true;
}
 const isAlphabet=(evt)=>{
  if(/^[a-zA-Z -]+$/.test(evt.key))
  {
    return true;
  }
  return false;
 }


/*------- while selecting seat-------*/
bookSeatContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("booked"))
    {
        window.alert("This seat is already selected");
    }
  if (  e.target.classList.contains("seat") && !e.target.classList.contains("booked")) 
  {
    e.target.classList.toggle("selected");

    updateSelectedSeatCount();
  }
});
/*-----------update -------------*/
const updateSelectedSeatCount = () => {
  const totalSeat = document.querySelectorAll(".seat");
  const selectedSeat = document.querySelectorAll(".selected");
  selected_seat.innerHTML = selectedSeat.length - 1;
  available_seat.innerHTML = totalSeat.length - (selectedSeat.length - 1) - 5;
  if (selectedSeat.length - 1 > 0) {
    book_seat_btn.classList.remove("disable");
    transparent_btn.style.display = "none";
  } else {
    book_seat_btn.classList.add("disable");
    transparent_btn.style.display = "block";
  }
};
/*----------on click on Book Seat button-------------*/
book_seat_btn.addEventListener("click", () => {
  let i, j;
  for (i = 0; i < input_field.length; i++) {
    input_field[i].style.display = "none";
  }
  movieList.style.display = "none";
  birthday_lable.style.display = "none";
  for (j = 0; j < displayNone.length; j++) {
    displayNone[j].style.display = "block";
  }
  user_name.innerHTML = name_ref.value;
  movie_name.innerHTML = movieNameArray[movieList.value];
  user_contact.innerHTML = contactNo_ref.value;
  user_email.innerHTML = email_ref.value;
  total_selected_seat.innerHTML = selected_seat.innerHTML;
  bookSeatContainer.classList.add("disable");
  transparent.style.display = "block";
  heading.innerHTML="Thank You!";
});