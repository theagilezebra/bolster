import React from 'react';
const JumbotronTwo = props => (
  <div className="centertext whiteback">
    <h1>How Does Bolster Work?</h1>
    {/* <button type="button" className="btn" data-toggle="collapse" data-target="#intro"><span className="glyphicon glyphicon-menu-down" /></button>*/}
    <div id="intro" className="container-fluid centertext introdiv" >
      <div className="row whiteback explainerdiv">
        <div className="col-md-12 bigquick">You plug in your transaction data. It's easy and we never share your data.</div>
      </div>
      <div className="row whiteback explainerdiv">
        <div className="col-md-12 bigquick">We crunch the numbers</div>
      </div>
      <div className="row whiteback explainerdiv">
        <div className="col-md-12 bigquick">You get lots of fancy charts </div>
      </div>
      <div className="row whiteback explainerdiv">
        <div className="col-md-12 bigquick">We present you with games designed to help you reduce spending</div>
      </div>
      <div className="row whiteback explainerdiv">
        <div className="col-md-12 bigquick">You win at life </div>
      </div>
      <h1>It's that easy</h1>
    </div>
  </div>
);

export default JumbotronTwo;
