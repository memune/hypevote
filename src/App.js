import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [listItems, setListItems] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      const newItem = {
        text: inputValue,
        votes: [0, 0, 0],
        date: new Date().toLocaleString(),
        voted: false,
      };
      setListItems([...listItems, newItem]);
      setInputValue('');
    }
  };

  const handleVote = (itemIndex, buttonIndex) => {
    setListItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        votes: [...updatedItems[itemIndex].votes],
        voted: true,
      };
      updatedItems[itemIndex].votes[buttonIndex] += 1;
      return updatedItems;
    });
  };

  const calculateTotalScore = (votes) => {
    const scoreMap = {
      0: 0,  // 몰랐음: 0점
      1: 1,  // 인정: 1점
      2: -1, // 노인정: -1점
    };

    let totalScore = 0;
    votes.forEach((vote, index) => {
      totalScore += scoreMap[index] * vote;
    });

    return totalScore;
  };

  return (
    <div className="app">
      <h2>Hype Vote - 이거 나만 몰랐어?</h2>
      <div className="input-container">
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleAddItem}>추가</button>
      </div>
      <ul className="list">
        {listItems.map((item, itemIndex) => (
          <li className="list-item" key={itemIndex}>
            <span className="item-text">{item.text}</span>
            <ul className="vote-buttons">
              {!item.voted && (
                <>
                  <li>
                    <button onClick={() => handleVote(itemIndex, 0)}>인정</button>
                  </li>
                  <li>
                    <button onClick={() => handleVote(itemIndex, 1)}>노인정</button>
                  </li>
                  <li>
                    <button onClick={() => handleVote(itemIndex, 2)}>몰랐음</button>
                  </li>
                </>
              )}
            </ul>
            {item.voted && (
              <div className="vote-result">
                <p>투표 수:</p>
                <ul>
                  <li>인정 - {item.votes[0]} 표</li>
                  <li>노인정 - {item.votes[1]} 표</li>
                  <li>몰랐음 - {item.votes[2]} 표</li>
                </ul>
                <p>총 점수: {calculateTotalScore(item.votes)}</p>
              </div>
            )}
            <p className="item-date">등록일: {item.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
