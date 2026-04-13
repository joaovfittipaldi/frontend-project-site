function mostrarMsg(texto, tipo) {
  var el = document.getElementById('msg');
  el.textContent = texto;
  el.className = 'msg-validacao msg-' + tipo;
  el.style.display = 'block';
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarSenha(senha) {
  if (senha.length < 6)
    return 'A senha deve ter pelo menos 6 caracteres.';
  if (!/[0-9]/.test(senha))
    return 'A senha deve conter ao menos um número.';
  if (!/[A-Z]/.test(senha))
    return 'A senha deve conter ao menos uma letra maiúscula.';
  if (!/@|#|\$|%|&|\*|!|\?|\/|\\|\||-|_|\+|\.|=/.test(senha))
    return 'Inclua ao menos um caractere especial permitido.';
  if (/[¨{}\[\]´`~^:;<>,"']/.test(senha))
    return 'A senha contém caracteres não permitidos.';
  return null;
}

function trocarSenha() {
  var login = document.getElementById('login').value.trim();
  var senha = document.getElementById('senha').value;
  var conf  = document.getElementById('conf').value;

  if (!login) { mostrarMsg('Informe o e-mail.', 'erro'); return; }
  if (!validarEmail(login)) { mostrarMsg('E-mail inválido.', 'erro'); return; }
  if (!senha) { mostrarMsg('Informe a senha.', 'erro'); return; }

  var erro = validarSenha(senha);
  if (erro) { mostrarMsg(erro, 'erro'); return; }

  if (!conf) { mostrarMsg('Confirme a senha.', 'erro'); return; }
  if (senha !== conf) { mostrarMsg('A senha e a confirmação não coincidem.', 'erro'); return; }

  mostrarMsg('Validação realizada com sucesso!', 'sucesso');
  setTimeout(function () { history.back(); }, 1100);
}

function limpar() {
  ['login', 'senha', 'conf'].forEach(function (id) {
    document.getElementById(id).value = '';
  });
  document.getElementById('msg').style.display = 'none';
  document.getElementById('login').focus();
}
