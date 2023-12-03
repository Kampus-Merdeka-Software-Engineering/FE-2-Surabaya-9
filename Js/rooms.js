//=========== Read Username data from local ==========================
const userData = JSON.parse(localStorage.getItem('registrationData'));
if (userData && userData.name) {
    // show username 
    const userNameElement = document.getElementById('userName');
    userNameElement.textContent = userData.username;
}

//=========== SELECT CONTENT CATEGORIES (ARRAY) ==========================
const rooms = {
    Standard: [
        { id: 'room1', name: 'Standard Room 1', price: 500000, maxOccupancy: 2, discount: 10, description: '* Coszy bedding \n * Private bathroom with shower \n * Free Wifi \n *Air Conditioning' },
        { id: 'room2', name: 'Standard Room 2', price: 600000, maxOccupancy: 3, discount: 15, description: '* Coszy bedding \n * Private bathroom with shower \n * Free Wifi \n *Air Conditioning' },
        // Add more Standard rooms as needed
    ],
    Deluxe: [
        { id: 'room1', name: 'Deluxe Room 1', price: 1500000, maxOccupancy: 4, discount: 20, description: '* Spaciuous room with modern decor \n * Luxorius king-sized bed \n * Mini bar with a snacks and drinks' },
        { id: 'room3', name: 'Deluxe Room 2', price: 1800000, maxOccupancy: 5, discount: 25, description: '* Spaciuous room with modern decor \n * Luxorius king-sized bed \n * Mini bar with a snacks and drinks' },
        // Add more Deluxe rooms as needed
    ],
    Suite: [
        { id: 'room2', name: 'Suite Room 1', price: 2500000, maxOccupancy: 6, discount: 30, description: '* Separate living and sleeping areas \n * King-sized bed and additonal sofa bed \n *Private balcone' },
        { id: 'room3', name: 'Suite Room 2', price: 2800000, maxOccupancy: 8, discount: 35, description: '* Separate living and sleeping areas \n * King-sized bed and additonal sofa bed \n *Private balcone' },
        // Add more Suite rooms as needed
    ],
};



//=========== Declaration of HTML element IDs =============
const categorySelect = document.getElementById('categorySelect');
const productCategory = document.getElementById('Rooms');

const cartItems = document.getElementById('cartItems');
const cart = [];

//======= Event listeners for category selection and adding to cart ============
categorySelect.addEventListener('change', displayRooms);
productCategory.addEventListener('click', bookRoom);

//============ Display Rooms Function ====================
function displayRooms() {
    const selectedCategory = categorySelect.value;
    const roomsInCategory = rooms[selectedCategory];

    if (roomsInCategory) {
        productCategory.innerHTML = roomsInCategory
            .map(
                (room) => `
            <div class="RoomCard">
                <img class="RoomImage" src="images/${room.id}.png" alt="${room.name}">
                <div class="RoomDetail">
                    <div class="RoomName">${room.name}</div>
                    <div class="RoomPrice">Price: Rp ${room.price}</div>
                    <div class="MaxOccupancy">Max Occupancy: ${room.maxOccupancy} person(s)</div>
                    <div class="Description">${room.description.replace(/\n/g, '<br>')}</div>

                    <button data-id="${room.id}" data-name="${room.name}" data-price="${room.price}" class="addCart">Add to Cart</button>
                </div>
            </div>
        `
            )
            .join('');
    }
}

//============ Add to Cart Function ====================
function bookRoom(e) {
    if (e.target.classList.contains('addCart')) {
        const id = e.target.getAttribute('data-id');
        const name = e.target.getAttribute('data-name');
        const price = parseFloat(e.target.getAttribute('data-price'));
        const item = { id, name, price, quantity: 1 };

        //=========== Check the quantity of the room, using the find method ==========
        //====== and update the quantity of the rooms ========
        const existingItem = cart.find((cartItem) => cartItem.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(item);
        }
        renderCart();
    }
}

//======= Calculate the discount based on the number of rooms ==========
function calculateDiscount(totalPrice, numRooms) {
    if (numRooms >= 5 && numRooms <= 10) {
        return totalPrice * 0.05;
    } else if (numRooms > 10) {
        return totalPrice * 0.15;
    }
    return 0;
}

//======= Format currency for display =======
function formatCurrency(amount) {
    return `Rp ${amount.toFixed(0)}`;
}

//=========== Update Cart Shopping Function ==================
function renderCart() {
    cartItems.innerHTML = cart
        .map((item) => `<li>${item.name} - Rp ${item.price} x ${item.quantity} = Rp ${item.price * item.quantity}</li>`)
        .join('');

    // ------- Use reduce to sum up all the prices --------
    const numRooms = cart.reduce((num, item) => num + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = calculateDiscount(totalPrice, numRooms);
    const finalTotal = totalPrice - discount;

    //------- Update elements with formatted currency (RM) -------
    document.getElementById('totalPrice').textContent = formatCurrency(totalPrice);
    document.getElementById('discount').textContent = formatCurrency(discount);
    document.getElementById('finalTotal').textContent = formatCurrency(finalTotal);
}

//========== Call Display Function ============
displayRooms();

//=============== Book Button Section ====================
const bookButton = document.getElementById('bookButton');
bookButton.addEventListener('click', bookRooms);

//======= Book Rooms Function =========
// --- For sending data to payment.html ----
function bookRooms() {
    if (cart.length === 0) {
        showDialog("No rooms", "Your booking cart is empty. Add rooms to the cart before making a reservation.");
    } else {
        // Save cart items to local storage
        localStorage.setItem('savedItems', JSON.stringify(cart));

        // Calculate payment details
        const numRooms = cart.reduce((num, item) => num + item.quantity, 0);
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        const discount = calculateDiscount(totalPrice, numRooms);
        const finalTotal = totalPrice - discount;

        // Save payment details to local storage
        const totalPaymentDetails = {
            totalPrice: formatCurrency(totalPrice),
            discount: formatCurrency(discount),
            finalTotal: formatCurrency(finalTotal),
        };
        localStorage.setItem('totalPaymentDetails', JSON.stringify(totalPaymentDetails));

        // Save cart items to local storage
        localStorage.setItem('cartItems', JSON.stringify(cart));

        // Redirect to the saved page
        window.location.href = 'payment.html';
    }

    function showDialog(title, message) {
        const result = confirm(title + "\n" + message);
    }
}