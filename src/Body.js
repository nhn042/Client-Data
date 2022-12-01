import React, { useEffect, useRef, useState } from "react";
import "./Body.css";
import categories from "./category";
import axios from "axios";

function Body() {
  const [tayWord, setTayWord] = useState("");
  const [vietWord, setVietWord] = useState("");
  const [count, setCount] = useState(0);
  const [wordLeft, setWordLeft] = useState("");
  const [word, setWord] = useState("");
  const [begin, setBegin] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [meanings, setMeanings] = useState([]);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      axios
        .patch(`http://localhost:8080/Data/${meanings[count]._id}`, {
          vietWord: vietWord,
        })
        .then((res) => {
        });
    } catch (err) {}
  };
  var i = 0;
  const reset = () => {
    setTayWord(meanings[i].tayWord);
    setCheck(false);
  };
  const previous = () => {
    if(count >= 1) {
    setCount(count - 1);
    setCheck(true); 
    }
  };
  const next = () => {
    if(count < maxCount - 1) {
    setCount(count + 1);
    setCheck(true);
    }
  };
  const handleSubmitLeft = async (e) => {
    setBegin(false);
    try {
      e.preventDefault();
      axios.get(`http://localhost:8080/Data`, wordLeft).then((res) => {
        setMeanings(res.data);
        setisLoading(true);
      });
    } catch (err) {}
  };
  const maxCount = meanings.length;
  useEffect(() => {
    if (check) return reset();
  });
  return (
    <div>
      <h2 className="header">DICTIONARY</h2>
      {isLoading && (
        <div className="panel">
          <div className="left-panel">
            <div>
              <button>Tay</button>
            </div>
            <div className="search-box">
              <div className="box-meaning">
                <p>{meanings[count].tayWord}</p>

                {/* <textarea
                value={vietWord}
                onChange={(e) => setVietWord(e.target.value)}
              ></textarea> */}
              </div>
            </div>

            <div className="panel2">
              <div className="previous">
                <button onClick={previous}>❮ Previous</button>
              </div>
              <div className="next">
                <button onClick={next}>Next ❯</button>
              </div>
            </div>
          </div>
          <div className="right-panel">
            <div>
              <button>Viet</button>
            </div>
            <div className="search-box">
              <textarea
                value={vietWord}
                onChange={(e) => setVietWord(e.target.value)}
              ></textarea>
            </div>
            <div className="button">
              <button className="submit" onClick={handleSubmit}>
                {" "}
                Submit{" "}
              </button>
            </div>
          </div>
        </div>
      )}
      {begin && (
        <button className="submit" onClick={handleSubmitLeft}>
          <span>Begin</span>
        </button>
      )}
    </div>
  );
}

export default Body;
