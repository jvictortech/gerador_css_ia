let botão = document.querySelector(".botao-gerar");

async function gerarCodigo() {
  let textousuario = document.querySelector(".caixa-texto").value;
  let blococodigo = document.querySelector(".bloco-codigo");
  let resultadocodigo = document.querySelector(".resultado-codigo");

  try {
    const resposta = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: textousuario })
    });

    const dados = await resposta.json();
    const resultado = dados.choices[0].message.content;

    blococodigo.textContent = resultado;
    resultadocodigo.srcdoc = resultado;

  } catch (err) {
    console.error(err);
    blococodigo.textContent = "Erro ao gerar código";
    resultadocodigo.srcdoc = "";
  }
}

botão.addEventListener("click", gerarCodigo);
