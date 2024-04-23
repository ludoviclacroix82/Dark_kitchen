let Shop = Array.from(Get("shop", []));

async function LoadShopItems() {
    const response = await fetch('database.json');
    const names = await response.json();

    ReloadCard(names);

    AddEventOnBtn();
    ChangeMode();
}

LoadShopItems();








const AddShop = (e) => {
    _shop = Array.from(Get("shop", []));

    console.log("Add to shop: " + e.currentTarget.id);

    _shop.push(e.currentTarget.id);
    Set("shop", _shop);
    Shop = Array.from(Get("shop", []));
}

function ChangeMode() {
    let ModeObject = document.getElementsByClassName("mode");

    for (let i = 0; i < ModeObject.length;i++){
        let dark = ModeObject[i].classList.contains('Dark');
        let light = ModeObject[i].classList.contains('Light');

        if (!dark && !light) { Get("mode", "Light") == "Light" ? ModeObject[i].classList.add('Light') : ModeObject[i].classList.add('Dark') ; } else {
            if (dark) { ModeObject[i].classList.add('Light'); ModeObject[i].classList.remove('Dark')}
            if (light) { ModeObject[i].classList.add('Dark'); ModeObject[i].classList.remove('Light') }
            
            Set("mode", dark ? "Light" : "Dark");
        }
    }
}


function ReloadCard(Items) {
    let parent = document.getElementById("cards");


    for (let i = 0; i < Items.plats.length; i++) {

        parent.innerHTML = parent.innerHTML +
            '<div class="card mode">'+
            '<div class="cardheader mode">'+
            '<figure>'+
            '<img class="mode" src="' + Items.plats[i].image + '" alt="">'+
            '</figure>'+
            '</div>'+
            '<div class="cardmain mode">'+
            '<div class="title mode">'+ Items.plats[i].nom +'</div>'+
            '<div class="allergen mode ">' + Items.plats[i].allergènes +'</div>'+
            '<div class="diet mode ">Lorem ipsum dolor sit amet </div>'+
            '</div>'+
            '<div class="cardfooter mode">'+
            '<button class="btnpanier mode">Panier</button>'+
            '<div class="price mode">' + Items.plats[i].prix + '</div>'*
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

function AddEventOnBtn() {
    let btnpanier = document.getElementsByClassName("btnpanier");
    for (let i = 0; i < btnpanier.length; i++) {
        btnpanier[i].addEventListener('click', AddShop);
        btnpanier[i].id = i;
    }
}