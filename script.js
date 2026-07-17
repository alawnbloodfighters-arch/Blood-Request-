const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyd6gU-u1kb-7sHNGfhRtJ_61BD6OEbjYtVYjjmcIs-D4Dn02Y5SxJZT0uno9g1XPcI/exec";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("bloodRequestForm");

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const mobile = document.getElementById("mobile").value.trim();

    if (!/^01\d{9}$/.test(mobile)) {
      alert("সঠিক ১১ সংখ্যার মোবাইল নম্বর লিখুন");
      return;
    }

    // 24 Hour → 12 Hour (AM/PM)
    const time24 = document.getElementById("time").value;
    let time12 = "";

    if (time24) {
      let [hour, minute] = time24.split(":");
      hour = parseInt(hour);

      const ampm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12;
      if (hour === 0) hour = 12;

      time12 = `${hour}:${minute} ${ampm}`;
    }

    const data = {
      problem: document.getElementById("problem").value.trim(),
      bloodGroup: document.getElementById("bloodGroup").value,
      hemoglobin: document.getElementById("hemoglobin").value,
      date: document.getElementById("date").value,
      time: time12,
      hospital: document.getElementById("hospital").value.trim(),
      mobile: mobile,
      note: document.getElementById("note").value.trim()
    };

    try {

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ ব্লাড রিকুয়েস্ট সফলভাবে পাঠানো হয়েছে।");
        form.reset();
      } else {
        alert("❌ " + result.error);
      }

    } catch (err) {
      console.error(err);
      alert("❌ সার্ভারের সাথে সংযোগ করা যায়নি।");
    }

  });

});
