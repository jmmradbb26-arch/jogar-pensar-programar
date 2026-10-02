import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createBoardState, movePiece } from "../assets/js/board.mjs";
import { evaluateSequence, goalReached, evaluateAnalysisChoice } from "../assets/js/sequence.mjs";
import { attemptFeedback, analysisFeedback } from "../assets/js/feedback.mjs";
import { getAdvanceAction, nextChallengeButtonMarkup } from "../assets/js/progression.mjs";
import { ensureServiceWorkerControl } from "../assets/js/offline-control.mjs";

const challenges=JSON.parse(await readFile(new URL("../assets/data/challenges.json",import.meta.url),"utf8"));
const games=JSON.parse(await readFile(new URL("../assets/data/games.json",import.meta.url),"utf8"));
const serviceWorkerSource=await readFile(new URL("../service-worker.js",import.meta.url),"utf8");
const appSource=await readFile(new URL("../assets/js/app.mjs",import.meta.url),"utf8");
const byLevel=(level)=>challenges.find(c=>c.level===level);

test("tabuleiro só permite movimentos por conexões e rejeita casas bloqueadas",()=>{
  const challenge=byLevel("final"),state=createBoardState(challenge.board);
  assert.equal(movePiece(state,{type:"move",from:"A1",to:"B1"}).ok,true);
  assert.equal(movePiece(state,{type:"move",from:"A1",to:"C1"}).reason,"sem-ligacao");
  assert.equal(movePiece(state,{type:"move",from:"A1",to:"B2"}).reason,"bloqueado");
});

test("todas as atividades têm dados completos e jogos candidatos das duas matrizes",()=>{
  assert.deepEqual(new Set(challenges.map(c=>c.level)),new Set(["identify","analyze","create","final"]));
  assert.ok(games.some(g=>g.matrix==="indigenous")); assert.ok(games.some(g=>g.matrix==="african"));
 assert.ok(games.every(g=>g.reviewStatus==="approved"));
  assert.ok(challenges.every(c=>c.curriculumSkills.includes("EF03CO01")&&c.curriculumSkills.includes("EF35EF01")));
});

test("cada desafio aceita uma sequência válida e explica uma sequência inválida",()=>{
  for(const challenge of challenges){
    const valid=evaluateSequence(challenge,challenge.testCases.valid);
    const invalid=evaluateSequence(challenge,challenge.testCases.invalid);
    assert.equal(valid.status,"success",challenge.id); assert.equal(goalReached(valid.finalState,challenge.goal),true,challenge.id);
    assert.equal(invalid.status,"invalid",challenge.id); assert.ok(attemptFeedback(challenge,invalid).text.length>10,challenge.id);
  }
});

test("comandos condicionais e tipos desconhecidos são recusados",()=>{
  const challenge=byLevel("create");
  assert.equal(evaluateSequence(challenge,[{type:"if"}]).status,"invalid");
  assert.equal(evaluateSequence(challenge,[{type:"repeat"}]).status,"invalid");
});

test("identificar distingue escolhas corretas, incorretas e orienta nova tentativa",()=>{
  const challenge=byLevel("identify");
  assert.equal(evaluateSequence(challenge,challenge.choices[0].steps).status,"success");
  assert.equal(evaluateSequence(challenge,challenge.choices[1].steps).status,"incomplete");
  assert.match(attemptFeedback(challenge,evaluateSequence(challenge,[])).text,/acrescente/i);
});

test("analisar referencia comando problemático e aceita solução corrigida",()=>{
  const challenge=byLevel("analyze"),result=evaluateSequence(challenge,challenge.providedSequence);
  const problematic=challenge.analysisChoices.find(c=>c.target.kind==="command"&&c.correct);
  const wrong=challenge.analysisChoices.find(c=>!c.correct);
  assert.equal(result.error.index,1); assert.equal(evaluateAnalysisChoice(challenge,problematic,result),true);
  assert.equal(evaluateAnalysisChoice(challenge,wrong,result),false);
  assert.equal(evaluateSequence(challenge,challenge.testCases.valid).status,"success");
  assert.ok(challenge.analysisChoices.every(c=>c.target.kind==="command"));
  assert.equal(challenge.instructions,"Observe a sequência e escolha o comando que interrompe o caminho.");
  assert.doesNotMatch(appSource,/Ou escolha um resultado observado/);
  assert.match(appSource,/Tentar novamente/);
  assert.match(appSource,/Ver.*sequência e resultado/);
  assert.match(appSource,/interrompe o caminho porque/);
  assert.match(analysisFeedback(challenge,false,2).text,/veja/i);
});

