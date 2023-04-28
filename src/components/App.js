import '../styles/App.css';


import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import component
import Main from './useMain';
import Quiz from './Quiz';
import Result from './Result';
import CreateQuestionPage from './CreateQuestionPage';
import { CheckUserExist } from '../helper/helper';
/**react routes */
const router = createBrowserRouter([
  {
    path: '/',
    element:<Main></Main>
  },
   {
    path: '/quiz',
    element: <CheckUserExist> <Quiz></Quiz></CheckUserExist>
 },
  {
    path: '/result',
    element:<CheckUserExist><Result></Result></CheckUserExist>
  },
   {
    path: '/create-question',
    element: <CheckUserExist><CreateQuestionPage /></CheckUserExist>
  }
])
function App() {
  return (
    <>
      <RouterProvider router={router
      }></RouterProvider>
      
    </>
  );
}

export default App;
