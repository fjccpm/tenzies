import React from "react";
import Dice from "./Dice";
import Confetti from "react-confetti";
//import useWindowSize from 'react-use/lib/useWindowSize'

function App() {

  const [dices, setDices] = React.useState([])

  //selected is set with the value of the first dice blocked. 
  const [selected, setSelected] = React.useState(-1)

  //tenzies will change tu true when you win game.
  const [tenzies, setTenzies] = React.useState(false)

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)+1;
  }

/*React.useEffect(
  () => {
    if(selected!==-1)
    {
      let temp=true
      for(let i=0; i<10; i++)
      {
        if(dices[i].value!==selected) {
          temp=false
        }  
      }
      setTenzies(temp)
      
      if(tenzies) {
       alert("you win!!!")
      }
    }
    // eslint-disable-next-line
  }, [dices]
)*/

React.useEffect(
  () => {
      if(selected !== -1)
      {
        const allBlocked = dices.every(die => die.on===true)
        const allEqual = dices.every(die => die.value===selected)
        if(allBlocked && allEqual)
        {
          setTenzies(true)
          //alert("You Win!!!")
        }
      }
    // eslint-disable-next-line
  }, [dices]
)

 React.useEffect(
  () => {
    initializeGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []
 )

 function initializeGame() {
  console.log("Initializing Dices!")
  if(dices.length===0 || tenzies)
    {
      let temp=[]
      for(let i=0; i<10; i++)
      { 
      //console.log(i)
        temp = [...temp, 
            {
              id: i,
              on: false,
              value: getRandomInt(6)
            }]
      }
      setDices(temp)
      setTenzies(false)
    }
 }

 function block(id) {
  let temp
  if(selected===-1)
  {
    temp=dices[id].value;
  }
  else
  {
    temp=selected;
  }

  setDices(
      prev => (
          prev.map(
              eachDice => (eachDice.id===id && eachDice.value===temp) ? 
                {...eachDice, on: !eachDice.on} : eachDice
          )
      )
  )
  if(selected===-1)
  {
    setSelected(dices[id].value);
  }
}

function rollDice() {
  if(tenzies)
  {
    initializeGame()
  }
  else {
    let temp=[]
      for(let i=0; i<10; i++)
      { 
      //console.log(i)
        temp = [...temp, 
            {
              id: i,
              on: dices[i].on,
              value: dices[i].on === false ? getRandomInt(6) : dices[i].value
            }]
      }
      setDices(temp)
    }
}

 const dicesElements = dices.map(dice => (
  <Dice 
      key={dice.id} 
      id={dice.id} 
      on={dice.on}
      value={dice.value} 
      block={block}/>
  )
)
 
  return (
    <main className="tenzies--main">
      {tenzies && <Confetti />}
      <div className="tenzies--container">
        <div className="tenzies--tittle">Tenzies</div>
        <div className="tenzies--subtittle">Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.</div>
        <div className="tenzies--dices--container">{dicesElements}</div>
        <div className="tenzies--roll--button"
          onClick={rollDice}>
          <p className="tenzies--roll--button--text">{tenzies ? "Restart" : "Roll"}</p>
        </div>
      </div>
    </main>
  );
}

export default App;
