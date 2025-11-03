
let allProducts = [];

const container = document.getElementById('keyboardlist');

const minRange = document.getElementById('minthumb');
const maxRange = document.getElementById('maxthumb');
const priceline = document.getElementById('priceline');
const minPrice = document.getElementById('lblminprice');
const maxPrice = document.getElementById('lblmaxprice');
const slider = document.getElementById('pricebar');
const inStockCheckbox = document.getElementById('instock');
const outOfStockCheckbox = document.getElementById('outofstock');
const stockAny = document.getElementById('Any');

const brandCheckboxes = document.querySelectorAll('.brandslist input[type="checkbox"]');

const sizeCheckboxes = document.querySelectorAll('.size input[type="checkbox"]');

const connectivity = document.querySelectorAll('.connectivity input[type="checkbox"]');

const keyswitches = document.querySelectorAll('.keyswitches input[type="checkbox"]');

const keycapCheckbox = document.querySelectorAll('.keycaps input[type="checkbox"]');

const sortSelect = document.querySelector('.btnfilter');
const selectclose = document.querySelector('.arrowicon');
const filterSlide = document.querySelector('.filterpannal');
const backicon = document.querySelector('.filterback');

const brandsfilter = document.querySelector('.btnbrands');
const brandpannal = document.querySelector('.filterbrands');
const brandback = document.querySelector('.arrowiconbrand');
const filterbrandchkbox = document.querySelectorAll('.brandslistfilter input[type="checkbox"]');

const priceFilter = document.querySelector('.btnprice');
const pricepannal = document.querySelector('.filterprice');
const priceback = document.querySelector('.arrowiconprice');

const minthumbprice = document.getElementById('minthumbprice');
const maxthumbprice = document.getElementById('maxthumbprice');
const pricelinefilter = document.getElementById('pricelineprice');
const pricemin = document.getElementById('pricelblmin');
const pricemax = document.getElementById('pricelblmax');
const priceslider = document.getElementById('pricebarslider');

const minGap = 500;

document.addEventListener('DOMContentLoaded', () => {
fetch('product.json')
    .then(response => response.json())
    .then(data => {
            allProducts = data;

            // Ensure elements exist before calling these
            if (typeof updateSlider === 'function') updateSlider();
            if (typeof renderProducts === 'function') renderProducts(allProducts);

            filterSlide.classList.remove('active');
            backicon.classList.remove('active');
            brandpannal.classList.remove('active');
            pricepannal.classList.remove('active');
            
            //Display Allfilter
            if (sortSelect && filterSlide) {
                sortSelect.addEventListener('click', () => {
                    filterSlide.classList.add('active');
                    backicon.classList.add('active');
                });
            }

            // Display brand Filter
            if(brandsfilter && brandpannal){
                brandsfilter.addEventListener('click', () => {
                    brandpannal.classList.add('active');
                    filterSlide.classList.remove('active');
                });
            }

            // Display price filter
            if(priceFilter && pricepannal){
                priceFilter.addEventListener('click', () => {
                    pricepannal.classList.add('active');
                    filterSlide.classList.remove('active');
                });
            }

            //close Allfilters 
            if (selectclose && filterSlide) {
                selectclose.addEventListener('click', () => {
                    filterSlide.classList.remove('active');
                    backicon.classList.remove('active');
                });
            }

            //close brand filter
            if(brandback && brandpannal){
                brandback.addEventListener('click', () => {
                    brandpannal.classList.remove('active');
                    filterSlide.classList.remove('active');
                });
            }

            //close price filter
            if(priceback && pricepannal){
                priceback.addEventListener('click', () => {
                    pricepannal.classList.remove('active');
                    filterSlide.classList.remove('active');
                });
            }
        })
    .catch(error => {
        console.error('Error in fetch products:', error);
    });
    
});

