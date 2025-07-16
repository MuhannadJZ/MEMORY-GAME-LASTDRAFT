const cardData = [
    {id: 1, img: '668.png'},
    {id: 2, img: 'alabraaj.png'},
    {id: 3, img: 'bacon.png'},
    {id: 4, img: 'baskinrobbins.png'},
    {id: 5, img: 'cinecafe.png'},
    {id: 6, img: 'cinnabon.png'}
    {id: 7, img: 'dose.png'}
    {id: 8, img: 'haji.png'}
    {id: 9, img: 'hcr.png'}
    {id: 10, img: 'jan.png'}
    {id: 11, img: 'jasmislogo.png'}
    {id: 12, img: 'lilou.png'}
    {id: 13, img: 'samona.png'}
    {id: 14, img: 'shay.png'}
    {id: 15, img: 'trentren.png'}
    {id: 16, img: 'vapiano.png'}
    {id: 17, img: 'villamamas.png'}
    {id: 18, img: 'zaytzaytoon.png'}
]

const container = document.querySelector('#C-container')
let cards=[];

function renderCards(){
    cards= [...cardData, ...cardData].sort(()=>Math.random()-0.5);
    container.innerHTML='';

    cards.forEach(card => {
        const cardE1 = document.createElement('div');
        cardE1.classList.add('card');
        cardE1.dataset.id= card.id;
        cardE1.innerHTML=`<div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back"><img src="images/${card.img}" alt=""/></div>
        </div>
        `;
        container.appendChild(cardE1);
    });
}