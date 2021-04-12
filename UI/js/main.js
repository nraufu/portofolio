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
const userBlogSection = document.querySelector(".blog__posts");
const allBlogsSection = document.querySelector(".cards__blog--container");
const specificBlogSection = document.querySelector(".aBlog");
const commentSection = document.querySelector(".comment__section");
const commentForm = document.querySelector(".comment__form");
const logout = document.querySelector(".logout");

const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("id");

let adminToken = localStorage.getItem("token");

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

if (cards || blogCards || blogPostForm) {
  logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "./signIn.html";
  });
}

if (cards) {
  const renderMessages = (query) => {
    const card = document.createElement("div");
    card.classList.add("query__card");

    card.innerHTML = `
        <div class="query__card--details">
            <h4>${query.name} <span>< ${query.email} ></span></h4>
            <p>&rarr; ${query.query}</p>
        </div>`;

    cards.appendChild(card);
  };

  axios.get("https://portfolio-nr.herokuapp.com/queries/", {
    headers: { "x-auth-token": adminToken }
  }).then(response => {
    const { queries } = response.data;
    queries.map(query => renderMessages(query));
  }).catch(err => alert("Unexpected Error"));

}

if (blogCards) {
  const renderBlogs = (post) => {
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

    h4.textContent = post.title;
    p.textContent = post.content;
    deleteBtn.textContent = "delete ❌";
    readBtn.textContent = "Edit ✏";
    deleteBtn.setAttribute("href", "#");
    readBtn.setAttribute("href", "#");

    cardDescription.appendChild(h4);
    cardDescription.appendChild(p);
    cardDescription.appendChild(deleteBtn);
    cardDescription.appendChild(readBtn);

    card.setAttribute("data-id", post._id);
    card.appendChild(cardImage);
    card.appendChild(cardDescription);

    blogCards.appendChild(card);

    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let id = card.getAttribute("data-id");
      axios.delete(`https://portfolio-nr.herokuapp.com/posts/${id}`, {
        headers: { "x-auth-token": adminToken }
      }).then(response => {
        alert("Delete successfully");
        location.reload();
      }).catch(err => alert("Unexpected Error"));

    });

    readBtn.addEventListener("click", (e) => {
      e.preventDefault();

      axios.get(`https://portfolio-nr.herokuapp.com/posts/${post._id}`).then(response => {
        blogSection.innerHTML = "";
        renderBlog(response.data.post);
      });
    });
  };

  const renderBlog = (post) => {
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
    h1.textContent = post.title;

    blog_desc.appendChild(h1);

    ablog.className = "ablog";
    blog__image.className = "blog__image";
    blog__content.className = "blog__content";
    blog__content.setAttribute("contenteditable", "true");
    blog__content.textContent = post.content;

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
      axios({
        method: 'PATCH',
        headers: { "x-auth-token": adminToken },
        data: {
          title: h1.textContent,
          content: blog__content.textContent,
          imgLink: "https://newsroom.cisco.com/documents/10157/14740/connundrum_1200x675_hero_focus_0317.jpg/0c1554f7-291b-4056-b419-2ce8013008f6"
        },
        url: `https://portfolio-nr.herokuapp.com/posts/${post._id}`
      }).then(response => {
        alert("updated Successfully");
        location.reload();
      }).catch(err => alert("make sure required fields are well fulfilled"));
    });
  };

  axios.get("https://portfolio-nr.herokuapp.com/posts/").then(response => {
    const { posts } = response.data;
    posts.map(post => renderBlogs(post));
  });
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    message.textContent = "";
    axios.post("https://portfolio-nr.herokuapp.com/queries/", {
      email: form.email.value,
      name: form.name.value,
      query: form.query.value,
    }).then(response => {
      message.textContent = "Successfully Sent";
      form.reset();
    }).catch(err => alert("Name must at least 5 character long and Query at least 100 character long"));
  });
}

if (signIn) {
  signIn.addEventListener("submit", (e) => {
    e.preventDefault();

    axios.post("https://portfolio-nr.herokuapp.com/auth/login", { email: signIn.username.value, password: signIn.password.value }).then(response => {
      const { token } = response.data;
      localStorage.setItem("token", token);
      window.location = "./queries.html";
    }).catch(err => {
      errorMessage.innerHTML = "Invalid credentials";
    })
  });
}