function renderProducts(products) {
    container.innerHTML = ''; // Always clear and then load the products
    products.forEach(product => {

        const div = document.createElement('div');
        div.className = 'keyproduct product'; //product is used for getting the filtered value

        //Generate stars        
        const maxStars = 5;
        const fullstars = Math.floor(product.rating);
        const halfStars = product.rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = maxStars - fullstars - halfStars;
        let starsHTML = '';

        for (let i = 0; i < fullstars; i++) {
            starsHTML += '<span class = "star full">★</span>';
        }
        if (halfStars) {
            starsHTML += '<span class = "star half">★</span>';
        }
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<span class = "star empty">☆</span>';
        }

        //For Product Price Details
        let priceHTML;
        if (product.price.discounted && product.price.actual) {
            priceHTML = `
                            <strong>
                                <span style = "text-decoration: line-through;">${product.price.actual}</span>
                                <span> ${product.price.discounted}</span>
                            </strong>`;
        }

        else if (product.price.min && product.price.max) {
            priceHTML = `
                            <strong>
                                <span> ${product.price.min}</span> – 
                                <span> ${product.price.max}</span>
                            </strong>`;
        }

        else {
            priceHTML = `<strong><span> </span></strong>`;
        }

        div.innerHTML = `
            <img src = "${product.image}">            
            <div class="rating">
                <svg width="16" height="16" viewBox="0 0 512 512">
                    <path xmlns="http://www.w3.org/2000/svg" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                </svg>
            </div>
            <div class ="discription">
                <h3> ${product.name}</h3>
                <div class = "stars">${starsHTML}</div>
                <div class = "price">${priceHTML}</div>
            </div>`;
        container.appendChild(div);

    });
}

// ------------------------------------------ All slider working---------------------------------------------------------

// For All filter Slider
function updateSlider(e) {
    let minVal = parseInt(minRange.value);
    let maxVal = parseInt(maxRange.value);

    if (maxVal - minVal < minGap) {
        if (e.target.id === "minthumb") {
            minRange.value = maxVal - minGap;
            minVal = maxVal - minGap;
        }
        else if(e && e.target.id === "maxthumb"){
            maxRange.value = minVal + minGap;
            maxVal = minVal + minGap;
        }
    }

    const sliderWidth = slider.offsetWidth;
    const minPercent = ((minVal - 3500) / (13999 - 3500)) * sliderWidth;
    const maxPercent = ((maxVal - 3500) / (13999 - 3500)) * sliderWidth;

    priceline.style.left = `${minPercent}px`;
    priceline.style.width = `${maxPercent - minPercent}px`;

    minPrice.value = `₹${minVal}`;
    maxPrice.value = `₹${maxVal}`;

    const clearbtn = document.getElementById('btnclearfilter');
    
    const minValNum = parseInt(minPrice.value.replace(/[₹,]/g, ''));
    const maxValNum = parseInt(maxPrice.value.replace(/[₹,]/g, ''));

    if(minValNum !== 3500 || maxValNum !== 13999){
        clearbtn.style.display = 'block';
    }
    else{
        clearbtn.style.display = 'none';
    }

    applyAllfilter();
}

minRange.addEventListener("input", updateSlider);
maxRange.addEventListener("input", updateSlider);

document.querySelectorAll('input[type="checkbox"], input[type="radio"').forEach(input => {
    input.addEventListener('change', toggleClearButton);
});

// For Price filter Slider
function priceupdateSlider(e) {
    let minVal = parseInt(minthumbprice.value);
    let maxVal = parseInt(maxthumbprice.value);

    if (maxVal - minVal < minGap) {
        if (e.target.id === "minthumbprice") {
            minthumbprice.value = maxVal - minGap;
            minVal = maxVal - minGap;
        }
        else {
            maxthumbprice.value = minVal + minGap;
            maxVal = minVal + minGap;
        }
    }

    const sliderWidth = priceslider.offsetWidth;
    const minPercent = ((minVal - 3500) / (13999 - 3500)) * sliderWidth;
    const maxPercent = ((maxVal - 3500) / (13999 - 3500)) * sliderWidth;

    priceline.style.left = `${minPercent}px`;
    priceline.style.width = `${maxPercent - minPercent}px`;

    pricemin.value = `₹${minVal}`;
    pricemax.value = `₹${maxVal}`;

    const priceclearBtn = document.getElementById('btnpricefilter');

    const priceMinNum = parseInt(pricemin.value.replace(/[₹,]/g,''));
    const priceMaxNum = parseInt(pricemax.value.replace(/[₹,]/g,''));

    if(priceMinNum !== 3500 || priceMaxNum !== 13999){
        priceclearBtn.style.display = 'block';
    }
    else{
        priceclearBtn.style.display = 'none';
    }

    applyAllfilter();
}

minthumbprice.addEventListener("input", priceupdateSlider);
maxthumbprice.addEventListener("input", priceupdateSlider);

// ------------------------------------------ To clear in all filter buttons---------------------------------------------------------

// for clear button
document.getElementById('btnclearfilter').addEventListener('click', () => {
    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => input.checked = false);
    document.getElementById('Any').checked = true;
    
    minRange.value = "3500";
    maxRange.value = "13999";

    if(minPrice) minPrice.value = "min.";
    if(maxPrice) maxPrice.value = "max.";

    document.getElementById('btnclearfilter').style.display = 'none';
    updateSlider();
    applyAllfilter();
});

