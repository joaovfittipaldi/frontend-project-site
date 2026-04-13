# TechSolve TI — Site AV1

Projeto acadêmico da disciplina de Desenvolvimento Web. Site de uma empresa fictícia de serviços de TI, composto por 5 páginas HTML com CSS e JavaScript separados.

---

## Estrutura de arquivos

```
frontend-project-site/
├── index.html          # Página principal da empresa
├── login.html          # Login de clientes
├── troca-senha.html    # Troca de senha
├── cadastro.html       # Cadastro de novo cliente
├── servicos.html       # Solicitação de serviços de TI
├── css/
│   └── style.css       # Estilos globais compartilhados
├── js/
│   ├── index.js        # Exibe link de serviços se logado
│   ├── login.js        # Validação e autenticação do login
│   ├── troca-senha.js  # Validação da troca de senha
│   ├── cadastro.js     # Validação e cadastro de clientes
│   └── servicos.js     # Tabela de solicitações e novo pedido
└── img/
    ├── logo.png
    ├── foto1.jpg
    ├── foto2.jpg
    ├── foto3.jpg
    └── foto4.jpg
```

---

## Páginas

### index.html
Página de apresentação da empresa. Contém: hero banner, história da empresa, vídeo institucional do YouTube (streaming), galeria de fotos, cards de serviços, tabela com os 3 fundadores e footer com contatos, endereço e formas de pagamento. O link "Solicitar Serviço" no header só aparece se o usuário estiver logado.

### login.html
Formulário de login com validação de e-mail e senha. Ao logar com sucesso, redireciona para a página principal.

### troca-senha.html
Formulário para troca de senha. Valida formato de e-mail, regras de composição da nova senha e confirmação.

### cadastro.html
Formulário completo de cadastro com: e-mail, senha, nome, CPF (com máscara e validação de dígito verificador), data de nascimento (mínimo 18 anos), telefone opcional, estado civil (radio buttons) e escolaridade (combo box).

### servicos.html
Página de solicitação de serviços de TI. Exibe as solicitações já feitas em tabela ordenada por data, com botão para excluir cada linha. Permite adicionar novos pedidos via combo box, com preço, prazo e data prevista preenchidos automaticamente.

---

## Regras de validação da senha

**Permitidos (ao menos 1 obrigatório):** `@ # $ % & * ! ? / \ | - _ + . =`

**Não permitidos:** `¨ { } [ ] ´ ` ~ ^ : ; < > , " '`

A senha deve ter no mínimo 6 caracteres, ao menos 1 número e ao menos 1 letra maiúscula.

---

## Como executar

Basta abrir o arquivo `index.html` em qualquer navegador moderno. Não é necessário servidor ou instalação de dependências.

> Para testar o fluxo completo: cadastre um usuário em `cadastro.html`, faça login em `login.html` e acesse `servicos.html` pelo link que aparece no header.

---

## Tecnologias

- HTML5
- CSS3 (Flexbox, Grid, variáveis CSS)
- JavaScript puro (sem frameworks)
- Google Fonts (DM Sans + DM Serif Display)
