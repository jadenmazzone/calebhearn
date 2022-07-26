import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Result from './Result';
import { Helmet } from 'react-helmet';

const options = [
  { name: 'Called you “bestie,” “best friend,” or “homie”? ' },
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
  const [result, setResult] = useState({ description: "", title: "" })
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [checkboxes, setCheckboxes] = useState(options.map((option, idx) => {
    return { ...option, index: idx, checked: false }
  }))

  function closeModal() {
    setShowResult(false)
  }

  function openModal() {
    setShowResult(true)
  }


  useEffect(() => {
    document.title = "The Friendzone Test"
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
    const arrayDesc1 = ["u did good", "congrats :)", "ohhhh she likes uuuu", "Text her rn"]
    const arrayDesc2 = ["hmmmmmm", "maybe", "could be worse"]
    const arrayDesc3 = ["Do u need a hug?", "Are u ok?", "u can do better...maybe", "maybe it wasn't meant to be?", "😬", "oh dear..."]

    var desc1 = arrayDesc1[Math.floor(Math.random() * arrayDesc1.length)];
    var desc2 = arrayDesc2[Math.floor(Math.random() * arrayDesc2.length)];
    var desc3 = arrayDesc3[Math.floor(Math.random() * arrayDesc3.length)];


    let result = { description: "nah you're not in the friendzone. good for you ❤️", title: desc1 }

    if (score >= 5) {
      result = { description: "you're definitely in the friendzone. sorry bud.", title: desc3 }
    }
    if (score >= 3 && score <= 4) {
      result = { description: "you might be in the friendzone 😬 looks like someone's got some mixed signals. ", title: desc2 }
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
      <Helmet>
        <title>The Friend Zone Test</title>
        <meta name='description' content="Take this test to find out whether you are in the Friend Zone, inspired by Caleb Hearn's latest single 'Friend Right Now' " />
      </Helmet>
      <iframe className="rounded" src="https://open.spotify.com/embed/track/1525qKTOc3G2KJNYRG3rSQ?utm_source=generator" width="100%" height="80" frameBorder="0" allowFullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
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

        <button className='bg-darkBlue text-white rounded p-2 mt-8'>calculate friend zone score</button>
        <Result description={result.description} title={result.title} isOpen={showResult} closeModal={closeModal} />

        <button onClick={handleRestart} type='button' className='bg-darkBlue text-white rounded p-2 ml-4'>restart quiz</button>
      </form>

    </div>
  );
}

export default App;
