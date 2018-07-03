export function addItem(val: string, className?: string): void {
  
  let node = document.createElement('li');
  !!className && node.classList.add(className);
  let textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById('output').appendChild(node);
  
}