//For clear brand filter
document.getElementById('btnbrandfilter').addEventListener('click', () => {
    document.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);
    document.getElementById('btnbrandfilter').style.display = 'none';
    applyAllfilter();
});

//For clear price filter
document.getElementById('btnpricefilter').addEventListener('click', () => {    
    minthumbprice.value = "3500";
    maxthumbprice.value = "13999";    

    if(minthumbprice) pricemin.value = "min.";
    if(maxthumbprice) pricemax.value = "max.";

    document.getElementById('btnpricefilter').style.display = 'none';
    updateSlider();
    applyAllfilter();
});

// ------------------------------------------ to clear all checkboxes and radiobuttons---------------------------------------------------------

//clear the checkbox when the clear button is clicked
function toggleClearButton() {
    const minVal = parseInt(minRange.value);
    const maxVal = parseInt(maxRange.value);
    const anyChecked = document.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked').length > 0;
    const clearButton = document.getElementById('btnclearfilter');

    if (anyChecked || minVal !== 3500 || maxVal !== 13999) {
        clearButton.style.display = 'block';
    }
    else{
        clearButton.style.display = 'none';
    }
}

//clear the checkbox when the clear button is clicked in brand
function toggleBrandClearBtn() {
    const anyChecked = document.querySelectorAll('input[type="checkbox"]:checked').length > 0;
    const brandclear = document.getElementById('btnbrandfilter');

    if (anyChecked) {
        brandclear.style.display = 'block';
    }
    else {
        brandclear.style.display = 'none';
    }
}

// ------------------------------------------ Apply all changes happening in all the filters ---------------------------------------------------------

function applyAllfilter() {
    let min, max;
    if(pricepannal.classList.contains('active')){
        min = parseInt(pricemin.value.replace(/[₹,]/g, '')) || 0;
        max = parseInt(pricemax.value.replace(/[₹,]/g, '')) || Infinity;
    }
    else{
        min = parseInt(minPrice.value.replace(/[₹,]/g, '')) || 0;
        max = parseInt(maxPrice.value.replace(/[₹,]/g, '')) || Infinity;
    }

    const showInStock = inStockCheckbox.checked;
    const showOutofstock = outOfStockCheckbox.checked;
    let selectedstock = 'any';

    if (showInStock) selectedstock = 'instock';
    else if (showOutofstock) selectedstock = 'outofstock';

    //Brand
    const selectedBrands = [ 
        ...Array.from(brandCheckboxes),
        ...Array.from(filterbrandchkbox)
    ]
        .filter(chk => chk.checked)
        .map(chk => chk.value.toLowerCase());

    //Size
    const selectedsize = Array.from(sizeCheckboxes)
        .filter(chk => chk.checked)
        .map(chk => chk.value.toLowerCase());

    //connectivity
    const selectedconnect = Array.from(connectivity)
        .filter(chk => chk.checked)
        .map(chk => chk.value.toLowerCase());

    //keyswitches
    const selectkeyswitch = Array.from(keyswitches)
        .filter(chk => chk.checked)
        .map(chk => chk.value.toLowerCase());

    //keycaps
    const selectkeycaps = Array.from(keycapCheckbox)
        .filter(chk => chk.checked)
        .map(chk => chk.value.toLowerCase());

    //price
    const filtered = allProducts.filter(p => {
        let priceValue = 0;

        if (typeof p.price === 'object' && p.price !== null) {
            if (p.price.discounted) {
                priceValue = parseInt(p.price.discounted.replace(/[₹,]/g, '')) || 0;
            }
            else if (p.price.actual) {
                priceValue = parseInt(p.price.actual.replace(/[₹,]/g, '')) || 0;
            }
            else if (p.price.min) {
                priceValue = parseInt(p.price.min.replace(/[₹,]/g, '')) || 0;
            }
            else if (p.price.max) {
                priceValue = parseInt(p.price.max.replace(/[₹,]/g, '')) || 0;
            }
        }

        else {
            priceValue = parseInt(p.price.replace(/[₹,]/g, '')) || 0;
        }

        const stockStatus = (p.stock || '').toLowerCase();
        const brandName = (p.brand || '').toLowerCase();
        const sizevalue = (p.size || '').toLowerCase();
        const connect = (p.wired || '').toLowerCase();
        const switches = (p.keyswitches || '').toLowerCase();
        const keycapsname = (p.keycaps.material || '').toLowerCase();

        const inPriceRange = stockStatus === 'outofstock' || (priceValue >= min && priceValue <= max);
        const inStockFilter = selectedstock === 'any' || stockStatus === selectedstock;
        const inBrandFilter = selectedBrands.length === 0 || selectedBrands.includes(brandName);
        const sizesfrom = selectedsize.length === 0 || selectedsize.includes(sizevalue);
        const connection = selectedconnect.length === 0 || selectedconnect.includes(connect);
        const inswitches = selectkeyswitch.length === 0 || selectkeyswitch.includes(switches);
        const keycapslist = selectkeycaps.length === 0 || selectkeycaps.includes(keycapsname);

        return inPriceRange && inStockFilter && inBrandFilter && sizesfrom && connection && inswitches && keycapslist;
    });

    renderProducts(filtered);
}

