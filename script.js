// ========================================
// BLOOD REQUEST FORM
// ========================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwL2I-lWCL1TeYrBE6e5dM_UGKMNdcnCYpXaAbOExvcbEIKHdcCZcRLNwW-FeXwKszY/exec";


// ========================================
// FORM
// ========================================

const form =
document.getElementById("bloodRequestForm");


// ========================================
// FORM SUBMIT
// ========================================

form.addEventListener("submit", async function(e) {

  e.preventDefault();


  // ======================================
  // Mobile number
  // ======================================

  const mobile =
  document.getElementById("mobile")
  .value
  .trim();


  // Mobile validation

  if (!/^01\d{9}$/.test(mobile)) {

    alert("সঠিক ১১ সংখ্যার মোবাইল নম্বর লিখুন");

    return;

  }


  // ======================================
  // Time
  // ======================================

  const timePeriod =
  document.getElementById("timePeriod")
  .value;


  const timeValue =
  document.getElementById("timeValue")
  .value;


  // Time validation

  if (!timePeriod || !timeValue) {

    alert("রক্তদানের সময় নির্বাচন করুন");

    return;

  }


  // সম্পূর্ণ সময়

  const time =
  timePeriod + " " + timeValue;


  // ======================================
  // Form data
  // ======================================

  const data = {

    problem:
    document.getElementById("problem")
    .value
    .trim(),


    bloodGroup:
    document.getElementById("bloodGroup")
    .value,


    hemoglobin:
    document.getElementById("hemoglobin")
    .value,


    date:
    document.getElementById("date")
    .value,


    time:
    time,


    hospital:
    document.getElementById("hospital")
    .value
    .trim(),


    mobile:
    mobile,


    note:
    document.getElementById("note")
    .value
    .trim()

  };


  // ======================================
  // Submit
  // ======================================

  try {


    const params =
    new URLSearchParams();


    params.append(
      "problem",
      data.problem
    );


    params.append(
      "bloodGroup",
      data.bloodGroup
    );


    params.append(
      "hemoglobin",
      data.hemoglobin
    );


    params.append(
      "date",
      data.date
    );


    params.append(
      "time",
      data.time
    );


    params.append(
      "hospital",
      data.hospital
    );


    params.append(
      "mobile",
      data.mobile
    );


    params.append(
      "note",
      data.note
    );


    // ====================================
    // Send to Google Apps Script
    // ====================================

    const response =
    await fetch(
      SCRIPT_URL,
      {
        method: "POST",

        body: params
      }
    );


    // ====================================
    // Response
    // ====================================

    const result =
    await response.json();


    if (result.success) {


      alert(
        "✅ ব্লাড রিকুয়েস্ট সফলভাবে পাঠানো হয়েছে"
      );


      // Form reset

      form.reset();


    } else {


      alert(
        "❌ " +
        (
          result.error ||
          "রিকুয়েস্ট পাঠানো যায়নি"
        )
      );

    }


  } catch (error) {


    console.error(
      "Blood Request Error:",
      error
    );


    alert(
      "❌ সার্ভারের সাথে সংযোগ করা যায়নি"
    );

  }

});
