export function addItem(val: string, className?: string): void {
  
  let node = document.createElement('li');
  let value = `${(new Date().getSeconds())}.${(new Date().getMilliseconds())}: ${val}`;
  !!className && node.classList.add(className);
  let textnode = document.createTextNode(value);
  node.appendChild(textnode);
  document.getElementById('output').appendChild(node);
  
}