
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

            syncBrandFilters();
        })
    .catch(error => {
        console.error('Error in fetch products:', error);
    });
    
    hookActiveFilterRenderers();
    renderActiveFilters();
    toggleClearButton();
    toggleBrandClearBtn();
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

// ------------------------------------------ buttons for checkboxes, price, etc ---------------------------------------------------------

const activeFiltersContainer = document.getElementById('activeFiltersContainer');
const clearAllBtn = document.getElementById('btnclearallfilter');
const DEFAULT_MIN = 3500;
const DEFAULT_MAX = 13999;

const pillSvg = '<svg fill="none" xmlns="http://www.w3.org/2000/svg" width="12" height="12" aria-hidden="true"><path d="M11 1 1 11M1 1l10 10" stroke="#767676" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

function getActivefilters(){
    const active = [];
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (cb.checked){
            let label = cb.value || cb.id || 'Filter';

            const parent = cb.parentElement;
            if(parent){
                const span = parent.querySelector('span');
                if(span && span.textContent && span.textContent.trim()) label = span.textContent.trim();                
            }

            active.push({ type: 'checkbox', key: (cb.dataset.filterKey || cb.value || cb.id), label});
        }
    });

    document.querySelectorAll('input[type="radio"').forEach(r => {
        if(r.checked && r.value && r.value.toLowerCase() !== 'any'){
            let label = r.value;
            const parent = r.parentElement;
            if(parent){
                const span = parent.querySelector('span');
                if(span && span.textContent && span.textContent.trim()) label = span.textContent.trim();
            }
            active.push({ type: 'radio', key: (r.name + ':' + r.value), label});
        }
    });

    const currentMin = parseInt(minRange.value);
    const currentMax = parseInt(maxRange.value);

    if(currentMin !== DEFAULT_MIN) {
        active.push({ type:'price', 
                      key: `price:${currentMin}-${currentMax}`, 
                      label: `Price from: ₹${currentMin}`});
    }
    
    if(currentMax !== DEFAULT_MAX){
        active.push({type:'price', 
                     key: `price:${currentMin}-${currentMax}`, 
                     label: `Price to: ₹${currentMax}` })
    }

    const uniqueActive = [];
    const seenKeys = new Set();
    for(const f of active){
        if(!seenKeys.has(f.key)){
            seenKeys.add(f.key);
            uniqueActive.push(f);
        }
    }

    return uniqueActive;
}

function renderActiveFilters(){

    if (!activeFiltersContainer) return;
    activeFiltersContainer.innerHTML = '';

    const active = getActivefilters();

    const uniquefilters =  [];
    const seenKeys = new Set();

    for(const filter of active){
        if(!seenKeys.has(filter.key)){
            seenKeys.add(filter.key);
            uniquefilters.push(filter);
        }
    }

    uniquefilters.forEach(filter => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'filter-pill';
        btn.dataset.filterType = filter.type;
        btn.dataset.filterKey = filter.key;

        btn.innerHTML = `<span class="filter-pill-label">${filter.label}</span>${pillSvg}`;
        btn.addEventListener('click', () => {
            removefilter(filter);
        });
        activeFiltersContainer.appendChild(btn);
    });

    if(clearAllBtn){
        clearAllBtn.style.display = active.length > 1 ? 'inline-block' : 'none';
    }

    updateClearAllButtonVisibility();
}

function updateClearAllButtonVisibility(){
    const activefilter = getActivefilters();
    const activeCount = activefilter.length;
    const clearAllBtn = document.getElementById('btnclearallfilter');

    if(!clearAllBtn) return;

    if(activeCount > 1){
        clearAllBtn.style.display = 'block';
    }
    else{
        clearAllBtn.style.display = 'none';
    }
}

