import React, { useState } from 'react';
import Banner from "../components/banner";
import quizQuestions from "./quizQuestions";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [answers] = useState({})
  const [results] = useState({'answers': ''})
  const { questions } = quizQuestions
  const { question, choices} = questions[activeQuestion]
  let navigate = useNavigate();
  const [responseState, setResponseState] = useState({
    success: null,
    message: '',
  });
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
        let test
        test = await axios.post('/quizAI', results).then((response) => {
          setResponseState({
          success: response.status,
          message: response.data.result,
        });})

        //let path = "/quiz";
        //navigate(path);
        console.log(test)
      } catch (err) {
        console.log(err)
      }
    }
  }
  // Saves the answer as a multi-dimensional Array, ready to be processed
  // Ex. [ [0,1], [0,1,0] ]
  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    let current = activeQuestion + 1
    answers['Answer_' + current] = answer

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
        console.log(responseState.success)
        console.log(responseState.message)

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

  return <>
    <Banner page = "quiz" />
    <div className="bg-colegio-background flex justify-center ">
        <div className="m-16 h-fit bg-colegio-green rounded-md w-5/12 h-max">
            {!showResult ? (
        <div>

            <div className="border-b-2 m-8 border-colegio-light-green">
              <div className="text-colegio-background font-sans font-bold text-2xl m-2 text-center">CS Career Guide AI Quiz</div>
                <div className="grid m-2 place-content-end">
                    <span className="text-colegio-green-2 font-sans font-bold text-lg">
                        {addLeadingZero(activeQuestion + 1)}/{addLeadingZero(questions.length)}
                    </span>
                </div>
            </div>

            <h2 className="text-colegio-background font-sans font-bold text-2xl m-2 pb-4 text-center">{question}</h2>

            <div className="grid place-content-center align-center justify-center grid-cols-2">
                {choices.map((answer, index) => (
                    <span className="grid place-content-center justify-self-center  align-bottom w-64 h-20 text-center bg-colegio-light-green  hover:bg-colegio-light-green text-colegio-dark-green text-base font-sans font-bold rounded-2xl border-4 m-4 border-colegio-green"
                        onClick={() => onAnswerSelected(answer, index)}
                        key={answer}
                        className={
                            selectedAnswerIndex === index ? 'grid place-content-center justify-self-center  w-64 h-20 text-center bg-colegio-green-2 text-colegio-dark-green text-base font-sans font-bold rounded-2xl border-4 m-4 border-colegio-green-2' :
                                "grid place-content-center justify-self-center  w-64 h-20 text-center  bg-colegio-light-green  hover:bg-colegio-green-2 text-colegio-dark-green text-base font-sans font-bold rounded-2xl border-4 m-4 border-colegio-green"
                        }>

                        <p>{answer}</p>
                    </span>
                ))}
            </div>
            <button className=" m-4 relative float-right bg-colegio-light-green hover:bg-colegio-green-2 text-colegio-dark-green text-base font-sans font-bold rounded-lg w-24 h-10 disabled:opacity-25"
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}>
              {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
        </div>
      ) : responseState.success == null ? (
              <div>
                  <div className="border-b-2  m-8 border-colegio-light-green">
                      <div className="text-colegio-background font-sans font-bold text-xl m-2 text-center">CS Career Guide AI Quiz</div>
                  </div>
                    <p className="text-colegio-background font-sans font-bold text-lg m-2 text-center">Thank you for taking the Quiz!</p>
                    <p className="text-colegio-background font-sans font-bold text-lg m-2 text-center">Our AI is processing your answer and you will be redirected shortly.</p>
                  <div className="flex justify-center m-4">
                  <div
                      className="bg-colegio-background flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-tr from-colegio-green-2 to-colegio-green animate-spin">
                      <div className="h-24 w-24 rounded-full bg-colegio-green"></div> </div>
                  </div>

        </div>
      ): responseState.success>= 200 && responseState.success < 300 ?(

          <div>
                  <div className="border-b-2  m-8 border-colegio-light-green">
                      <div className="text-colegio-background font-sans font-bold text-xl m-2 text-center">CS Career Guide AI Quiz</div>
                  </div>
            <p className="text-colegio-background font-sans font-bold text-lg m-2 text-center">Your recommended career path is: </p>
            <p className="text-colegio-background font-sans font-bold text-4xl m-2 text-center m-32">{responseState.message}</p>
 </div>
            ): (
                <p>Error: {responseState.message}</p>)
            }

        </div>
    </div>
  </>
}

export default Quiz