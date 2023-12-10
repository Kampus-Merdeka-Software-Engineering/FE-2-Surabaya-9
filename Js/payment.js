const cartItems = JSON.parse(localStorage.getItem('cartItems'));


if (cartItems && cartItems.length > 0) {
    const cartContents = document.getElementById('cartContents');
    cartItems.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - Rp ${item.price} x ${item.quantity}`;
        cartContents.appendChild(listItem);
    });
}

const totalPaymentDetails = JSON.parse(localStorage.getItem('totalPaymentDetails'));
const savedCartItems = JSON.parse(localStorage.getItem('savedItems'));
if (totalPaymentDetails) {
    document.getElementById('totalPrice').textContent = totalPaymentDetails.totalPrice;
    document.getElementById('discount').textContent = totalPaymentDetails.discount;
    document.getElementById('finalTotal').textContent = totalPaymentDetails.finalTotal;
}

const payButton = document.getElementById('payButton');
payButton.addEventListener('click', buyItems);

function showDialog(title, message) {
    const result = confirm(title + "\n" + message);
    if (result) {
        window.location.href = "home.html";
    }
}

function buyItems() {
    localStorage.setItem('bookedItems', JSON.stringify(cartItems));

    showDialog("Thank you for Your Booking!", "Your receipt will be sent to your email.");

    console.log("Items purchased:", cartItems);

    window.location.href = "myBooking.html";
}