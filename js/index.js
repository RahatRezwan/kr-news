//fetch the categories
const loadCategories = async () => {
    try {
        const url = "https://openapi.programming-hero.com/api/news/categories";
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category);
    } catch (error) {
        console.log(error);
    }
};

//display categories in the header section
const displayCategories = (categories) => {
    const ul = document.getElementById("categories-list");
    categories.forEach((category) => {
        const a = document.createElement("a");
        a.innerHTML = `
        <li class="category-item" onclick="loadNews('${category.category_id}')">${category.category_name}</li>
        `;
        ul.appendChild(a);
    });
};

//Load news data when a category is clicked
const loadNews = (newsId) => {
    loadingSpinner(true);
    loadNewsData(newsId, true);
};

//Load news data when a category is clicked
const loadNewsData = async (id, newsCount) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayAllNews(data.data, newsCount);
    } catch (error) {
        console.log(error);
    }
};

//display all news in the main body
const displayAllNews = (allNews, isNewsCount) => {
    if (isNewsCount) {
        let totalNews = allNews.length;
        if (totalNews === 0) {
            totalNews = "No news";
        }
        const countNewsContainer = document.getElementById("count-news-container");
        countNewsContainer.classList.remove("d-none");
        const countNewsText = document.getElementById("count-news");
        countNewsText.innerText = `${totalNews} news found`;
    }
    //Sorting News By Total Views
    allNews.sort((a, b) => {
        return b.total_view - a.total_view;
    });

    //Display news inside newsDiv
    let newsDiv = document.getElementById("news-container");
    newsDiv.innerHTML = "";
    allNews.forEach((news) => {
        const card = document.createElement("div");
        card.classList.add("card", "mb-3", "bg-dark");
        card.innerHTML = `
        <div class="row align-items-center" onclick="loadNewsDetails('${
            news._id
        }')" data-bs-toggle="modal"
        data-bs-target="#newsDetails">
            <div class="col-12 col-lg-3 text-center p-0 m-0">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start m-4" alt="" />
            </div>
            <div class="col-12 col-lg-9 p-0 m-0">
                <div class="card-body text-white m-2 ps-xl-0 ms-xl-0 me-lg-5">
                    <!-- card detials seciton -->
                    <div>
                        <h4 class="card-title">${news.title}</h4>
                        <p class="card-text text-muted text-elipses">
                            ${news.details}
                        </p>
                    </div>
                    <!-- Author and rating section -->
                    <div class="d-flex justify-content-between align-items-center mt-4 text-white p-0 pe-lg-5 flex-wrap gap-5">
                        <div id="author-info" class="d-flex align-items-center gap-3">
                            <img src="${
                                news.author.img
                            }" width="50px" alt="" id="author-img" style="border-radius:100%" />
                            <p id="author-name" class="m-0 p-0">${
                                news.author.name === "system" ||
                                news.author.name === null ||
                                news.author.name === ""
                                    ? "No author found"
                                    : news.author.name
                            }</p>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <i class="far fa-eye"></i>
                            <p class="p-0 m-0">${
                                news.total_view === null || news.total_view === 0
                                    ? "No views found"
                                    : news.total_view
                            }</p>
                        </div>
                        <div>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                        </div>
                        <div>
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        newsDiv.appendChild(card);
    });
    loadingSpinner(false);
};

//Loading spinner function
const loadingSpinner = (isLoading) => {
    const spinner = document.getElementById("spinner");
    if (isLoading) {
        spinner.classList.remove("d-none");
    } else {
        spinner.classList.add("d-none");
    }
};

//load single news details on click
const loadNewsDetails = async (news_id) => {
    try {
        url = `https://openapi.programming-hero.com/api/news/${news_id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data[0]);
    } catch (error) {
        console.log(error);
    }
};

//Display News Details in a Modal
const displayNewsDetails = (newsDetails) => {
    const modalContent = document.getElementById("modal-content");
    console.log(newsDetails);
    modalContent.textContent = "";
    modalContent.innerHTML = `
    <div class="text-end p-3">
        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
        ></button>
    </div>
    <div class="modal-body text-white p-4">
        <!-- news cover -->
        <div class="news-cover text-center">
            <img src="${newsDetails.image_url}" alt="" class="img-fluid"/>
        </div>
        <!-- News description -->
        <div class="mt-3">
            <h3 class="modal-title">${newsDetails.title}</h3>
            <div class="d-flex gap-5 flex-wrap align-items-center mt-3 mb-4">
                <div class="d-flex gap-2 align-items-center">
                    <img
                        src="${newsDetails.author.img}"
                        alt=""
                        style="border-radius: 100%; width: 30px"
                        class="m-0 p-0"
                    />
                    <p>${
                        newsDetails.author.name === "system" ||
                        newsDetails.author.name === null ||
                        newsDetails.author.name === ""
                            ? "No author found"
                            : newsDetails.author.name
                    }</p>
                </div>
                <div class="d-flex gap-2 align-items-center">
                    <i class="far fa-eye"></i>
                    <p>${
                        newsDetails.total_view === null || newsDetails.total_view === 0
                            ? "No views found"
                            : newsDetails.total_view
                    }</p>
                </div>
                <div class="d-flex gap-2 text-warning">
                    <p>${newsDetails.rating.number}</p>
                    <div>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="far fa-star"></i>
                    </div>
                </div>
            </div>
            <p class="modal-description text-light">${newsDetails.details}</p>
        </div>
    </div>
    <div class="text-center p-3">
        <button
            type="button"
            class="btn text-color fw-semibold modal-btn"
            data-bs-dismiss="modal"
        >
            Close
        </button>
    </div>
    `;
};

loadCategories();
loadNewsData("08", false);
