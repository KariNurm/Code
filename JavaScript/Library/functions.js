//functions

import readLineSync from "readline-sync";

// Login tester
function isLogin (str) {
    if (str === "guest") {
        console.log("\nYou are not logged in, please login or signup for library services");
        return false;
    }
    return true
}

// 
function getBook(obj) {
    const searchArr = ["title", "author", "isbn"];
    let searchMethod = readLineSync.question(`\nEnter the number of the wanted search method.\n1: by title, 2: by author or 3: by ISBN\nMethod number: `);
	let searchInfo = readLineSync.question(`\nEnter the ${searchArr[searchMethod - 1]} of the book you wish to find\n${searchArr[searchMethod - 1]}: `);
    for(let searchOn = true; searchOn === true;) { 
        let element = searchBook(obj ,searchInfo, searchArr[searchMethod - 1]);
        if (element !== null){
			console.log(`\nResult ${element[1]}:`);
    		console.log(`${element[0].title} by ${element[0].author} (${new Date(element[0].published).getFullYear()})`);
            console.log(`Books in library: ${element[2]}\nAvailable for borrowing: ${element[1]}\n`);
            searchOn = false;  
            return element; 
        } else {
            searchInfo = readLineSync.question(`\nThese parameters did not yield results,\nTry again or press enter to close dialog.\n:`);
            if(searchInfo === "") { return null; }
        }
    }
}

// book search
function searchBook(obj, str, mod){
    for(const element of obj) {
        if(element[mod].toLowerCase() === str.toLowerCase()) {   
            let available = element.copies.length
            let total = available;
            for(const copy of element.copies) {
                if (copy.status === "borrowed") {
                    available--
                }
            }
            return [element, available, total];
        } else {
            continue;
        }
     }
    return null;
}

//Book search new
function searchBookNew(obj) {  
    const method = ["title", "author", "isbn"];
    let modSelect = true;
    let mod = "";
    while(modSelect === true) {
        mod =  readLineSync.question("\nChoose the search method you wish to use.\n[1] - Title, [2] - Author or [3] - ISBN.\n:");
        (mod === "1" || mod === "2" || mod === "3") ? modSelect = false : console.log("\nNot a valid method number, try again.")   
    }
    let searchOn = true;
    let src = readLineSync.question(`\nEnter the ${method[mod - 1]} of the book.\n:`);
    while(searchOn === true) {
            let indexBooks = [];
            let arrBook = obj.filter((element) => element[method[mod - 1]].toLowerCase().includes(src.toLowerCase()));
            if(arrBook.length === 0) {
                src = readLineSync.question(`\nNo match found with these parameters, try again or press enter to close the dialog.\n:`);
                if(src === "") {searchOn = false;}
            }
            for(let i = 0; i < arrBook.length; i++) {
                indexBooks.push(obj.findIndex((book) => book.title.toLowerCase() === arrBook[i].title.toLowerCase() ));
                let available = 0;
                available = obj[indexBooks[i]].copies.filter((element) => element.status === "borrowed")
                console.log(`\nResult ${i + 1}:`);
                console.log(`${obj[indexBooks[i]].title} by ${obj[indexBooks[i]].author} (${new Date(obj[indexBooks[i]].published).getFullYear()})`);
                console.log(`Available for borrowing: ${available.length}`)
                searchOn = false;
            }

    }
    return //
}

// list borrowed books 

function listBooks(objA, objB, objC) {
    let loanIndex = [];
    for (let i = 0; i < objA.length; i++) {
        loanIndex.push(objB.findIndex((index) => index.title === objA[i]))
    }
    if(loanIndex.length === 0) {
        console.log("\nYou have no loans to list.");
    } else {
        console.log("\nBooks you have borrowed:")
        loanIndex.forEach((bookIndex, index) => {
            console.log(`${index + 1}:`);
    		console.log(`${objB[bookIndex].title} by ${objB[bookIndex].author} (${new Date(objB[bookIndex].published).getFullYear()})`);
            console.log(`Due ${new Date(objC[index]).getDay()}.${new Date(objC[index]).getMonth()}.${new Date(objC[index]).getFullYear()}`)
        } )
    }
    return loanIndex
}

// account creation

function idCreate() {
    let id = Math.floor(Math.random(0) * 1000000).toString()
    if(id.length < 6 || id.length === 7) {
        return idCreate();
    }
    return id;
}

function newAccount(name, pw, idCreate) {

    const account = {
        name: name,
        password: pw,
        id: idCreate(),
        "borrowed books": [], 
        due: [], 
    }
    return account;
}

export {isLogin, idCreate, newAccount, searchBookNew, listBooks, getBook};