import React, { useState } from 'react'
import axios from 'axios'

import styles from '../styles/submit.module.css'

const SubmitForm = () => {
  const [text, setText] = useState('')
  const [preText, setPreText] = useState('')
  const [addText, setAddText] = useState('')

  const [trans, setTrans] = useState('')
  const [addTrans, setAddTrans] = useState('')
  const [preTrans, setPreTrans] = useState('')

  const [urname, setUrname] = useState('')
  const [addUrname, setAddUrname] = useState('')
  const [preUrname, setPreUrname] = useState('')

  const [preMessage, setPreMessage] = useState('')

  const [addPras, setAddPras] = useState('')
  const [addStage, setAddStage] = useState('')

  const onCheckPreview = () => {
    setPreText(text)
    setPreTrans(trans)
    setPreUrname(urname)
    setPreMessage('🐣 OK??   Go to submit ▼')
  }
  const onClickSubmit = () => {
    setText('')
    setAddText(text)
    setTrans('')
    setAddTrans(trans)
    setUrname('')
    setAddUrname(urname)
    setAddPras(' + ')
    setAddStage(
      'When you refresh the page, the following cards will be added !!'
    )
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
          <div className={styles.rollArea}>
            <h3> Everyone&apos;s Words</h3>
            <div className={styles.flexWraper}>
              <div className={styles.form}>
                <div className={styles.inputBox}>
                  <label className={styles.lavel}>
                    Text:
                    <textarea
                      className={styles.input}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </label>
                </div>
                <div className={styles.inputBox}>
                  <label className={styles.lavel}>
                    Translation:
                    <textarea
                      className={styles.input}
                      value={trans}
                      onChange={(e) => setTrans(e.target.value)}
                    />
                  </label>
                </div>
                <div className={styles.inputBox}>
                  <label className={styles.lavel}>
                    Your name:
                    <input
                      className={styles.input}
                      value={urname}
                      onChange={(e) => setUrname(e.target.value)}
                    />
                  </label>
                </div>
                <button className={styles.preview} onClick={onCheckPreview}>
                  Preview
                </button>
              </div>

              <div className={styles.previewSec}>
                <h4>Preview：</h4>
                <div className={styles.previewBox}>
                  <p>＼ みんなの単語帳 ／</p>
                  <p>{preText}</p>
                  <p>意味：{preTrans}</p>
                  <p style={{ color: '#45f3ff', fontSize: '0.8em' }}>
                    {' '}
                    &#9839;{preUrname}_ひよこ &#9839;日本語 &#9839;English
                    &#9839;世界の言葉
                  </p>
                </div>
                <p>{preMessage}</p>
                <button className={styles.submit} onClick={onClickSubmit}>
                  submit
                </button>
                <p>
                  {addText}
                  {addPras}
                  {addTrans}
                  {addPras}
                  {addUrname}
                </p>
                <p style={{ color: '#d932ff', fontSize: '1.2em' }}>
                  {addStage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubmitForm
