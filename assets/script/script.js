let Shop = Array.from(Get("shop", []));

ReloadCard();






const AddShop = (e) => {
    _shop = Array.from(Get("shop", []));

    console.log("Add to shop: " + e.currentTarget.id);

    _shop.push(e.currentTarget.id);
    Set("shop", _shop);
    Shop = Array.from(Get("shop", []));
}

function ChangeMode() {
    let ModeObject = document.getElementsByClassName("mode");

    ModeObject.forEach(i => {
        let dark = i.classList.contains('Dark');
        let light = i.classList.contains('Light');

        if (!dark && !light) { Get("mode", "Light") == "Light" ? i.classList.add('Light') : i.classList.add('Dark') ; } else {
            if (dark) { i.classList.add('Light'); i.classList.remove('Dark')}
            if (light) { i.classList.add('Dark'); i.classList.remove('Light') }
            
            Set("mode", dark ? "Light" : "Dark");
        }
    });
}


function ReloadCard() {
    let parent = document.getElementById("cards");

    for (let i = 0; i < 1/*Booster.length*/; i++) {

        parent.innerHTML = parent.innerHTML +
            '<div class="card mode">'+
            '<div class="cardheader mode">'+
            '<figure>'+
            '<img class="mode" src="https://assets.afcdn.com/recipe/20181107/83668_w1024h768c1cx2880cy1920cxt0cyt0cxb5760cyb3840.jpg" alt="">'+
            '</figure>'+
            '</div>'+
            '<div class="cardmain mode">'+
            '<div class="title mode">Lorem ipsum dolor sit amet </div>'+
            '<div class="allergen mode ">Lorem ipsum dolor sit amet </div>'+
            '<div class="diet mode ">Lorem ipsum dolor sit amet </div>'+
            '</div>'+
            '<div class="cardfooter mode">'+
            '<button class="btnpanier mode">Panier</button>'+
            '<div class="price mode">5.00</div>'*
            '</div>'+
            '</div>'
            ;
    }

}


function Get(name, ini) {  // prend une data dans les cookies du site et sauvegarde le ini si il y en a pas
    const Data = localStorage.getItem(name);

    if (Data !== null) {
        return JSON.parse(Data);
    } else {
        localStorage.setItem(name, JSON.stringify(ini));
        return JSON.parse(localStorage.getItem(name));
    }
}


function Set(name, value) { // sauvegarde une data dans les cookies du site
    localStorage.setItem(name, JSON.stringify(value));
    return JSON.parse(localStorage.getItem(name));
}

/*
function FindClass(_parent,_class) {
    for (let child of _parent.children) {
        if (child.classList.contains(_class)) { return child; } else {
            FindClass(child, _class);
            }
        }
}
*/

let btnpanier = document.getElementsByClassName("btnpanier");
for (let i = 0; i < btnpanier.length; i++) {
    btnpanier[i].addEventListener('click', AddShop);
    btnpanier[i].id = i;
}