// ===========================
// TaxiPro JavaScript
// ===========================

const form = document.getElementById("bookingForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = form.querySelectorAll("input, select");

    let valid = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            valid = false;
        }
    });

    if (!valid) {
        alert("⚠ Please fill all the required fields.");
        return;
    }

    const bookingData = {
        name: document.querySelector('input[placeholder="Full Name"]').value,
        email: document.querySelector('input[placeholder="Email Address"]').value,
        phone: document.querySelector('input[placeholder="Phone Number"]').value,
        ride: document.querySelectorAll("select")[0].value,
        vehicle: document.querySelectorAll("select")[1].value,
        pickup: document.querySelector('input[placeholder="Pickup Location"]').value,
        drop: document.querySelector('input[placeholder="Drop Location"]').value,
        date: document.querySelector('input[type="date"]').value,
        time: document.querySelector('input[type="time"]').value
    };

    
const API_URL = "http://localhost:3000";

fetch(`${API_URL}/book-cab`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(bookingData)
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        window.location.href = "thankyou.html";
    } else {
        alert("❌ Booking Failed! Please try again.");
    }

    console.log(data);
})
.catch(error => {
    console.error("Booking request failed:", error);
    alert(`❌ Backend Connection Failed! ${error.message}`);
});

});
    
// ===========================
// Button Animation
// ===========================

const bookButton = document.querySelector(".booking-card button");

if (bookButton) {
    bookButton.addEventListener("mouseenter", () => {
        bookButton.style.transform = "scale(1.05)";
    });

    bookButton.addEventListener("mouseleave", () => {
        bookButton.style.transform = "scale(1)";
    });
}