test("criar e desafio final permitem solução alternativa, sequência vazia e revisão",()=>{
  const challenge=byLevel("final"),alternative=[{type:"move",from:"A1",to:"A2"},{type:"move",from:"A2",to:"C2"}];
  assert.equal(evaluateSequence(challenge,alternative).status,"success");
  const valid=[{type:"move",from:"A1",to:"B1"},{type:"move",from:"B1",to:"C1"},{type:"move",from:"C1",to:"C2"}];
  assert.equal(evaluateSequence(challenge,valid).status,"success");
  assert.equal(evaluateSequence(challenge,[]).status,"incomplete");
});

test("completion button appears only after success and follows challenge order",()=>{
  const first=byLevel("identify"),next={...first,id:"identificar-onca-02"};
  const ordered=[first,next,...challenges.filter(c=>c.id!==first.id)];
  const action=getAdvanceAction(ordered,first);
  assert.equal(action.type,"challenge");
  assert.equal(action.challengeId,next.id);
  assert.equal(action.label,"Pr\u00f3ximo desafio");
  assert.equal(nextChallengeButtonMarkup({status:"incomplete"},action),"");
  assert.match(nextChallengeButtonMarkup({status:"success"},action),/<button[^>]*id="next-challenge"[^>]*>Pr\u00f3ximo desafio<\/button>/);
});

test("last challenge advances to the next level and final level can be completed",()=>{
  const identify=byLevel("identify"),final=byLevel("final");
  assert.deepEqual(getAdvanceAction(challenges,identify),{type:"level",label:"Ir para o pr\u00f3ximo n\u00edvel",level:"analyze"});
  assert.deepEqual(getAdvanceAction(challenges,final),{type:"complete",label:"Concluir n\u00edvel"});
  assert.match(nextChallengeButtonMarkup({status:"success"},getAdvanceAction(challenges,final)),/Concluir n\u00edvel/);
});

test("offline control uses an existing controller without requesting another claim",async()=>{
  let claims=0;
  const controller={postMessage(){claims++;}};
  const container={controller,addEventListener(){},removeEventListener(){}};
  assert.equal(await ensureServiceWorkerControl(container,{active:controller}),controller);
  assert.equal(claims,0);
});

test("first offline load explicitly asks the active worker to claim the page",async()=>{
  const listeners=new Set();
  const container={
    controller:null,
    addEventListener(_type,listener){listeners.add(listener);},
    removeEventListener(_type,listener){listeners.delete(listener);}
  };
  const activeWorker={postMessage(message,ports){
    assert.deepEqual(message,{type:"CLAIM_CLIENTS"});
    setTimeout(()=>{
      container.controller=activeWorker;
      for(const listener of listeners)listener();
      ports[0].postMessage({claimed:true});
    },0);
  }};
  assert.equal(await ensureServiceWorkerControl(container,{active:activeWorker}),activeWorker);
  assert.match(serviceWorkerSource,/type!=="CLAIM_CLIENTS"/);
  assert.match(serviceWorkerSource,/await self\.clients\.claim\(\);event\.ports\?\.\[0\]\?\.postMessage\(\{claimed:true\}\)/);
});

test("offline bootstrap registers root scope and confirms control before cache readiness",()=>{
  const registerIndex=appSource.indexOf("navigator.serviceWorker.register(");
  const readyIndex=appSource.indexOf("await navigator.serviceWorker.ready",registerIndex);
  const controlIndex=appSource.indexOf("ensureServiceWorkerControl(navigator.serviceWorker,registration)",readyIndex);
  const cacheCheckIndex=appSource.indexOf('type:"CHECK_READY"',controlIndex);
  assert.ok(registerIndex>=0&&readyIndex>registerIndex&&controlIndex>readyIndex&&cacheCheckIndex>controlIndex);
  assert.match(appSource,/scope:new URL\("\.\.\/\.\.\/",import\.meta\.url\)\.pathname/);
  assert.match(serviceWorkerSource,/await self\.skipWaiting\(\)/);
  assert.match(serviceWorkerSource,/await self\.clients\.claim\(\)/);
  assert.match(serviceWorkerSource,/CACHE_NAME="jogar-pensar-programar-v6"/);
  assert.match(serviceWorkerSource,/\.\/assets\/js\/offline-control\.mjs/);
});
