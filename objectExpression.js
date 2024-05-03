function Const(field){
    this.field = field;
    this.toString = function (){
        return this.field + ""
    }
    this.evaluate = function (x, y, z) {
        return parseInt(this.field)
    }
    this.prefix = function (){
        return this.field + ""
    }
}
function Variable(field){
    this.field = field;
    this.toString = function (){
        return this.field + ""
    }
    this.prefix = function (){
        return this.field + ""
    }
    this.evaluate = function (x, y, z) {
        if(this.field === 'x'){
            return parseFloat(x);
        }else if(this.field === 'y'){
            return parseFloat(y);
        }else return parseFloat(z);
    }
}
function Naryop(f, sign){
    return function (...args){
        let naryop = new Naryop(f, sign);
        naryop.evaluate = function (...args1) {
            return f(...args.map(a => a.evaluate(...args1)));
        }
        naryop.toString = function (){
            return args.map(a => a.toString()).join(" ") + " " + sign;
        }
        naryop.prefix = function () {
            return "(" + sign + " " + args.map(a => a.prefix()).join(" ") + ")"
        }
        return naryop;
    }
}
let sum = (...args) => {
    let sum = 0;
    for(let i = 0; i < args.length; i++){
        sum += args[i];
    }
    return sum;
}
let avg = (...args) => {
    let sum = 0;
    for(let i = 0; i < args.length; i++){
        sum += args[i]
    }
    return sum / args.length;
}
let Add = Naryop((a, b) => a + b, "+");
let Subtract = Naryop((a, b) => a - b, "-");
let Multiply = Naryop((a, b) => a * b, "*");
let Divide = Naryop((a, b) => a / b, "/");
let ArcTan2 = Naryop(Math.atan2, "atan2")
let Negate = Naryop(a => -a, "negate");
let ArcTan = Naryop(Math.atan, "atan");
let Sum = Naryop((...args) => sum(...args), "sum");
let Avg = Naryop((...args) => avg(...args), "avg")
console.log(new ArcTan(new Const(2)).toString())
const map = new Map([
    ['(', []],
    [')', []],
    ['x', [Variable, 1, false]],
    ['y', [Variable, 1, false]],
    ['z', [Variable, 1, false]],
    ['negate', [Negate, 1, true]],
    ['atan', [ArcTan, 1, true]],
    ['+', [Add, 2, true]],
    ['-', [Subtract, 2, true]],
    ['*', [Multiply, 2, true]],
    ['/', [Divide, 2, true]],
    ['atan2', [ArcTan2, 2, true]],
    ['sum', [Sum, undefined, true]],
    ['avg', [Avg, undefined, true]]
]);
function parse(string){
    let exp = string.trim().replace(/\s+/g, ' ').split(' ')
    let stack = []
    for(let i = 0; i < exp.length; i++){
        const func = map.get(exp[i]) || [Const, 1]
        if(func[0] === Variable || func[0] === Const){
            stack.push(exp[i]);
        }
        stack.push(new func[0](...stack.splice(stack.length - func[1], func[1])))
    }
    return stack.pop()
}
function MyError(message) {
    Object.call(this, message);
    this.message = message
}
MyError.prototype = Object.create(Error.prototype);
function parsePrefix(string){
    let exp = string.trim().replaceAll('(',  ' ( ').replaceAll(')', ' ) ').replace(/\s+/g, ' ').split(' ');
    let stack1 = []
    let stack2 = []
    let count = 0
    for(let i = 0; i < exp.length; i++){
        if(exp[i] === '') continue;
        let func = map.get(exp[i])
        if(func !== undefined){
            if(exp[i] !== ')'){
                if(func[0] === Variable){
                    stack2.push(new Variable(exp[i]))
                }
                stack1.push(exp[i]);
                if(exp[i] === '('){
                    count++;
                }
            }else {
                let a = stack1.pop();
                if(count <= 0){
                    throw new MyError("dis balance of brackets")
                }
                count--;
                let checkoper = false;
                let c = 0;
                while(a !== '(') {
                    if(isNaN(a) && a !== undefined){
                        let func1 = map.get(a)
                        if (func1[2]) {
                            checkoper = true;
                            stack2.push(new func1[0](...stack2.splice(stack2.length - c)))
                            if (func1[1] !== c && func1[1] !== undefined) {
                                throw new MyError("invalid number of arguments");
                            }
                        }
                    }
                    c++;
                    a = stack1.pop();
                    if(checkoper && a !== '('){
                        throw new MyError("too many oparators")
                    }
                }
                if (!checkoper) {
                    throw new MyError("no operator");
                }
                stack1.push(undefined);
            }
        } else if(!isNaN(exp[i])){
            stack1.push(exp[i])
            stack2.push(new Const(exp[i]))
        } else {
            throw new MyError("unknown symbol" + exp[i]);
        }
    }
    if(count !== 0){
        throw new MyError("disballance of scobki")
    }
    if(stack2.length > 1 || stack1.length > 1){
        throw new MyError("Too many arguments")
    }
    return stack2.pop();
}