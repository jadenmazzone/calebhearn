import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Result from './Result';

const options = [
  { name: 'Called you “bestie,” “best friend,” or “homie?” ' },
  { name: "Invited another person to dinner when it’s supposed to just be the two of you?" },
  { name: "Asked you for advice about their ex or told you about a recent date they went on?" },
  { name: "Tried setting you up with someone else or told you that you’d be perfect with one of their friends?" },
  { name: "Told you that they aren't looking for anything serious right now?" },
  { name: 'Canceled plans on you an hour before because they\'re "too tired"?' },
  { name: "Said “you’re like a brother/sister to me”? " },
  { name: "Never complimented you back after you told them how great they look?" },
  { name: "Told you how “hot” your friend is?" },
  { name: "Told you that if you're both not married by 40, then you'll get married to each other?" },



]

function App() {
  const [result, setResult] = useState("")
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [checkboxes, setCheckboxes] = useState(options.map((option, idx) => {
    return { ...option, index: idx, checked: false }
  }))


  useEffect(() => {
    document.title = "The Friend Zone Test"
  }, []);


  useEffect(() => {
    let total = 0
    checkboxes.forEach((checkbox, i) => checkbox.checked ? total += 1 : null);
    setScore(total)
  }, [checkboxes])

  function handleChange(e) {
    console.log(e.target.value)
    setCheckboxes(
      checkboxes.map((checkbox) => {
        return e.target.value == checkbox.index ? { ...checkbox, checked: !checkbox.checked } : checkbox
      })
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    setResult(getResult())
    setShowResult(true)
  }

  function getResult() {
    let result = "nah you're not in the friendzone. good for you ❤️"
    if (score >= 5) {
      result = "you're definitely in the friendzone. sorry bud."
    }
    if (score >= 3 && score <= 4) {
      result = "you might be in the friendzone 😬 looks like someone's got some mixed signals. "
    }
    return result
  }

  function handleRestart() {
    setCheckboxes(options.map((option, idx) => {
      return { ...option, index: idx, checked: false }
    }))
    setShowResult(false)
    setResult("")
    setScore(0)
  }


  return (
    <div className='bg-lightBlue h-screen w-full p-4'>
      <iframe className='rounded' src="https://open.spotify.com/embed/track/440H25G5ApUQu9YIRnGh6L?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
      <h1 className='text-darkBlue text-3xl my-4 '>Take this quiz to see if you're in the friend zone</h1>
      <p className='text-darkBlue font-bold'>Answer all of the questions below to figure out whether you are in the friend zone</p>
      <form onSubmit={handleSubmit} className="mt-4 ml-8 text-sm sm:text-base">
        <ol className='list-decimal pl-7'>
          {
            checkboxes.map((checkbox) => (
              <li key={checkbox.index}>
                <input type="checkbox" name={checkbox.name} value={checkbox.index} checked={checkbox.checked} onChange={handleChange} />
                <label className='ml-2'>{checkbox.name}</label>
              </li>
            ))
          }
        </ol>
        {
          showResult ? <Result result={result} /> : <></>
        }
        <button className='bg-darkBlue text-white rounded p-2 mt-8'>calculate friend zone score</button>
        <button onClick={handleRestart} type='button' className='bg-darkBlue text-white rounded p-2 ml-4'>restart quiz</button>
      </form>

    </div>
  );
}

export default App;
