const userData = JSON.parse(localStorage.getItem('registrationData'));
if (userData && userData.name) {
    const userNameElement = document.getElementById('userName');
    userNameElement.textContent = userData.username;
}
const bookedItems = JSON.parse(localStorage.getItem('bookedItems'));

if (bookedItems && bookedItems.length > 0) {
    const bookingHistory = document.getElementById('bookingHistory');
    bookedItems.forEach((item) => {
        const bookingCard = document.createElement('div');
        bookingCard.classList.add('BookingCard');

        bookingCard.innerHTML = `
            <img class="RoomImage" src="images/${item.id}.png" alt="${item.name}">
            <div class="RoomDetail">
                <div class="RoomName">${item.name}</div>
                <div class="RoomPrice">Price: Rp ${item.price}</div>
                <div class="MaxOccupancy">Quantity: ${item.quantity}</div>
                <button data-id="${item.id}" class="CancelButton">Cancel</button>
            </div>
        `;

        bookingHistory.appendChild(bookingCard);
    });
}

bookingHistory.addEventListener('click', cancelBooking);

function cancelBooking(e) {
    if (e.target.classList.contains('CancelButton')) {
        const id = e.target.getAttribute('data-id');

        const updatedBookedItems = bookedItems.filter(item => item.id !== id);

        localStorage.setItem('bookedItems', JSON.stringify(updatedBookedItems));

        window.location.reload();
    }
}