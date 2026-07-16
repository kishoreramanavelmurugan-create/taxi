document.addEventListener("DOMContentLoaded", loadBookings);

function loadBookings() {

    const tbody = document.querySelector("#bookingTable tbody");

    fetch("http://localhost:3000/bookings")
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

                        <button onclick="acceptBooking('${booking._id}')">
                            ✅ Accept
                        </button>

                        <button onclick="rejectBooking('${booking._id}')">
                            ❌ Reject
                        </button>

                        <button onclick="deleteBooking('${booking._id}')">
                            🗑 Delete
                        </button>

                    </td>

                </tr>
                `;

            });

        })
        .catch(err => console.log(err));

}

function acceptBooking(id){

    fetch(`http://localhost:3000/bookings/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            status:"Accepted"
        })

    })
    .then(res=>res.json())
    .then(()=>{
        alert("Booking Accepted ✅");
        loadBookings();
    });

}

function rejectBooking(id){

    fetch(`http://localhost:3000/bookings/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            status:"Rejected"
        })

    })
    .then(res=>res.json())
    .then(()=>{
        alert("Booking Rejected ❌");
        loadBookings();
    });

}

function deleteBooking(id){

    if(!confirm("Delete this booking?")) return;

    fetch(`http://localhost:3000/bookings/${id}`,{

        method:"DELETE"

    })
    .then(res=>res.json())
    .then(()=>{
        alert("Booking Deleted 🗑");
        loadBookings();
    });

}