import React, { useState ,useEffect} from 'react'
import Questions from './Questions'
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion'
import { PushAnswer } from '../hooks/setResult'
import { useNavigate } from 'react-router-dom'





// redux  store import
import { useSelector, useDispatch } from 'react-redux'




export default function Quiz() {
  const [check, setChecked] = useState(undefined)
  const result = useSelector(state => state.result.result)
  const {queue,trace} = useSelector(state => state.questions)
  const dispatch = useDispatch();
  const navigate = useNavigate();


 // Timer state
  const [timeLeft, setTimeLeft] = useState(60 * 2); // 10 minutes in seconds

useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      navigate('/result');
    }
  }, [navigate, timeLeft]);



 
  // next button event handler
  function onNext() {
    if (trace < queue.length) {
    // update the trace value by one using MoveNextQuestion
      dispatch(MoveNextQuestion());

      if (result.length <= trace) {
      dispatch(PushAnswer(check));  
      }
      
    }
//  reset the value of the checked variable
    setChecked(undefined)
    // Check if the current question is the last question in the quiz
  if (trace === queue.length - 1) {
    navigate('/result'); // Submit the quiz
  }
}

  // prev button event handler
    function onPrev() {
      
      if(trace > 0){
          // reduce the trace value by one using MovePrevQuestion
    dispatch(MovePrevQuestion())
      }
    
  }
  function onChecked(check) {

    setChecked(check)
  }
  // // finished exam after the last question
  // if (result.length && result.length >= queue.length) {
  //   return <Navigate to={'/result'} replace="true"></Navigate>
  // }
  

// Conditional rendering of the button text
  const buttonText = trace === queue.length - 1 ? 'Finish' : 'Next';

  
  return (
    <div className='container'>
      <h1 className='title text-light'>EDT111 TEST</h1>
     <p className='timer'>{`Time left: ${Math.floor(timeLeft / 60)}:${timeLeft % 60
        .toString()
        .padStart(2, '0')}`}</p>

      

      {/* display question  */}
      <Questions onChecked= {onChecked}></Questions>
      <div className='grid'>
        {trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
        <button className='btn next' onClick={onNext}>{ buttonText}</button>
      </div>
    </div>
  )
}
