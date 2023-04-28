import React, { useState } from 'react';
import { postServerData } from '../helper/helper';

export default function CreateQuestionPage() {
  const [formData, setFormData] = useState({
    text: '',
    options: ['', '', '', ''],
    answerIndex: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (event, index) => {
    const newOptions = [...formData.options];
    newOptions[index] = event.target.value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/question`, 'POST', formData, (res) => {
      console.log('Question created:', res);
      // Show success message or redirect to question list page
    });
  };

  return (
    <div>
      <h1>Create a Question</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Question Text:</label>
        <input type="text" name="text" value={formData.text} onChange={handleInputChange} />

        <label htmlFor="option1">Option 1:</label>
        <input type="text" name="option1" value={formData.options[0]} onChange={(e) => handleOptionChange(e, 0)} />

        <label htmlFor="option2">Option 2:</label>
        <input type="text" name="option2" value={formData.options[1]} onChange={(e) => handleOptionChange(e, 1)} />

        <label htmlFor="option3">Option 3:</label>
        <input type="text" name="option3" value={formData.options[2]} onChange={(e) => handleOptionChange(e, 2)} />

        <label htmlFor="option4">Option 4:</label>
        <input type="text" name="option4" value={formData.options[3]} onChange={(e) => handleOptionChange(e, 3)} />

        <label htmlFor="answer">Correct Answer:</label>
        <select name="answerIndex" value={formData.answerIndex} onChange={handleInputChange}>
          <option value={0}>Option 1</option>
          <option value={1}>Option 2</option>
          <option value={2}>Option 3</option>
          <option value={3}>Option 4</option>
        </select>

        <button type="submit">Create Question</button>
      </form>
    </div>
  );
}
