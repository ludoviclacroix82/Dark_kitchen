let Shop = Array.from(Get("shop", []));

async function LoadShopItems() {
    const response = await fetch('database.json');
    const names = await response.json();

    ReloadCard(names);
    LoadShopItemsOnCard();
}

async function LoadShopItemsOnCard(first) {
    const response = await fetch('database.json');
    const names = await response.json();

    trie();
    ReloadShoppingCard(names);


    AddEventOnBtn();
    AddEventOnBtnDark();
    LoadDarkMode();

    let logo = document.getElementsByClassName("logo");
    logo[0].addEventListener('click', logoclick);
}

let nbrClickLogo = 0;

LoadShopItems(true);







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

    let btnswitch = document.getElementById("switchMode");
    btnswitch.checked = Get("mode", "Light") == "Dark" ? true : false;
}

function LoadDarkMode() {
    let ModeObject = document.getElementsByClassName("mode");

    for (let i = 0; i < ModeObject.length; i++) {
        let dark = ModeObject[i].classList.contains('Dark');
        let light = ModeObject[i].classList.contains('Light');

        if (!dark && !light) { Get("mode", "Light") == "Light" ? ModeObject[i].classList.add('Light') : ModeObject[i].classList.add('Dark'); }
    }

    let btnswitch = document.getElementById("switchMode");
    btnswitch.checked = Get("mode", "Light") == "Dark" ? true : false;
}

function Checkbock() {
    let _ = document.getElementsByClassName("filter");
    let Filter = [];

    for (const a of _){
        if (a.checked) {
            if (parseInt(a.id) == 1) { Filter.push("assets/pictures/allergen/amande.png"); }
            if (parseInt(a.id) == 2) { Filter.push("assets/pictures/allergen/crabe.png"); }
            if (parseInt(a.id) == 3) { Filter.push("assets/pictures/allergen/du-ble.png"); }
            if (parseInt(a.id) == 4) { Filter.push("assets/pictures/allergen/lait.png"); }
            if (parseInt(a.id) == 5) { Filter.push("assets/pictures/allergen/mais.png"); }
            if (parseInt(a.id) == 6) { Filter.push("assets/pictures/allergen/noyau.png"); }
            if (parseInt(a.id) == 7) { Filter.push("assets/pictures/allergen/oeuf.png"); }
            if (parseInt(a.id) == 8) { Filter.push("assets/pictures/allergen/poisson.png"); }
            if (parseInt(a.id) == 9) { Filter.push("assets/pictures/eating/du-boeuf.png"); }
            if (parseInt(a.id) == 10) { Filter.push("assets/pictures/eating/vegetarien.png"); }
        }
        a.addEventListener('click', Reload);
    }

    //console.log(Filter);

    return Filter;
}

