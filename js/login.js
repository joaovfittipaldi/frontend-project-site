function mostrarMsg(texto, tipo) {
  var el = document.getElementById('msg');
  el.textContent = texto;
  el.className = 'msg-validacao msg-' + tipo;
  el.style.display = 'block';
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function realizarLogin() {
  var login = document.getElementById('login').value.trim();
  var senha = document.getElementById('senha').value;

  if (!login) {
    mostrarMsg('Informe o e-mail.', 'erro');
    return;
  }
  if (!validarEmail(login)) {
    mostrarMsg('E-mail inválido. Use o formato nome@dominio.com.', 'erro');
    return;
  }
  if (!senha) {
    mostrarMsg('Informe a senha.', 'erro');
    return;
  }

  var usuarios = JSON.parse(localStorage.getItem('usuariosCadastrados') || '[]');
  var usuario = usuarios.find(function (u) {
    return u.email.toLowerCase() === login.toLowerCase();
  });

  if (!usuario) {
    mostrarMsg('Usuário não cadastrado para este e-mail.', 'erro');
    return;
  }

  if (usuario.senha !== senha) {
    mostrarMsg('Senha incorreta.', 'erro');
    return;
  }

  mostrarMsg('Validação realizada com sucesso!', 'sucesso');
  sessionStorage.setItem('logado', 'true');
  sessionStorage.setItem('nomeUsuario', usuario.nome);
  sessionStorage.setItem('emailUsuario', login);

  setTimeout(function () {
    window.location.href = 'index.html';
  }, 1100);
}

function limpar() {
  document.getElementById('login').value = '';
  document.getElementById('senha').value = '';
  document.getElementById('msg').style.display = 'none';
  document.getElementById('login').focus();
}
