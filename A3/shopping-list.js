// Initialize shopping list array with items from the markdown list
let shoppingList = ["牛奶", "鸡蛋", "面包"];

// Create an item object as shown in the example
let item = {
    name: "牛奶",
    price: 12,
    quantity: 1
};

// Function to display the shopping list with numbers
function displayShoppingList() {
    console.log("Current shopping list:");
    shoppingList.forEach((item, index) => {
        console.log(`${index + 1}. ${item}`);
    });
}

// Function to add items to the shopping list
function addItems() {
    // Add two more items to the list
    shoppingList.push("苹果");
    shoppingList.push("水");
    console.log("\nAfter adding items:");
    displayShoppingList();
}

// Function to remove the last item
function removeLastItem() {
    shoppingList.pop();
    console.log("\nAfter removing last item:");
    displayShoppingList();
}

// Function to check if shopping cart is full (more than 5 items)
function checkCartFull() {
    if (shoppingList.length > 5) {
        console.log("\nYour shopping cart is full!");
    } else {
        console.log(`\nYou can add ${5 - shoppingList.length} more items to your cart.`);
    }
}

// Function to check if an item exists in the shopping list
function isItemInList(itemName) {
    return shoppingList.includes(itemName);
}

// Test all functions
console.log("Initial shopping list:");
displayShoppingList();

addItems();
removeLastItem();
checkCartFull();

// Test item search
console.log("\nSearching for items:");
console.log(`Is 牛奶 in the list? ${isItemInList("牛奶")}`);
console.log(`Is 可乐 in the list? ${isItemInList("可乐")}`);
