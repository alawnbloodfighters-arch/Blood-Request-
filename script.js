const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzFVagelgQ7pHeIUHP4yHvYkgHB5w4KFrH5a8GE7NnS0gMCk4nGDfOqaLasKRJNNEQ9CQ/exec";

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("bloodRequestForm");

  form.addEventListener("submit", async function (e) {

    e.preventDefault();

    // =========================
    // মোবাইল নম্বর যাচাই
    // =========================

    const mobile = document.getElementById("mobile").value.trim();

    if (!/^01\d{9}$/.test(mobile)) {
      alert("❌ সঠিক ১১ সংখ্যার মোবাইল নম্বর লিখুন");
      return;
    }

    // =========================
    // বেলা ও সময়
    // =========================

    const timePeriod = document.getElementById("timePeriod").value;
    const timeValue = document.getElementById("timeValue").value;

    if (!timePeriod) {
      alert("❌ বেলা নির্বাচন করুন");
      return;
    }

    if (!timeValue) {
      alert("❌ সময় নির্বাচন করুন");
      return;
    }

    // =========================
    // সব তথ্য সংগ্রহ
    // =========================

    const data = {

      problem: document.getElementById("problem").value.trim(),

      bloodGroup: document.getElementById("bloodGroup").value,

      hemoglobin: document.getElementById("hemoglobin").value,

      date: document.getElementById("date").value,

      timePeriod: timePeriod,

      timeValue: timeValue,

      hospital: document.getElementById("hospital").value.trim(),

      mobile: mobile,

      note: document.getElementById("note").value.trim()

    };

    // =========================
    // ডাটা পাঠানো
    // =========================

    try {

      alert("⏳ রিকুয়েস্ট পাঠানো হচ্ছে...");

      const response = await fetch(SCRIPT_URL, {

        method: "POST",

        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },

        body: JSON.stringify(data)

      });

      const result = await response.json();

      console.log("Server Response:", result);

      if (result.success) {

        alert("✅ ব্লাড রিকুয়েস্ট সফলভাবে পাঠানো হয়েছে");

        form.reset();

      } else {

        alert("❌ " + (result.error || "রিকুয়েস্ট পাঠানো যায়নি"));

      }

    } catch (error) {

      console.error("Error:", error);

      alert(
        "❌ সার্ভারের সাথে সংযোগ করা যায়নি।\n\n" +
        "ইন্টারনেট এবং Apps Script Deployment পরীক্ষা করুন।"
      );

    }

  });

});
