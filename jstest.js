"use strict";
// js is going to go here
// ES 6
var a = 10;
a = "ten";
console.log("is this working?");
console.log(a);
//sdfadsf();
console.log("did it finish?");

function onSubmit() {
    console.log(evt);
    alert("submit");

}

// no need to declare variables
// it is strongly recommended that you do so.
name = "Aidanxxx";
console.log(name);

// declare variables - origially done using the var keyword

function greet(name) {

    // variables declared using "var" can be accessed before
    // they are declared. All variables in a function are 
    // hoisted - i.e. they are really declared at the start of t
    // the function
    message = "Failte";
    var message;
    message = "Welcome " + name;
    return message;
}
var greeting = greet("aidan");

console.log(greeting);

//  1995 js written (very quickly)
//   1995 - 2016 - js becomes really imporant
// 2016 ES6 was released

// use let to declare variables

function greet2(name) {

    msg = "Failte";

    let msg = "Welcome " + name;

    console.log(msg);
}

//greet2("fred");

const pi = 3.14;
// pi = 4;
console.log(pi);

// js object
let o = {
    id:1, 
    name:"Alice", 
    email: "alice@gmail.com", 
    display: function() {
        console.log("display called");
        console.log(this.id);
        console.log(this.name);
        console.log(this.email);
    }, 
    displayLater: function(timeout) {
        // when you declare a function using the
        // "function" keyword a new object is created
        // so the meaning of "this" is changed.
        // let that = this;
        setTimeout(function () {
            console.log("displayLater() called");
            console.log(this.id);
            console.log(this.name);
            console.log(this.email);
        }, timeout)
    }, 
    displayLaterWorking: function(timeout) {
        // when you declare a function using the
        // arrow notation no new object is created
        // so the meaning of "this" is unchanged.
        setTimeout(() => {
            console.log("displayLaterFixed() called");
            console.log(this.id);
            console.log(this.name);
            console.log(this.email);
        }, timeout);
    }
};

o.display();
o.displayLater(3000);
o.displayLaterWorking(3000);


console.log("finished");























