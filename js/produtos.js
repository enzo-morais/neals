/* ============================================
   NEALS STREET® — DADOS DO SITE
   Tudo que muda (camisas, preços, WhatsApp, Instagram) fica AQUI.
   Não precisa mexer em mais nada pra atualizar o site.
   ============================================ */

var NEALS = {
    // WhatsApp: só números, com 55 + DDD. TROCAR pelo número real.
    whatsapp: '554398590948',

    instagram: 'https://instagram.com/nealstreetoficial',
    instagramUser: '@nealstreetoficial',

    // Mensagem PADRÃO que já vem escrita quando a pessoa clica em "pedir".
    // {produto}, {tamanho} e {preco} são trocados automaticamente.
    // Cada camisa pode ter a sua própria mensagem (campo "mensagem" dentro da camisa).
    mensagem: 'Fala! Vi no site da NEALS e quero a {produto} no tamanho {tamanho}.',

    // Tempo (em segundos) que cada camisa fica na imagem do topo antes de trocar
    trocaTopo: 3.5,

    drop: 'DROP 01',

    /* CAMISAS
       - imagens: coloque os arquivos na pasta img/ e liste aqui (a 1ª é a frente, a 2ª as costas...).
         Enquanto a lista estiver vazia, aparece uma animação no lugar da foto.
       - preco: número (ex.: 149.9) ou null pra mostrar "CONSULTE".
       - precoAntigo: preço "de" que aparece riscado ao lado (ex.: 84.9). Use null quando não tiver promoção.
       - tag: texto pequeno no canto do card (ex.: 'NOVO', 'ÚLTIMAS') ou null.
       - esgotado: true mostra a camisa como esgotada.
       - mensagem: o que vai escrito no WhatsApp desta camisa. Pode ser:
           • um texto só:            mensagem: 'Quero a {produto} no {tamanho}'
           • um texto por tamanho:   mensagem: { padrao: '...', 'P': '...', 'M': '...', 'G': '...', 'GG': '...' }
         Se um tamanho não tiver texto, usa o 'padrao'; se não tiver nada, usa a mensagem padrão lá de cima.
         {produto}, {tamanho} e {preco} são trocados automaticamente em qualquer um deles.  */
    produtos: [
        {
            id: 'neals-01',
            mensagem: {   // mensagem pra cada tamanho ('padrao' = quando não escolheu tamanho)
                padrao: 'Fala! Curti a NEALSTREET. Quais tamanhos ainda tem?',
                'P': 'Fala! Quero a NEALSTREET no P. Ainda tem?',
                'M': 'Fala! Quero a NEALSTREET no M. Tem disponível?',
                'G': 'Fala! Quero a NEALSTREET no G. Como faço pra fechar?',
                'GG': 'Fala! Quero a NEALSTREET no GG. Ainda tem esse tamanho?'
            },
            nome: 'NEALSTREET',
            preco: 69.90,
            precoAntigo: 84.90, // aparece riscado ("de R$ 84,90 por R$ 69,90"); null = sem promoção
            tag: 'NOVO',
            destaque: false, // destaque = aparece primeiro no topo do site
            esgotado: false,
            descricao: 'Logo NEALSTREET estampado em branco no centro do peito. Básica, limpa, vai com tudo.',
            tamanhos: ['P', 'M', 'G', 'GG'],
            detalhes: ['Estampa em DTF', 'Estampa central no peito'],
            imagens: ['img/neals-01-frente.webp', 'img/neals-01-lado.webp']
        },
        {
            id: 'neals-02',
            mensagem: {   // mensagem pra cada tamanho ('padrao' = quando não escolheu tamanho)
                padrao: 'Fala! Curti a Neals Script. Quais tamanhos ainda tem?',
                'P': 'Fala! Quero a Neals Script no P. Ainda tem?',
                'M': 'Fala! Quero a Neals Script no M. Tem disponível?',
                'G': 'Fala! Quero a Neals Script no G. Como faço pra fechar?',
                'GG': 'Fala! Quero a Neals Script no GG. Ainda tem esse tamanho?'
            },
            nome: 'Neals Script',
            preco: 69.90,
            precoAntigo: 84.90, // aparece riscado ("de R$ 84,90 por R$ 69,90"); null = sem promoção
            tag: 'NOVO',
            destaque: false, // destaque = aparece primeiro no topo do site
            esgotado: false,
            descricao: 'Assinatura "Neals" em letra cursiva preta, tom sobre tom no cinza. Discreta e elegante.',
            tamanhos: ['P', 'M', 'G', 'GG'],
            detalhes: ['Estampa em DTF', 'Estampa no lado esquerdo do peito'],
            imagens: ['img/neals-02-frente.webp', 'img/neals-02-lado.webp']
        },
        {
            id: 'neals-03',
            mensagem: {   // mensagem pra cada tamanho ('padrao' = quando não escolheu tamanho)
                padrao: 'Fala! Curti a NEAL® Triangle (a preta com o triângulo vermelho). Quais tamanhos ainda tem?',
                'P': 'Fala! Quero a NEAL® Triangle no P. Ainda tem?',
                'M': 'Fala! Quero a NEAL® Triangle no M. Tem disponível?',
                'G': 'Fala! Quero a NEAL® Triangle no G. Como faço pra fechar?',
                'GG': 'Fala! Quero a NEAL® Triangle no GG. Ainda tem esse tamanho?'
            },
            nome: 'NEAL® Triangle',
            preco: 69.90,
            precoAntigo: 84.90, // aparece riscado ("de R$ 84,90 por R$ 69,90"); null = sem promoção
            tag: null,
            destaque: false, // destaque = aparece primeiro no topo do site
            esgotado: false,
            descricao: 'Logo NEAL® em branco com o triângulo vermelho. Contraste forte na camiseta preta.',
            tamanhos: ['P', 'M', 'G', 'GG'],
            detalhes: ['Estampa em DTF', 'Estampa no lado esquerdo do peito'],
            imagens: ['img/neals-03-frente.webp', 'img/neals-03-lado.webp']
        },
        {
            id: 'neals-04',
            mensagem: {   // mensagem pra cada tamanho ('padrao' = quando não escolheu tamanho)
                padrao: 'Fala! Curti a Make a Lot of Money. Quais tamanhos ainda tem? 💸',
                'P': 'Fala! Quero a Make a Lot of Money no P. Ainda tem? 💸',
                'M': 'Fala! Quero a Make a Lot of Money no M. Tem disponível? 💸',
                'G': 'Fala! Quero a Make a Lot of Money no G. Como faço pra fechar? 💸',
                'GG': 'Fala! Quero a Make a Lot of Money no GG. Ainda tem esse tamanho? 💸'
            },
            nome: 'Make a Lot of Money',
            preco: 69.90,
            precoAntigo: 84.90, // aparece riscado ("de R$ 84,90 por R$ 69,90"); null = sem promoção
            tag: null,
            destaque: true, // destaque = aparece primeiro no topo do site
            esgotado: false,
            descricao: 'NEALS® com a frase "Make a lot of money" em rosa claro. O recado tá dado.',
            tamanhos: ['P', 'M', 'G', 'GG'],
            detalhes: ['Estampa em DTF', 'Estampa no lado esquerdo do peito'],
            imagens: ['img/neals-04-frente.webp', 'img/neals-04-lado.webp']
        },
        {
            id: 'neals-05',
            mensagem: {   // mensagem pra cada tamanho ('padrao' = quando não escolheu tamanho)
                padrao: 'Fala! Curti a Creative Co. Quais tamanhos ainda tem?',
                'P': 'Fala! Quero a Creative Co no P. Ainda tem?',
                'M': 'Fala! Quero a Creative Co no M. Tem disponível?',
                'G': 'Fala! Quero a Creative Co no G. Como faço pra fechar?',
                'GG': 'Fala! Quero a Creative Co no GG. Ainda tem esse tamanho?'
            },
            nome: 'Creative Co',
            preco: 69.90,
            precoAntigo: 84.90, // aparece riscado ("de R$ 84,90 por R$ 69,90"); null = sem promoção
            tag: null,
            destaque: false, // destaque = aparece primeiro no topo do site
            esgotado: false,
            descricao: 'Logo com a faixa azul e "Creative Co". Cor terrosa que foge do óbvio.',
            tamanhos: ['P', 'M', 'G', 'GG'],
            detalhes: ['Estampa em DTF', 'Estampa no lado esquerdo do peito'],
            imagens: ['img/neals-05-frente.webp', 'img/neals-05-lado.webp']
        }
    ]
};
