import "firebase/database";
import {
  getDatabase,
  ref,
  set,
  get,
  push,
  remove,
  onValue,
  update,
} from "firebase/database";
import { useCallback, useEffect, useState, useRef } from "react";
// import app from './components/FirebaseApp';
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPLs7BVF3aTb7ccnhIJwSgHWw1etduwQw",
  authDomain: "flashswarm-7563b.firebaseapp.com",
  databaseURL: "https://flashswarm-7563b-default-rtdb.firebaseio.com",
  projectId: "flashswarm-7563b",
  storageBucket: "flashswarm-7563b.appspot.com",
  messagingSenderId: "62969168098",
  appId: "1:62969168098:web:7715fc4bec1a41b4109ebb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create a reference to the database
const db = getDatabase(app);

async function createSwarm(teamName, swarmData) {
  // Reference to the location where you want to save the data
  const swarmRef = ref(db, `swarms/${teamName}`);

  try {
    let swarmID = await push(swarmRef, swarmData);
    let key = swarmID.key;

    await update(ref(db, `swarms/${teamName}/${key}`), {
      id: key, // Assuming you want to save the key as an `id` field inside the pushed object
    });

    console.log("Data saved successfully!");
    return key;
  } catch (error) {
    console.error("The write failed...", error);
    return null;
  }
}

function useDbData(teamName) {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const swarmRef = ref(db, `swarms/${teamName}`);
  useEffect(
    () =>
      onValue(
        swarmRef,
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        },
      ),
    [teamName],
  );
  return [data, error];
}

async function addToSwarm(teamName, swarmId, username) {
  const usernamesRef = ref(db, `swarms/${teamName}/${swarmId}/usernames`);

  try {
    // Get the current list of usernames
    const snapshot = await get(usernamesRef);
    const usernames = snapshot.val();

    // Check if username already exists
    if (usernames && Object.keys(usernames).includes(username)) {
      console.error("Username already exists in the swarm.");
      return;
    }

    // Push the new username if it doesn't exist
    // const newUserRef = await push(usernamesRef);
    // await set(newUserRef, username);
    await set(ref(db, `swarms/${teamName}/${swarmId}/usernames/${username}`), {
      username,
    });

    console.log("Username added successfully!");
  } catch (error) {
    console.error("Failed to add username to swarm:", error);
  }
}

async function removeFromSwarm(teamName, swarmId, username) {
  const usernamesRef = ref(db, `swarms/${teamName}/${swarmId}/usernames`);
  
  try {
    const snapshot = await get(usernamesRef);
    const usernames = snapshot.val();
    // Check if username exists
    if (usernames && Object.keys(usernames).includes(username)) {
      await remove(ref(db, `swarms/${teamName}/${swarmId}/usernames/${username}`));
      console.log("Username removed successfully!");
    }
  } catch (error) {
    console.error("The removal failed...", error);
  }
}

export { createSwarm, useDbData, addToSwarm, removeFromSwarm };