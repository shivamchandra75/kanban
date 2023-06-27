import React, { useState } from "react";
import ironman from "../images/ironman.jpg";
import hulk from "../images/hulk.jpg";
import batman from "../images/batman.jpg";
import PopUp from "./popUp";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { removeCardLocally } from "./redux/cardActions";

const Card = ({ cardID, index, cardDetail, listID, list }) => {
  const disptach = useDispatch();
  const [isPopupOpen, setPopup] = useState(false);
  const character =
    cardDetail.assignee === "ironman" || cardDetail.assignee === "Ironman"
      ? ironman
      : cardDetail.assignee === "batman" || cardDetail.assignee === "Batman"
      ? batman
      : cardDetail.assignee === "hulk" || cardDetail.assignee === "Hulk"
      ? hulk
      : ironman;

  const priorityColor =
    cardDetail.priority === "high"
      ? "bg-red-500"
      : cardDetail.priority === "medium"
      ? "bg-orange-500"
      : cardDetail.priority === "low"
      ? "bg-green-500"
      : "bg-red-500";

  const priorityIcon =
    cardDetail.priority === "high"
      ? "fa-fire-flame-curved"
      : cardDetail.priority === "medium"
      ? "fa-fan"
      : cardDetail.priority === "low"
      ? "fa-flower-daffodil"
      : "fa-fire-flame-curved";

  return (
    <>
      <Draggable
        draggableId={String(cardID)}
        index={index}
        listTitle={list.title}
      >
        {(provided) => (
          <div
            className=" mb-6 relative rounded-xl shadow-[0_2px_10px_2px_rgba(0,0,0,0.1)]"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="bg-white rounded-lg cursor-pointer overflow-hidden">
              {/* img */}

              <div
                onClick={() => {
                  setPopup(!isPopupOpen);
                }}
                className={`${
                  cardDetail.imageURL && cardDetail.imageURL !== "Add imageURL"
                    ? "p-4 max-h-[200px] max-w-[300px] flex m-auto "
                    : "hidden"
                }`}
              >
                <img
                  className="cover h-full w-full"
                  src={`${cardDetail.imageURL}`}
                  alt=""
                />
              </div>
              {/* heading */}
              <div className="flex items-center">
                <h1
                  onClick={() => {
                    setPopup(!isPopupOpen);
                  }}
                  className="font-medium p-4 pb-2 basis-[90%] "
                >
                  {cardDetail.heading.charAt(0).toUpperCase() +
                    cardDetail.heading.slice(1)}
                </h1>
                <i
                  id={listID}
                  cardid={cardID}
                  onClick={(e) => disptach(removeCardLocally(e))}
                  className="fa-solid fa-trash basis-[10%]"
                ></i>
              </div>

              <div
                onClick={() => {
                  setPopup(!isPopupOpen);
                }}
                className="px-4 pb-4"
              >
                {/* description */}
                <p className="pb-4 text-[15px] overflow-hidden">
                  {cardDetail.description.charAt(0).toUpperCase() +
                    cardDetail.description.slice(1, 60)}
                  {cardDetail.description.length > 60 ? "..." : ""}
                </p>
                {/* photo */}
                <div className="pb-4">
                  <div className="flex items-center gap-4">
                    <img
                      className="w-[30px] h-[30px] flex rounded-full overflow-hidden"
                      src={character}
                      alt={cardDetail.assignee}
                    />
                    <p>
                      {cardDetail.assignee === "choose 1: batman, ironman, hulk"
                        ? "Add assignee"
                        : cardDetail.assignee.charAt(0).toUpperCase() +
                          cardDetail.assignee.slice(1)}
                    </p>
                  </div>
                </div>
                {/* tags */}
                <span className="text-white text-sm  mr-4 bg-orange-400 py-1 px-2 rounded-md ">
                  <i className="fa-regular fa-clock pr-2"></i>
                  {cardDetail.deadline === "enter deadline (month date)"
                    ? "deadline"
                    : cardDetail.deadline.slice(0, 3).charAt(0).toUpperCase() +
                      cardDetail.deadline.slice(0, 3).slice(1) +
                      " " +
                      cardDetail.deadline.split(" ")[1]}
                </span>
                <span
                  className={`text-white text-sm  mr-2 py-1 px-2 rounded-md ${priorityColor}`}
                >
                  <i className={`fa-solid ${priorityIcon} pr-2`}></i>
                  {cardDetail.priority.charAt(0).toUpperCase() +
                    cardDetail.priority.slice(1)}
                </span>
              </div>
            </div>

            {/* popup */}
            <PopUp
              listid={listID}
              cardid={cardID}
              isPopupOpen={isPopupOpen}
              setPopup={setPopup}
              cardDetail={cardDetail}
            />
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Card;
