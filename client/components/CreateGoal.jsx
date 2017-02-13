import React from 'react';


export default function CreateGoal({dispatch}){
    let goalName = null;
    let goalAmount = null;
    let goalTimeframe = null;

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(goalName.value)
        console.log(goalAmount.value)
        console.log(goalTimeframe.value)
        // dispatch(createGoal({
        //   goalName: goalName.value,
        //   goalAmount: goalAmount.value,
        //   goalTimeframe: goalTimeframe.value
        // }));
    };

    return (
      <form action="#" onSubmit={submitHandler}>
          <h3>Create A Goal</h3>
          <input className="inputsize" placeholder="Name your budget" ref={(ref) => { goalName = ref;}}/>
          <input className="inputsize" placeholder="Enter amount" ref={(ref) => { goalAmount = ref;}}/>
          <input className="inputsize" placeholder="Enter timeframe" ref={(ref) => { goalTimeframe = ref; }}/>
          <button type="submit">Submit</button>
      </form>
    );
};

    {/*
      2 options -
      - this can be an input where users provide a budget limit, and an actual
        goal component is created below it, or
      - this component takes input AND transforms into the goal record itself
    */}

