import { CONSTANTS } from "../CONSTANTS";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export const getMainList = () => {
  return (dispatch) => {
    const mainListsRef = collection(db, "main lists");
    const q = query(mainListsRef, orderBy("id", "asc"));

    getDocs(q).then((snapshot) => {
      const allLists = snapshot.docs.map((doc) => doc.data());
      // const allDocument = snapshot.docs.map((doc) => doc);
      // console.log(allLists);
      dispatch({ type: CONSTANTS.GET_MAIN_LIST, payload: allLists });
    });
  };
};

export const setBoardId = (id) => ({
  type: CONSTANTS.SET_BOARD_ID,
  payload: id,
});

export const addBoard = (id) => ({
  type: CONSTANTS.ADD_BOARD,
  payload: id,
});

export const removeBoard = (id) => ({
  type: CONSTANTS.REMOVE_BOARD,
  payload: id,
});

export const updateBoardTitle = (e, title) => ({
  type: CONSTANTS.UPDATE_BOARD_TITLE,
  payload: { e, title },
});

export const saveInFirebase = (payload) => ({
  type: CONSTANTS.SAVE_IN_FIREBASE,
  payload,
});
