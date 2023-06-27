import React, { useRef } from "react";
import ironman from "../images/ironman.jpg";
import hulk from "../images/hulk.jpg";
import batman from "../images/batman.jpg";
import { updateCardLocally } from "./redux/cardActions";
import { useDispatch } from "react-redux";
const PopUp = ({ isPopupOpen, setPopup, listid, cardid, cardDetail }) => {
  const dispatch = useDispatch();

  const heading = useRef(null);
  const description = useRef(null);
  const imageURL = useRef(null);
  const assignee = useRef(null);
  const status = useRef(null);
  const priority = useRef(null);
  const deadline = useRef(null);

  const character =
    cardDetail.assignee === "ironman" || cardDetail.assignee === "Ironman"
      ? ironman
      : cardDetail.assignee === "batman" || cardDetail.assignee === "Batman"
      ? batman
      : cardDetail.assignee === "hulk" || cardDetail.assignee === "Hulk"
      ? hulk
      : ironman;

  const priorityIcon =
    cardDetail.priority === "high"
      ? "fa-fire-flame-curved"
      : cardDetail.priority === "medium"
      ? "fa-fan"
      : cardDetail.priority === "low"
      ? "fa-flower-daffodil"
      : "fa-fire-flame-curved";

  const priorityColor =
    cardDetail.priority === "high"
      ? "bg-red-500"
      : cardDetail.priority === "medium"
      ? "bg-orange-500"
      : cardDetail.priority === "low"
      ? "bg-green-500"
      : "bg-red-500";

  const updatedValues = (e) => {
    const cardDetails = {
      heading: heading.current.innerText,
      description: description.current.innerText,
      imageURL: imageURL.current.innerText,
      assignee: assignee.current.innerText,
      status: status.current.innerText,
      deadline: deadline.current.innerText,
      priority: priority.current.innerText,
      id: cardid,
      month: new Date().toLocaleString("en-us", { month: "short" }),
      date: new Date().getDate(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    };
    dispatch(updateCardLocally(e, cardDetails));
  };
  return (
    <div
      className={`${
        isPopupOpen ? "visible" : "invisible opacity-0"
      }  cursor-auto `}
    >
      <div
        id={listid}
        cardid={cardid}
        onClick={(e) => {
          setPopup(!isPopupOpen);
          updatedValues(e);
        }}
        className="fixed z-20 top-0 left-0 bg-black opacity-30 h-screen w-screen"
      ></div>
      <div className="fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-4xl w-[80%] rounded-[2.5rem] bg-white ">
        <div className="p-16 flex flex-col gap-4 ">
          {/* heading */}
          <div className="flex gap-2 items-center mb-4">
            <i className="fa-solid fa-heading text-gray-400"></i>
            <h1 className="text-xl py-0.5 px-2 w-[150px] transition-all duration-100 hover:bg-slate-200 font-medium">
              Heading
            </h1>
            <h1
              suppressContentEditableWarning
              contentEditable="true"
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  e.target.blur();
                }
              }}
              ref={heading}
              className="text-lg py-0.5 px-2 flex-1 transition-all  duration-100 hover:bg-slate-200"
            >
              {cardDetail.heading ? cardDetail.heading : "Add card heading"}
            </h1>
          </div>
          {/* description */}
          <div className="flex gap-2 items-center mb-4">
            <i className="fa-solid fa-pen text-gray-400"></i>
            <h1 className="text-xl py-0.5 px-2 w-[150px] transition-all duration-100 hover:bg-slate-200 font-medium">
              Description
            </h1>
            <h1
              suppressContentEditableWarning
              contentEditable="true"
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  e.target.blur();
                }
              }}
              ref={description}
              className="text-lg py-0.5 px-2 flex-1 transition-all max-h-32 overflow-y-scroll duration-100 hover:bg-slate-200"
            >
              {cardDetail.description
                ? cardDetail.description
                : "Add card description"}
            </h1>
          </div>
          {/* Image */}
          <div className="flex gap-2 items-center mb-4">
            <i className="fa-solid fa-image text-gray-400"></i>
            <h1 className="text-xl py-0.5 px-2 w-[150px] transition-all duration-100 hover:bg-slate-200 font-medium">
              Image URL
            </h1>
            <h1
              suppressContentEditableWarning
              contentEditable="true"
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  e.target.blur();
                }
              }}
              ref={imageURL}
              className="text-lg py-0.5 px-2 flex-1 transition-all max-h-36 overflow-hidden  duration-100 hover:bg-slate-200"
            >
              {cardDetail.imageURL ? cardDetail.imageURL : "Add imageURL"}
            </h1>
          </div>
          {/* assignee */}
          <div className="flex gap-2 items-center  mb-4">
            <i className="fa-solid fa-user text-gray-400"></i>
            <h1 className="text-xl py-0.5 px-2 w-[150px] transition-all duration-100 hover:bg-slate-200 font-medium">
              Assignee
            </h1>
            <div className=" hover:bg-slate-200 transition-all duration-100 flex-1">
              <div className="flex items-center gap-2">
                <img
                  className="w-[30px] h-[30px] flex rounded-full overflow-hidden"
                  src={character}
                  alt={cardDetail.assignee}
                />
                <p
                  suppressContentEditableWarning
                  contentEditable="true"
                  className="text-lg px-2 flex-1"
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      e.preventDefault();
                      e.target.blur();
                    }
                  }}
                  ref={assignee}
                >
                  {cardDetail.assignee ? cardDetail.assignee : "Add assignee"}
                </p>
              </div>
            </div>
          </div>
          {/* Status */}
          <div className="flex gap-2 items-center mb-4">
            <i className="fa-solid fa-s text-gray-400"></i>
            <h1 className="text-xl py-0.5 px-2 w-[150px] transition-all duration-100 hover:bg-slate-200 font-medium">
              Status
            </h1>
            <h1
              suppressContentEditableWarning
              contentEditable="true"
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  e.target.blur();
                }
              }}
              ref={status}
              className="text-lg py-0.5 px-2 flex-1 transition-all  duration-100 hover:bg-slate-200"
            >
              {cardDetail.status ? cardDetail.status : "Add status"}
            </h1>
          </div>
          {/* Priority */}
          <div className="flex gap-2 items-center  mb-4">
            <i className="fa-solid fa-user-group text-gray-400"></i>
            <h1 className="text-xl py-0.5 px-2 w-[150px] transition-all duration-100 hover:bg-slate-200 font-medium">
              Priority
            </h1>
            <div className=" hover:bg-slate-200 transition-all duration-100 flex-1 mr-20">
              <div className="flex items-center gap-4">
                <div
                  className={`py-1 pl-2 rounded-md text-white ${priorityColor}`}
                >
                  <i className={`fa-solid ${priorityIcon} pr-2`}></i>
                  <span
                    suppressContentEditableWarning
                    contentEditable="true"
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        e.preventDefault();
                        e.target.blur();
                      }
                    }}
                    ref={priority}
                    className=" text-white text-sm outline-none mr-2 rounded-md "
                  >
                    {cardDetail.priority ? cardDetail.priority : "Add priority"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Date Created */}
          <div className="flex gap-2 items-center  mb-4">
            <i className="fa-solid fa-calendar text-gray-400"></i>
            <h1 className="text-xl py-0.5 px-2 w-[150px] transition-all duration-100 hover:bg-slate-200 font-medium">
              Date
            </h1>
            <div className=" hover:bg-slate-200 transition-all duration-100 flex-1 mr-20">
              <div className="flex items-center gap-4">
                <span className="text-white text-sm  mr-4 bg-orange-400 py-1 px-2 rounded-md ">
                  <i className="fa-regular fa-clock pr-2"></i>
                  {cardDetail.month} {cardDetail.date}
                </span>
              </div>
            </div>
          </div>
          {/* Deadline */}
          <div className="flex gap-2 items-center  mb-4">
            <i className="fa-solid fa-calendar-check text-gray-400"></i>
            <h1 className="text-xl py-0.5 px-2 w-[150px] transition-all duration-100 hover:bg-slate-200 font-medium">
              Deadline
            </h1>
            <div className=" hover:bg-slate-200 transition-all duration-100 flex-1 mr-20">
              <div className="flex items-center gap-4">
                <div className="bg-orange-400 py-1 px-2 rounded-md">
                  <i className="fa-regular fa-clock text-white pr-2"></i>
                  <span
                    suppressContentEditableWarning
                    contentEditable="true"
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        e.preventDefault();
                        e.target.blur();
                      }
                    }}
                    ref={deadline}
                    className="text-white text-sm rounded-md py-1 pr-2 outline-none "
                  >
                    {cardDetail.deadline ? cardDetail.deadline : "Add deadline"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
