export function attemptFeedback(challenge, result) {
  if(result.status==="success") return {kind:"success",title:"Conseguiu!",text:challenge.feedback.success};
  if(result.status==="invalid") {
    const reason=result.error?.reason;
    const observed={
      bloqueado:"O destino escolhido está bloqueado. Sua peça ficou na casa anterior.",
      "origem-incorreta":"A peça não está na casa indicada como origem. Confira onde ela ficou no passo anterior.",
      ocupado:"Já existe outra peça nessa casa. Escolha outro destino ligado.",
      "sem-ligacao":"Essas duas casas não têm uma ligação direta. Observe as linhas do tabuleiro.",
      "fora-tabuleiro":"Uma das casas não existe neste tabuleiro. Confira os nomes das casas."
    }[reason]??challenge.feedback.invalid;
    return {kind:"retry",title:"Vamos observar",text:`${observed} ${challenge.feedback.retry}`};
  }
  if(result.status==="incomplete" && result.states.length===1) return {kind:"retry",title:"Sua sequência está vazia",text:`${challenge.feedback.retry} Acrescente um comando para começar.`};
  return {kind:"retry",title:"Ainda não chegou ao objetivo",text:`${challenge.feedback.retry} ${challenge.goal.label}`};
}

export function analysisFeedback(challenge, correct, attempts=0) {
  if(correct) return {kind:"success",title:"Boa análise!",text:challenge.feedback.success};
  return {kind:"retry",title:"Tente observar de novo",text:attempts>1?"Veja o lugar onde a peça ficou e confira quais casas estão ligadas.":challenge.feedback.retry};
}
