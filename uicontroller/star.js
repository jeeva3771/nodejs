let n = 5;
for (let i = 1; i <= n; i++) {
    let str = "*";
    console.log(str.repeat(i));
}

function arithmetic(a,b){
    var sum = a+b
    var sub = a-b
    var mul = a*b
    var div = a/b
    return sum,sub,mul,div
}
arithmetic(10,10)
  


function calculate(a, b, operation) {
    switch (operation) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            if (b !== 0) {
                return a / b;
            } else {
                return 'Error: Division by zero';
            }
        default:
            return 'Error: Invalid operation';
    }
}


console.log(calculate(10, 5, 'add'));  
console.log(calculate(10, 5, 'subtract'));
console.log(calculate(10, 5, 'multiply'));
console.log(calculate(10, 5, 'divide')); 
console.log(calculate(10, 10, 'divide')); 
console.log(calculate(10, 5, 'modulus')); 



function arithmetic(a,b){
   c = a+b 
}