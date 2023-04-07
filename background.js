import { initializeApp } from "./firebase/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, addDoc } from "./firebase/firebase-firestore.js";
import { getFunctions, httpsCallable } from "./firebase/firebase-functions.js";
//add imports from any firebase libraries you may need: 
// https://firebase.google.com/docs/web/learn-more#libraries-cdn

 const firebaseConfig = {
  apiKey: "[ENTER-YOUR-KEYS]",
  authDomain: "[ENTER-YOUR-KEYS]",
  projectId: "[ENTER-YOUR-KEYS]",
  storageBucket: "[ENTER-YOUR-KEYS]",
  messagingSenderId: "[ENTER-YOUR-KEYS]",
  appId: "[ENTER-YOUR-KEYS]"
  //...
};
 

console.log("Service worker running. ");


const firebase_app = initializeApp(firebaseConfig);
const db = getFirestore(firebase_app);
const functions = getFunctions(firebase_app);


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchData') {
      fetchData()
        .then(data => sendResponse({ data }))
        .catch(error => sendResponse({ error: error.message }));
      return true; // Required to use sendResponse asynchronously
    } else if (request.action === 'saveData') { //change accordingly 
      addData(request.data)
        .then(docRef => sendResponse({ id: docRef.id }))
        .catch(error => sendResponse({ error: error.message }));
      return true; // Required to use sendResponse asynchronously
    }else if (request.action === 'sendEmail') { //sample listener action using firebse functions  
      const { userEmail, userMessage } = request;
      sendEmail(userEmail, userMessage)
        .then(() => sendResponse({ success: true }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true; // Required to use sendResponse asynchronously
    }
  });
  
  // Add new data to Firestore
  const addData = async (data) => {
    try {
      const docRef = await addDoc(collection(db, '[COLLECTION-NAME]'), data);
      return docRef;
    } catch (error) {
      console.error('Error adding data:', error);
      throw error;
    }
  };

  // Fetch data from Firestore
  const fetchData = async () => {
    try {
        const q = query(collection(db, "message"));
        const querySnapshot = await getDocs(q);
      const messages = querySnapshot.docs.map(doc => doc.data());
      return { messages };
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  };


  //sample email function using cloud functions for firebase
  async function sendEmail(userEmail, userMessage) {
    // Replace 'your_cloud_function_url' with the actual URL of your deployed cloud function
    const cloudFunctionURL = 'your_cloud_function_url';
    try {
      const response = await fetch(cloudFunctionURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, userMessage }),
      });
      const result = await response.json();
      console.log('Email sent:', result);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  