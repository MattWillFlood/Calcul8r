const main = document.querySelector('.main')
const screen = document.createElement('div');
const keypad = document.createElement('div')
const display = document.createElement('a')
screen.appendChild(display)
screen.classList.add('display')
let current = ''

const numbers = document.createElement('div');
for (let i=0; i<=3; i++) {
    const row = document.createElement('div');
    row.classList.add('row');

    if (i<3) {
        for (let j=1; j<=3; j++) {
            let butt = document.createElement('button');
            butt.innerHTML = String(i*3 + j);
            butt.classList.add('number','nx')
            butt.addEventListener('click', () => current+=String(i*3 + j))
            row.appendChild(butt)
        }
    } else {
        let xbutt1 = document.createElement('button');
        xbutt1.classList.add('number')
        xbutt1.innerHTML = '';
        row.appendChild(xbutt1)

        let butt = document.createElement('button');
        butt.innerHTML = '0';
        butt.classList.add('number','nx')
        butt.addEventListener('click', () => current+='0')
        row.appendChild(butt)

        let xbutt2 = document.createElement('button');
        xbutt2.classList.add('number')
        xbutt2.innerHTML = '';
        row.appendChild(xbutt2)
        }
    numbers.appendChild(row) 
}

keypad.addEventListener('click', ()=> display.innerHTML=current);

const ADD = document.createElement('button');
const MUL = document.createElement('button');
const SUB = document.createElement('button');
const DIV = document.createElement('button');
ADD.innerHTML = '+';
SUB.innerHTML = '-';
MUL.innerHTML = 'x';
DIV.innerHTML = "\u00f7";
ADD.classList.add('number','sym')
MUL.classList.add('number','sym')
DIV.classList.add('number','sym')
SUB.classList.add('number','sym')
ADD.addEventListener('click', () => current = replacer(current,'+'))
MUL.addEventListener('click', () => current = replacer(current,'x'))
SUB.addEventListener('click', () => current = replacer(current,'-'))
DIV.addEventListener('click', () => current = replacer(current,"\u00f7"))

const EQL = document.createElement('button');
EQL.classList.add('eqlclear')
EQL.innerHTML = '=';
EQL.addEventListener('click', ()=>{
    current = calculate(current);
    display.innerHTML=current;
})
const CLEAR = document.createElement('button');
CLEAR.classList.add('eqlclear')
CLEAR.innerHTML = 'CLEAR'
CLEAR.addEventListener('click', ()=> {current=''; display.innerHTML = current})

const bottom = document.createElement('div');
bottom.appendChild(EQL)
bottom.appendChild(CLEAR)

const sidebar = document.createElement('div');
sidebar.classList.add('sidebar')

sidebar.appendChild(ADD);
sidebar.appendChild(SUB);
sidebar.appendChild(MUL);
sidebar.appendChild(DIV);

keypad.appendChild(numbers)
keypad.appendChild(sidebar)
keypad.classList.add('keypad');
main.appendChild(screen)
main.appendChild(keypad)
main.appendChild(bottom)
main.classList.add('main')

function replacer(x,y) {
    return x.slice(-1)>=0 && x.slice(-1)<10 ? x+=y : x.slice(0,-1)+y
}

function calculate(x) {    

    'x+\u00f7'.includes(x[0]) ? x = x.slice(1) : {}
    '- +x\u00f7'.includes(x.slice(-1)) ? x = x.slice(0,-1) : {}

    x = x.includes('x') ? multiply(x) : x
    x = x.includes('\u00f7') ? divide(x) : x
    x = x.includes('+') ? plus(x) : x
    x = x.includes('-') ? minus(x) : x
    current = String(x)
    return x
}

function multiply(x) {
    let temp = x.split('x')
    comby = []
    for (let n=0; n<temp.length-1; n++) {            
        A = temp[n].match(/\d+/g).slice(-1)[0]
        _0 = temp[n].slice(0,-A.length)
        B = temp[n+1].match(/\d+/g)[0]
        _1 = temp[n+1].slice(B.length)
        comby.push(_0 + String(A*B) + _1)
    }
    return comby.join('')
}

function divide(x) {
    let temp = x.split('\u00f7')
    comby = []
    for (let n=0; n<temp.length-1; n++) {            
        A = temp[n].match(/\d+/g).slice(-1)[0]
        _0 = temp[n].slice(0,-A.length)
        B = temp[n+1].match(/\d+/g)[0]
        _1 = temp[n+1].slice(B.length)
        comby.push(_0 + String(A/B) + _1)
    }
    return comby.join('')
}

function plus(x) {
    let temp = x.split('+')
    comby = []
    for (let n=0; n<temp.length-1; n++) {            
        A = temp[n].match(/\d+/g).slice(-1)[0]
        _0 = temp[n].slice(0,-A.length)
        B = temp[n+1].match(/\d+/g)[0]
        _1 = temp[n+1].slice(B.length)
        comby.push(_0 + String(parseFloat(A)+parseFloat(B)) + _1)
    }
    return comby.join('')
}

function minus(x) {
    let temp = x.split('-')
    comby = []
    for (let n=0; n<temp.length-1; n++) {            
        A = temp[n].match(/\d+/g).slice(-1)[0]
        _0 = temp[n].slice(0,-A.length)
        B = temp[n+1].match(/\d+/g)[0]
        _1 = temp[n+1].slice(B.length)
        comby.push(_0 + String(parseFloat(A)-parseFloat(B))  + _1)
    }
    return comby.join('')
}

