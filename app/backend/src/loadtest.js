const API_URL = process.env.API_URL || 'http://localhost:3001';

const bikes = [
  'AeroVolt R7',
  'SummitClimb X2',
  'RangeLine G4',
  'MetroPulse E1',
  'Courtyard C3',
  'PeakForge M9',
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function makeRequest(i) {
  const bike = randomItem(bikes);
  const start = Date.now();
  try {
    const res = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bike_name: bike,
        quantity: Math.floor(Math.random() * 3) + 1,
        price: Math.floor(Math.random() * 3000) + 500,
        user_name: `Test User ${i}`,
        user_email: `user${i % 10}@test.com`,
        message: `Load test order #${i}`,
      }),
    });
    const elapsed = Date.now() - start;
    if (res.ok) {
      console.log(`[${i}] OK ${bike} - ${elapsed}ms`);
    } else {
      console.log(`[${i}] FAIL ${res.status} ${bike} - ${elapsed}ms`);
    }
    return res.ok;
  } catch (err) {
    const elapsed = Date.now() - start;
    console.log(`[${i}] ERROR ${err.message} - ${elapsed}ms`);
    return false;
  }
}

async function runLoadTest(total = 100) {
  console.log(`[LoadTest] Starting ${total} requests to ${API_URL}...`);
  const results = [];
  for (let i = 1; i <= total; i++) {
    const ok = await makeRequest(i);
    results.push(ok);
  }

  const succeeded = results.filter(Boolean).length;
  const failed = total - succeeded;

  console.log(`\n[LoadTest] Results:`);
  console.log(`  Total:    ${total}`);
  console.log(`  Succeeded: ${succeeded} (${((succeeded / total) * 100).toFixed(1)}%)`);
  console.log(`  Failed:    ${failed} (${((failed / total) * 100).toFixed(1)}%)`);
}

runLoadTest(100);
