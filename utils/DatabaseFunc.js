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

function getSwarms(teamName) {
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
    if (usernames && Object.values(usernames).includes(username)) {
      console.error("Username already exists in the swarm.");
      return; 
    }

    // Push the new username if it doesn't exist
    const newUserRef = await push(usernamesRef);
    await set(newUserRef, username);

    console.log("Username added successfully!");
  } catch (error) {
    console.error("Failed to add username to swarm:", error);
  }
}

export { createSwarm, getSwarms, addToSwarm };

// async function setupUserPresence(course, userId, groupId) {
//   const user = ref(db, `users/${userId}`);
//   const userRef = ref(db, `users/${userId}/status`);

//   set(userRef, {
//     online: true,
//     lastOnline: serverTimestamp()
//   });

//   onDisconnect(userRef).set({
//     online: false,
//     lastOnline: serverTimestamp()
//   });
// }

// async function addToGroup(course, groupId, displayName, uid) {
//   try {
//     let newEntryRef = await set(
//       ref(db, `${course}/groups/` + groupId + "/names/" + uid),
//       {
//         name: displayName,
//         uid: uid,
//       },
//     );
//     console.log("Data updated successfully!");
//   } catch (error) {
//     console.error("The update failed...", error);
//     return null;
//   }
// }
//
// async function removeFromGroup(course, uniqueId, groupId) {
//   try {
//     let nameRef = ref(db, `${course}/groups/` + groupId + "/names/" + uniqueId);
//     let groupRef = ref(db, `${course}/groups/` + groupId);
//     console.log(`${course}/groups/` + groupId + "/names/" + uniqueId);
//     await remove(nameRef);
//     console.log("Data removed successfully!");
//
//     // Check if the group is empty, remove the group if it is
//     const snapshot = await get(groupRef);
//
//     console.log();
//
//     // Group is empty when the name field is empty or doesn't exist
//     if (
//       !snapshot.exists() ||
//       !snapshot.val().names ||
//       Object.keys(snapshot.val().names).length === 0
//     ) {
//       await removeGroup(course, groupId);
//     }
//   } catch (error) {
//     console.error("The removal failed...", error);
//   }
// }
//
// async function removeGroup(course, id) {
//   try {
//     let groupRef = ref(db, `${course}/groups/` + id);
//     console.log(`${course}/groups/` + id);
//     await remove(groupRef);
//     console.log("Group removed successfully!");
//   } catch (error) {
//     console.error("The removal failed...", error);
//   }
// }
//
// async function setGroupHelping(course, groupId, user) {
//   let groupRef = ref(db, `${course}/groups/` + groupId);
//
//   try {
//     await update(groupRef, {
//       currentlyHelping: true,
//       helper: {name: user.displayName, uid: user.uid},
//     });
//     console.log("Data updated successfully!");
//   } catch (error) {
//     console.error("The update failed...", error);
//   }
// }
//
// const useDbData = (course) => {
//   const [data, setData] = useState();
//   const [error, setError] = useState(null);
//   const groupsRef = ref(db, `${course}/groups/`);
//
//   useEffect(
//     () =>
//       onValue(
//         groupsRef,
//         (snapshot) => {
//           setData(snapshot.val());
//         },
//         (error) => {
//           setError(error);
//         },
//       ),
//     [course],
//   );
//
//   return [data, error];
// };
//
// const signInWithGoogle = () => {
//   signInWithPopup(getAuth(app), new GoogleAuthProvider());
// };
//
// const firebaseSignOut = () => signOut(getAuth(app));
//
// // export { firebaseSignOut as signOut };
//
// const useAuthState = () => {
//   const [user, setUser] = useState();
//
//   useEffect(() => onAuthStateChanged(getAuth(app), setUser), []);
//
//   return [user];
// };
//
// export {
//   createNewGroup,
//   addToGroup,
//   removeFromGroup,
//   useDbData,
//   setGroupHelping,
//   removeGroup,
//   signInWithGoogle,
//   firebaseSignOut,
//   useAuthState,
// };