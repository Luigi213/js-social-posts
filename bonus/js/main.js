// Milestone 1 - Creiamo il nostro array di oggetti che rappresentano ciascun post. Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
// id del post, numero progressivo da 1 a n
// nome autore,
// foto autore,
// data in formato americano (mm-gg-yyyy),
// testo del post,
// immagine (non tutti i post devono avere una immagine),
// numero di likes.

// Milestone 2 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.

// Milestone 3 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes

// BONUS (da fare solo una volta finite le milestone principali)
// 1 - Formattare le date in formato italiano (gg/mm/aaaa)
// 2- Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
// 3 - Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

let content = "";

posts.forEach((elem) => {
    content +=`
    <div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    ${createImage(elem.author)} 
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${elem.author.name}</div>
                    <div class="post-meta__time">${dateItaly(elem.created)}</div>
                </div>                    
            </div>               
        </div>
        <div class="post__text">${elem.content}</div>
        <div class="post__image">
            <img src="${elem.media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a  class="like-button  js-like-button" href="#" data-postid="${elem.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${elem.id}" class="js-likes-counter">${elem.likes}</b> persone
                </div>
            </div> 
        </div>  
    </div>        
    `
})
const likePost = [];

const card = document.getElementById('container');
card.innerHTML = content;

const like = document.getElementsByClassName('js-like-button');

for(let i=0; i<like.length; i++){
    like[i].addEventListener('click', function(){
        
        const idCounter = parseInt(this.dataset.postid);
        likePost.push(idCounter)
        
        const likes = document.getElementById(`like-counter-${idCounter}`);
        const likeNumber = parseInt(likes.innerText);
        likes.innerText = likeNumber+1
        
        const likeColor = document.getElementsByClassName('like-button')
        likeColor[i].classList.add('red')
        posts.forEach((elem) => {
            switch(likeNumber){
                case elem.likes+ 1:
                    likes.innerText = likeNumber-1
                    likeColor[i].classList.remove('red')
                    break;
            }
        })
    })
}

function createImage(userdate){
    const {image} = userdate
    const {name} = userdate
    if(image == null){
    
        const splits = name.split(' ')
    
        const letters = []
    
        for(let i=0; i<splits.length; i++){
            const split = splits[i]
            const initialLetter = split[0]
            letters.push(initialLetter)
        }
    
        const initials = letters.join('')

        return `
            <div class="profile-pic-default">
                <span>${initials}</span>
            </div> 
        `
    }
    else{
        return `<img class="profile-pic" src="${image}" alt="Phil Mangione">` 
    }
}
console.log(likePost)

function dateItaly(date){
    return date.split('-').reverse().join('/')
}