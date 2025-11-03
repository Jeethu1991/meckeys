let allData =[];       
fetch("computer.json")     
.then(res =>res.json())    
.then(data =>{ 
  allData =data;  
  productsList(allData)                             
})                                                                                                
function productsList(items) {      
  const module = document.querySelector(".container");    
  module.innerHTML = "";  
  const limitedItems = items.slice(0, 18);   
  limitedItems.forEach(post => { 
    const details = document.createElement("div");       
    details.classList.add("subcontainer");      
    details.innerHTML = ` 
      <div class="subimg">        
        <img src="${post.image}" alt="">            
        <span class="icon"></span>
        <div class="compare"><div></div><p>Compare</p></div>  
      </div>     
      <div class="content">        
        <div class="pinfo">      
          <div class="ph1">${post.name} (In Ear, Blue)</div>
          <div class="rating">  
            <span class="rating-text">${post.rating}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="..." fill="#12DAA8"></path></svg>
            </span> 
            <span class="numlist">${post.reviews}</span>          
          </div>                                 
        </div>                              
        <div class="price">     
          <div class="amount">${post.price}</div>
          <div class="offers">
            <span class="uamount">${post.original_price}</span>   
            <span class="save">${post.discount}</span> 
            <span class="off">${post.discount_percent}</span>
          </div>  
        </div>                                                  
        <div class="delivery">
          <span class="truck"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 8H17V4H3C1.9 4 1 4.9 1 6V17H3C3 18.66 4.34 20 6 20C7.66 20 9 18.66 9 17H15C15 18.66 16.34 20 18 20C19.66 20 21 18.66 21 17H23V12L20 8ZM19.5 9.5L21.46 12H17V9.5H19.5ZM6 18C5.45 18 5 17.55 5 17C5 16.45 5.45 16 6 16C6.55 16 7 16.45 7 17C7 17.55 6.55 18 6 18ZM8.22 15C7.67 14.39 6.89 14 6 14C5.11 14 4.33 14.39 3.78 15H3V6H15V15H8.22ZM18 18C17.45 18 17 17.55 17 17C17 16.45 17.45 16 18 16C18.55 16 19 16.45 19 17C19 17.55 18.55 18 18 18Z" fill="white"></path></svg></span>
          <span class="express">Express Delivery by today</span>
        </div>    
      </div>            
    `;   
                     
    module.appendChild(details);
  });   
}           
       
