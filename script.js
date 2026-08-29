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
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence
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

let authChecked = false;


// ==========================================
// INITIAL BUTTON STATE
// ==========================================

submitButton.disabled = true;

submitButton.innerText =
    "⏳ Login যাচাই হচ্ছে...";


// ==========================================
// KEEP FIREBASE LOGIN SESSION
// ==========================================

try {

    await setPersistence(
        auth,
        browserLocalPersistence
    );

}
catch (error) {

    console.error(
        "Firebase Persistence Error:",
        error
    );

}


// ==========================================
// AUTH STATE
// ==========================================

onAuthStateChanged(
    auth,
    function(user) {

        currentUser =
            user;

        authChecked =
            true;


        // ==================================
        // USER LOGIN করা আছে
        // ==================================

        if (user) {

            console.log(
                "Firebase Login OK:",
                user.uid
            );


            submitButton.disabled =
                false;

            submitButton.innerText =
                "🩸 রিকুয়েস্ট পাঠান";


            return;

        }


        // ==================================
        // LOGIN করা নেই
        // ==================================

        console.log(
            "Firebase User নেই"
        );


        submitButton.disabled =
            true;

        submitButton.innerText =
            "Login প্রয়োজন";

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
        // AUTH CHECK
        // ==================================

        if (!authChecked) {

            alert(
                "⏳ Login তথ্য যাচাই হচ্ছে। একটু অপেক্ষা করুন।"
            );

            return;

        }


        // ==================================
        // LOGIN CHECK
        // ==================================

        if (!currentUser) {

            alert(
                "⚠️ আপনার Login session পাওয়া যাচ্ছে না।\n\nআবার Login করে রক্তের আবেদন পেজে আসুন।"
            );

            return;

        }


        // ==================================
        // BUTTON DISABLE
        // ==================================

        submitButton.disabled =
            true;

        submitButton.innerText =
            "⏳ পাঠানো হচ্ছে...";


        try {


            // ==================================
            // FORM VALUES
            // ==================================

            const reference =
                document
                    .getElementById(
                        "reference"
                    )
                    .value
                    .trim();


            const problem =
                document
                    .getElementById(
                        "problem"
                    )
                    .value
                    .trim();


            const bloodGroup =
                document
                    .getElementById(
                        "bloodGroup"
                    )
                    .value;


            const hemoglobin =
                document
                    .getElementById(
                        "hemoglobin"
                    )
                    .value
                    .trim();


            const date =
                document
                    .getElementById(
                        "date"
                    )
                    .value;


            const time =
                document
                    .getElementById(
                        "time"
                    )
                    .value
                    .trim();


            const hospital =
                document
                    .getElementById(
                        "hospital"
                    )
                    .value
                    .trim();


            const mobile =
                document
                    .getElementById(
                        "mobile"
                    )
                    .value
                    .trim();


            const note =
                document
                    .getElementById(
                        "note"
                    )
                    .value
                    .trim();


            // ==================================
            // VALIDATION
            // ==================================

            if (!reference) {

                alert(
                    "⚠️ আপনার নাম লিখুন।"
                );

                submitButton.disabled =
                    false;

                submitButton.innerText =
                    "🩸 রিকুয়েস্ট পাঠান";

                return;

            }


            if (!problem) {

                alert(
                    "⚠️ রোগীর সমস্যা লিখুন।"
                );

                submitButton.disabled =
                    false;

                submitButton.innerText =
                    "🩸 রিকুয়েস্ট পাঠান";

                return;

            }


            if (!bloodGroup) {

                alert(
                    "⚠️ রক্তের গ্রুপ নির্বাচন করুন।"
                );

                submitButton.disabled =
                    false;

                submitButton.innerText =
                    "🩸 রিকুয়েস্ট পাঠান";

                return;

            }


            if (!hemoglobin) {

                alert(
                    "⚠️ হিমোগ্লোবিন লিখুন।"
                );

                submitButton.disabled =
                    false;

                submitButton.innerText =
                    "🩸 রিকুয়েস্ট পাঠান";

                return;

            }


            if (!date) {

                alert(
                    "⚠️ রক্তদানের তারিখ নির্বাচন করুন।"
                );

                submitButton.disabled =
                    false;

                submitButton.innerText =
                    "🩸 রিকুয়েস্ট পাঠান";

                return;

            }


            if (!time) {

                alert(
                    "⚠️ রক্তদানের সময় লিখুন।"
                );

                submitButton.disabled =
                    false;

                submitButton.innerText =
                    "🩸 রিকুয়েস্ট পাঠান";

                return;

            }


            if (!hospital) {

                alert(
                    "⚠️ হাসপাতালের নাম লিখুন।"
                );

                submitButton.disabled =
                    false;

                submitButton.innerText =
                    "🩸 রিকুয়েস্ট পাঠান";

                return;

            }


            if (
                !/^01[3-9][0-9]{8}$/.test(
                    mobile
                )
            ) {

                alert(
                    "⚠️ সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর দিন।"
                );

                submitButton.disabled =
                    false;

                submitButton.innerText =
                    "🩸 রিকুয়েস্ট পাঠান";

                return;

            }


            // ==================================
            // CREATE NEW REQUEST
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

            console.log(
                "Blood Request Created:",
                requestId
            );


            alert(
                "✅ রক্তের রিকুয়েস্ট সফলভাবে পাঠানো হয়েছে।"
            );


            // ==================================
            // RESET FORM
            // ==================================

            form.reset();

        }


        catch(error) {

            console.error(
                "Firebase Error:",
                error
            );


            alert(
                "❌ রিকুয়েস্ট পাঠানো যায়নি।\n\n" +
                (
                    error.message ||
                    "Firebase Database Rules পরীক্ষা করুন।"
                )
            );

        }


        finally {

            // ==================================
            // RESTORE BUTTON
            // ==================================

            if (currentUser) {

                submitButton.disabled =
                    false;

                submitButton.innerText =
                    "🩸 রিকুয়েস্ট পাঠান";

            }

        }

    }
);
