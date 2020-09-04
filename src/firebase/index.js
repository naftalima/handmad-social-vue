import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDo__HnpDrwhk9ijjJGV-HXHeuAU91VwRI",
    authDomain: "handmade-492fa.firebaseapp.com",
    databaseURL: "https://handmade-492fa.firebaseio.com",
    projectId: "handmade-492fa",
    storageBucket: "handmade-492fa.appspot.com",
    messagingSenderId: "279991163862",
    appId: "1:279991163862:web:41df6c39a376608618e277"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const FieldValue = firebase.firestore.FieldValue
export const storage = firebase.storage();

export default function setFirebase(Vue) {
    Object.defineProperty(Vue.prototype, '$firebase', {
        get() {
            return firebaseApp
        }
    })
}
