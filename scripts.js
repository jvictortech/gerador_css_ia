let botão = document.querySelector(".botao-gerar");
let chave = "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";
let endereco = "https://api.groq.com/openai/v1/chat/completions"
async function gerarCodigo() {
    let textousuario = document.querySelector(".caixa-texto").value;
    let blococodigo = document.querySelector(".bloco-codigo");
    let resultadocodigo = document.querySelector(".resultado-codigo");
    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${chave}`
        },
        body: JSON.stringify({
            model: "openai/gpt-oss-120b",
            messages: [{
                role: "system",
                content: "Você Você é um gerador de código HTML e CSS. Responda SOMENTE com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate."
    },
    {                role: "user",
                content: textousuario
            }]
        })
,    });

let dados = await resposta.json();
let resultado = dados.choices[0].message.content;
blococodigo.textContent = resultado;
resultadocodigo.srcdoc = resultado;
};
botão.addEventListener("click", gerarCodigo);

