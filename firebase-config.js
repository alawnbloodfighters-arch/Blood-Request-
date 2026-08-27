// ==========================================
// AL-AWN BLOOD FIGHTERS
// FIREBASE CONFIG
// ==========================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// ==========================================
// FIREBASE CONFIG
// ==========================================

const firebaseConfig = {

    apiKey:
        "AIzaSyAR3uyMlvGNWZaG_w1zs6IKQ2lXB_Y_9M0",

    authDomain:
        "al-awn-blood-fighters.firebaseapp.com",

    projectId:
        "al-awn-blood-fighters",

    storageBucket:
        "al-awn-blood-fighters.firebasestorage.app",

    messagingSenderId:
        "299061496611",

    appId:
        "1:299061496611:web:4762f74dbf311cd57f1a96",

    measurementId:
        "G-D31EXKJWQ3",

    // ======================================
    // REALTIME DATABASE
    // ======================================

    databaseURL:
        "https://al-awn-blood-fighters-default-rtdb.firebaseio.com/"

};


// ==========================================
// INITIALIZE
// ==========================================

const app =
    initializeApp(firebaseConfig);


const auth =
    getAuth(app);


const db =
    getDatabase(app);


// ==========================================
// EXPORT
// ==========================================

export {
    app,
    auth,
    db
};
