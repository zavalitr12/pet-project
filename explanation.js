let i = 0
function myFunc() {
    console.log("hello", i);
    i += 1;
    if (i !== 10)
        myFunc()
}

myFunc()