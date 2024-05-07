import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './styles.css';

function NewTodo({ onNewTodo }) {
  const SCAPE_KEY = 27;
  const ENTER_KEY = 13;
  const [value, setValue] = useState('');
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots.length < 3) {
          return `${prevDots  }.`;
        }
        return '';

      });
    }, 500);

    return () => clearInterval(interval);
  }, []); // Executar apenas uma vez quando o componente é montado

  const erase = () => {
    setValue('');
  }

  const submit = () => {
    if (onNewTodo) {
      onNewTodo(value);
      erase();
    }
  }

  const onChange = (event) => {
    setValue(event.target.value);
  }
  const onKeyDown = (event) => {
    if (event.which === ENTER_KEY) {
      submit();
    } else if (event.which === SCAPE_KEY) {
      erase();
    }
  }

  return (
    <input className='new-todo' placeholder={`what to do?${dots}`} value={value} onChange={onChange} onKeyDown={onKeyDown} />
  )
}

NewTodo.propTypes = {
  onNewTodo: PropTypes.func.isRequired,
};

export default NewTodo;
