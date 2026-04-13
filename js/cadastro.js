/* ---- Máscaras ---- */
document.getElementById('cpf').addEventListener('input', function (e) {
  var v = e.target.value.replace(/\D/g, '').substring(0, 11), r = '';
  if (v.length > 0) r += v.substring(0, 3);
  if (v.length > 3) r += '.' + v.substring(3, 6);
  if (v.length > 6) r += '.' + v.substring(6, 9);
  if (v.length > 9) r += '-' + v.substring(9, 11);
  e.target.value = r;
});

document.getElementById('cpf').addEventListener('keypress', function (e) {
  if (!/[0-9]/.test(e.key)) e.preventDefault();
});

document.getElementById('tel').addEventListener('input', function (e) {
  var v = e.target.value.replace(/\D/g, '').substring(0, 11), r = '';
  if (v.length > 0) r += '(' + v.substring(0, 2);
  if (v.length > 2) r += ') ' + v.substring(2, 7);
  if (v.length > 7) r += '-' + v.substring(7, 11);
  e.target.value = r;
});

/* ---- Validações ---- */
function mostrarMsg(texto, tipo) {
  var el = document.getElementById('msg');
  el.textContent = texto;
  el.className = 'msg-validacao msg-' + tipo;
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  var soma = 0;
  for (var i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  var r = (soma * 10) % 11;
  if (r === 10 || r === 11) r = 0;
  if (r !== parseInt(cpf[9])) return false;
  soma = 0;
  for (var j = 0; j < 10; j++) soma += parseInt(cpf[j]) * (11 - j);
  r = (soma * 10) % 11;
  if (r === 10 || r === 11) r = 0;
  return r === parseInt(cpf[10]);
}

function incluir() {
  var email = document.getElementById('email').value.trim();
  var senha = document.getElementById('senha').value;
  var conf  = document.getElementById('conf').value;
  var nome  = document.getElementById('nome').value.trim();
  var cpf   = document.getElementById('cpf').value.trim();
  var nasc  = document.getElementById('nasc').value;
  var tel   = document.getElementById('tel').value.trim();

  if (!email) { mostrarMsg('Informe o e-mail.', 'erro'); return; }
  if (!validarEmail(email)) { mostrarMsg('E-mail inválido.', 'erro'); return; }
  if (!senha) { mostrarMsg('Informe a senha.', 'erro'); return; }

  var erroSenha = validarSenha(senha);
  if (erroSenha) { mostrarMsg(erroSenha, 'erro'); return; }

  if (!conf) { mostrarMsg('Confirme a senha.', 'erro'); return; }
  if (senha !== conf) { mostrarMsg('Senha e confirmação não coincidem.', 'erro'); return; }

  if (!nome) { mostrarMsg('Informe o nome.', 'erro'); return; }

  var palavras = nome.split(/\s+/).filter(function (p) { return p.length > 0; });
  if (palavras.length < 2) { mostrarMsg('O nome deve ter pelo menos duas palavras.', 'erro'); return; }
  if (palavras[0].length < 2) { mostrarMsg('A primeira palavra do nome deve ter ao menos 2 caracteres.', 'erro'); return; }
  if (/[^a-zA-ZÀ-ÿ\s]/.test(nome)) { mostrarMsg('O nome não pode conter números ou caracteres especiais.', 'erro'); return; }

  if (!cpf) { mostrarMsg('Informe o CPF.', 'erro'); return; }
  if (!validarCPF(cpf)) { mostrarMsg('CPF inválido. Verifique os dígitos.', 'erro'); return; }

  if (!nasc) { mostrarMsg('Informe a data de nascimento.', 'erro'); return; }
  var hoje = new Date();
  var dn   = new Date(nasc + 'T00:00:00');
  var idade = hoje.getFullYear() - dn.getFullYear();
  var m = hoje.getMonth() - dn.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < dn.getDate())) idade--;
  if (idade < 18) { mostrarMsg('O cliente deve ter ao menos 18 anos.', 'erro'); return; }

  if (tel) {
    var telDigitos = tel.replace(/\D/g, '');
    if (telDigitos.length < 10 || telDigitos.length > 11) {
      mostrarMsg('Telefone inválido. Use o formato (00) 00000-0000.', 'erro');
      return;
    }
  }

  var usuarios = JSON.parse(localStorage.getItem('usuariosCadastrados') || '[]');
  var jaExiste = usuarios.some(function (u) {
    return u.email.toLowerCase() === email.toLowerCase();
  });

  if (jaExiste) {
    mostrarMsg('Já existe cadastro para este e-mail.', 'erro');
    return;
  }

  usuarios.push({
    email: email,
    senha: senha,
    nome: nome,
    cpf: cpf,
    nasc: nasc,
    tel: tel
  });
  localStorage.setItem('usuariosCadastrados', JSON.stringify(usuarios));

  mostrarMsg('Cadastro realizado com sucesso!', 'sucesso');
}

function limpar() {
  ['email', 'senha', 'conf', 'nome', 'cpf', 'nasc', 'tel'].forEach(function (id) {
    document.getElementById(id).value = '';
  });
  document.querySelector('input[name="ec"][value="solteiro"]').checked = true;
  document.getElementById('esc').value = '2gc';
  document.getElementById('msg').style.display = 'none';
  document.getElementById('email').focus();
}
