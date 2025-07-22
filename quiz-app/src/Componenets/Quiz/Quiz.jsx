import React, { useRef, useState } from "react";
import "./Quiz";
import "./Quiz.css";
import { data } from "../../assets/data";
import Header from "./Header";
import { useEffect } from "react";
import LogoutButton from "./logout";

export const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userData = params.get("user");
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (err) {
                console.error("Failed to parse GitHub user data.");
            }
        }
    }, []);

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let option_array = [option1, option2, option3, option4];

    const checkAns = (e, ans) => {
        if (lock === false) {
            if (question.ans == ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore((prev) => prev + 1);
            } else {
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans - 1].current.classList.add("correct");
            }
        }
    };

    const next = () => {
        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            });
        }
    };

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(0);
    };

    return (
        <div className="container">
        <div className="header">
          <h1>Quiz App</h1>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={user.avatar_url}
                alt="avatar"
                style={{ width: 32, height: 32, borderRadius: "50%" }}
              />
              <span style={{ fontWeight: "bold" }}>{user.login}</span>
              <div>
                <LogoutButton />
              </div>
            </div>
          ) : (
            <button
              className="login-button"
              onClick={() => {
                window.location.href = "http://localhost:4000/auth/github";
              }}
            >
              Log in with GitHub
            </button>
          )}
        </div>

        <hr />

        {result ? (
          <>
            <h2>
              You Scored {score} out of {data.length}
            </h2>
            <button onClick={reset}>ReQuiz</button>
          </>
        ) : (
          <>
            <h2>
              {index + 1}. {question.question}
            </h2>
            <ul>
              <li ref={option1} onClick={(e) => checkAns(e, 1)}>
                {question.option1}
              </li>
              <li ref={option2} onClick={(e) => checkAns(e, 2)}>
                {question.option2}
              </li>
              <li ref={option3} onClick={(e) => checkAns(e, 3)}>
                {question.option3}
              </li>
              <li ref={option4} onClick={(e) => checkAns(e, 4)}>
                {question.option4}
              </li>
            </ul>
            <button className="next" onClick={next}>
              Next
            </button>
            <div className="index">
              {index + 1} out of {data.length} questions
            </div>
          </>
        )}
      </div>
    );
}