const filterDatas={                       
    categories:`         
                    <div class="muiteam">   
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                         <span class="muiitems">Truly Wireless Earbuds (661)</span>
                    </div>
                    <div class="muiteam">  
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Windows Laptops (415)</span>
                    </div>   
                    <div class="muiteam">            
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                     
                        <span class="muiitems">Android Tablets (252)</span>            
                    </div>             
                    <div class="muiteam">         
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox" ></span>   
                        <span class="muiitems">Tablet and iPad Covers, Cases & Sleeves (415)</span>          
                    </div>               
                    <div class="muiteam">                        
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox" ></span>
                        <span class="muiitems">Mice(415)</span>          
                    </div>      
                    <div class="muiteam">             
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Ipad(415)</span>          
                    </div>           
                    <div class="muiteam">            
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox" ></span>
                        <span class="muiitems">Laptop Covers(415)</span>             
                    </div>   
                    <div class="muiteam">            
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Bluetooth Headphones(160)</span>         
                    </div>  
                    <div class="muiteam">               
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Bluetooth Earphones(160)</span>         
                    </div>   
                    <div class="muiteam">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Gaming laptops (160)</span>         
                    </div>         
    `, 
    Brand:`  
     <div class="muiteam" id="muitem2">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Samsung(248)</span>         
     </div>
       <div class="muiteam"  id="muitem2">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Croma(79)</span>         
     </div>
     
       <div class="muiteam"  id="muitem2">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">lg(3)</span>         
     </div>

       <div class="muiteam"  id="muitem2">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">apple(520)</span>         
     </div>
       <div class="muiteam"  id="muitem2">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">hp(213)</span>         
     </div>
    <div class="muiteam"  id="muitem2">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Sony(56)</span>         
     </div>

     <div class="muiteam"  id="muitem2">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Oneplus(44)</span>         
     </div>            

      <div class="muiteam"  id="muitem2">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">philips(32)</span>         
     </div>

     <div class="muiteam"  id="muitem2">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Boat(186)</span>         
     </div>
     <div class="muiteam"  id="muitem2">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Boat(2)</span>         
     </div>

       
     <div class="muiteam"  id="muitem2">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">lenovo(174)</span>         
     </div>   
     <div class="muiteam"  id="muitem2">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Asus(114)</span>         
     </div>     
    `,
    Price:`<div class="muiteam" id="muitem3">                
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">501 - 1,000 (383)</span>         
     </div>
     <div class="muiteam" id="muitem3">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">10,001 - 20,000 (306)</span>         
     </div>
     <div class="muiteam" id="muitem3">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">5,001 - 10,000 (317)</span>         
     </div>
      <div class="muiteam" id="muitem3">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">500 & Below (444)</span>      
         </div>
          <div class="muiteam" id="muitem3">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">1,501 - 3,000 (575)</span>         
     </div> 

      <div class="muiteam" id="muitem3">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">20,001 - 30,000 (143)</span>         
     </div> <div class="muiteam" id="muitem3">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">1,001 - 1,500 (295) </span>         
     </div> <div class="muiteam" id="muitem3">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">30,001 - 40,000 (112) </span>         
     </div> <div class="muiteam" id="muitem3">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">3,001 - 5,000 (296) </span>         
     </div> <div class="muiteam" id="muitem3">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">40,001 - 50,000 (82) </span>         
     </div> <div class="muiteam" id="muitem3">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">1,00,001 - 2,00,000 (349) </span>         
     </div> <div class="muiteam" id="muitem3">               
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">60,001 - 70,000 (124)</span>         
     </div> <div class="muiteam" id="muitem3">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">50,001 - 60,000 (109)</span>         
     </div> <div class="muiteam" id="muitem3">                
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems"> 70,001 - 80,000 (96) </span>         
     </div>     
     `,     
     Processor:`                                                         
      <div class="muiteam" id="muitem4">                
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Core i5 (126)</span>         
      </div>              
      <div class="muiteam" id="muitem4">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Core i7 (76)</span>         
      </div>
                          
      <div class="muiteam" id="muitem4">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Ryzen 7 (37)</span>         
      </div>
         
      <div class="muiteam" id="muitem4">               
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems"> Ryzen 5 (52) </span>         
      </div>
                                                                    
      <div class="muiteam" id="muitem4">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Core Ultra 7 (61)  </span>         
      </div>

      <div class="muiteam" id="muitem4">                
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Core i3 (41)  </span>         
      </div>

      <div class="muiteam" id="muitem4">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems"> M2 (17)  </span>         
      </div>
      <div class="muiteam" id="muitem4">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems"> Core Ultra 5 (32)  </span>         
      </div>
                                                
      <div class="muiteam" id="muitem4">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems"> M4 (30)  </span>         
      </div>

      <div class="muiteam" id="muitem4">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">M3 (47) </span>         
      </div>
  
      <div class="muiteam" id="muitem4">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Ryzen 3 (18)  </span>         
      </div>     
                  
      <div class="muiteam" id="muitem4">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">Core Ultra 9 (15)  </span>         
      </div>
     `,
     Ram:`
        <input type="checkbox" class="checks">   
      <div class="muiteam " id="muitem5">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">  16GB (393) </span>         
      </div>
      <div class="muiteam"  id="muitem5">                
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems"> 8GB (186)  </span>         
      </div>
      
      <div class="muiteam"  id="muitem5">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems"> 32GB (55)  </span>         
      </div>
                     
      <div class="muiteam"  id="muitem5">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">  24GB (36) </span>         
      </div>
      <div class="muiteam"  id="muitem5">                 
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">  36GB (11) </span>         
      </div>

      <div class="muiteam"  id="muitem5">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems">18GB (6)  </span>         
      </div>
   
      <div class="muiteam"  id="muitem5">              
                        <span class="muicheck"><input type="checkbox" name="" id="" class="greenbox"></span>
                        <span class="muiitems"> 48GB (6)                 </span>         
      </div>    
     `                    
}                 
    
const  catBtns=document.querySelectorAll('.cat')
const  muiBox =document.querySelector('.muibox')               
const  muiBtn =document.querySelector('.muictnbtn')  
const  muiUl =document.querySelector(".muiul");          
const  muiHead =document.querySelector(".muih1 h1");   
const  storeGreenBox= new Set();
                                                               
catBtns.forEach(cat =>{                        
  cat.addEventListener("click",()=>{           
    const filterType=cat.getAttribute("cat-filter")      
    muiUl.innerHTML =filterDatas[filterType];   
    muiHead.textContent =filterType                   
    setTimeout(() =>{
      document.querySelectorAll(".greenbox").forEach(chk =>{
        const label =chk.closest(".muiteam")?.querySelector(".muiitems")?.innerText.trim();
        const cleanLabel=label?.replace(/\s*\(.*?\)\s*/g, '').trim();
        if(storeGreenBox.has(cleanLabel)){
          chk.checked =true;                        
        }                                                  
      })                       
    },0);                                           
    if(window.innerWidth>=768){     
      const rect =cat.getBoundingClientRect();          
      muiBox.style.top=`${rect.bottom +.2}px`;  
      muiBox.style.left =`${rect.left }px`
    }           
    muiBox.classList.add("active")               
  })                                                
})               
muiBtn.addEventListener("click",()=>{         
  muiBox.classList.remove("active")       
})                        
document.addEventListener("click",(e)=>{  
    if(!muiBox.contains(e.target) && !e.target.closest(".scrolls")){
      muiBox.classList.remove("active")
    }                                                      
})                                    
                                                                         
