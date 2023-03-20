import React, { useState } from 'react';
import Banner from "../components/banner";
import quizQuestions from "./quizQuestions";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [answers] = useState([])
  const [results] = useState({'answers': ''})
  const { questions } = quizQuestions
  const { question, choices} = questions[activeQuestion]
  let navigate = useNavigate();
  const onClickNext = async (e) => {
    setSelectedAnswerIndex(null)

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)

      e.preventDefault();
      results.answers = answers
      try {
        console.log(results)
        await axios.post('/quizAI', results);
        let path = "/quiz";
        navigate(path);

      } catch (err) {
        console.log(err)
      }
    }
  }
  // Saves the answer as a multi-dimensional Array, ready to be processed
  // Ex. [ [0,1], [0,1,0] ]
  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    answers.push(answer)

    // Method used before for saving answer as multidimensional array

    // let temp = []
    // for(let i = 0; i < choices.length; i++){
    //   if (i === index){
    //       temp.push(1)
    //   }
    //   else{
    //       temp.push(0)
    //   }
    //
    // }
    // results[activeQuestion] = temp

  }

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

  return <>
    <Banner page = "quiz" />
    <div className="bg-colegio-background flex justify-center h-screen">
        <div className="m-16 h-fit border-2 border-colegio-dark-green rounded-md ">
            {!showResult ? (
        <div>

            <div className="border-b-2 border-colegio-dark-green">
              <div className="text-colegio-dark-green font-sans font-bold text-xl m-2 text-center">CS Career Guide AI Quiz</div>
                <div className="grid m-2 place-content-end">
                    <span className="text-colegio-dark-green font-sans font-bold text-lg">
                        {addLeadingZero(activeQuestion + 1)}/{addLeadingZero(questions.length)}
                    </span>
                </div>
            </div>

            <h2 className="text-colegio-dark-green font-sans font-bold text-xl m-2 pb-4 text-center">{question}</h2>

            <div className="grid grid-cols-2 ">
                {choices.map((answer, index) => (
                    <span className="grid place-content-center align-bottom w-80 h-24 text-center bg-colegio-background  hover:bg-colegio-light-green text-colegio-dark-green text-base font-sans font-bold rounded-full border-4 m-4 border-colegio-green"
                        onClick={() => onAnswerSelected(answer, index)}
                        key={answer}
                        className={
                            selectedAnswerIndex === index ? 'grid place-content-center w-80 h-24 text-center bg-colegio-light-green text-colegio-dark-green text-base font-sans font-bold rounded-full border-4 m-4 border-colegio-dark-green' : "grid place-content-center w-80 h-24 text-center  bg-colegio-background hover:bg-colegio-light-green text-colegio-dark-green text-base font-sans font-bold rounded-full border-4 m-4 border-colegio-green"
                        }>

                        <p>{answer}</p>
                    </span>
                ))}
            </div>
            <button className=" m-4 relative float-right bg-colegio-light-green hover:bg-colegio-green text-colegio-dark-green text-base font-sans font-bold rounded-full w-24 h-10 disabled:opacity-75"
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}>
              {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
        </div>
      ) : (
              <div>
                  <div className="border-b-2 border-colegio-dark-green">
                      <div className="text-colegio-dark-green font-sans font-bold text-xl m-2 text-center">CS Career Guide AI Quiz</div>
                  </div>
                    <p className="text-colegio-dark-green font-sans font-bold text-lg m-2 text-center">Thank you for taking the Quiz!</p>
                    <p className="text-colegio-dark-green font-sans font-bold text-lg m-2 text-center">Our AI is processing your answer and you will be redirected shortly.</p>
                  <div className="flex justify-center m-4">
                  <div
                      className="bg-colegio-background flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-tr from-colegio-light-green to-colegio-green animate-spin">
                      <div className="h-24 w-24 rounded-full bg-colegio-background"></div> </div>
                  </div>

        </div>
      )}

        </div>
    </div>
  </>
}

export default Quiz