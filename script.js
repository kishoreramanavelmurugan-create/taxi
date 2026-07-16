// ===========================
// TaxiPro JavaScript v1.0
// ===========================

const form = document.getElementById("bookingForm");

form.addEventListener("submit", function(e) {

    e.preventDefault();

    const inputs = form.querySelectorAll("input, select");

    let valid = true;

    inputs.forEach(input => {

        if (input.value.trim() === "") {
            valid = false;
        }

    });


    if (valid) {

        fetch("http://localhost:3000/book-cab", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name: document.querySelector('input[placeholder="Full Name"]').value,

                email: document.querySelector('input[placeholder="Email Address"]').value,

                phone: document.querySelector('input[placeholder="Phone Number"]').value,

                ride: document.querySelectorAll("select")[0].value,

                vehicle: document.querySelectorAll("select")[1].value,

                pickup: document.querySelector('input[placeholder="Pickup Location"]').value,

                drop: document.querySelector('input[placeholder="Drop Location"]').value,

                date: document.querySelector('input[type="date"]').value,

                time: document.querySelector('input[type="time"]').value

            })

        })
        .then(response => response.json())
        .then(data => {

            alert("🎉 Your Taxi Booking Request has been Submitted Successfully!");

            console.log(data);

            form.reset();

        })
        .catch(error => {

            console.log(error);

            alert("❌ Backend connection failed");

        });


    }

    else {

        alert("⚠ Please fill all the required fields.");

    }

});


// ===== TaxiPro Button Animation =====

const bookButton = document.querySelector(".booking-card button");

if (bookButton) {

    bookButton.addEventListener("mouseenter", () => {

        bookButton.style.transform = "scale(1.05)";

    });


    bookButton.addEventListener("mouseleave", () => {

        bookButton.style.transform = "scale(1)";

    });

}