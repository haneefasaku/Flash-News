const API_KEY = "afbc2f2ee5094d45885236bddc340ed7";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", ()=> getNews("india"));

const reload = document.getElementById("reload");
reload.addEventListener("click", ()=>{
    window.location.reload();
})

async function getNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles)
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const templateNewsCard = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";
    articles.forEach((article) =>{
        if(!article.urlToImage) return;
        const cardClone = templateNewsCard.content.cloneNode(true);
        fillData(cardClone, article)
        cardsContainer.appendChild(cardClone);
    })
}

function fillData(cardClone, article){
    const newsImage = cardClone.getElementById("news-image");
    const newsTittle = cardClone.getElementById("news-tittle");
    const newsSource= cardClone.getElementById("news-source");
    const newsDesc = cardClone.getElementById("news-desc");

    newsImage.src=article.urlToImage;
    newsTittle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date (article.publishedAt).toLocaleString("en-us",{
        timeZone: 'Asia/Kolkata'
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;


    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url, "_blank");
    })
}

const ipl = document.getElementById("Ipl");
const finance = document.getElementById("finance")
const politics = document.getElementById("politics")
ipl.addEventListener("click", () =>{
    getNews("Ipl");
})
finance.addEventListener("click", ()=>{
    getNews("finance");
})
politics.addEventListener("click", ()=>{
    getNews("politics");
})

const searchButton = document.getElementById("search-Button");
const searchText = document.getElementById("news-input");
searchButton.addEventListener("click", ()=>{
    const query = searchText.value;
    if(!query)return;
    getNews(query);
})