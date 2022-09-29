const name = document.getElementById("name");
const birthday = document.getElementById("birthday");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const movieList = document.getElementById("movieList");
const bookSeat = document.getElementById("bookSeat");
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
const uset_phone = document.getElementById("uset_phone");
const total_selected_seat = document.getElementById("total_selected_seat");
const user_email = document.getElementById("user_email");
const heading=document.getElementById("heading");

/*-----Form validation------*/
const validateForm = () => {
  let userName = name.value;
  let userEmail = email.value;
  let userPhone = phone.value;
  let userMovieList = movieList.value;

  let userBirthday = birthday.value;
  let birth_date = new Date(userBirthday);
  let birth_date_day = birth_date.getDate();
  let birth_date_month = birth_date.getMonth();
  let birth_date_year = birth_date.getFullYear();
  let age = calculate_age(
    new Date(birth_date_year, birth_date_month, birth_date_day)
  );

  const regEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  const regPhone = /^\d{10}$/;
  if (userName === "") {
    alert("Please Enter Your Name!");
    return false;
  }
  if (userMovieList === "Choose Movie Name") {
    window.alert("Please select a Movie!");
    return false;
  }
  if (userBirthday == "") {
    alert("Please enter your age!");
    return false;
  } else {
    if (age < 12) {
      alert("Your age should be more than 12!");
      return false;
    }
  }
  if (userPhone == "" && userEmail == "") {
    alert("Please enter a phone number or e-mail address!");

    return false;
  } else {
    if (userPhone !== "") {
      if (!regPhone.test(userPhone)) {
        alert("Please enter valid phone number.");
        return false;
      }
    } else {
      if (!regEmail.test(userEmail)) {
        window.alert("Please enter a valid e-mail address.");
        return false;
      }
    }
  }
  bookSeat.classList.remove("disable");
  transparent.style.display = "none";
  event.preventDefault();
};




/*--------- age calculation-------------*/
const calculate_age = (dob) => {
  let diff_ms = Date.now() - dob.getTime();
  let age_dt = new Date(diff_ms);
  let user_age = Math.abs(age_dt.getUTCFullYear() - 1970);
  return user_age;
};
bookSeat.addEventListener("click", (e) => {
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
/*----------Book Seat-------------*/
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
  user_name.innerHTML = name.value;
  movie_name.innerHTML = movieList.value;
  uset_phone.innerHTML = phone.value;
  user_email.innerHTML = email.value;
  total_selected_seat.innerHTML = selected_seat.innerHTML;
  bookSeat.classList.add("disable");
  transparent.style.display = "block";
  heading.innerHTML="Thank You!";
});
