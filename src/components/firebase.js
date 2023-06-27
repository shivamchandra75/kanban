// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import data from "./data";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "kanban-app-fe757.firebaseapp.com",
  projectId: "kanban-app-fe757",
  storageBucket: "kanban-app-fe757.appspot.com",
  messagingSenderId: "911253918500",
  appId: "1:911253918500:web:db57c0772e0e99f46599b1",
  measurementId: "G-S07Z6Z167Q",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// get database
export const db = getFirestore();

const mainListsRef = collection(db, "main lists");

export const saveInFirebase = (boardArray) => {
  boardArray.shift();
  boardArray.unshift(data);
  const p1 = getDocs(mainListsRef).then((snapshot) => {
    const documents = snapshot.docs.map((board) => board.id);
    documents.forEach((boardId) => {
      const boardRef = doc(db, "main lists", boardId);
      deleteDoc(boardRef);
    });
    boardArray.forEach((board, index) => {
      addDoc(mainListsRef, {
        ...board,
      });
    });
  });

  var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 1000, "one");
  });
  Promise.race([p1, p2]).then((value) => {
    var ifConnected = window.navigator.onLine;

    if (value === "one") {
      const spinner = document.querySelector(".spinner");
      const saveFailed = document.querySelector(".saveFailed");
      spinner.classList.add("hidden");
      saveFailed.classList.remove("hidden");
      return;
    }
    if (ifConnected) {
      const spinner = document.querySelector(".spinner");
      const saved = document.querySelector(".saved");
      spinner.classList.add("hidden");
      saved.classList.remove("hidden");
    } else {
      const spinner = document.querySelector(".spinner");
      const saveFailed = document.querySelector(".saveFailed");
      spinner.classList.add("hidden");
      saveFailed.classList.remove("hidden");
      return;
    }
  });
};

// update firebase state
// export const updateFirebaseDocument = (state, boardId) => {
//   getDocs(mainListsRef).then((snapshot) => {
//     const document = snapshot.docs.find((doc) => doc.data().id === boardId);
//     const docRef = doc(db, "main lists", document.id);
//     getDoc(docRef).then((doc) => {
//       updateDoc(docRef, {
//         ...doc.data(),
//         ...state[boardId],
//       });
//     });
//   });
// };

// // add board in firebase
// export const addBoardFirebase = (index) => {
//   addDoc(mainListsRef, {
//     title: "new board",
//     id: index,
//     listCollection: [],
//   });
// };

// // remove board in firebase
// export const removeBoardFirebase = (id) => {
//   getDocs(mainListsRef).then((snapshot) => {
//     // const document = snapshot.docs.find((doc) => doc.data().id === id);
//     const targetBoardId = snapshot.docs.find(
//       (boardRef) => boardRef.data().id === id
//     ).id;
//     const docRef = doc(db, "main lists", targetBoardId);

//     deleteDoc(docRef).then((res) => orderingBoardIdFirebase());
//   });
// };

// // ordering board id in firebase
// export const orderingBoardIdFirebase = () => {
//   getDocs(mainListsRef).then((snapshot) => {
//     snapshot.docs.forEach((board, index) => {
//       const boardId = board.id;
//       const docRef = doc(db, "main lists", boardId);
//       updateDoc(docRef, {
//         ...board.data(),
//         id: index,
//       });
//     });
//   });
// };

// export const updateBoardTitleFirebase = (boardId, boardTitle) => {
//   getDocs(mainListsRef).then((snapshot) => {
//     const document = snapshot.docs.find((board) => board.data().id === boardId);
//     console.log(document.data());
//     const docRef = doc(db, "main lists", document.id);
//     updateDoc(docRef, {
//       ...document.data(),
//       title: boardTitle,
//     });
//   });
// };
////////////////////////////////////////////////////
