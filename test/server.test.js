const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { app, resetBookings } = require('../server');

test('POST /book-cab saves a booking and GET /bookings returns it', async () => {
  resetBookings();

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));

  const { port } = server.address();

  try {
    const postRes = await fetch(`http://127.0.0.1:${port}/book-cab`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alice',
        email: 'alice@example.com',
        phone: '1234567890',
        ride: 'Local Ride',
        vehicle: 'Sedan',
        pickup: 'Chennai',
        drop: 'Tambaram'
      })
    });

    assert.equal(postRes.status, 200);
    const postBody = await postRes.json();
    assert.equal(postBody.success, true);

    const getRes = await fetch(`http://127.0.0.1:${port}/bookings`);
    assert.equal(getRes.status, 200);

    const bookings = await getRes.json();
    assert.equal(bookings.length, 1);
    assert.equal(bookings[0].name, 'Alice');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