const svg=`
<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M9.66665 1.27337L8.72665 0.333374L4.99998 4.06004L1.27331 0.333374L0.333313 1.27337L4.05998 5.00004L0.333313 8.72671L1.27331 9.66671L4.99998 5.94004L8.72665 9.66671L9.66665 8.72671L5.93998 5.00004L9.66665 1.27337Z" fill="#191919"></path></svg>
`                                                                           
document.addEventListener('DOMContentLoaded', () => {                                           
  const parentContainer = document.body;                  
  const rwlDiv= document.querySelector('.rwl')                                 
  const clearBtn =document.querySelector(".clear")                                                                                 
  parentContainer.addEventListener('change', (e) => {          
    if (e.target && e.target.classList.contains('greenbox')) { 
      const checkbox =e.target;                 
      const labelTexts = checkbox.closest('.muiteam').querySelector('.muiitems').innerText.trim(); 
      const cleanTexts = labelTexts.replace(/\s*\(.*?\)\s*/g, '').trim();       
      const labelText  = labelTexts.toUpperCase();                                                                   
      console.log(labelText);                                                                                                                       
      if(checkbox.checked){                   
        if(![...rwlDiv.children].some(child=> child.querySelector(".fil")?.textContent === cleanTexts)){
          const filBox=document.createElement("div") 
          const parentBox = document.createElement("div");     
          const svgspan=document.createElement("span")   
          svgspan.innerHTML=svg;                            
          filBox.className='fil'                                           
          filBox.textContent=cleanTexts;                                                                           
          parentBox.appendChild(filBox)          
          parentBox.appendChild(svgspan)        
          rwlDiv.appendChild(parentBox)                              
          clearBtn.style.display="flex";
          storeGreenBox.add(cleanTexts);                                     
          svgspan.addEventListener("click",()=>{
            parentBox.remove(); 
            storeGreenBox.delete(cleanTexts) 
            document.querySelectorAll(".muiteam").forEach(team=>{
              const item =team.querySelector(".muiitems")?.innerText.trim().replace(/\s*\(.*?\)\s*/g, '');
              if(item === cleanTexts){
                 const box =team.querySelector(".greenbox");
                 if(box) box.checked =false;
              }
            });                
                  
            productsList(allData);         
            if(rwlDiv.children.length ===0){     
              clearBtn.style.display="none" 
            }
          })   
        }                    
        let filtered = allData.filter(post => post.brand === labelText);  
        if (filtered.length === 0) {
        filtered = allData.filter(post => post.cats === labelText);
        }                   
        if (filtered.length === 0) {
          filtered = allData.filter(post => post.processor=== labelText);
        }      
        if (filtered.length === 0) {  
          filtered = allData.filter(post => post.ram=== labelText);   
        }                  
        if(filtered.length==0){        
          const pRange= extractRange(labelText);             
          if(pRange){   
            filtered=allData.filter(post=>{      
              const productPrice =cleanPrice(post.price);  
              return productPrice >= pRange.min && productPrice <=pRange.max 
            })                 
          }                                                                      
        }                                   
        productsList(filtered);                        
        }else{
          [...rwlDiv.children].forEach(child=>{
            const pill =child.querySelector(".fil");
            if(pill?.textContent ===cleanTexts){
              child.remove();
            }
          })
          storeGreenBox.delete(cleanTexts);
          productsList(allData);
          if(rwlDiv.children.length==0){
            clearBtn.style.display ="none";
          }                       
        }                                       
    }                                                                           
  });                                               
  clearBtn.addEventListener("click",()=>{    
      rwlDiv.innerHTML="";
      productsList(allData);
      storeGreenBox.clear();
      clearBtn.style.display="none";   
      document.querySelectorAll(".greenbox").forEach(box=>{
        box.checked =false;
      });                                                                        
  })                                         
}); 
const cleanPrice =(priceStr)=>{                                         
  return parseInt(priceStr.replace(/[₹,]/g, ''), 10);
}                                            
const extractRange =(label)=>{                        
  const match = label.match(/([\d,]+)\s*-\s*([\d,]+)/);
  if (match) {                              
    const min = parseInt(match[1].replace(/,/g, ''), 10);      
    const max = parseInt(match[2].replace(/,/g, ''), 10);
    return { min, max };              
  }                                      
  return null;     
}                                      
                             