import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        if (secondValue === 0) {
          return 'Error';
        }
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    
    if (key >= '0' && key <= '9') {
      inputNumber(parseInt(key));
    } else if (key === '.') {
      inputDecimal();
    } else if (key === '+') {
      performOperation('+');
    } else if (key === '-') {
      performOperation('-');
    } else if (key === '*') {
      performOperation('×');
    } else if (key === '/') {
      event.preventDefault();
      performOperation('÷');
    } else if (key === 'Enter' || key === '=') {
      handleEquals();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
      clear();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  return (
    <div className="calculator">
      <div className="display">
        <div className="display-value">{display}</div>
      </div>
      <div className="button-grid">
        <button className="button button-clear" onClick={clear}>
          C
        </button>
        <button className="button button-operator" onClick={() => performOperation('÷')}>
          ÷
        </button>
        <button className="button button-operator" onClick={() => performOperation('×')}>
          ×
        </button>
        <button className="button button-operator" onClick={() => performOperation('-')}>
          −
        </button>
        
        <button className="button button-number" onClick={() => inputNumber(7)}>
          7
        </button>
        <button className="button button-number" onClick={() => inputNumber(8)}>
          8
        </button>
        <button className="button button-number" onClick={() => inputNumber(9)}>
          9
        </button>
        <button className="button button-operator" onClick={() => performOperation('+')}>
          +
        </button>
        
        <button className="button button-number" onClick={() => inputNumber(4)}>
          4
        </button>
        <button className="button button-number" onClick={() => inputNumber(5)}>
          5
        </button>
        <button className="button button-number" onClick={() => inputNumber(6)}>
          6
        </button>
        <button className="button button-equals" onClick={handleEquals}>
          =
        </button>
        
        <button className="button button-number" onClick={() => inputNumber(1)}>
          1
        </button>
        <button className="button button-number" onClick={() => inputNumber(2)}>
          2
        </button>
        <button className="button button-number" onClick={() => inputNumber(3)}>
          3
        </button>
        <button className="button button-number button-zero" onClick={() => inputNumber(0)}>
          0
        </button>
        
        <button className="button button-number" onClick={inputDecimal}>
          .
        </button>
      </div>
    </div>
  );
};

export default Calculator;
