type Ponto = {
  x: number;
  y: number;
};

type Movimento = {
  velocidade: number;
  direcao: number;
};

// Função auxiliar para calcular a posição de um ponto após um tempo 't'
// function calcularPosicaoInicial(
//   ponto: Ponto,
//   movimento: Movimento,
//   t: number
// ): Ponto {
//   return {
//     x: ponto.x + movimento.velocidade * t * Math.cos(movimento.direcao),
//     y: ponto.y + movimento.velocidade * t * Math.sin(movimento.direcao),
//   };
// }

// Função principal para calcular o tempo de colisão
export function CalculateCollisionPoint(
  pontoA: Ponto,
  movimentoA: Movimento,
  pontoB: Ponto,
  movimentoB: Movimento
): number | null {
  const mA = Math.tan(45);

  console.log(mA);

  return null;
}
