const navigationItem = document.querySelectorAll(".navigation__item");
const menu = document.querySelector(".navigation__checkbox");
const favBtn = document.querySelector(".js-icon-heart");
const form = document.querySelector("#form");
const message = document.querySelector(".message");
const cards = document.querySelector("#queries__cards");
const signIn = document.querySelector(".signIn-form");
const errorMessage = document.querySelector(".error");
const blogPostForm = document.querySelector(".post");
const blogCards = document.querySelector(".cards__container");
const blogSection = document.querySelector(".blogs");

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy;

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

if (favBtn) favBtn.addEventListener("click", toggleFavorite);

let userLocation;
let blogId;

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

if (blogCards) {
  const renderBlogs = (doc) => {
    const card = document.createElement("div");
    const cardImage = document.createElement("div");
    const cardDescription = document.createElement("div");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    const deleteBtn = document.createElement("a");
    const readBtn = document.createElement("a");

    card.classList.add("card__blog");
    cardImage.classList.add("blog__post--image");
    cardDescription.classList.add("blog__post--description");
    h4.classList.add("blog__post--title");
    p.classList.add("blog__post--content");
    deleteBtn.classList.add("btn-red");
    readBtn.classList.add("btn-text");

    h4.textContent = doc.data().title;
    p.textContent = doc.data().content;
    deleteBtn.textContent = "delete ❌";
    readBtn.textContent = "Edit ✏";
    deleteBtn.setAttribute("href", "#");
    readBtn.setAttribute("href", "#");

    cardDescription.appendChild(h4);
    cardDescription.appendChild(p);
    cardDescription.appendChild(deleteBtn);
    cardDescription.appendChild(readBtn);

    card.setAttribute("data-id", doc.id);
    card.appendChild(cardImage);
    card.appendChild(cardDescription);

    blogCards.appendChild(card);

    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let id = card.getAttribute("data-id");
      db.collection("blogs").doc(id).delete();
    });

    readBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const blogRef = db.collection("blogs").doc(doc.id);
      blogRef.get().then((doc) => {
        blogSection.innerHTML = "";
        renderBlog(doc);
      });
    });
  };

  const renderBlog = (doc) => {
    const blog_desc = document.createElement("div");
    const ablog = document.createElement("div");
    const blog__image = document.createElement("div");
    const blog__content = document.createElement("div");
    const btn__section = document.createElement("div");
    const h1 = document.createElement("h1");
    const edit = document.createElement("a");

    blog_desc.classList.add("section__desc");
    h1.classList.add("heading__primary");
    h1.setAttribute("contenteditable", "true");
    h1.textContent = doc.data().title;

    blog_desc.appendChild(h1);

    ablog.className = "ablog";
    blog__image.className = "blog__image";
    blog__content.className = "blog__content";
    blog__content.setAttribute("contenteditable", "true");
    blog__content.textContent = doc.data().content;

    ablog.appendChild(blog__image);
    ablog.appendChild(blog__content);

    btn__section.className = "btn__section center";
    edit.className = "btn btn--green edit-blog";
    edit.textContent = "Save Changes";

    btn__section.appendChild(edit);

    blogSection.appendChild(blog_desc);
    blogSection.appendChild(ablog);
    blogSection.appendChild(btn__section);

    edit.addEventListener("click", () => {
      db.collection("blogs").doc(doc.id).set({
        title: h1.textContent,
        content: blog__content.textContent,
        writeOn: today,
      });
      alert("updated Successfully");
    });
  };

  db.collection("blogs").onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        renderBlogs(change.doc);
      } else if (change.type == "removed") {
        let blog = blogCards.querySelector("[data-id=" + change.doc.id + "]");
        blogCards.removeChild(blog);
      }
    });
  });
}

const successCallback = (position) => {
  const { latitude, longitude } = position.coords;
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

    form.reset();
  });
}

if (signIn) {
  signIn.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = signIn.username.value;
    const password = signIn.password.value;
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((response) => {
        window.location = "/UI/pages/Admin/queries.html";
      })
      .catch(function (error) {
        if (error.code === "auth/wrong-password") {
          errorMessage.innerHTML = "Wrong Password";
          signIn.reset();
        }

        if (error.code === "auth/user-not-found") {
          errorMessage.innerHTML = "User doesn't exist";
          signIn.reset();
        }

        if (error.code === "auth/invalid-email") {
          errorMessage.innerHTML = "Invalid Email";
          signIn.reset();
        }
      });
  });
}

if (blogPostForm) {
  blogPostForm.addEventListener("submit", (e) => {
    e.preventDefault();

    db.collection("blogs").add({
      title: blogPostForm.blogTitle.value,
      content: blogPostForm.blogPost.value,
      writeOn: today,
    });

    alert("Blog Successfully Posted");

    blogPostForm.reset();
  });
}
