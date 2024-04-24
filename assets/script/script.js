let Shop = Array.from(Get("shop", []));

async function LoadShopItems() {
    const response = await fetch('database.json');
    const names = await response.json();

    ReloadCard(names);
    LoadShopItemsOnCard();
}

async function LoadShopItemsOnCard() {
    const response = await fetch('database.json');
    const names = await response.json();

    ReloadShoppingCard(names);


    AddEventOnBtn();
    AddEventOnBtnDark();
    ChangeMode();
}

LoadShopItems();





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
    console.log(btnswitch.checked);
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

function ReloadShoppingCard(_json) {
    let parent = document.getElementById("shoppingcart");
    parent.innerHTML = "";

    _globalHtml = '<div class="mode" id="shopping">' +
        '<h2>Liste de la commande</h2>' +
        '<button class="mode" id="btn_close">x</button>' +
        '<div class="panierheader">' +
        '<div class="mode" id="table">' +
        '<div>Produit</div>' +
        '<div>Quantiter</div>' +
        '<div>Prix</div>' +
        '<div>Total</div>' +
        '<div>Action</div>' +
        '</div>' +
        '</div>' +
        '<div class="panierList" id="panierList">';
    
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

    for (let i = 0; i < _DrawItems.length; i++) { 
        _panier = _panier +
            '<div class="mode" id="table1">' +
            '<div>' + _json.plats[_DrawItems[i].id].nom +'</div>' +
            '<div>' + _DrawItems[i].nbr +'</div>' +
            '<div>' + _json.plats[_DrawItems[i].id].prix +'€</div>' +
            '<div>' + (_DrawItems[i].nbr * _json.plats[_DrawItems[i].id].prix) + '€</div>' +
            '<div>Remove</div>' +
            '</div>';
    }

    _globalHtml = _globalHtml + _panier + '</div>'+
        '<p class="mode" id="total">'+
        '</p>'+
        '<button class="mode" id="btn_order">Commander</button>'+
        '</div>';
    
    parent.innerHTML = _globalHtml;
}

function Filtre(_MyCondition,_Value) {
    let pass = false;

    for (let i = 0; i < _MyCondition.length; i++){
        for (let a = 0; a < _Value.length; a++) {
            if (_MyCondition[i] == _Value[a] || _MyCondition[i] == "All") {
                pass = true;
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
    console.log(btnswitch);
}


const AddShop = (e) => {
    _shop = Array.from(Get("shop", []));

    console.log("Add to shop: " + e.currentTarget.id);

    _shop.push(e.currentTarget.id);
    Set("shop", _shop);
    Shop = Array.from(Get("shop", []));

    LoadShopItemsOnCard();
}

const switchMode = (e) => {
    console.log();
    ChangeMode();
}