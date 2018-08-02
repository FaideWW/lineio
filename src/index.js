import _ from 'lodash';
import printMe from './print';
import { add } from './add.ts';
import './style.css';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  btn.innerHTML = add(1, 2);
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Hot reloading');
    printMe();
  });
}
