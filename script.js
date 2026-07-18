const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwL2I-lWCL1TeYrBE6e5dM_UGKMNdcnCYpXaAbOExvcbEIKHdcCZcRLNwW-FeXwKszY/exec";

document.getElementById("bloodRequestForm").addEventListener("submit", async (e) => {

  e.preventDefault();

  const mobile = document.getElementById("mobile").value.trim();

  if (!/^01\d{9}$/.test(mobile)) {
    alert("সঠিক ১১ সংখ্যার মোবাইল নম্বর লিখুন");
    return;
  }

  let time = document.getElementById("time").value;

  let hour = parseInt(time.split(":")[0]);
  let minute = time.split(":")[1];

  let ampm = "AM";

  if (hour >= 12) {
    ampm = "PM";
    if (hour > 12) hour -= 12;
  }

  if (hour === 0) hour = 12;

  time = hour + ":" + minute + " " + ampm;

  const data = {
    problem: document.getElementById("problem").value.trim(),
    bloodGroup: document.getElementById("bloodGroup").value,
    hemoglobin: document.getElementById("hemoglobin").value,
    date: document.getElementById("date").value,
    time: time,
    hospital: document.getElementById("hospital").value.trim(),
    mobile: mobile,
    note: document.getElementById("note").value.trim()
  };

  try {

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {

      alert("✅ ব্লাড রিকুয়েস্ট সফলভাবে পাঠানো হয়েছে");

      document.getElementById("bloodRequestForm").reset();

    } else {

      alert("❌ " + result.error);

    }

  } catch (err) {

    console.error(err);

    alert("❌ সার্ভারের সাথে সংযোগ করা যায়নি");

  }

});
