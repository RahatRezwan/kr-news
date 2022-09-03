const loadCategories = async () => {
    const url = "https://openapi.programming-hero.com/api/news/categories";
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
};

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

const loadNews = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
};
loadCategories();
