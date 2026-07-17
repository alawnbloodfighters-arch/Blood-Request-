const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxRU2xbkSfNKqfx5125ONsf-nR6RhCs0VGlXjwf50xjKb7h4gh6e_MRQx0bcl5u7KTbkg/exec";

document.addEventListener("DOMContentLoaded", () => {

const day = document.getElementById("day");
const year = document.getElementById("year");
const district = document.getElementById("district");
const upazila = document.getElementById("upazila");
const form = document.getElementById("memberForm");

// দিন
for(let i=1;i<=31;i++){
const option=document.createElement("option");
option.value=i;
option.textContent=i;
day.appendChild(option);
}

// বছর
for(let i=1980;i<=2030;i++){
const option=document.createElement("option");
option.value=i;
option.textContent=i;
year.appendChild(option);
}

// উপজেলা তালিকা
const upazilas = {

"ফেনী":[
"ফেনী সদর",
"ছাগলনাইয়া",
"দাগনভূঞা",
"পরশুরাম",
"ফুলগাজী",
"সোনাগাজী"
],

"কুমিল্লা":[
"চৌদ্দগ্রাম",
"নাঙ্গলকোট",
"বরুড়া",
"ব্রাহ্মণপাড়া",
"বুড়িচং",
"চান্দিনা",
"আদর্শ সদর",
"দাউদকান্দি",
"দেবিদ্বার",
"হোমনা",
"কুমিল্লা সদর",
"লাকসাম",
"লালমাই",
"মনোহরগঞ্জ",
"মেঘনা",
"মুরাদনগর",
"সদর দক্ষিণ",
"তিতাস"
],

"নোয়াখালী":[
"সুধারাম",
"বেগমগঞ্জ",
"চাটখিল",
"কোম্পানীগঞ্জ",
"হাতিয়া",
"কবিরহাট",
"সেনবাগ",
"সোনাইমুড়ী",
"সুবর্ণচর"
],

"চট্টগ্রাম":[
"আনোয়ারা",
"বাঁশখালী",
"বোয়ালখালী",
"চন্দনাইশ",
"ফটিকছড়ি",
"হাটহাজারী",
"লোহাগাড়া",
"মিরসরাই",
"পটিয়া",
"রাঙ্গুনিয়া",
"রাউজান",
"সন্দ্বীপ",
"সাতকানিয়া",
"সীতাকুণ্ড",
"চট্টগ্রাম সদর",
"কর্ণফুলী"
],

"ঢাকা":[
"আদাবর",
"বাড্ডা",
"বিমানবন্দর",
"ক্যান্টনমেন্ট",
"চকবাজার",
"দারুস সালাম",
"ডেমরা",
"ধানমন্ডি",
"গেন্ডারিয়া",
"গুলশান",
"হাজারীবাগ",
"যাত্রাবাড়ী",
"কদমতলী",
"কাফরুল",
"কামরাঙ্গীরচর",
"খিলগাঁও",
"খিলক্ষেত",
"কোতোয়ালি",
"লালবাগ",
"মিরপুর",
"মোহাম্মদপুর",
"মতিঝিল",
"নিউমার্কেট",
"পল্লবী",
"পল্টন",
"রমনা",
"রামপুরা",
"সবুজবাগ",
"শাহ আলী",
"শাহবাগ",
"শ্যামপুর",
"শেরেবাংলা নগর",
"সূত্রাপুর",
"তেজগাঁও",
"তেজগাঁও শিল্পাঞ্চল",
"তুরাগ",
"উত্তরা পূর্ব",
"উত্তরা পশ্চিম",
"উত্তরখান",
"দক্ষিণখান",
"ভাটারা",
"ওয়ারী"
]

};

district.addEventListener("change",()=>{

upazila.innerHTML='<option value="">উপজেলা নির্বাচন করুন</option>';

if(upazilas[district.value]){

upazilas[district.value].forEach(item=>{

const option=document.createElement("option");
option.value=item;
option.textContent=item;

upazila.appendChild(option);

});

}

});
  // ফর্ম সাবমিট
form.addEventListener("submit", async function(e){

e.preventDefault();

const mobile=document.getElementById("mobile").value.trim();

if(!/^01\d{9}$/.test(mobile)){
alert("সঠিক ১১ সংখ্যার মোবাইল নম্বর লিখুন");
return;
}

const data={

name:document.getElementById("name").value.trim(),

gender:document.getElementById("gender").value,

dob:
document.getElementById("day").value+" "+
document.getElementById("month").value+" "+
document.getElementById("year").value,

bloodGroup:document.getElementById("bloodGroup").value,

weight:document.getElementById("weight").value,

lastDonate:document.getElementById("lastDonate").value,

district:district.value,

upazila:upazila.value,

mobile:mobile

};

try{

const response=await fetch(SCRIPT_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

const result=await response.json();

if(result.success){

  alert("✅ সদস্য নিবন্ধন সফল হয়েছে");

form.reset();

upazila.innerHTML='<option value="">উপজেলা নির্বাচন করুন</option>';

}else{

alert("❌ "+result.error);

}

}catch(error){

console.error(error);

alert("❌ সার্ভারের সাথে সংযোগ করা যায়নি");

}

});

});
