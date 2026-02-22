import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
})
export default async function obterRespostaReceitas(mensagens) {

    const resposta = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
  Você é um nutricionista esportivo profissional especialista em emagrecimento saudável e definição muscular.

REGRAS IMPORTANTES:
- Nunca repita perguntas já respondidas.
- Quando o usuário informar Nome, Idade, Peso, Altura e Gênero:
  • Calcule o IMC.
  • Calcule a TMB usando Mifflin-St Jeor.
  • Estime gasto calórico diário baseado no nível de atividade.
  • Sugira déficit calórico baseado ao nivel de ativadade do usuario.
- Monte plano alimentar exemplo para 30 dias.
- Sugira ingestão de água.
- Sugira divisão de macronutrientes.
- Linguagem simples, profissional e motivadora.
  `
        },
        ...mensagens.map(msg => ({
          role: msg.remetente === "usuario" ? "user" : "assistant",
          content: msg.texto
        }))
      ]
    })
  
    return resposta.choices[0].message.content
  }
  