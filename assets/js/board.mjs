export function createBoardState(board) {
  const cells = new Set(board.cells.map((cell) => cell.id));
  return { pieces: Object.fromEntries(board.initialPieces.map((piece) => [piece.id, piece.cell])), blocked: new Set(board.blockedCells ?? []), targets: new Set(board.initialPieces.filter(piece => piece.role === "alvo").map(piece => piece.cell)), connections: board.connections.map(([a,b]) => [a,b]), cells };
}

export function movePiece(state, command) {
  const { from, to, pieceId = "jogador" } = command;
  if (!state.cells.has(from) || !state.cells.has(to)) return { ok:false, reason:"fora-tabuleiro", state };
  if (state.blocked.has(to)) return { ok:false, reason:"bloqueado", state };
  if (state.pieces[pieceId] !== from) return { ok:false, reason:"origem-incorreta", state };
  if (Object.entries(state.pieces).some(([id, cell]) => id !== pieceId && cell === to && !state.targets.has(to))) return { ok:false, reason:"ocupado", state };
  const legal = state.connections.some(([a,b]) => (a === from && b === to) || (a === to && b === from));
  if (!legal) return { ok:false, reason:"sem-ligacao", state };
  return { ok:true, reason:null, state:{...state, pieces:{...state.pieces,[pieceId]:to}} };
}

export function renderBoard(board, state, { selectedCell = null } = {}) {
  const xs=board.cells.map(c=>c.x), ys=board.cells.map(c=>c.y), maxX=Math.max(...xs), maxY=Math.max(...ys);
  const px=(x)=>35+x*100, py=(y)=>35+y*100;
  const lines=board.connections.map(([a,b])=>{const c1=board.cells.find(c=>c.id===a),c2=board.cells.find(c=>c.id===b);return `<line x1="${px(c1.x)}" y1="${py(c1.y)}" x2="${px(c2.x)}" y2="${py(c2.y)}"/>`;}).join("");
  const cells=board.cells.map(c=>`<g><circle class="cell${selectedCell===c.id?' selected':''}" cx="${px(c.x)}" cy="${py(c.y)}" r="23"/><text x="${px(c.x)}" y="${py(c.y)+42}" text-anchor="middle">${c.id}${state.blocked.has(c.id)?' (bloqueado)':''}</text></g>`).join("");
  const pieces=Object.entries(state.pieces).map(([id,cell])=>{const c=board.cells.find(v=>v.id===cell);const target=board.initialPieces.find(p=>p.id===id);return id==="territorio"?`<polygon class="piece opponent" points="${px(c.x)},${py(c.y)-15} ${px(c.x)+15},${py(c.y)} ${px(c.x)},${py(c.y)+15} ${px(c.x)-15},${py(c.y)}"><title>${target?.role??id} em ${cell}</title></polygon>`:`<circle class="piece" cx="${px(c.x)}" cy="${py(c.y)}" r="13"><title>${target?.role??id} em ${cell}</title></circle>`;}).join("");
  return `<svg class="board" viewBox="0 0 ${70+maxX*100} ${80+maxY*100}" role="img" aria-label="Tabuleiro: ${Object.entries(state.pieces).map(([id,cell])=>`${board.initialPieces.find(p=>p.id===id)?.role??id} em ${cell}`).join('; ')}">${lines}${cells}${pieces}</svg>`;
}
