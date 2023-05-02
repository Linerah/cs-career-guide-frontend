import React, {useContext, useState} from 'react';
import Banner from "../components/banner";
import quizQuestions from "./quizQuestions";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../auth/AuthContext";

const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [profShowResult, setProfShowResult] = useState(false)
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
  const {currentUser} = useContext((AuthContext))

  const profChoices = ['Programming Languages', 'Data Structures and Algorithms', 'Computer Architecture', 'Computer Networks', 'Cybersecurity', 'Databases', 'Software Engineering', 'Human Computer Interaction', 'Artificial Intelligence']

  const onClickNext = async (e) => {
    setSelectedAnswerIndex(null)

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else if (currentUser.isProfessor){
      console.log('WORKS')
      setActiveQuestion(0)
      setShowResult(true)
    }
    else {
      setActiveQuestion(0)
      setShowResult(true)

      e.preventDefault();
      answers['Summary'] = '.'
      results.answers = answers
      try {
        console.log(results)

        let test
        test = await axios.post('https://cs-career-guide-ai-service.herokuapp.com/quizAI', {results, currentUser}).then((response) => {
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

  }
  const onFieldSelected = async (answer, index) => {
    setProfShowResult(true)
    console.log(answers)

    answers['Summary'] = Object.values(answers).join(" ");

    console.log(answers['Summary'])

    answers['Result'] = answer
    results.answers = answers
    console.log(results)
    await axios.post('https://cs-career-guide-frontend.herokuapp.com/quizAI', {results, currentUser})

  }

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)
  function handleHomeRedirect () {
    navigate('/home')
  }


  function handleButtonClick() {
    setShowWelcome(false)
  }

  return <>
    <Banner page = "quiz" />
    <div className="bg-colegio-background flex justify-center ">
        <div className="lg:m-16 m-6 lg:w-5/12 w-11/12 h-fit bg-colegio-green rounded-md  h-max">
          { showWelcome ?(
              <div>
                <div className="border-b-2 m-8 border-colegio-light-green justify-center">
                  <div className="text-colegio-background font-sans font-bold md:text-2xl m-2 text-center text-lg">CS Career Guide AI Quiz</div>

                  </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-colegio-background font-sans font-bold md:text-xl m-2 text-center text-lg">The questions in this quiz are used for our AI to understand and identify the subfield that will fit you the most.</p>
                 <p className="text-colegio-background font-sans font-bold md:text-xl m-2 text-center text-lg">Answers are confidential!!</p>
                  <button onClick={handleButtonClick} className="justify-center text-2xl place-content-center justify-self-center  align-bottom w-64 h-20 text-center bg-colegio-light-green  hover:bg-colegio-light-green text-colegio-dark-green text-base font-sans font-bold rounded-2xl border-4 m-4 border-colegio-green">
                    Start Quiz!
                  </button>
                  </div>
              </div>
          ) :!showResult ? (

              <div>
                <div className="border-b-2 m-8 border-colegio-light-green">
                  <div className="text-colegio-background font-sans font-bold md:text-2xl m-2 text-center text-lg">CS Career Guide AI Quiz</div>
                    <div className="grid m-2 place-content-end">
                      <span className="text-colegio-green-2 font-sans font-bold md:text-lg text-md ">
                        {addLeadingZero(activeQuestion + 1)}/{addLeadingZero(questions.length)}
                      </span>
                  </div>
              </div>

            <h2 className="text-colegio-background font-sans font-bold md:text-2xl text-lg m-2 pb-4 text-center">{question}</h2>
            <div className="grid place-content-center align-center justify-center md:grid-cols-2">
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
      ) : currentUser.isProfessor && showResult && !profShowResult ? (
                <div>
                <div className="border-b-2  m-8 border-colegio-light-green">
                      <div className="text-colegio-background font-sans font-bold text-xl m-2 text-center">CS Career Guide AI Quiz</div>
                  </div>
                    <p className="text-colegio-background font-sans font-bold text-lg m-2 text-center">Which of these do you consider your specialty?</p>
            <div className="grid place-content-center align-center justify-center md:grid-cols-2 lg:grid-cols-3">
                {profChoices.map((answer, index) => (
                    <span className="grid place-content-center justify-self-center  align-bottom w-64 h-20 text-center bg-colegio-light-green  hover:bg-colegio-light-green text-colegio-dark-green text-base font-sans font-bold rounded-2xl border-4 m-4 border-colegio-green"
                        onClick={() => onFieldSelected(answer, index)}
                        key={answer}
                        className={
                            selectedAnswerIndex === index ? 'grid place-content-center justify-self-center  w-64 h-20 text-center bg-colegio-green-2 text-colegio-dark-green text-base font-sans font-bold rounded-2xl border-4 m-4 border-colegio-green-2' :
                                "grid place-content-center justify-self-center  w-64 h-20 text-center  bg-colegio-light-green  hover:bg-colegio-green-2 text-colegio-dark-green text-base font-sans font-bold rounded-2xl border-4 m-4 border-colegio-green"
                        }>
                        <p>{answer}</p>
                    </span>
                ))}
            </div>
                  </div>
                ): profShowResult ?(
    <div>
                <div className="border-b-2  m-8 border-colegio-light-green">
                      <div className="text-colegio-background font-sans font-bold text-xl m-2 text-center">CS Career Guide AI Quiz</div>
                  </div>
                    <p className="text-colegio-background font-sans font-bold text-lg m-2 text-center">Thank you for taking the quiz!</p>
                    <p className="text-colegio-background font-sans font-bold text-lg m-2 text-center"> The AI will consider your answer when making predictions, thank you for your collaboration</p>
                                <button className=" m-4 relative float-right  bg-colegio-light-green hover:bg-colegio-green-2 text-colegio-dark-green text-base font-sans font-bold rounded-lg w-32 h-16 disabled:opacity-25" onClick={handleHomeRedirect}> Return Home</button>
    </div>
            ): responseState.success == null ? (
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
            <div>
            <p className="text-colegio-background font-sans font-bold text-lg m-2 text-center">Your recommended career path is: </p>
            <p className="text-colegio-background font-sans font-bold lg:text-4xl text-3xl m-2 text-center mt-12 m-24">{responseState.message}</p>
            </div>
          </div>
            ): (
                <p>Error: {responseState.message}</p>)
            }

        </div>
    </div>
  </>
}

export default Quiz