
// ==========================================
// AL-AWN BLOOD FIGHTERS
// BLOOD REQUEST FORM SCRIPT
// ==========================================


// ==========================================
// FORM ELEMENT
// ==========================================

const form =
    document.getElementById("bloodRequestForm");

const submitButton =
    document.getElementById("submitButton");


// ==========================================
// GOOGLE APPS SCRIPT URL
// ==========================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzJLYulqrxXeJeyt2tZhKI34eSed-dx6LMca2JaxVQttdRFtWfDXUnEt1n4nW0l7Tfp8Q/exec";


// ==========================================
// FORM SUBMIT
// ==========================================

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // ==================================
        // Button Disable
        // ==================================

        submitButton.disabled = true;

        submitButton.innerText =
            "⏳ পাঠানো হচ্ছে...";


        // ==================================
        // Mobile Number
        // String হিসেবে নেওয়া হবে
        // ==================================

        const mobile =
            String(
                document
                    .getElementById("mobile")
                    .value
                    .trim()
            );


        // ==================================
        // Form Data
        // ==================================

        const data = {

            // রেফারেন্স
            reference:
                String(
                    document
                        .getElementById("reference")
                        .value
                        .trim()
                ),


            // রোগীর সমস্যা
            problem:
                String(
                    document
                        .getElementById("problem")
                        .value
                        .trim()
                ),


            // রক্তের গ্রুপ
            bloodGroup:
                String(
                    document
                        .getElementById("bloodGroup")
                        .value
                ),


            // হিমোগ্লোবিন
            hemoglobin:
                String(
                    document
                        .getElementById("hemoglobin")
                        .value
                ),


            // রক্তদানের তারিখ
            date:
                String(
                    document
                        .getElementById("date")
                        .value
                ),


            // রক্তদানের সময়
            time:
                String(
                    document
                        .getElementById("time")
                        .value
                        .trim()
                ),


            // হাসপাতাল
            hospital:
                String(
                    document
                        .getElementById("hospital")
                        .value
                        .trim()
                ),


            // রোগীর লোকের যোগাযোগ নম্বর
            // 0 সহ String হিসেবে পাঠানো হবে
            mobile:
                mobile,


            // অতিরিক্ত তথ্য / Update
            note:
                String(
                    document
                        .getElementById("note")
                        .value
                        .trim()
                )

        };


        // ==================================
        // Reference Validation
        // ==================================

        if (data.reference === "") {

            alert(
                "⚠️ আপনার নাম লিখুন।"
            );

            submitButton.disabled = false;

            submitButton.innerText =
                "🩸 রিকুয়েস্ট পাঠান";

            return;
        }


        // ==================================
        // Mobile Validation
        // ==================================

        if (
            !/^01[0-9]{9}$/.test(
                data.mobile
            )
        ) {

            alert(
                "⚠️ সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন।"
            );

            submitButton.disabled = false;

            submitButton.innerText =
                "🩸 রিকুয়েস্ট পাঠান";

            return;
        }


        // ==================================
        // Time Validation
        // ==================================

        if (data.time === "") {

            alert(
                "⚠️ রক্তদানের সময় লিখুন।"
            );

            submitButton.disabled = false;

            submitButton.innerText =
                "🩸 রিকুয়েস্ট পাঠান";

            return;
        }


        // ==================================
        // Date Validation
        // ==================================

        if (data.date === "") {

            alert(
                "⚠️ রক্তদানের তারিখ নির্বাচন করুন।"
            );

            submitButton.disabled = false;

            submitButton.innerText =
                "🩸 রিকুয়েস্ট পাঠান";

            return;
        }


        // ==================================
        // SEND DATA TO GOOGLE APPS SCRIPT
        // ==================================

        try {

            const response =
                await fetch(
                    SCRIPT_URL,
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "text/plain;charset=utf-8"

                        },

                        body:
                            JSON.stringify(data)

                    }
                );


            // ==================================
            // Response
            // ==================================

            const result =
                await response.json();


            // ==================================
            // Success
            // ==================================

            if (result.success) {

                alert(
                    "✅ রক্তের রিকুয়েস্ট সফলভাবে পাঠানো হয়েছে।"
                );

                form.reset();

            } else {

                alert(
                    "❌ রিকুয়েস্ট পাঠানো যায়নি।\n\n" +
                    (
                        result.error ||
                        "অজানা সমস্যা হয়েছে।"
                    )
                );

            }


        } catch (error) {

            console.error(
                "Error:",
                error
            );

            alert(
                "❌ রিকুয়েস্ট পাঠানো যায়নি।\n\n" +
                "ইন্টারনেট সংযোগ অথবা সার্ভারের সমস্যা হতে পারে।"
            );

        }


        // ==================================
        // Button আবার চালু
        // ==================================

        submitButton.disabled = false;

        submitButton.innerText =
            "🩸 রিকুয়েস্ট পাঠান";

    }
);
