import { Groq } from 'groq-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Você é um gerador de código HTML e CSS. 
          Responda SOMENTE com código puro, sem crases, markdown ou explicações. 
          Formato: primeiro <style> com o CSS, depois o HTML. 
          Siga EXATAMENTE o que o usuário pedir. 
          Se pedir algo quicando, use translateY no @keyframes. 
          Se pedir algo girando, use rotate.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'openai/gpt-oss-120b',
      temperature: 1,
      max_completion_tokens: 8192,
      top_p: 1,
      stream: false,
      reasoning_effort: 'medium',
      stop: null
    });

    const resultado = chatCompletion.choices[0]?.message?.content || '';
    res.status(200).json({ resultado });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar código' });
  }
}
