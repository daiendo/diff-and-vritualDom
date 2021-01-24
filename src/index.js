import h from './h';
import patch from './patch';



let vnode = h('ol', {}, [
    h('li', {key:'A'}, 'q'), 
    h('li', {key:'B'}, 'b'),
    h('li', {key:'C'}, 'c')
]);
let container = document.getElementById('container')
patch(container, vnode)
console.log(vnode)
let newVnode = h('ol', {},[
    h('li', {key:'Q'}, 'q'), 
    h('li', {key:'A'}, 'a'), 
    h('li', {key:'B'}, 'b'),
    h('li', {key:'C'}, 'c')
]);
patch(vnode,newVnode)
