import React from "react";

import Tangram from "./Tangram.jsx";
import Timer from "./Timer.jsx";
import { HTMLTable } from "@blueprintjs/core";
import { StageTimeWrapper } from "meteor/empirica:core";

export default class Task extends React.Component {
  constructor(props) {
    super(props);

    // We want each participant to see tangrams in a random but stable order
    // so we shuffle at the beginning and save in state
    this.state = {
      activeButton: false
    };
  }

  render() {
    const { game, round, stage, player } = this.props;
    const target = round.get("target");
    const tangramURLs = player.get('tangramURLs');
    const correct = player.get('clicked') == target
    let tangramsToRender;
    if (tangramURLs) {
      tangramsToRender = tangramURLs.map((tangram, i) => (
        <Tangram
          key={tangram}
          tangram={tangram}
          tangram_num={i}
          round={round}
          stage={stage}
          game={game}
          player={player}
          />
      ));
    }
      
    let role = ""
    if (stage.name=="selection"){
     role = (player.get('role')=="speaker"? "You are the speaker. Please describe the picture in the box to the other players.": 
    "You are a listener. Please click on the image that the speaker describes.")}
    if (stage.name=="feedback"){
      if (player.get('role')=='speaker'){
        role = round.get("countCorrect")+"/"+(game.treatment.playerCount-1)+ " listeners selected correctly!"
      }
      else if (player.get("clicked")==target){
        role = "Your selection is CORRECT!"
      }
      else if (player.get("clicked")==false){
        role = "You did not make a selection."
      }
      else{
        role = "Whoops, your selection was incorrect."
      }
    }
    return (
      <div className="task">
        <div className="board">
          <h1 className="roleIndicator"> {role}</h1>
          <div className="all-tangrams">
            <div className="tangrams">
              {tangramsToRender}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