if (blogPostForm) {
  blogPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: { "x-auth-token": adminToken },
      data: {
        title: blogPostForm.blogTitle.value,
        content: blogPostForm.blogPost.value,
        imgLink: blogPostForm.blogImgLink.value
      },
      url: "https://portfolio-nr.herokuapp.com/posts/"
    }
    axios(options).then(response => {
      alert("Blog Successfully Posted");
      blogPostForm.reset();
    }).catch(err => alert(`verify all fields are valid`));

  });
}

if (userBlogSection) {
  const viewBlog = (post) => {
    const card = document.createElement("div");
    const cardImage = document.createElement("div");
    const cardDescription = document.createElement("div");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    const readBtn = document.createElement("a");

    card.classList.add("blog__post");
    cardImage.classList.add("blog__post--image");
    cardDescription.classList.add("blog__post--description");
    h4.classList.add("blog__post--title");
    p.classList.add("blog__post--content");
    readBtn.classList.add("btn-text");

    h4.textContent = post.title;
    p.textContent = post.content;
    readBtn.innerHTML = "Continue Reading &rarr;";
    readBtn.setAttribute("href", "#");

    cardDescription.appendChild(h4);
    cardDescription.appendChild(p);
    cardDescription.appendChild(readBtn);

    card.setAttribute("data-id", post._id);
    card.appendChild(cardImage);
    card.appendChild(cardDescription);

    userBlogSection.appendChild(card);

    readBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `./pages/Blog/aBlog.html?id=${post._id}`;
    });
  };

  axios.get("https://portfolio-nr.herokuapp.com/posts/").then(response => {
    const fewPosts = response.data.posts.slice(0, 3);
    fewPosts.map(post => viewBlog(post));
  });
}

const renderThisBlog = (post) => {
  const aBlog = document.createElement("div");
  aBlog.innerHTML = `<div class="blog__header">
    <div class="section__desc">
        <h1 class="heading__primary">${post.title}</h1>
    </div>
  </div>
  
  <div class="ablog">
    <div class="blog__image">&nbsp;</div>
    <div class="blog__content">${post.content}</div>
  </div>`;

  specificBlogSection.appendChild(aBlog);
};

const renderBlogComments = (doc) => {
  const comment = document.createElement("div");
  comment.innerHTML = `<div class="comment">
  <img src="../../assets/images/userIcon.png" alt="icon">
  <div class="comment__details">
      <div class="name">${doc.name}</div>
      <p>${doc.comment}</p>
  </div>
  </div>`;

  commentSection.appendChild(comment);
}

if (allBlogsSection) {
  const viewBlog = (post) => {
    const card = document.createElement("div");
    const cardImage = document.createElement("div");
    const cardDescription = document.createElement("div");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    const readBtn = document.createElement("a");

    card.classList.add("card__blog");
    cardImage.classList.add("blog__post--image");
    cardDescription.classList.add("blog__post--description");
    h4.classList.add("blog__post--title");
    p.classList.add("blog__post--content");
    readBtn.classList.add("btn-text");

    h4.textContent = post.title;
    p.textContent = post.content;
    readBtn.innerHTML = "Continue Reading &rarr;";
    readBtn.setAttribute("href", "./aBlog.html");

    cardDescription.appendChild(h4);
    cardDescription.appendChild(p);
    cardDescription.appendChild(readBtn);

    card.setAttribute("data-id", post._id);
    card.appendChild(cardImage);
    card.appendChild(cardDescription);

    allBlogsSection.appendChild(card);

    readBtn.addEventListener("click", (e) => {
      e.preventDefault();

      window.location.href = `./aBlog.html?id=${post._id}`;
    });
  };

  axios.get("https://portfolio-nr.herokuapp.com/posts/").then(response => {
    response.data.posts.map(post => viewBlog(post));
  }).catch(err => alert("Something is wrong!!! reload page"));
}

if (specificBlogSection) {
  axios.get(`https://portfolio-nr.herokuapp.com/posts/${blogId}`).then(response => {
    const post = response.data.post;
    renderThisBlog(post);
    const comments = response.data.post.comments;
    comments.map(comment => renderBlogComments(comment));
  });

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    axios.post(`https://portfolio-nr.herokuapp.com/posts/comment/${blogId}`, {
      name: commentForm.name.value,
      comment: commentForm.comment.value
    }).then(response => {
      alert(response.data.message);
      location.reload();
    }).catch(err => alert("name & comment field must at least be 5 character long"));

  });
}
