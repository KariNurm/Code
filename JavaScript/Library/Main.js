// Libary main program.
//Backend stuff
import fs from "fs";
import readLineSync from "readline-sync";
import {isLogin, idCreate, newAccount, searchBookNew, listBooks, getBook} from "./functions.js"
const booksData = fs.readFileSync("./books.json", "utf8");
const accountData = fs.readFileSync("./accounts.json", "utf-8");
const booksObj = JSON.parse(booksData);
const accountObj = JSON.parse(accountData);

// Frontend, start of program:
// Intro
console.log(
  `\nWelcome to the UnderGround library!\nGet the list of available commands by typing "help".`
);
// main menu
let quit = false;
let loginAccount = "guest";
let loginID = "1234"
let loginIndex = 0;
while (quit != true) {
  let action = readLineSync.question("Enter command: ");
  switch (action.toLocaleLowerCase()) {
    case "help":		
			let help = fs.readFileSync("./help.txt", "utf-8");
			console.log(help);
			break;
	case "search":
		searchBookNew(booksObj);
		break;
	case "signup":
		for(let signup = true; signup === true; signup) {        
			const testName = /^[a-z\s]*$/i;
			let newUserName = readLineSync.question(`Enter your full name name: `)
			if(testName.test(newUserName) === false) {
				console.log("Not a valid name, only letters from a-z")
			} else { 
			 for (let validPw = false; validPw === false; validPw){ 
				let newUserPassword = readLineSync.question(`Enter password: `)
				let passwordRepeat = readLineSync.question(`Re-enter password: `)
				if(passwordRepeat === newUserPassword) {
					validPw = true;
					let sameID = false;
					for(let validID = false; validID === false; validID) {
						let newUser = newAccount(newUserName, newUserPassword, idCreate);
						for(const element of accountObj) {
							if(newUser.id === element.id) {
								sameID = true;
							}
						}
					if (!(sameID === true)) { 
						accountObj.push(newUser);
						fs.writeFileSync("./accounts.json", JSON.stringify(accountObj, null, " "),(err) => {
							if (err) {
								console.log("Could not save user to file!"); // siirtää kaikki loppuun
							}
					});
						console.log(`\nYour account has been created.\nYour account ID is ${accountObj[accountObj.length - 1].id}.`);
						console.log(`Save your account ID in a safe place. Login to your account with the comman "login".`)
						validID = true;
						validPw = true;
						signup = false;
					}
				} 
				} else {
					console.log("Password did not match, try again");
					}
				}
			}
		}
		break;
	case "login":
		if (loginAccount !== "guest") {
			console.log(`You are already logged in with ID: ${loginID}.`)
			break;
		} else {
		for (; loginAccount === "guest";) {
			let askId = readLineSync.question(`\nType in your account ID to log in.\n: `);
			for (let idExists = false; idExists === false;) {
				for (const element of accountObj) {
					if (askId === element.id) {
						let askPw = readLineSync.question("\nAccount found! Please enter password.\n: ");
						for (let pwCorrect = false; pwCorrect === false;) {
							if (askPw === element.password) {
								loginID = element.id;
								loginAccount = element.name;
								loginIndex = accountObj.findIndex((obj) => {return obj.id === loginID; });
								idExists = true;
								pwCorrect = true;
								console.log(`\nWelcome, ${loginAccount}`);
							} else {
								askPw = readLineSync.question("\nWrong password, try again!\n: "); // tämä loop korjata jos ei muista salasanaa
							}
						}
					}
				}
				if (loginAccount !== "guest") { break; };
				askId = readLineSync.question(`\nNo account found with that ID, please try again.\n: `); // jos ei id?
			}
		}
		}
		break;
	case "list":
		if (!isLogin(loginAccount)) { break; }
		listBooks(accountObj[loginIndex]["borrowed books"], booksObj, accountObj[loginIndex].due);
		break;
	case "borrow":
		if(!isLogin(loginAccount)) { break; }
		let borrowOn = true;
		while(borrowOn === true) {
			let borrowResult = getBook(booksObj);
			if(borrowResult === null) { 
				borrowOn = false;;
				continue; //?
			}
			else if(borrowResult[1] === 0) {
				let askToSearch = readLineSync.question("Do you wish to search again?\n(y/n):");
				if (askToSearch !== "y") {
					borrowOn = false;
					continue; //?
				} else {
					continue;
				}
			} else { // löyty kirja, borrow result [element, available, total]
				let askToBorrow = readLineSync.question("\nDo you wish to borrow the book?\n(y/n):");
					if (askToBorrow !== "y") {	
						let askToSearch = readLineSync.question("Do you wish to search again?\n(y/n):");
						if (askToSearch !== "y") {
							borrowOn = false;
							continue; //?
						} else {
							continue;
						}
					 } else { // haluaa lainata
						let bookIndex = booksObj.findIndex((index) => index.id ===  borrowResult.id );//kirjan indeksi booksObj
						let newBookStatusIndex = booksObj[bookIndex].copies.findIndex(element =>  element.borrower_id === null );
						booksObj[bookIndex].copies[newBookStatusIndex].status = "borrowed"
						booksObj[bookIndex].copies[newBookStatusIndex].borrower_id = loginID;
						let dueDate = new Date();
						dueDate.setDate(dueDate.getDate() + 30);
						booksObj[bookIndex].copies[newBookStatusIndex].due_date = dueDate.toISOString();
						accountObj[loginIndex]["borrowed books"].splice(0, 0 , borrowResult[0].title);
						accountObj[loginIndex]["due"].splice(0, 0 , dueDate.toISOString());
						fs.writeFileSync("./accounts.json", JSON.stringify(accountObj),(err) => {
							if (err) {
						 		console.log("Could not save user to file!"); // siirtää kaikki loppuun
							}
						})
						fs.writeFileSync("./books.json", JSON.stringify(booksObj),(err) => {
							if (err) {
						 		console.log("Could not save books to file!"); // siirtää kaikki loppuun
							}
						})
						console.log(`\nBook ${borrowResult[0].title} by ${borrowResult[0].author} (${new Date(borrowResult[0].published).getFullYear()}) borrowed!`);
						borrowOn = false;
					}
				}
			}
		
		break;
	case "return":
		if(!isLogin(loginAccount)) { break; }
		let returnBook = listBooks(accountObj[loginIndex]["borrowed books"], booksObj, accountObj[loginIndex].due) // booksObj indexit return
		let returnBookNum = readLineSync.question("Choose book to be returned.\n:")
		if(returnBook.length === 0) {
			break;
		} else {
			accountObj[loginIndex]["borrowed books"].splice([returnBookNum - 1], 1)
			accountObj[loginIndex].due.splice([returnBookNum - 1], 1)
			let copyIndex = booksObj[returnBook[returnBookNum - 1]].copies.findIndex((index) => index.borrower_id === loginID )
			booksObj[returnBook[returnBookNum - 1]].copies[copyIndex].status = "in_library"
			booksObj[returnBook[returnBookNum - 1]].copies[copyIndex].due_date = null;
			booksObj[returnBook[returnBookNum - 1]].copies[copyIndex].borrower_id = null;
			fs.writeFileSync("./accounts.json", JSON.stringify(accountObj),(err) => {
				if (err) {
					 console.log("Could not save user to file!"); // siirtää kaikki loppuun
				}
			})
			fs.writeFileSync("./books.json", JSON.stringify(booksObj),(err) => {
				if (err) {
					 console.log("Could not save books to file!"); // siirtää kaikki loppuun
				}
			})
			console.log(`\nReturned book: ${booksObj[returnBook[returnBookNum - 1]].title} by ${booksObj[returnBook[returnBookNum - 1]].author} (${new Date(booksObj[returnBook[returnBookNum - 1]].published).getFullYear()})`);
		}
		break;
	case "change_name":
		if(!isLogin(loginAccount)) { break; }
		let changeName = readLineSync.question(`\nWrite your new name\n:`);
		for (let changeOn = true; changeOn === true;) {
			let repeatName = readLineSync.question(`\nRepeat new name\n:`);
			if(changeName !== repeatName) {
				changeName = readLineSync.question("Name does not match, try again or press enter to close the dialog.\n:");
				if(changeName === "") { changeOn = false; };
			}
			else if (changeName === repeatName) {
				let passCheck = readLineSync.question("\nInsert password\n:")
				for(let askPw = true; askPw === true;) {
					if(passCheck !== accountObj[loginIndex].password) {
						passCheck = readLineSync.question("\nWrong password, try again or press enter to close dialog.\n:")
						if(passCheck === "") { changeOn = false; askPw = false; }
					}
					else if (passCheck === accountObj[loginIndex].password) {
						accountObj[loginIndex].name = changeName;
						fs.writeFileSync("./accounts.json", JSON.stringify(accountObj),(err) => {
							if (err) {
								console.log("Could not save user to file!"); // siirtää kaikki loppuun
							}
						})
						console.log(`\nYour new name is ${accountObj[loginIndex].name}!`);
						changeOn = false; 
						askPw = false;
					}
				}
			}
		}

		break;
	case "remove_account":
		if(!isLogin(loginAccount)) { break; }
		let delAcc = readLineSync.question("\nAre you sure you wish to delete your account?\n(y/n):");
		if (delAcc.toLowerCase() === "y") {
			if (accountObj[loginIndex]["borrowed books"].length === 0) {
				let pwCheck = true;
				let passCheck = readLineSync.question("\nInsert password\n:")
				while(pwCheck === true) {
					if (passCheck === accountObj[loginIndex].password) {
						accountObj.splice(loginIndex, 1)
						fs.writeFileSync("./accounts.json", JSON.stringify(accountObj),(err) => {
							if (err) {
						 		console.log("Could not save user to file!"); // siirtää kaikki loppuun
							}
						})
						loginAccount = "guest";
						loginID = "0000";
						console.log("\nYour account has been deleted.")
						pwCheck = false;
					} else {
						passCheck = readLineSync.question("\nWrong password, try again or use enter to close the dialog\n:")
						if (passCheck === "") {
							pwCheck = false;
						}
					}
				}
			} else {
				console.log("\nReturn your loans first!")
				break;
			}
		} break; 
	case "logout":
		if(!isLogin(loginAccount)) { break; }
		console.log("\nAre you sure you wish to logout?");
		for(let logOutOn = true; logOutOn === true;) {
			let logOut = readLineSync.question("(y/n):");
			if((logOut.toLowerCase() === "y") || (logOut.toLowerCase() === "n")) {
				if(logOut.toLowerCase() !== "y"){
					logOutOn = false;
					
				} else {
					loginAccount = "guest";
					loginID = "0000";
					console.log("\nYou are logged out.")
					logOutOn = false;
					
				}
			}
		}
		break;
	case "test": // testailua varten
		console.log("account", loginAccount, "ID", loginID, "loginIndex", loginIndex)
		if(isLogin(loginAccount)) { console.log(accountObj[loginIndex]["borrowed books"]) }
		break;
    case "quit":
      quit = true;
      break;
    default:
      console.log(`\ntype "help" for available commands`);
      break;
  }
}
