// ======================================
// Google Apps Script URL
// ======================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzFVagelgQ7pHeIUHP4yHvYkgHB5w4KFrH5a8GE7NnS0gMCk4nGDfOqaLasKRJNNEQ9CQ/exec";


// ======================================
// Page Load
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Blood Request Script Loaded");


    // Form
    const form = document.getElementById("bloodRequestForm");

    // Button
    const submitButton = document.getElementById("submitButton");


    // ======================================
    // Form Submit
    // ======================================

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        console.log("Submit button clicked");


        // ==================================
        // Mobile Number
        // ==================================

        const mobile =
            document.getElementById("mobile").value.trim();


        if (!/^01\d{9}$/.test(mobile)) {

            alert("❌ সঠিক ১১ সংখ্যার মোবাইল নম্বর লিখুন");

            return;

        }


        // ==================================
        // Time Period
        // ==================================

        const timePeriod =
            document.getElementById("timePeriod").value;


        if (timePeriod === "") {

            alert("❌ বেলা নির্বাচন করুন");

            return;

        }


        // ==================================
        // Time
        // ==================================

        const timeValue =
            document.getElementById("timeValue").value;


        if (timeValue === "") {

            alert("❌ সময় নির্বাচন করুন");

            return;

        }


        // ==================================
        // Collect Form Data
        // ==================================

        const data = {

            problem:
                document.getElementById("problem").value.trim(),

            bloodGroup:
                document.getElementById("bloodGroup").value,

            hemoglobin:
                document.getElementById("hemoglobin").value,

            date:
                document.getElementById("date").value,

            timePeriod:
                timePeriod,

            timeValue:
                timeValue,

            hospital:
                document.getElementById("hospital").value.trim(),

            mobile:
                mobile,

            note:
                document.getElementById("note").value.trim()

        };


        console.log("Sending Data:", data);


        // ==================================
        // Button Disable
        // ==================================

        submitButton.disabled = true;

        submitButton.innerText = "⏳ রিকুয়েস্ট পাঠানো হচ্ছে...";


        // ==================================
        // Send Data to Google Sheets
        // ==================================

        try {

            const response = await fetch(SCRIPT_URL, {

                method: "POST",

                headers: {

                    "Content-Type":
                        "text/plain;charset=utf-8"

                },

                body: JSON.stringify(data)

            });


            console.log("Response received");


            const result =
                await response.json();


            console.log("Server result:", result);


            // ==================================
            // Success
            // ==================================

            if (result.success === true) {

                alert(
                    "✅ ব্লাড রিকুয়েস্ট সফলভাবে পাঠানো হয়েছে"
                );


                // Form Reset

                form.reset();


            }

            // ==================================
            // Error
            // ==================================

            else {

                alert(
                    "❌ রিকুয়েস্ট পাঠানো যায়নি\n\n" +
                    (result.error || "অজানা সমস্যা")
                );

            }


        }

        // ======================================
        // Connection Error
        // ======================================

        catch (error) {

            console.error(
                "Connection Error:",
                error
            );


            alert(
                "❌ সার্ভারের সাথে সংযোগ করা যায়নি\n\n" +
                "ইন্টারনেট অথবা Apps Script Deployment পরীক্ষা করুন।"
            );

        }


        // ==================================
        // Button Enable
        // ==================================

        submitButton.disabled = false;

        submitButton.innerText =
            "🩸 রিকুয়েস্ট পাঠান";

    });

});
