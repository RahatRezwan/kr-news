const readMoreButtons = document.getElementsByClassName("read-more-btn");
for (const btn of readMoreButtons) {
    const coverImg = document.getElementById("cover-img");
    const articleTitle = document.getElementById("title");
    const articleDescription = document.getElementById("description");

    btn.addEventListener("click", (event) => {
        coverImg.textContent = "";
        articleTitle.textContent = "";
        articleDescription.textContent = "";
        console.log(event);
        const cover = event.target.parentNode.children[0];
        let imgsrc = cover.getAttribute("src");

        coverImg.setAttribute("src", imgsrc);
        const title = event.target.parentNode.children[1].innerText;
        articleTitle.innerText = title;
        const description = event.target.parentNode.children[2].innerHTML;
        articleDescription.innerHTML = `${description}`;
    });
}
