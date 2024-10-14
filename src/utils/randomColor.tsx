export default function gerarCorHexadecimal() {
  let corHex;
  let corValida = false;
  const coresGeradas = [];
  while (!corValida) {
    // Gerar valores aleatórios entre 0 e 255 para cada componente (R, G, B)
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Converter os valores para hexadecimal e garantir que tenham 2 dígitos
    corHex = `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

    // Verificar se a cor já foi gerada anteriormente ou se é muito próxima de outra
    corValida = !coresGeradas.includes(corHex);

    // Para garantir uma boa distinção entre as cores, podemos usar um critério baseado na diferença das componentes
    if (corValida) {
      coresGeradas.push(corHex);
    }
  }

  return corHex;
}
