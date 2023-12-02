import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  const [key, setKey] = useState('');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const encrypt = (text, key) => {
    let result = '';
    for (let i = 0, j = 0; i < text.length; i++) {
      let char = text[i];
      if (char.match(/[a-z]/i)) {
        let charCode = char.charCodeAt(0);
        let offset = key[j % key.length].toLowerCase().charCodeAt(0) - 97;
        let encryptedChar = String.fromCharCode(((charCode - 65 + offset) % 26) + 65);
        result += char === char.toLowerCase() ? encryptedChar.toLowerCase() : encryptedChar;
        j++;
      } else {
        result += char;
      }
    }
    return result;
  };

  const decrypt = (text, key) => {
    let result = '';
    for (let i = 0, j = 0; i < text.length; i++) {
      let char = text[i];
      if (char.match(/[a-z]/i)) {
        let charCode = char.charCodeAt(0);
        let offset = key[j % key.length].toLowerCase().charCodeAt(0) - 97;
        let decryptedChar = String.fromCharCode(((charCode - 65 - offset + 26) % 26) + 65);
        result += char === char.toLowerCase() ? decryptedChar.toLowerCase() : decryptedChar;
        j++;
      } else {
        result += char;
      }
    }
    return result;
  };

  const handleEncrypt = () => {
    if (!key.match(/^[A-Z]+$/) || key.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Key harus berisi huruf kapital A-Z tanpa spasi.',
      });
      return;
    }

    const output = encrypt(inputText.toUpperCase(), key.toUpperCase());
    setOutputText(output);
  };

  const handleDecrypt = () => {
    if (!key.match(/^[A-Z]+$/) || key.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Key harus berisi huruf kapital A-Z tanpa spasi.',
      });
      return;
    }

    const output = decrypt(inputText.toUpperCase(), key.toUpperCase());
    setOutputText(output);
  };

  const reset = () => {
    setKey('');
    setInputText('');
    setOutputText('');
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="container">
        <h1>Vigenere Cipher</h1>
        <div className="input-container">
          <label htmlFor="key">Key:</label>
          <input type="text" id="key" value={key} onChange={(e) => setKey(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="inputText">Input Text:</label>
          <input type="text" id="inputText" value={inputText} onChange={(e) => setInputText(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="outputText">Output Text:</label>
          <input type="text" id="outputText" value={outputText} readOnly />
        </div>
        <div className="button-container">
          <button onClick={handleEncrypt}>Encrypt</button>
          <button onClick={handleDecrypt}>Decrypt</button>
          <button onClick={reset}>Reset</button>
        </div>
        <div className="mode-toggle">
          
          <label className="switch">
            <input type="checkbox" onChange={toggleDarkMode} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
