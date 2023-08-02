const accessKey='xgI36yvOfzUoPr1qCo4PgOwIyWSdx5-nqT2CdhlBZlA'

const formEl=document.querySelector("form");
const inputEl=document.getElementById("search-input");
const imgEl=document.querySelector(".initial-imgs");
const showEl=document.getElementById("show-more-button");

let inputData="";
let page=1;

async function searchImage(){
    inputData=inputEl.value;
    const url='https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}';
    const response=await fetch(url);
    const data=await response.json();
    const results=data.results;
    if(page === 1){
        imgEl.innerHTML="";

    }   
    results.map((result)=>{
        const imageWrapper=document.createElement("div");
        imageWrapper.classList.add("initial-img");
        const image=document.createElement("img");
        image.src=result.urls.small;
        image.alt=result.alt_description;
        const imageLink=document.createElement("a");
        imageLink.href=result.links.html;
        imageLink.target="_blank";
        /*imageLink.textContent="Click Here";*/

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        imgEl.appendChild(imageWrapper);
    });
    page++;
    if(page>1){
        showEl.style.display="block";
    }

}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    searchImage();
});
showEl.addEventListener("click",()=>{

    searchImage();
});
