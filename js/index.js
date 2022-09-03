//fetch the categories
const loadCategories = async () => {
    const url = "https://openapi.programming-hero.com/api/news/categories";
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
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

//Load news when a category is clicked
const loadNews = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllNews(data.data);
};

//display all news in the main body
const displayAllNews = (allNews) => {
    let totalNews = allNews.length;
    if (totalNews === 0) {
        totalNews = "No news";
    }
    const countNewsContainer = document.getElementById("count-news-container");
    countNewsContainer.classList.remove("d-none");
    const countNewsText = document.getElementById("count-news");
    countNewsText.innerText = `${totalNews} news found`;
    allNews.forEach((news) => {
        console.log(news);
    });
};
loadCategories();
