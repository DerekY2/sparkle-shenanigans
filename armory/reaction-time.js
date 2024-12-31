chrome.storage.local.get(['reaction-time-bool'],(result)=>{
  const time = 175
  const range = 50
  const fast = result['reaction-time-bool']
  if(fast==100){
    if(document.querySelector('#root')){
      const observer = new MutationObserver((mutations, observer)=>{
        for(let mutation of mutations){
          if(mutation.type ==='childList'){
            console.log("Mutation detected... time:",time,'range:',range)
            if(document.querySelector('#root > div > div:nth-child(4) > div.view-go.e18o0sx0.css-saet2v.e19owgy77')){
              simClick(document.querySelector('#root > div > div:nth-child(4) > div.view-go.e18o0sx0.css-saet2v.e19owgy77'))
            }
          }
        }
      })
      observer.observe(document.querySelector('#root'), { childList: true, subtree: true });
    }
  }
  else{
    if(document.querySelector('#root')){
      const observer = new MutationObserver((mutations, observer)=>{
        for(let mutation of mutations){
          if(mutation.type ==='childList'){
            console.log("Mutation detected... time:",time,'range:',range)
            if(document.querySelector('#root > div > div:nth-child(4) > div.view-go.e18o0sx0.css-saet2v.e19owgy77')){
              var num = getRandomNumber(time - range, time + range)
              console.log('waiting: ',num)
              delay(num).then(() => {
                simClick(document.querySelector('#root > div > div:nth-child(4) > div.view-go.e18o0sx0.css-saet2v.e19owgy77'))
              })
            }
          }
        }
      })
      observer.observe(document.querySelector('#root'), { childList: true, subtree: true });
    }
  }
})
// document.addEventListener('click', ()=>{
//   document.querySelector('.full-nav').click()
//   console.log("Clicked nav")
// })

async function simClick(selector){
  try{
    var box = selector.getBoundingClientRect(),
    coordX = box.left + (box.right - box.left) / 2,
    coordY = box.top + (box.bottom - box.top) / 2;
    simulateMouseEvent (selector, "mousedown", coordX, coordY);
    simulateMouseEvent (selector, "mouseup", coordX, coordY);
    simulateMouseEvent (selector, "click", coordX, coordY);
  }
  catch{
    console.log('not found/duplicate execution')
  }
}

function simulateMouseEvent(element, eventName, coordX, coordY) {
  element.dispatchEvent(new MouseEvent(eventName, {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: coordX,
    clientY: coordY,
    button: 0
  }));
  console.log("CLICK")
};

function getRandomNumber(min, max) {
  n=Math.floor(Math.random() * (max - min) + min)
  console.log('calculated randint:',n,'from',min,max)
  return n<0?0:n;
}

function delay(ms){
  return new Promise(resolve => setTimeout(resolve, ms))
}