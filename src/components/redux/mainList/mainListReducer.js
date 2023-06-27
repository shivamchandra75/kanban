import { CONSTANTS } from "../CONSTANTS";
import uniqid from "uniqid";
import { saveInFirebase } from "../../firebase";

let initialState = [];

const newCard = () => ({
  heading: "Add card heading",
  description: "Add card description ",
  assignee: "choose 1: batman, ironman, hulk",
  priority: "high",
  deadline: "enter deadline (month date)",
  month: new Date().toLocaleString("en-us", { month: "short" }),
  date: new Date().getDate(),
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
  id: uniqid(),
});

const newList = () => ({
  heading: "new list",
  id: uniqid(),
  cards: [newCard()],
});
// initial board id
let boardIndex = 0;
const mainListReducer = (state = initialState, action) => {
  const getTargetList = (targetListId, state) => {
    return state[boardIndex].listCollection.find(
      (list) => list.id === targetListId
    );
  };
  switch (action.type) {
    case CONSTANTS.SET_BOARD_ID: {
      boardIndex = action.payload;
      return state;
    }
    //////////////////////////////////////////////////////////////////////////////
    case CONSTANTS.GET_MAIN_LIST: {
      state = action.payload;
      return state;
    }
    //////////////////////////////////////////////////////////////////////////////
    case CONSTANTS.ADD_CARD_LOCALLY: {
      const targetListId = action.payload.id;
      const targetList = getTargetList(targetListId, state);
      targetList.cards.push(newCard());

      /*
      if we add or remove properties from an object the object refrence in memory will not change, hence the state will update but the component will not re render.
      useSelector will only re render component if the object refrence changes.
      */
      // creating a deep copy
      const newState = JSON.parse(JSON.stringify(state));
      return newState;
    }
    //////////////////////////////////////////////////////////////////////////////
    case CONSTANTS.REMOVE_CARD_LOCALLY: {
      const targetListId = action.payload.id;
      const targetList = getTargetList(targetListId, state);
      const targetCardId = action.payload.getAttribute("cardid");
      const targetCardIndex = targetList.cards.findIndex(
        (card) => card.id === targetCardId
      );
      targetList.cards.splice(targetCardIndex, 1);
      // creating a deep copy
      const newState = JSON.parse(JSON.stringify(state));
      return newState;
    }
    //////////////////////////////////////////////////////////////////////////////
    case CONSTANTS.UPDATE_CARD_LOCALLY: {
      const targetListId = action.payload.e.target.id;
      const targetList = getTargetList(targetListId, state);
      const targetCardId = action.payload.e.target.getAttribute("cardid");
      const targetCard = targetList.cards.find(
        (card) => card.id === targetCardId
      );
      const targetCardIndex = targetList.cards.findIndex(
        (card) => card.id === targetCardId
      );
      targetList.cards.splice(targetCardIndex, 1);
      targetList.cards.splice(targetCardIndex, 0, {
        ...action.payload.cardDetails,
      });
      // creating a deep copy
      const newState = JSON.parse(JSON.stringify(state));
      return newState;
    }
    //////////////////////////////////////////////////////////////////////////////
    case CONSTANTS.UPDATE_LIST_HEADING: {
      const targetListId = action.payload.e.target.id;
      const targetList = getTargetList(targetListId, state);
      targetList.heading = action.payload.listHeading;
      const newState = JSON.parse(JSON.stringify(state));
      return newState;
    }
    //////////////////////////////////////////////////////////////////////////////
    case CONSTANTS.ADD_LIST_LOCALLY: {
      state[boardIndex].listCollection.push(newList());
      const newState = JSON.parse(JSON.stringify(state));
      return newState;
    }
    //////////////////////////////////////////////////////////////////////////////
    case CONSTANTS.REMOVE_LIST_LOCALLY: {
      const listCollection = state[boardIndex].listCollection;
      const targetListId = action.payload.id;
      const targetListIndex = listCollection.findIndex(
        (list) => list.id === targetListId
      );
      listCollection.splice(targetListIndex, 1);
      const newState = JSON.parse(JSON.stringify(state));
      return newState;
    }
    //////////////////////////////////////////////////////////////////////////////
    case CONSTANTS.HANDLE_DRAG_DROP:
      {
        const {
          listSourceId,
          listDestinationId,
          cardSourceIndex,
          cardDestinationIndex,
          cardId,
        } = action.payload;
        if (listDestinationId === listSourceId) {
          const targetList = getTargetList(listSourceId, state);
          const cards = targetList.cards;
          // remove card
          const targetCard = cards.splice(cardSourceIndex, 1);
          // add card
          cards.splice(cardDestinationIndex, 0, ...targetCard);
          const newState = JSON.parse(JSON.stringify(state));
          return newState;
        }
        if (listDestinationId !== listSourceId) {
          const sourceList = getTargetList(listSourceId, state);
          const destinationList = getTargetList(listDestinationId, state);
          const sourceListCards = sourceList.cards;
          const destinationListCards = destinationList.cards;

          // remove card
          const targetCard = sourceListCards.splice(cardSourceIndex, 1);
          // add card
          destinationListCards.splice(cardDestinationIndex, 0, ...targetCard);

          const newState = JSON.parse(JSON.stringify(state));
          return newState;
        }
      }
      break;
    //////////////////////////////////////////////////////////////////////////////
    case CONSTANTS.ADD_BOARD: {
      const id = action.payload;
      state.push({
        id: id,
        title: "New Board",
        listCollection: [],
      });
      const newState = JSON.parse(JSON.stringify(state));
      return newState;
    }

    case CONSTANTS.REMOVE_BOARD: {
      const id = action.payload;
      state.splice(id, 1);
      // ordering board id
      state.forEach((board, index) => {
        board.id = index;
      });
      const newState = JSON.parse(JSON.stringify(state));
      return newState;
    }
    //////////////////////////////////////////////////////////////////////////////
    case CONSTANTS.UPDATE_BOARD_TITLE: {
      const boardId = +action.payload.e.target.id;
      const boardTitle = action.payload.title;
      state[boardId].title = boardTitle;
      const newState = JSON.parse(JSON.stringify(state));
      return newState;
    }
    case CONSTANTS.SAVE_IN_FIREBASE: {
      saveInFirebase(state);
      return state;
    }
    default:
      return state;
  }
};

export default mainListReducer;
