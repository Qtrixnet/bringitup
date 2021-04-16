const body = document.querySelector('body');
let textNodes = [];
function recursy(element) {
  body.childNodes.forEach(node => {
    
    if (node.nodeName.match(/^H\d/)) {
      textNodes.push(node.textContent);
    } else {
      recursy(node);
    }
  });
}

recursy(body); 
console.log(textNodes);
