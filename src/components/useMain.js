import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../redux/result_reducer'
import '../styles/Main.css'




export default function useMainRef() {

    const inputRef = useRef(null)
    const dispatch = useDispatch()


    function startQuiz() {
        if (inputRef.current?.value) {
            dispatch(setUserId(inputRef.current?.value))
        }
    }
   

  return (
    <div className='container'>
        <h1 className='title text-light'>EDT111 TEST</h1>
<p>INSTRUCTIONS:</p>
        <ol>
            <li>You will be asked 10 questions one after another.</li>
            <li>10 points is awarded for the correct answer.</li>
            <li>Each question has four options. You can choose only one options.</li>
              <li>The result will be declared at the end of the quiz.</li>
              <li>only click the finish button if you are sure of your answers</li>
              <li>the quiz autoamtically logs you out after the given time</li>
        </ol>

        <form id="form">
            <input ref={inputRef} className="userid" type="text" placeholder='Username*' />
        </form>

        <div className='start'>
            <Link className='btn' to={'quiz'} onClick={startQuiz} >Start Quiz</Link>
        </div>

    </div>
  )
}
