// ==========================================
// 🩸 Al-Awn Blood Fighters
// Blood Request Form - Final Script
// ==========================================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzFVagelgQ7pHeIUHP4yHvYkgHB5w4KFrH5a8GE7NnS0gMCk4nGDfOqaLasKRJNNEQ9CQ/exec";

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("bloodRequestForm");

  // ==========================================
  // Form Submit
  // ==========================================

  form.addEventListener("submit", async function (e) {

    e.preventDefault();

    // ========================================
    // Mobile Number
    // ========================================

    const mobile = document
      .getElementById("mobile")
      .value
      .trim();

    if (!/^01\d{9}$/.test(mobile)) {

      alert("❌ সঠিক ১১ সংখ্যার মোবাইল নম্বর লিখুন");

      return;
    }


    // ========================================
    // Get Form Values
    // ========================================

    const problem = document
      .getElementById("problem")
      .value
      .trim();

    const bloodGroup = document
      .getElementById("bloodGroup")
      .value;

    const hemoglobin = document
      .getElementById("hemoglobin")
      .value;

    const date = document
      .getElementById("date")
      .value;

    const bela = document
      .getElementById("bela")
      .value;

    const time = document
      .getElementById("time")
      .value;

    const hospital = document
      .getElementById("hospital")
      .value
      .trim();

    const note = document
      .getElementById("note")
      .value
      .trim();


    // ========================================
    // Check Time
    // ========================================

    if (!bela) {

      alert("❌ অনুগ্রহ করে বেলা নির্বাচন করুন");

      return;
    }


    if (!time) {

      alert("❌ অনুগ্রহ করে সময় নির্বাচন করুন");

      return;
    }


    // ========================================
    // Data
    // ========================================

    const data = {

      problem: problem,

      bloodGroup: bloodGroup,

      hemoglobin: hemoglobin,

      date: date,

      bela: bela,

      time: time,

      hospital: hospital,

      mobile: mobile,

      note: note

    };


    // ========================================
    // Disable Button
    // ========================================

    const button = form.querySelector("button[type='submit']");

    const oldButtonText = button.innerHTML;

    button.disabled = true;

    button.innerHTML = "⏳ পাঠানো হচ্ছে...";


    // ========================================
    // Send Data to Google Sheet
    // ========================================

    try {

      const response = await fetch(SCRIPT_URL, {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify(data)

      });


      const result = await response.json();


      // ======================================
      // Success
      // ======================================

      if (result.success) {

        alert("✅ ব্লাড রিকুয়েস্ট সফলভাবে পাঠানো হয়েছে");

        form.reset();

      }


      // ======================================
      // Error
      // ======================================

      else {

        alert(
          "❌ রিকুয়েস্ট পাঠানো যায়নি\n\n" +
          (result.error || "অজানা সমস্যা")
        );

      }


    } catch (error) {

      console.error("Error:", error);

      alert(
        "❌ সার্ভারের সাথে সংযোগ করা যায়নি।\n\n" +
        "ইন্টারনেট সংযোগ এবং Apps Script Deployment পরীক্ষা করুন।"
      );

    }


    // ========================================
    // Enable Button Again
    // ========================================

    button.disabled = false;

    button.innerHTML = oldButtonText;

  });

});
