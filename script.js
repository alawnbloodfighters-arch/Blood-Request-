
const form = document.getElementById("bloodRequestForm");
const submitButton = document.getElementById("submitButton");

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxJTlqPoaBGzIAbROQyeQfVzCJ5LLGv2aizbg5-Go9sbjao53sD95vD5sz7fsttRX2MBA/exec";


form.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Button disable
    submitButton.disabled = true;
    submitButton.innerText = "⏳ পাঠানো হচ্ছে...";


    // Form data
    const data = {

        problem: document.getElementById("problem").value.trim(),

        bloodGroup: document.getElementById("bloodGroup").value,

        hemoglobin: document.getElementById("hemoglobin").value,

        date: document.getElementById("date").value,

        time: document.getElementById("time").value.trim(),

        hospital: document.getElementById("hospital").value.trim(),

        mobile: document.getElementById("mobile").value.trim(),

        note: document.getElementById("note").value.trim()

    };


    // Mobile number validation
    if (!/^01[0-9]{9}$/.test(data.mobile)) {

        alert("⚠️ সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন।");

        submitButton.disabled = false;
        submitButton.innerText = "🩸 রিকুয়েস্ট পাঠান";

        return;
    }


    // Empty time validation
    if (data.time === "") {

        alert("⚠️ রক্তদানের সময় লিখুন।");

        submitButton.disabled = false;
        submitButton.innerText = "🩸 রিকুয়েস্ট পাঠান";

        return;
    }


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

            alert("✅ রক্তের রিকুয়েস্ট সফলভাবে পাঠানো হয়েছে।");

            form.reset();

        } else {

            alert(
                "❌ রিকুয়েস্ট পাঠানো যায়নি।\n\n" +
                (result.error || "অজানা সমস্যা হয়েছে।")
            );

        }


    } catch (error) {

        console.error("Error:", error);

        alert(
            "❌ রিকুয়েস্ট পাঠানো যায়নি।\n\n" +
            "ইন্টারনেট সংযোগ অথবা সার্ভারের সমস্যা হতে পারে।"
        );

    }


    // Button আবার চালু
    submitButton.disabled = false;
    submitButton.innerText = "🩸 রিকুয়েস্ট পাঠান";

});
