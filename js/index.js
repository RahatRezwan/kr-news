//fetch the categories
const loadCategories = async () => {
    const url = "https://openapi.programming-hero.com/api/news/categories";
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
    console.log(data.data);
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
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllNews(data.data, newsCount);
};

//display all news in the main body
const displayAllNews = (allNews, isCount) => {
    if (isCount) {
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
        <div class="row align-items-center" onclick="loadNewsDetails('${news._id}')">
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
    url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data[0]);
};
loadCategories();
loadNewsData("08", false);
