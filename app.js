const name_ref = document.getElementById("nameInput");
const birthday_ref = document.getElementById("birthdayInput");
const contactNo_ref = document.getElementById("contactNumberInput");
const email_ref = document.getElementById("emailInput");
const movie_list = document.getElementById("movieList");
const book_seat_container = document.getElementById("bookSeatContainer");
const transparent = document.getElementById("transparent");
const selected_seat = document.getElementById("selectedSeat");
const available_seat = document.getElementById("availableSeat");
const book_seat_btn = document.getElementById("bookSeatBtn");
const transparent_btn = document.getElementById("transparentBtn");
const input_field = document.getElementsByTagName("input");
const display_none = document.getElementsByClassName("displayNone");
const birthday_lable = document.getElementById("birthdayLable");
const user_name = document.getElementById("userName");
const movie_name = document.getElementById("movieName");
const user_contact = document.getElementById("userContact");
const total_selected_seat = document.getElementById("totalSelectedSeat");
const user_email = document.getElementById("userEmail");
const heading=document.getElementById("heading");
const seat_container=document.getElementById("seatContainer");
const bookedSeat=document.getElementById("bookedSeat");

/*----it will help to show the dropdowm option on movie name ----*/
 let movieNameArray = ["The Lion King", "Captain America", "Tom And Jerry","Mr. Bean","cinderella"];
  movieNameArray.forEach((Element,index)=>{
  const option = document.createElement("option");
  option.textContent = Element;
  option.value = index;
  movie_list.appendChild(option);
});


/*--------it will help to show the seat in UI -------*/
for(let i=0; i<18; i++){
  const span= document.createElement("span");
  span.classList="material-icons seat";
  span.innerHTML="event_seat";
  const random_no = Math.floor((Math.random() * 18) + 1);
  if(random_no==i)
  {
    span.classList.add("booked");
  }
  const booked=document.getElementsByClassName("booked");
  available_seat.innerHTML=18-(booked.length-1);
  bookedSeat.innerHTML=booked.length-1;
  seat_container.appendChild(span);
}


/*-----Form validation------*/

const validateForm = () => {
  const user_name_value = name_ref.value;
  const user_email_value = email_ref.value;
  const user_contact_number = contactNo_ref.value;
  const user_movie_list = movie_list.value;

  const user_birthday_value = birthday_ref.value;
  const birth_date = new Date(user_birthday_value);
  const birth_date_day = birth_date.getDate();
  const birth_date_month = birth_date.getMonth();
  const birth_date_year = birth_date.getFullYear();
  const age = calculate_age(
    new Date(birth_date_year, birth_date_month, birth_date_day)
  );

  const reg_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const reg_contact_no = /^\d{10}$/;
  if (user_name_value.length === 0) {
    alert("Please Enter Your Name!");
    return false;
  }
  if (user_movie_list.length == "") {
    window.alert("Please select a Movie!");
    return false;
  }
  if (user_birthday_value.length === 0) {
    alert("Please enter your BirthDay!");
    return false;
  } else {
    if (age < 12) {
      alert("Your age should be more than 12!");
      return false;
    }
  }
  if (user_contact_number == "" && user_email_value == "") {
    alert("Please enter a phone number or e-mail address!");

    return false;
  } else {
    if (user_contact_number !== "") {
      if (!reg_contact_no.test(user_contact_number)) {
        alert("Please enter valid Contact number.");
        return false;
      }
    } else {
      if (!reg_email.test(user_email_value)) {
        window.alert("Please enter a valid e-mail address.");
        return false;
      }
    }
  }
  book_seat_container.classList.remove("disable");
  transparent.style.display = "none";
  event.preventDefault();
};




/*--------- age calculation-------------*/
const calculate_age = (dob) => {
  const diff = Date.now() - dob.getTime();
  const age_dt = new Date(diff);
  const user_age = Math.abs(age_dt.getUTCFullYear() - 1970);
  return user_age;
};
const isNumber=(evt)=> {
  const charCode=evt.charCode;
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
book_seat_container.addEventListener("click", (event) => {
    if(event.target.classList.contains("booked"))
    {
        window.alert("This seat is already selected");
    }
  if (  event.target.classList.contains("seat") && !event.target.classList.contains("booked")) 
  {
    event.target.classList.toggle("selected");

    updateSelectedSeatCount();
  }
});
/*-----------update seat -------------*/
  const updateSelectedSeatCount = () => {
  const totalSeat = document.querySelectorAll(".seat");
  const selected_seats = document.querySelectorAll(".selected");
  const booked=document.getElementsByClassName("booked");
  selected_seat.innerHTML = selected_seats.length - 1;
  available_seat.innerHTML = totalSeat.length - (selected_seats.length - 1) - (booked.length-1);
  if (selected_seats.length - 1) {
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
  movie_list.style.display = "none";
  birthday_lable.style.display = "none";
  for (j = 0; j < display_none.length; j++) {
    display_none[j].style.display = "block";
  }
  user_name.innerHTML = name_ref.value;
  movie_name.innerHTML = movieNameArray[movie_list.value];
  user_contact.innerHTML = contactNo_ref.value;
  user_email.innerHTML = email_ref.value;
  total_selected_seat.innerHTML = selected_seat.innerHTML;
  book_seat_container.classList.add("disable");
  transparent.style.display = "block";
  heading.innerHTML="Thank You!";
});