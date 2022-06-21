import React from "react";
import Dice from "./Dice";

function App() {

  const [dices, setDices] = React.useState([])

  const [selected, setSelected] = React.useState(-1)

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)+1;
  }

 React.useEffect(
  () => {
    console.log("Initializing Dices!")
    if(dices.length===0)
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []
 )

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
      <div className="tenzies--container">
        <div className="tenzies--tittle">Tenzies</div>
        <div className="tenzies--subtittle">Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.</div>
        <div className="tenzies--dices--container">{dicesElements}</div>
        <div className="tenzies--roll--button"
          onClick={rollDice}>
          <p className="tenzies--roll--button--text">Roll</p>
        </div>
      </div>
    </main>
  );
}

export default App;
