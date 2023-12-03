//=========== Read Username data from local ==========================
const userData = JSON.parse(localStorage.getItem('registrationData'));
if (userData && userData.name) {
    // show username 
    const userNameElement = document.getElementById('userName');
    userNameElement.textContent = userData.username;
}
// Retrieve booked items from local storage
const bookedItems = JSON.parse(localStorage.getItem('bookedItems'));

if (bookedItems && bookedItems.length > 0) {
    const bookingHistory = document.getElementById('bookingHistory');
    bookedItems.forEach((item) => {
        const bookingCard = document.createElement('div');
        bookingCard.classList.add('BookingCard');

        // Display booked item details
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

// Event listener for canceling a booked item
bookingHistory.addEventListener('click', cancelBooking);

function cancelBooking(e) {
    if (e.target.classList.contains('CancelButton')) {
        const id = e.target.getAttribute('data-id');

        // Remove the canceled item from bookedItems
        const updatedBookedItems = bookedItems.filter(item => item.id !== id);

        // Update local storage with the updated bookedItems
        localStorage.setItem('bookedItems', JSON.stringify(updatedBookedItems));

        // Refresh the page to reflect the changes
        window.location.reload();
    }
}