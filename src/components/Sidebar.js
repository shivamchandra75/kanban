import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMainList,
  updateBoardTitle,
} from "./redux/mainList/mainListActions";
import {
  setBoardId,
  addBoard,
  removeBoard,
} from "./redux/mainList/mainListActions";
const Sidebar = ({ boardId, setBoardIndex }) => {
  const dispatch = useDispatch();
  const [activeBoard, setActiveBoard] = useState(0);
  useEffect(() => {
    dispatch(getMainList());
  }, [dispatch]);

  const handleBoardTitle = (e) => {
    const updatedBoardTitle = e.target.innerText;
    dispatch(updateBoardTitle(e, updatedBoardTitle));
  };

  const state = useSelector((state) => state);
  // const numberOfBoards = state.mainList.length - 1;
  return (
    <div className="bg-[#f1f1f2] inline-block py-12 px-8 rounded-[2.5rem] rounded-r-none">
      {/* board name */}
      <div className="inline-flex justify-center items-center gap-4 bg-white shadow-md py-4 px-6 rounded-2xl">
        <div className="bg-[#2E4ACD] text-white text-2xl p-4 w-[40px] h-[40px] flex justify-center items-center rounded-full">
          K
        </div>
        <h1 className="text-xl font-semibold ">Kanban Pro+</h1>
      </div>
      {/* project list */}
      <ul className="mt-8">
        {state.mainList
          .map((listCollection) => listCollection.title)
          .map((title, index) => {
            return (
              <li
                key={index}
                id={index}
                onClick={() => {
                  dispatch(setBoardId(index));
                  setBoardIndex(index);
                  setActiveBoard(index);
                }}
                className={`${
                  activeBoard === index ? "shadow-md" : ""
                } flex mb-6  justify-start items-center gap-4 font-semibold bg-white cursor-pointer py-2 px-6 rounded-lg`}
              >
                <i className="fa-solid fa-play"></i>
                <p
                  id={index}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      e.preventDefault();
                      handleBoardTitle(e);

                      e.target.blur();
                    }
                  }}
                  onBlur={(e) => handleBoardTitle(e)}
                  contentEditable={true}
                  suppressContentEditableWarning
                  className="p-2 outline-none "
                >
                  {title}
                </p>
                <div className="flex-1"></div>
                <i
                  onClick={() => dispatch(removeBoard(index))}
                  className="fa-solid fa-trash  text-right"
                ></i>
              </li>
            );
          })}
      </ul>

      {/* Add board */}
      <div
        onClick={() => {
          dispatch(addBoard(state.mainList.length));
        }}
        className="h-[50px]  bg-[#2E4ACD] text-white mt-12  cursor-pointer rounded-lg flex items-center justify-center "
      >
        <i className="fa-solid fa-plus mr-4"></i>Add Board
      </div>
    </div>
  );
};

export default Sidebar;
