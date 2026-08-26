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
// FORM
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
// CURRENT USER
// ==========================================

let currentUser = null;


onAuthStateChanged(

    auth,

    function(user) {

        currentUser = user;

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
        // LOGIN CHECK
        // ==================================

        if (!currentUser) {

            alert(
                "⚠️ রিকুয়েস্ট পাঠানোর আগে Login করুন।"
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
                String(
                    document
                        .getElementById("mobile")
                        .value
                        .trim()
                );


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

                return;

            }


            if (!bloodGroup) {

                alert(
                    "⚠️ রক্তের গ্রুপ নির্বাচন করুন।"
                );

                return;

            }


            if (
                !/^01[0-9]{9}$/.test(
                    mobile
                )
            ) {

                alert(
                    "⚠️ সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন।"
                );

                return;

            }


            if (!time) {

                alert(
                    "⚠️ রক্তদানের সময় লিখুন।"
                );

                return;

            }


            if (!date) {

                alert(
                    "⚠️ রক্তদানের তারিখ নির্বাচন করুন।"
                );

                return;

            }



            // ==================================
            // NEW REQUEST REFERENCE
            // ==================================

            const requestRef =
                push(
                    ref(
                        db,
                        "bloodRequests"
                    )
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

                    currentUser.email || "",


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


                // প্রথম status

                status:

                    "No Update",


                // কখন তৈরি হয়েছে

                createdAt:

                    Date.now(),


                // সর্বশেষ status update

                updatedAt:

                    Date.now(),


                updatedBy:

                    currentUser.uid

            };



            // ==================================
            // SAVE REQUEST
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


        }

        catch(error) {


            console.error(
                "Firebase Error:",
                error
            );


            alert(

                "❌ রিকুয়েস্ট পাঠানো যায়নি।\n\n" +

                "Firebase Database Rules অথবা Internet সংযোগ পরীক্ষা করুন।"

            );

        }


        finally {


            submitButton.disabled = false;

            submitButton.innerText =
                "🩸 রিকুয়েস্ট পাঠান";

        }

    }

);
