const navigationItem = document.querySelectorAll(".navigation__item");
const menu = document.querySelector(".navigation__checkbox");
const favBtn = document.querySelector(".js-icon-heart");
const editBlogBtn = document.querySelector(".edit-blog");
const form = document.querySelector("#form");
const message = document.querySelector(".message");
const cards = document.querySelector("#queries__cards");

const hideMenu = () => {
  menu.checked = false;
};

if (navigationItem) {
  for (let i = 0; i < navigationItem.length; i++) {
    navigationItem[i].addEventListener("click", hideMenu);
  }
}

const toggleFavorite = (e) => {
  e.target.classList.toggle("icon--heart-active");
};

let editMode = false;

const editBlog = (e) => {
  const el = document.querySelector(".blog__content");
  if (!editMode) {
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(el.childNodes[0], 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
    e.target.innerHTML = "Save";
    editMode = true;
  } else {
    e.target.innerHTML = "Edit";
    editMode = false;
    window.focus();
  }
};

if (favBtn) favBtn.addEventListener("click", toggleFavorite);
if (editBlogBtn) editBlogBtn.addEventListener("click", editBlog);


let userLocation;

if (cards) {
  const renderMessages = (doc) => {
    const card = document.createElement("div");
    card.classList.add("query__card");

    card.innerHTML = `
        <div class="query__card--details">
            <h4>${doc.data().name} <span>< ${doc.data().email} ></span></h4>
            <span class="location">${doc.data().location}</span>
            <p>&rarr; ${doc.data().message}</p>
        </div>`;

    cards.appendChild(card);
  };

  db.collection("queries").onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        renderMessages(change.doc);
      }
    });
  });
}

const successCallback = (position) => {
  const {
    latitude,
    longitude
  } = position.coords;
  fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=cfb0503a9e62446bab7748c982c3ea65`
    )
    .then((response) => response.json())
    .then((response) => {
      userLocation = response["results"][0]["formatted"];
    });
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successCallback, console.log);
} else {
  alert("Geolocation is not supported");
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    db.collection("queries").add({
      email: form.email.value,
      name: form.name.value,
      message: form.query.value,
      location: userLocation,
    });

    message.textContent = "Successfully Sent";
  });
}
