import React, { useState } from 'react'
import axios from 'axios'

import styles from '../styles/submit.module.css'

const SubmitForm = () => {
  const [text, setText] = useState('')
  const [addText, setAddText] = useState('')
  const [trans, setTrans] = useState('')
  const [addTrans, setAddTrans] = useState('')
  const [urname, setUrname] = useState('')
  const [addUrname, setAddUrname] = useState('')

  const onClickSubmit = () => {
    setText('')
    setAddText(text)
    setTrans('')
    setAddTrans(trans)

    setUrname('')
    setAddUrname(urname)
    const apiPost = {
      Text: text,
      Trans: trans,
      EditedPerson: urname,
    }
    axios.post(`/api/submit`, apiPost)
  }

  return (
    <>
      <div className={styles.subsec}>
        <div className={styles.box}>
          <div className={styles.form}>
            <h3> Everyone&apos;s Words</h3>
            <div className={styles.inputBox}>
              <label>
                Text:
                <textarea
                  className={styles.input}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.inputBox}>
              <label>
                Translation:
                <textarea
                  className={styles.input}
                  value={trans}
                  onChange={(e) => setTrans(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.inputBox}>
              <label>
                Your name:
                <input
                  className={styles.input}
                  value={urname}
                  onChange={(e) => setUrname(e.target.value)}
                />
              </label>
            </div>
            <button className={styles.submit} onClick={onClickSubmit}>
              submit
            </button>
            <p>Text送信：{addText}</p>
            <p>Trans送信：{addTrans}</p>
            <p>Urname送信：{addUrname}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubmitForm
