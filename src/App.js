/* eslint-disable */

import "./App.css";
import { useState } from "react";

function App() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = currentDate.getDate();

    const currentDateString = `${month}월 ${day}일 발행`;

    let titleList = [
        { name: "남자 코트 추천", day: "2월 17일 발행", good: 0},
        { name: "강남 우동 맛집", day: "2월 18일 발행", good: 0},
        { name: "파이썬 독학", day: "2월 19일 발행", good: 0}
    ];
    let coatIndex2;
    let [titles, setTitles] = useState(titleList);
    let [isMan, setIsMan] = useState(true);
    let [modal, setModal] = useState(false); // 스위치
    let [titleIndex, setTitleIndex] = useState(null);
    let [inputValue, setInputValue] = useState("");

    function addGoodNum(index) {
        let updateTitles = [...titles];
        updateTitles[index].good += 1;
        setTitles(updateTitles);
    }

    function coatChange(index) {
        setIsMan(!isMan);
        let updateTitles = [...titles];
        if (isMan) {
            updateTitles[index].name = "여자 코트 추천";
        } else {
            updateTitles[index].name = "남자 코트 추천";
        }
        setTitles(updateTitles);
    }

    function createPost() {
      let addArray = {name: inputValue, day: currentDateString, good: 0};
      let copyTitles = [...titles];
      copyTitles.unshift(addArray);
      setTitles(copyTitles);
    }

    function deletePost(index) {
      let copyTitles = [...titles];
      copyTitles.splice(index, 1);
      setTitles(copyTitles);
    }

    function orderByName() {
        // name을 기준으로 정렬
        const sortedTitles = [...titles].sort((a, b) => a.name.localeCompare(b.name));
        setTitles(sortedTitles);
    }

    function orderByGood() {
        const sortedTitles = [...titles].sort((a, b) => b.good - a.good);
        setTitles(sortedTitles);
    }

    return (
        <div className="App">
            <div className="black-nav">
                <h4
                    style={{
                        color: "yellow",
                        fontSize: "16px",
                    }}
                >
                    ReactBlog
                </h4>
            </div>
            <div>
                <button onClick={orderByName}>가나다순정렬</button>
                <button onClick={orderByGood}>따봉순정렬</button>
            </div>
            {titles.map((title, index) => (
                <div className="list" key={index}>
                    <h4>
                        <span
                            onClick={() => {
                                if (!modal || index === titleIndex) {
                                    setModal(!modal);
                                }
                                setTitleIndex(index);
                            }}
                            style={{ cursor: "Pointer" }}
                        >
                            {title.name}
                        </span>
                        <span style={{ cursor: "Pointer" }} onClick={() => addGoodNum(index)}>
                            👍
                        </span>{" "}
                        {title.good}
                        {" "}
                        <button onClick={() => {deletePost(index)}}>삭제</button>
                    </h4>
                    <p>{title.day}</p>
                    <p>
                        {title.name.includes("코트 추천") && (
                            <button
                                onClick={() => {
                                    coatChange(index);
                                }}
                            >
                                글수정
                            </button>
                        )}
                    </p>
                </div>
            ))}

            <input
                type="textbox"
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
            />
            <button onClick={createPost}>글생성</button>
            {modal == true ? (
                <Modal
                    titles={titles}
                    index={titleIndex}
                    onClick={() => {
                        titles.map((title, index) => {
                            if (title.name.includes("코트 추천")) {
                                coatIndex2 = index;
                            }
                        });
                        coatChange(coatIndex2);
                    }}
                />
            ) : null}
        </div>
    );
}

function Modal(props) {
    return (
        <div className="modal">
            <h4>{props.titles[props.index].name}</h4>
            <p>{props.titles[props.index].day}</p>
            <p>상세내용</p>
            <button onClick={props.onClick}>글수정</button>
        </div>
    );
}

export default App;
