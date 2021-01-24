export default function checkSameVnode(a,b){
    return a.sel == b.sel && a.key == b.key;
}