function ReloadCard(Items) {
    let parent = document.getElementById("cards");
    parent.innerHTML = "";

    for (let i = 0; i < Items.plats.length; i++) {
        let CardFiltreValue = Items.plats[i].allergènes.concat(Items.plats[i].regimealimentaire);

        //console.log(CardFiltreValue);

        if (Filtre(Checkbock(), CardFiltreValue)) {
            let allergenImage = "";
            for (let a = 0; a < Items.plats[i].allergènes.length; a++) {
                allergenImage = allergenImage + '<img src="' + Items.plats[i].allergènes[a] + '">'
            }

            let Diet = "";
            for (let a = 0; a < Items.plats[i].regimealimentaire.length; a++) {
                Diet = Diet + '<img src="' + Items.plats[i].regimealimentaire[a] + '">'
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
                '<div class="price mode">' + Items.plats[i].prix + '</div>' +
                '</div>' +
                '</div>';
        }
    }
}

function ReloadShoppingCard(_json) {
    let parent = document.getElementById("shoppingcart");
    parent.innerHTML = "";

    _globalHtml = '<div class="mode" id="shopping">' +
        '<h2>Liste de la commande</h2>' +
        //'<button class="mode" id="btn_close">x</button>' +
        //'<div class="panierheader">' +
        '<table class="mode" id="table"><tr>' +
        '<th>Produit</th>' +
        '<th>Quantiter</th>' +
        '<th>Prix</th>' +
        '<th>Total</th>' +
        '<th>Action</th>' +
        '</tr>'
    
    let _panier = "";

    let _DrawItems = [];
    let ShopArray = Array.from(Get("shop", [])); 
    for (let i = 0; i < ShopArray.length; i++) { 
        let Exist = false;
        for (let a = 0; a < _DrawItems.length; a++){
            if (_DrawItems[a].id == ShopArray[i]) {
                _DrawItems[a].nbr += 1;
                Exist = true;
            }
        }
        if (!Exist) { _DrawItems.push({ id:ShopArray[i],nbr:1})}
    }

    let Tot = 0;
    for (let i = 0; i < _DrawItems.length; i++) { 
        _panier = _panier +
            '<tr class="mode" id="table1">' +
            '<td>' + _json.plats[_DrawItems[i].id].nom +'</td>' +
            '<td>' + _DrawItems[i].nbr +'</td>' +
            '<td>' + _json.plats[_DrawItems[i].id].prix +'€</td>' +
            '<td>' + (_DrawItems[i].nbr * _json.plats[_DrawItems[i].id].prix) + '€</td>' +
            '<td><button class="mode btnShopRemove" id="' + _DrawItems[i].id + '">Remove</button></td>' +
            '</tr>';
        
        Tot += (_DrawItems[i].nbr * _json.plats[_DrawItems[i].id].prix);
    }

    _globalHtml = _globalHtml + _panier + '</table>'+
        '<p class="mode" id="total">' + Tot + '€</p>'+
        '<button class="mode" id="btn_order">Commander</button>'+
        '</div>';
    
    parent.innerHTML = _globalHtml;

    let btnShopRemove = document.getElementsByClassName("btnShopRemove");
    for (let i = 0; i < btnShopRemove.length; i++){
        btnShopRemove[i].addEventListener('click', rmvShopItem);
    }
}

function Filtre(_MyCondition,_Value) {
    let pass = true;
    for (let i = 0; i < _MyCondition.length; i++){
        let Check = false;
        for (let a = 0; a < _Value.length; a++) {
            if (_MyCondition[i] == _Value[a]) {
                Check = true;
            }
        }
        if (Check) { pass = false; }
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

function trie() {
    let TempGrp = [];
    _shop = Array.from(Get("shop", []));

    for (let i = 0; i < 99; i++) {
        for (let a = 0; a < _shop.length; a++) {
            console.log(parseInt(_shop[a]), parseInt(i))
            if (parseInt(_shop[a]) == parseInt(i)) {
                TempGrp.push(parseInt(_shop[a]));
            }
        }
    }


    Set("shop", TempGrp);
    Shop = Array.from(Get("shop", []));
}


function AddEventOnBtn() { 
    let btnpanier = document.getElementsByClassName("btnpanier");
    for (let i = 0; i < btnpanier.length; i++) {
        btnpanier[i].addEventListener('click', AddShop);
    }
}

function AddEventOnBtnDark() {
    let btnswitch = document.getElementById("switchMode");
    btnswitch.addEventListener('click', switchMode);
    console.log(btnswitch);
}


const AddShop = (e) => {
    _shop = Array.from(Get("shop", []));

    //console.log("Add to shop: " + e.currentTarget.id);

    _shop.push(e.currentTarget.id);
    Set("shop", _shop);
    Shop = Array.from(Get("shop", []));

    LoadShopItemsOnCard();
}

const switchMode = (e) => {
    console.log();
    ChangeMode();
}

const Reload = (e) => {
    LoadShopItems();
}

const rmvShopItem = (e) => {
    _shop = Array.from(Get("shop", []));

    //console.log("remove to shop: " + e.currentTarget.id);

    for (let i = 0; i < _shop.length; i++) {
        if (parseInt(_shop[i]) == parseInt(e.currentTarget.id)) {
            _shop.splice(i, 1)
            i = 9999999999;
        }
    }

    Set("shop", _shop);
    Shop = Array.from(Get("shop", []));

    LoadShopItemsOnCard();
}

const logoclick = (e) => {
    nbrClickLogo++;
    if (nbrClickLogo >= 3) {
        e.currentTarget.style = "transition: transform 1s;transform: rotate(360deg);"
    }

    if (nbrClickLogo >= 6) {
        nbrClickLogo = 0;
        e.currentTarget.style = "transition: transform 1s;transform: rotate(0deg);"
    }
}