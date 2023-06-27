import Sidebar from "./components/Sidebar";
import ProjectLists from "./components/ProjectLists";
import { useState, useRef } from "react";

function App() {
  const [boardId, setBoardId] = useState(0);
  const spinnerDiv = useRef(null);
  const spinner = useRef(null);
  const saved = useRef(null);
  const saveFailed = useRef(null);
  return (
    <div className="bg-[#DCE0E8] relative">
      {/* spinner */}
      <div
        ref={spinnerDiv}
        onClick={(e) => {
          spinnerDiv.current.classList.add("hidden");
          spinner.current.classList.remove("hidden");
          saved.current.classList.add("hidden");
          saveFailed.current.classList.add("hidden");
        }}
        className="spinnerDiv hidden fixed h-screen w-screen bg-[rgba(0,0,0,0.2)] z-20 "
      >
        <div className="fixed bg-[#dde2fc] rounded-lg shadow-sm h-[200px] w-[300px] px-4 flex flex-col items-center justify-center z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div
            ref={spinner}
            className="spinner spin h-[80px] bg-[#2E4ACD] mb-4"
          ></div>
          <div
            ref={saved}
            className="saved hidden text-black text-xl font-semibold text-center"
          >
            {" "}
            Your progress has been successfully saved 😊
          </div>
          {/* save failed */}
          <div
            ref={saveFailed}
            className="saveFailed hidden text-black text-xl font-semibold text-center"
          >
            <span className="text-2xl"> 😥</span>
            Save Failed <br /> Check your connection and try again.
          </div>
        </div>
      </div>
      <div className="App flex py-12  px-12">
        <Sidebar boardId={boardId} setBoardIndex={setBoardId} />
        <div className=" bg-white flex-1 rounded-[2.5rem] pr-16 rounded-l-none">
          <ProjectLists boardId={boardId} setBoardId={setBoardId} />
        </div>
      </div>
    </div>
  );
}

export default App;
