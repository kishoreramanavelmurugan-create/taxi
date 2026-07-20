// ===========================
// TaxiPro Admin Dashboard
// ===========================

document.addEventListener("DOMContentLoaded", loadBookings);

function loadBookings() {

    const tbody = document.querySelector("#bookingTable tbody");

    fetch(`${window.API_BASE_URL}/bookings`)
        .then(res => res.json())
        .then(data => {

            tbody.innerHTML = "";

            data.forEach((booking) => {

                tbody.innerHTML += `
                <tr>
                    <td>${booking.name}</td>
                    <td>${booking.email}</td>
                    <td>${booking.phone}</td>
                    <td>${booking.ride}</td>
                    <td>${booking.vehicle}</td>
                    <td>${booking.pickup}</td>
                    <td>${booking.drop}</td>
                    <td>${booking.date}</td>
                    <td>${booking.time || "-"}</td>
                    <td>${booking.status || "Pending"}</td>
                    <td>
                        <button onclick="acceptBooking('${booking._id}')">✅ Accept</button>
                        <button onclick="rejectBooking('${booking._id}')">❌ Reject</button>
                        <button onclick="deleteBooking('${booking._id}')">🗑 Delete</button>
                    </td>
                </tr>
                `;

            });

        })
        .catch(err => {
            console.error("Failed to load bookings:", err);
            alert(`❌ Unable to load bookings. ${err.message || "Please check the API URL and backend server."}`);
        });

}

function acceptBooking(id) {

    fetch(`${window.API_BASE_URL}/bookings/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: "Accepted"
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("✅ Booking Accepted");
        loadBookings();
    })
    .catch(err => console.error(err));

}

function rejectBooking(id) {

    fetch(`${window.API_BASE_URL}/bookings/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: "Rejected"
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("❌ Booking Rejected");
        loadBookings();
    })
    .catch(err => console.error(err));

}

function deleteBooking(id) {

    if (!confirm("Delete this booking?")) return;

    fetch(`${window.API_BASE_URL}/bookings/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(() => {
        alert("🗑 Booking Deleted");
        loadBookings();
    })
    .catch(err => console.error(err));

}