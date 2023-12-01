/* eslint-disable */

import "./App.css";
import { useState } from "react";

function App() {
    let titleList = [
      {name: "남자 코트 추천", day:"2월 17일 발행", good: 0}, 
      {name: "강남 우동 맛집", day:"2월 18일 발행", good: 0}, 
      {name: "파이썬 독학", day:"2월 19일 발행", good: 0}
    ];
    let [titles, setTitles] = useState(titleList);
    let [isMan, setIsMan] = useState(true);

    function addGoodNum(index) {
      let updateTitles = [...titles];
      updateTitles[index].good += 1;
      setTitles(updateTitles);
    }

    function coatChange() {
      setIsMan(!isMan);
      let updateTitles = [...titles];
      if(isMan) {
        updateTitles[0].name = "여자 코트 추천";
      }
      else {
        updateTitles[0].name = "남자 코트 추천";
      }
      setTitles(updateTitles);
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
                      {title.name} 
                      <span onClick={() => addGoodNum(index)}>👍</span> {title.good}
                    </h4>
                    <p>{title.day}
                      {title.name.includes("코트 추천") && <button onClick={coatChange}>글수정</button>}
                    </p>
                    
                </div>
            ))}
        </div>
    );
}

export default App;