function removefilter(filter){
    if(!filter) return;

    if(filter.type === 'checkbox'){
        const selectors = [
            `input[type="checkbox"][value="${cssEscape(filter.key)}"]`,
            `input[type="checkbox"]#${cssEscape(filter.key)}`
        ];
        const nodes = document.querySelectorAll(selectors.join(','));
        if(nodes && nodes.length > 0){
            nodes.forEach(n => { n.checked = false; });
        }
        else{
            document.querySelectorAll('input[type="checked"]').forEach(cb => {
                let lbl = cb.value || cb.id;
                const parent = cb.parentElement;
                if(parent){
                    const span = parent.querySelector('span');
                    if(span && span.textContent) lbl = span.textContent.trim();
                }
                if(lbl && lbl.toLowerCase() === filter.label.toLowerCase()) cb.checked = false;
            });
        }
        if(typeof syncBrandFilters === 'function') syncBrandFilters();
    }

    else if(filter.type === 'radio'){
        const parts = filter.key.split(':');
        const name = parts[0];
        const anyRadio = document.querySelector(`input[type="radio][name="${cssEscape(name)}"][value="Any"]`);
        if(anyRadio) anyRadio.checked = true;
        else{
            document.querySelectorAll(`input[type="radio"][name="${cssEscape}]`).forEach(r => r.checked = false);
        }
    }

    else if(filter.type === 'price'){
        if(minRange && maxRange){
            minRange.value = DEFAULT_MIN;
            maxRange.value = DEFAULT_MAX;
        }

        if(minthumbprice && maxthumbprice){
            minthumbprice.value = DEFAULT_MIN;
            maxthumbprice.value = DEFAULT_MAX;
        }

        if(typeof updateSlider === 'function') updateSlider();
        if(typeof priceupdateSlider === 'function') priceupdateSlider();
    }

    renderActiveFilters();
    updateClearAllButtonVisibility();
}

