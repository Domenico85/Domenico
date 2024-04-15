for (let i=0; i<16; i++){
    
    const container = document.querySelector('#container');
    let createDivs =  document.createElement('div');
    createDivs.className = 'squares';
    createDivs.textContent = 'Hello'
    createDivs.setAttribute('style', 'background-color: red; display:flex')
    container.appendChild(createDivs);

}