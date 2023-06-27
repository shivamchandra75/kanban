import { CONSTANTS } from "./CONSTANTS";
import { db } from "../firebase";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  serverTimestamp,
  query,
} from "firebase/firestore";

export const addCardLocally = (e) => ({
  type: CONSTANTS.ADD_CARD_LOCALLY,
  payload: e.target,
});

export const removeCardLocally = (e) => ({
  type: CONSTANTS.REMOVE_CARD_LOCALLY,
  payload: e.target,
});

export const updateCardLocally = (e, cardDetails) => ({
  type: CONSTANTS.UPDATE_CARD_LOCALLY,
  payload: { e, cardDetails },
});

export const updateListHeading = (e, listHeading) => ({
  type: CONSTANTS.UPDATE_LIST_HEADING,
  payload: { e, listHeading },
});

export const handleDragDrop = (
  listSourceId,
  listDestinationId,
  cardSourceIndex,
  cardDestinationIndex,
  cardId
) => ({
  type: CONSTANTS.HANDLE_DRAG_DROP,
  payload: {
    listSourceId,
    listDestinationId,
    cardSourceIndex,
    cardDestinationIndex,
    cardId,
  },
});