function cssEscape(s){
    if(!s) return '';
    return String(s).replace(/([ #;&,.+*~':"!^$[\]()=>|\/@])/g, '\\$1');
}

function hookActiveFilterRenderers(){
    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(el => {
        el.removeEventListener('change', renderActiveFilters);
        el.addEventListener('change', () => {
            setTimeout(() => {
                renderActiveFilters();
                updateClearAllButtonVisibility();
            },0);
        });
    });

    if(minRange) minRange.addEventListener('input', () => {
        setTimeout(() => {
            renderActiveFilters();
            updateClearAllButtonVisibility();
        },0);
    });
    
    if(maxRange) maxRange.addEventListener('input', () => { 
        setTimeout(() => {
            renderActiveFilters();
            updateClearAllButtonVisibility();
        },0);
    });
    
    if(minthumbprice) minthumbprice.addEventListener('input', () => { setTimeout(renderActiveFilters,0);});
    if(maxthumbprice) maxthumbprice.addEventListener('input', () => { setTimeout(renderActiveFilters,0);});

    if(clearAllBtn){
        clearAllBtn.addEventListener('click', () => {
            document.querySelectorAll('input[type="checkbox"],input[type="radio"]').forEach(i => i.checked = false);

            if(minRange && maxRange) { minRange.value = DEFAULT_MIN; maxRange.value = DEFAULT_MAX; }
            if(minthumbprice && maxthumbprice) { minthumbprice.value = DEFAULT_MIN; maxthumbprice.value = DEFAULT_MAX; }

            if(typeof syncBrandFilters === 'function') syncBrandFilters();
            if(typeof updateSlider === 'function') updateSlider();
            if(typeof priceupdateSlider === 'function') priceupdateSlider();

            renderActiveFilters();
            if(typeof applyAllfilter === 'function') applyAllfilter();
        });
    }

}

hookActiveFilterRenderers();
renderActiveFilters();


// ------------------------------------------ All slider working---------------------------------------------------------
function updateSlider(e){
    let minVal = parseInt(minRange.value);
    let maxVal = parseInt(maxRange.value);

    if(maxVal - minVal < minGap){
        if(e && e.target.id === "minthumb"){
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
    const minValNum = parseInt(minPrice.value.replace(/[₹,]/g,''));
    const maxValNum = parseInt(maxPrice.value.replace(/[₹,]/g,''));

    clearbtn.style.display = (minValNum !== 3500 || maxValNum !== 13999) ? 'block' : 'none';

    if(!updateSlider.syncing){
        updateSlider.syncing = true;

        minthumbprice.value = minVal;
        maxthumbprice.value = maxVal;
        pricemin.value = `₹${minVal}`;
        pricemax.value = `₹${maxVal}`;

        priceupdateSlider();
        updateSlider.syncing = false;
    }

    toggleClearButton();
    applyAllfilter();
}

minRange.addEventListener("input", updateSlider);
maxRange.addEventListener("input", updateSlider);

function priceupdateSlider(e){
    let minVal = parseInt(minthumbprice.value);
    let maxVal = parseInt(maxthumbprice.value);

    if(maxVal - minVal < minGap){
        if(e && e.target.id === "minthumbprice"){
            minthumbprice.value = maxVal - minGap;
            minVal = maxVal -minGap;
        }
        else if (e && e.target.id === "maxthumbprice"){
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

    priceclearBtn.style.display = (priceMinNum !== 3500 || priceMaxNum !== 13999) ? 'block' : 'none';

    if(!priceupdateSlider.syncing){
        priceupdateSlider.syncing = true;

        minRange.value = minVal;
        maxRange.value = maxVal;
        minPrice.value = `₹${minVal}`;
        maxPrice.value = `₹${maxVal}`;

        updateSlider();

        priceupdateSlider.syncing = false;
    }

    toggleClearButton();
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
    renderActiveFilters();
    updateClearAllButtonVisibility();
});

//For clear brand filter
document.getElementById('btnbrandfilter').addEventListener('click', () => {
    document.querySelectorAll('.brandslistfilter input[type="checkbox"]:checked, .brandslist input[type="checkbox"]:checked').forEach(input => input.checked = false);
    document.getElementById('btnbrandfilter').style.display = 'none';
    syncBrandFilters();
    applyAllfilter();
    renderActiveFilters();
    updateClearAllButtonVisibility();
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
    renderActiveFilters();
    updateClearAllButtonVisibility();
});

const brandClearBtn = document.getElementById('btnbrandfilter');
if(brandClearBtn){
    brandClearBtn.addEventListener('click', () => {
        document.querySelectorAll('.brandslist input[type="checkbox"], .brandslistfilter input[type="checkbox"]').forEach(cb => {
           cb.checked = false; 
        });
        brandClearBtn.style.display = 'none';

        const allFilterClearBtn = document.getElementById('btnclearfilter');
        if(allFilterClearBtn){
            allFilterClearBtn.style.display = 'none';
        }

        syncBrandFilters();
        applyAllfilter();
    });
}

const priceClearBtn = document.getElementById('btnpricefilter');
if(priceClearBtn){
    priceClearBtn.addEventListener('click', () => {
        const defaultMin = 3500;
        const defaultmax = 13999;

        if(minRange && maxRange){
            minRange.value = defaultMin;
            maxRange.value = defaultmax;
        }

        if(minthumbprice && maxthumbprice){
            minthumbprice.value = defaultMin;
            maxthumbprice.value = defaultmax;
        }
        
        if (minPrice) minPrice.textContent = `₹${defaultMin}`;
        if (maxPrice) maxPrice.textContent = `₹${defaultmax}`;
        if (pricemin) pricemin.textContent = `₹${defaultMin}`;
        if (pricemax) pricemax.textContent = `₹${defaultmax}`;

        priceClearBtn.style.display = 'none';
        
        const allFilterClearBtn = document.getElementById('btnclearfilter');

        if(allFilterClearBtn) allFilterClearBtn.style.display = 'none';

        if (typeof updateSlider === 'function') updateSlider();
        if (typeof priceupdateSlider === 'function') priceupdateSlider();

        applyAllfilter();
    });
}

// ------------------------------------------ to clear all checkboxes and radiobuttons---------------------------------------------------------

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

// ------------------------------------------ brand reflects in bothe Allfunctions as well as brandfilter ---------------------------------------------------------

function syncBrandFilters(){
    if(syncBrandFilters.syncing) return;
    syncBrandFilters.syncing = true;

    const allfilterbrands = document.querySelectorAll('.brandslist input[type="checkbox"]');
    const  brandFilterBrands = document.querySelectorAll('.brandslistfilter input[type="checkbox"]');

    const selectedValues = [
        ...Array.from(allfilterbrands),
        ...Array.from(brandFilterBrands)
    ]

    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());

    allfilterbrands.forEach(cb => {
        cb.checked = selectedValues.includes(cb.value.toLowerCase());
    });

    brandFilterBrands.forEach(cb => {
        cb.checked = selectedValues.includes(cb.value.toLowerCase());
    });

    syncBrandFilters.syncing = false;
}

//clear the checkbox when the clear button is clicked
function toggleClearButton() {
    const minVal = parseInt(minRange.value);
    const maxVal = parseInt(maxRange.value);
    const anyChecked = document.querySelectorAll('.brandslistFilter input[type="checkbox"]:checked, .brandslist input[type="checkbox"]:checked').length > 0;

    const clearButton = document.getElementById('btnclearfilter');

    if (anyChecked || minVal !== 3500 || maxVal !== 13999) {
        clearButton.style.display = 'block';
    }
    else{
        clearButton.style.display = 'none';
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

// ------------------------------------------ Event listeners for all the buttons, checkboxes, radiobuttons, and sliders ---------------------------------------------------------

minRange.addEventListener('input', applyAllfilter);
maxRange.addEventListener('input', applyAllfilter);
inStockCheckbox.addEventListener('change', () => { applyAllfilter(); toggleClearButton(); });
outOfStockCheckbox.addEventListener('change', () => { applyAllfilter(); toggleClearButton(); });
stockAny.addEventListener('change', () => { applyAllfilter(); toggleClearButton(); });
brandCheckboxes.forEach(chk => chk.addEventListener('change', () => { syncBrandFilters('all'); toggleBrandClearBtn(); toggleClearButton(); applyAllfilter(); }));
sizeCheckboxes.forEach(chk => chk.addEventListener('change', () => { applyAllfilter(); toggleClearButton(); }));
connectivity.forEach(chk => chk.addEventListener('change', () => { applyAllfilter(); toggleClearButton(); }));
keyswitches.forEach(chk => chk.addEventListener('change', () => { applyAllfilter(); toggleClearButton(); }));
keycapCheckbox.forEach(chk => chk.addEventListener('change', () => { applyAllfilter(); toggleClearButton(); }));
filterbrandchkbox.forEach(chk => chk.addEventListener('change', () => { syncBrandFilters('brand'); toggleBrandClearBtn(); toggleClearButton(); applyAllfilter(); }));
minthumbprice.addEventListener('input', applyAllfilter);
maxthumbprice.addEventListener('input', applyAllfilter);
slider.addEventListener('input', () => { applyAllfilter(); toggleClearButton(); });
priceslider.addEventListener('input', () => { applyAllfilter(); toggleClearButton(); });

document.querySelectorAll('.brandslist input[type="checkbox"]').forEach(chk => {
    chk.addEventListener('change', () => {
        syncBrandFilters();
        toggleBrandClearBtn();
        applyAllfilter();
    });
});

document.querySelectorAll('.brandslistfilter input[type="checkbox"').forEach(chk => {
    chk.addEventListener('change', () => {
        syncBrandFilters();
        toggleBrandClearBtn();
        applyAllfilter();
    });
});