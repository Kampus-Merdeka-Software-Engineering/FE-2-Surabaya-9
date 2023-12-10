const userData = JSON.parse(localStorage.getItem('registrationData'));
if (userData && userData.name) {
    const userNameElement = document.getElementById('userName');
    userNameElement.textContent = userData.username;
}

const rooms = {
    Standard: [
        { id: 'room1', name: 'Standard Room 1', price: 500000, maxOccupancy: 2, discount: 10, description: '* Coszy bedding \n * Private bathroom with shower \n * Free Wifi \n *Air Conditioning' },
        { id: 'room2', name: 'Standard Room 2', price: 600000, maxOccupancy: 3, discount: 15, description: '* Coszy bedding \n * Private bathroom with shower \n * Free Wifi \n *Air Conditioning' },

    ],
    Deluxe: [
        { id: 'room1', name: 'Deluxe Room 1', price: 1500000, maxOccupancy: 4, discount: 20, description: '* Spaciuous room with modern decor \n * Luxorius king-sized bed \n * Mini bar with a snacks and drinks' },
        { id: 'room3', name: 'Deluxe Room 2', price: 1800000, maxOccupancy: 5, discount: 25, description: '* Spaciuous room with modern decor \n * Luxorius king-sized bed \n * Mini bar with a snacks and drinks' },
 
    ],
    Suite: [
        { id: 'room2', name: 'Suite Room 1', price: 2500000, maxOccupancy: 6, discount: 30, description: '* Separate living and sleeping areas \n * King-sized bed and additonal sofa bed \n *Private balcone' },
        { id: 'room3', name: 'Suite Room 2', price: 2800000, maxOccupancy: 8, discount: 35, description: '* Separate living and sleeping areas \n * King-sized bed and additonal sofa bed \n *Private balcone' },
  
    ],
};



const categorySelect = document.getElementById('categorySelect');
const productCategory = document.getElementById('Rooms');

const cartItems = document.getElementById('cartItems');
const cart = [];

categorySelect.addEventListener('change', displayRooms);
productCategory.addEventListener('click', bookRoom);

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

function bookRoom(e) {
    if (e.target.classList.contains('addCart')) {
        const id = e.target.getAttribute('data-id');
        const name = e.target.getAttribute('data-name');
        const price = parseFloat(e.target.getAttribute('data-price'));
        const item = { id, name, price, quantity: 1 };

        const existingItem = cart.find((cartItem) => cartItem.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(item);
        }
        renderCart();
    }
}

function calculateDiscount(totalPrice, numRooms) {
    if (numRooms >= 5 && numRooms <= 10) {
        return totalPrice * 0.05;
    } else if (numRooms > 10) {
        return totalPrice * 0.15;
    }
    return 0;
}

function formatCurrency(amount) {
    return `Rp ${amount.toFixed(0)}`;
}

function renderCart() {
    cartItems.innerHTML = cart
        .map((item) => `<li>${item.name} - Rp ${item.price} x ${item.quantity} = Rp ${item.price * item.quantity}</li>`)
        .join('');

    const numRooms = cart.reduce((num, item) => num + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = calculateDiscount(totalPrice, numRooms);
    const finalTotal = totalPrice - discount;

    document.getElementById('totalPrice').textContent = formatCurrency(totalPrice);
    document.getElementById('discount').textContent = formatCurrency(discount);
    document.getElementById('finalTotal').textContent = formatCurrency(finalTotal);
}

displayRooms();

const bookButton = document.getElementById('bookButton');
bookButton.addEventListener('click', bookRooms);

function bookRooms() {
    if (cart.length === 0) {
        showDialog("No rooms", "Your booking cart is empty. Add rooms to the cart before making a reservation.");
    } else {
        localStorage.setItem('savedItems', JSON.stringify(cart));

        const numRooms = cart.reduce((num, item) => num + item.quantity, 0);
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        const discount = calculateDiscount(totalPrice, numRooms);
        const finalTotal = totalPrice - discount;

        const totalPaymentDetails = {
            totalPrice: formatCurrency(totalPrice),
            discount: formatCurrency(discount),
            finalTotal: formatCurrency(finalTotal),
        };
        localStorage.setItem('totalPaymentDetails', JSON.stringify(totalPaymentDetails));

        localStorage.setItem('cartItems', JSON.stringify(cart));

        window.location.href = 'payment.html';
    }

    function showDialog(title, message) {
        const result = confirm(title + "\n" + message);
    }
}