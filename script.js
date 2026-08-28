// ==========================================
// AL-AWN BLOOD FIGHTERS
// BLOOD REQUEST FORM
// FIREBASE VERSION
// ==========================================

import {
    auth,
    db
} from "./firebase-config.js";


import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";



// ==========================================
// ELEMENTS
// ==========================================

const form =
    document.getElementById(
        "bloodRequestForm"
    );


const submitButton =
    document.getElementById(
        "submitButton"
    );



// ==========================================
// AUTH STATE
// ==========================================

let currentUser = null;

let authChecked = false;



// ==========================================
// WAIT FOR FIREBASE AUTH
// ==========================================

onAuthStateChanged(

    auth,

    function(user) {

        currentUser = user;

        authChecked = true;



        // ==================================
        // USER LOGIN করা নেই
        // ==================================

        if (!user) {

            submitButton.disabled = true;

            submitButton.innerText =
                "Login প্রয়োজন";

            console.log(
                "Blood Request: User NOT logged in"
            );

            return;

        }



        // ==================================
        // USER LOGIN করা আছে
        // ==================================

        submitButton.disabled = false;

        submitButton.innerText =
            "🩸 রিকুয়েস্ট পাঠান";


        console.log(
            "Blood Request: User logged in:",
            user.uid
        );

    }

);



// ==========================================
// FORM SUBMIT
// ==========================================

form.addEventListener(

    "submit",

    async function(event) {

        event.preventDefault();



        // ==================================
        // AUTH STATE এখনো CHECK হয়নি
        // ==================================

        if (!authChecked) {

            alert(
                "⏳ Login যাচাই হচ্ছে। কয়েক সেকেন্ড পরে আবার চেষ্টা করুন।"
            );

            return;

        }



        // ==================================
        // ALWAYS GET CURRENT USER
        // ==================================

        currentUser =
            auth.currentUser;



        // ==================================
        // LOGIN CHECK
        // ==================================

        if (!currentUser) {

            alert(
                "⚠️ আপনার Login session পাওয়া যাচ্ছে না।\n\nLogin page থেকে আবার Login করুন।"
            );

            return;

        }



        // ==================================
        // BUTTON DISABLE
        // ==================================

        submitButton.disabled = true;

        submitButton.innerText =
            "⏳ পাঠানো হচ্ছে...";



        try {


            // ==================================
            // FORM VALUES
            // ==================================

            const reference =
                document
                    .getElementById("reference")
                    .value
                    .trim();


            const problem =
                document
                    .getElementById("problem")
                    .value
                    .trim();


            const bloodGroup =
                document
                    .getElementById("bloodGroup")
                    .value;


            const hemoglobin =
                document
                    .getElementById("hemoglobin")
                    .value
                    .trim();


            const date =
                document
                    .getElementById("date")
                    .value;


            const time =
                document
                    .getElementById("time")
                    .value
                    .trim();


            const hospital =
                document
                    .getElementById("hospital")
                    .value
                    .trim();


            const mobile =
                document
                    .getElementById("mobile")
                    .value
                    .trim();


            const note =
                document
                    .getElementById("note")
                    .value
                    .trim();



            // ==================================
            // VALIDATION
            // ==================================

            if (!reference) {

                alert(
                    "⚠️ আপনার নাম লিখুন।"
                );

                submitButton.disabled = false;

                submitButton.innerText =
                    "🩸 রিকুয়েস্ট পাঠান";

                return;

            }



            if (!problem) {

                alert(
                    "⚠️ রোগীর সমস্যা লিখুন।"
                );

                submitButton.disabled = false;

                submitButton.innerText =
                    "🩸 রিকুয়েস্ট পাঠান";

                return;

            }



            if (!bloodGroup) {

                alert(
                    "⚠️ রক্তের গ্রুপ নির্বাচন করুন।"
                );

                submitButton.disabled = false;

                submitButton.innerText =
                    "🩸 রিকুয়েস্ট পাঠান";

                return;

            }



            if (!hemoglobin) {

                alert(
                    "⚠️ হিমোগ্লোবিন লিখুন।"
                );

                submitButton.disabled = false;

                submitButton.innerText =
                    "🩸 রিকুয়েস্ট পাঠান";

                return;

            }



            if (!date) {

                alert(
                    "⚠️ রক্তদানের তারিখ নির্বাচন করুন।"
                );

                submitButton.disabled = false;

                submitButton.innerText =
                    "🩸 রিকুয়েস্ট পাঠান";

                return;

            }



            if (!time) {

                alert(
                    "⚠️ রক্তদানের সময় লিখুন।"
                );

                submitButton.disabled = false;

                submitButton.innerText =
                    "🩸 রিকুয়েস্ট পাঠান";

                return;

            }



            if (!hospital) {

                alert(
                    "⚠️ হাসপাতালের নাম লিখুন।"
                );

                submitButton.disabled = false;

                submitButton.innerText =
                    "🩸 রিকুয়েস্ট পাঠান";

                return;

            }



            // ==================================
            // MOBILE VALIDATION
            // ==================================

            if (
                !/^01[3-9][0-9]{8}$/.test(
                    mobile
                )
            ) {

                alert(
                    "⚠️ সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর দিন।"
                );

                submitButton.disabled = false;

                submitButton.innerText =
                    "🩸 রিকুয়েস্ট পাঠান";

                return;

            }



            // ==================================
            // CREATE REQUEST REFERENCE
            // ==================================

            const requestsRef =
                ref(
                    db,
                    "bloodRequests"
                );


            const requestRef =
                push(
                    requestsRef
                );


            const requestId =
                requestRef.key;



            // ==================================
            // REQUEST DATA
            // ==================================

            const requestData = {

                requestId:
                    requestId,

                uid:
                    currentUser.uid,

                requesterName:
                    currentUser.displayName ||
                    reference,

                requesterEmail:
                    currentUser.email ||
                    "",

                reference:
                    reference,

                problem:
                    problem,

                bloodGroup:
                    bloodGroup,

                hemoglobin:
                    hemoglobin,

                date:
                    date,

                time:
                    time,

                hospital:
                    hospital,

                mobile:
                    mobile,

                note:
                    note,

                status:
                    "No Update",

                createdAt:
                    Date.now(),

                updatedAt:
                    Date.now(),

                updatedBy:
                    currentUser.uid

            };



            // ==================================
            // SAVE TO FIREBASE
            // ==================================

            await set(

                requestRef,

                requestData

            );



            // ==================================
            // SUCCESS
            // ==================================

            alert(
                "✅ রক্তের রিকুয়েস্ট সফলভাবে পাঠানো হয়েছে।"
            );


            form.reset();



            console.log(
                "Blood Request Created:",
                requestId
            );

        }



        // ==================================
        // ERROR
        // ==================================

        catch(error) {

            console.error(
                "Firebase Blood Request Error:",
                error
            );


            alert(

                "❌ রিকুয়েস্ট পাঠানো যায়নি।\n\n" +

                "Error: " +

                (
                    error.message ||
                    error.code ||
                    "Unknown error"
                )

            );

        }



        // ==================================
        // BUTTON RESET
        // ==================================

        finally {

            submitButton.disabled = false;

            submitButton.innerText =
                "🩸 রিকুয়েস্ট পাঠান";

        }

    }

);
