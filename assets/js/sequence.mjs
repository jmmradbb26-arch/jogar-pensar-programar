import { createBoardState, movePiece } from "./board.mjs";

export function isFiniteAllowed(sequence, challenge) {
  return Array.isArray(sequence) && sequence.every((step) => step && challenge.allowedCommands.includes(step.type) && step.type !== "repeat" && step.type !== "if");
}

export function goalReached(state, goal) { return state.pieces[goal.pieceId] === goal.cell; }

export function evaluateSequence(challenge, sequence) {
  if (!isFiniteAllowed(sequence, challenge)) return {status:"invalid", reason:"comando-nao-permitido", states:[], finalState:createBoardState(challenge.board), goalReached:false};
  let state=createBoardState(challenge.board); const states=[state]; let error=null;
  for(let index=0;index<sequence.length;index++) {
    const result=movePiece(state,sequence[index]);
    if(!result.ok){error={index,reason:result.reason,command:sequence[index]};break;}
    state=result.state;states.push(state);
  }
  const reached=goalReached(state,challenge.goal);
  return {status:error?"invalid":reached?"success":"incomplete",reason:error?.reason??null,error,states,finalState:state,goalReached:reached,trace:states.slice(1).map((snapshot,index)=>({step:index,state:snapshot}))};
}

export function evaluateAnalysisChoice(challenge, choice, result) {
  const target=choice?.target;
  if(!target) return false;
  if(target.kind==="command") return result.error?.index===target.step && choice.correct===true;
  if(target.kind==="outcome") return target.step>=0 && target.step<result.states.length && target.step===result.error?.index && choice.correct===true;
  return false;
}
