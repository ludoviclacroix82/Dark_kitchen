let Shop = Array.from(Get("shop", []));

async function LoadShopItems() {
    const response = await fetch('database.json');
    const names = await response.json();

    ReloadCard(names);

    AddEventOnBtn();
    ChangeMode();
}

LoadShopItems();


function ChangeMode() {
    let ModeObject = document.getElementsByClassName("mode");

    let check = false;

    for (let i = 0; i < ModeObject.length;i++){
        let dark = ModeObject[i].classList.contains('Dark');
        let light = ModeObject[i].classList.contains('Light');

        if (!dark && !light) { Get("mode", "Light") == "Light" ? ModeObject[i].classList.add('Light') : ModeObject[i].classList.add('Dark') ; } else {
            if (dark) { ModeObject[i].classList.add('Light'); ModeObject[i].classList.remove('Dark')}
            if (light) { ModeObject[i].classList.add('Dark'); ModeObject[i].classList.remove('Light') }
            
            Set("mode", dark ? "Light" : "Dark");
        }
        check = light;
    }

    let btnswitch = document.getElementById("switchMode");
    btnswitch.checked = check;
}


function ReloadCard(Items) {
    let parent = document.getElementById("cards");
    parent.innerHTML = "";

    for (let i = 0; i < Items.plats.length; i++) {

        let CardFiltreValue = Items.plats[i].allergènes.concat(Items.plats[i].regimealimentaire);

        //console.log(CardFiltreValue);

        if (Filtre(["All"], CardFiltreValue)) {
            let allergenImage = "";
            for (let a = 0; a < Items.plats[i].allergènes.length; a++) {
                allergenImage = allergenImage + '<img src="' + Items.plats[i].allergènes[a] + '">'
            }

            let Diet = "";
            for (let a = 0; a < Items.plats[i].regimealimentaire.length; a++) {
                Diet = Diet + '[' + Items.plats[i].regimealimentaire[a] + '] '
            }


            parent.innerHTML = parent.innerHTML +
                '<div class="card mode">' +
                '<div class="cardheader mode">' +
                '<figure>' +
                '<img class="mode" src="' + Items.plats[i].image + '" alt="">' +
                '</figure>' +
                '</div>' +
                '<div class="cardmain mode">' +
                '<div class="title mode">' + Items.plats[i].nom + '</div>' +
                '<div class="allergen mode ">' + allergenImage + '</div>' +
                '<div class="diet mode ">' + Diet +'</div>' +
                '</div>' +
                '<div class="cardfooter mode">' +
                '<button class="btnpanier mode" id="'+i+'">Panier</button>' +
                '<div class="price mode">' + Items.plats[i].prix + '</div>' *
                '</div>' +
                '</div>';
        }
    }
}

function Filtre(_MyCondition,_Value) {
    let pass = false;

    for (let i = 0; i < _MyCondition.length; i++){
        for (let a = 0; a < _Value.length; a++) {
            if (_MyCondition[i] == _Value[a] || _MyCondition[i] == "All") {
                pass = true;
                //console.log("pass :" + _MyCondition[i] + " == " + _Value[a])
            }
        }
    }

    return pass;
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
    }
}

function AddEventOnBtnDark() {
    let btnswitch = document.getElementById("switchMode");
    btnswitch.addEventListener('click', switchMode);
}


const AddShop = (e) => {
    _shop = Array.from(Get("shop", []));

    console.log("Add to shop: " + e.currentTarget.id);

    _shop.push(e.currentTarget.id);
    Set("shop", _shop);
    Shop = Array.from(Get("shop", []));
}

const switchMode = (e) => {
    ChangeMode();
}