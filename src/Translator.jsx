import React, { useState } from 'react';
import languages from '../src/api/language.json';
import '../src/styling/Translator.css'


const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [inputLanguage, setInputLanguage] = useState('en');
  const [outputLanguage, setOutputLanguage] = useState('af');
  const translateText = async () => {
    const url = `https://microsoft-translator-text-api3.p.rapidapi.com/translate?api-version=3.0&to=${outputLanguage}&from=${inputLanguage}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '563d3fa6f1mshd4af3f5eb7ba36ap1ab956jsn24b647b119f1', // Replace with your actual API key
        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
      },
      body: JSON.stringify([{ Text: inputText }]),
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log('API Response:', result);
      if (result && result[0] && result[0].translations && result[0].translations[0]) {
        setOutputText(result[0].translations[0].text);
      } else {
        setOutputText('Translation not available');
      }
    } catch (error) {
      console.error('Error translating text:', error);
      setOutputText('Error translating text');
    }
  };
  
   
  return (
    <div className="container">
      <div className="row1">
        <select value={inputLanguage} onChange={(e) => setInputLanguage(e.target.value)}>
          {Object.entries(languages).map(([code, { name }]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
        <span className="reversesvg">⇆</span>
        <select value={outputLanguage} onChange={(e) => setOutputLanguage(e.target.value)}>
          {Object.entries(languages).map(([code, { name }]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="row2">
        <div className="inputText">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text"
          />
        </div>
        <div className="outputText">
          {outputText}
        </div>
      </div>
      <div className="row3">
        <button className="btn" onClick={translateText}>Translate</button>
      </div>
    </div>
  );
};

export default Translator;
