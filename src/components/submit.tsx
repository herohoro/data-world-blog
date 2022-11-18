import React, { useState } from 'react'
import axios from 'axios'
import styles from '../styles/submit.module.css'
import SubmitStyles from '../styles/submit.module.css'

type Props = {
  id: string
  text: string
  trans: string
  urname: string
}

const SubmitForm = (props: Props) => {
  //   const [count, setCount] = useState('')
  //   const [active, setActive] = useState(false)
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
  }
  //   const handleClick = () => {
  // if (!active) {
  //   axios.put(`/api/like?slug=${props.id}`, {})
  //   setActive(true)
  //   setCount(count + 1)
  // }
  //   }

  return (
    <>
      {/* <button className={styles.likeButton} onClick={handleClick}>
        <p>へろちゃんへsubmit 🚀</p>
        <Heart width={32} height={32} active={active} />
        <div className={styles.likeCount}>{count === null ? 0 : count} </div>
      </button> */}

      <div className={SubmitStyles.subsec}>
        <div className={SubmitStyles.box}>
          <div className={SubmitStyles.form}>
            <h3> Everyone's Words</h3>
            <div className={SubmitStyles.inputBox}>
              <label>
                Text:
                <textarea
                  className={SubmitStyles.input}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </label>
            </div>
            <div className={SubmitStyles.inputBox}>
              <label>
                Translation:
                <textarea
                  className={SubmitStyles.input}
                  value={trans}
                  onChange={(e) => setTrans(e.target.value)}
                />
              </label>
            </div>
            <div className={SubmitStyles.inputBox}>
              <label>
                Your name:
                <input
                  className={SubmitStyles.input}
                  value={urname}
                  onChange={(e) => setUrname(e.target.value)}
                />
              </label>
            </div>
            <button className={SubmitStyles.submit} onClick={onClickSubmit}>
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