// ---------------------------------------------------------------------------------------------------

function SyncBrandFilters(){
    const allBrandCheckboxes = document.querySelectorAll('.filterpannal .brandslist input[type="checkbox"]');
    const brandPanelcheckboxes = document.querySelectorAll('.filterbrands .brandslistfilter input[type="checkbox');

    // when user changes any checkbox in main "All Filters"
    allBrandCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            brandPanelcheckboxes.forEach(other => {
                if(other.value === cb.value){
                    other.checked = cb.checked;
                }
            });
            applyAllfilter();
            toggleClearButton();
        });
    });

    //When user changes any checkbox in brand panel
    brandPanelcheckboxes.forEach(cd => {
        cb.addEventListener('change', () =>{
            allBrandCheckboxes.forEach(other => {
                if(other.value === cb.value) {
                    other.checked = cb.checked;
                }
            });
            applyAllfilter();
            toggleClearButton();
        });
    });
}

SyncBrandFilters();

function syncPriceSliders(){
    const minAll = document.getElementById('minthumb');
    const maxAll = document.getElementById('maxthumb');
    const minLabelAll = document.getElementById('lblminprice');
    const maxLabelall = document.getElementById('lblmaxprice');

    const minPrice = document.getElementById('minthumbprice');
    const maxPrice = document.getElementById('maxthumbprice');
    const minLabelPrice = document.getElementById('pricelblmin');
    const maxLabelprice = document.getElementById('pricelblmax');

    function updateAllFilterFromPricePanel(){
        minAll.value = minPrice.value;
        maxAll.value = maxPrice.value;
        minLabelAll.value = `₹${minPrice.value}`;
        maxLabelall.value = `₹${maxPrice.value}`;

        updateSlider();
        applyAllfilter();
    }

    function updatePricePanelFromAllFilter(){
        minPrice.value = minAll.value;
        maxPrice.value = maxAll.value;
        minLabelPrice.value = `₹${minAll.value}`;
        maxLabelprice.value = `₹${maxAll.value}`;

        priceupdateSlider();
        applyAllfilter();
    }

    [minAll,maxAll].forEach(input => {
        input.addEventListener('input', updatePricePanelForAllFilter);
    });
    [minPrice, maxPrice].forEach(input => {
        input.addEventListener('input', updateAllFilterFromPricePanel);
    });
}

syncPriceSliders();

// ------------------------------------------ Event listeners for all the buttons, checkboxes, radiobuttons, and sliders ---------------------------------------------------------

minRange.addEventListener('input', applyAllfilter);
maxRange.addEventListener('input', applyAllfilter);
inStockCheckbox.addEventListener('change', () => { applyAllfilter(); toggleClearButton(); });
outOfStockCheckbox.addEventListener('change', () => { applyAllfilter(); toggleClearButton(); });
stockAny.addEventListener('change', () => { applyAllfilter(); toggleClearButton(); });
brandCheckboxes.forEach(chk => chk.addEventListener('change', () => { applyAllfilter(); toggleClearButton(); }));
sizeCheckboxes.forEach(chk => chk.addEventListener('change', () => { applyAllfilter(); toggleClearButton(); }));
connectivity.forEach(chk => chk.addEventListener('change', () => { applyAllfilter(); toggleClearButton(); }));
keyswitches.forEach(chk => chk.addEventListener('change', () => { applyAllfilter(); toggleClearButton(); }));
keycapCheckbox.forEach(chk => chk.addEventListener('change', () => { applyAllfilter(); toggleClearButton(); }));
filterbrandchkbox.forEach(chk => chk.addEventListener('change', () => {applyAllfilter(); toggleBrandClearBtn(); }));
minthumbprice.addEventListener('input', applyAllfilter);
maxthumbprice.addEventListener('input', applyAllfilter);
slider.addEventListener('input', () => { applyAllfilter(); toggleClearButton(); });
priceslider.addEventListener('input', () => { applyAllfilter(); toggleClearButton(); });


