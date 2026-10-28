# NEALS STREET® — Site vitrine

Site só de divulgação: as camisas aparecem, a pessoa escolhe o tamanho e o botão abre o WhatsApp com a mensagem pronta.
Sem carrinho, pagamento, login ou painel. Não precisa de banco de dados, é só subir a pasta na Vercel/Netlify.

## Como atualizar
Tudo fica em **`js/produtos.js`**:
- `whatsapp`: número com 55 + DDD (TROCAR, hoje é um número de exemplo)
- `instagram` / `instagramUser`
- `produtos`: nome, preço (`null` = "CONSULTE"), descrição, tamanhos, tag, esgotado e imagens

## Fotos
Coloque as fotos na pasta `img/` e liste em `imagens` (1ª = frente, 2ª = costas).
PNG com fundo transparente fica melhor: a camisa aparece sobre o fundo azul da marca.
Se tiver 2 fotos, o card troca pra costas quando passa o mouse.
Enquanto `imagens` estiver vazio, aparece uma animação no lugar (`js/neals-motion.js`).

## Link direto pra uma camisa
`seusite.com/#neals-01` já abre a camisa (bom pra colocar na bio / stories).
