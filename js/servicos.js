/* ---- Dados do usuário logado ---- */
document.getElementById('lbl-nome').textContent  = sessionStorage.getItem('nomeUsuario')  || '—';
document.getElementById('lbl-email').textContent = sessionStorage.getItem('emailUsuario') || '—';

/* ---- Catálogo de serviços ---- */
var catalogo = {
  suporte:   { nome: 'Suporte Técnico',           preco: 150.00,  prazo: 2  },
  rede:      { nome: 'Configuração de Rede',       preco: 320.00,  prazo: 5  },
  nuvem:     { nome: 'Migração para Nuvem',        preco: 1800.00, prazo: 30 },
  seguranca: { nome: 'Consultoria em Segurança',   preco: 950.00,  prazo: 15 },
  dev:       { nome: 'Desenvolvimento de Sistema', preco: 3500.00, prazo: 60 },
  backup:    { nome: 'Backup e Recuperação',        preco: 250.00,  prazo: 3  }
};

/* ---- Utilitários de data ---- */
function formatarData(d) {
  return d.getDate().toString().padStart(2, '0') + '/' +
         (d.getMonth() + 1).toString().padStart(2, '0') + '/' +
         d.getFullYear();
}

function somarDias(dias) {
  var d = new Date();
  d.setDate(d.getDate() + dias);
  return d;
}

/* ---- Badge de status ---- */
function statusClass(status) {
  if (status === 'CONCLUÍDO')    return 'status-concluido';
  if (status === 'EM ANDAMENTO') return 'status-andamento';
  return 'status-elaboracao';
}

/* ---- Dados fictícios iniciais ---- */
var linhas = [
  { data: '05/01/2025', num: 1001, servico: 'Suporte Técnico',          status: 'CONCLUÍDO',     preco: 'R$ 150,00',   prev: '07/01/2025' },
  { data: '14/02/2025', num: 1002, servico: 'Configuração de Rede',     status: 'CONCLUÍDO',     preco: 'R$ 320,00',   prev: '19/02/2025' },
  { data: '03/03/2025', num: 1003, servico: 'Backup e Recuperação',     status: 'EM ANDAMENTO',  preco: 'R$ 250,00',   prev: '06/03/2025' },
  { data: '22/03/2025', num: 1004, servico: 'Consultoria em Segurança', status: 'EM ELABORAÇÃO', preco: 'R$ 950,00',   prev: '06/04/2025' }
];
var contador = 1005;

/* ---- Renderiza a tabela ---- */
function renderTabela() {
  linhas.sort(function (a, b) {
    return a.data.split('/').reverse().join('').localeCompare(
           b.data.split('/').reverse().join(''));
  });

  var tbody = document.getElementById('tbody');
  tbody.innerHTML = '';

  linhas.forEach(function (r, i) {
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td>' + r.data + '</td>' +
      '<td class="num-sol">#' + r.num + '</td>' +
      '<td>' + r.servico + '</td>' +
      '<td><span class="status-badge ' + statusClass(r.status) + '">' + r.status + '</span></td>' +
      '<td>' + r.preco + '</td>' +
      '<td>' + r.prev + '</td>' +
      '<td><button class="btn btn-perigo" onclick="excluir(' + i + ')">Excluir</button></td>';
    tbody.appendChild(tr);
  });
}

/* ---- Exclui linha da tabela ---- */
function excluir(i) {
  linhas.splice(i, 1);
  renderTabela();
}

/* ---- Atualiza labels ao trocar serviço ---- */
function atualizar() {
  var val = document.getElementById('sel').value;
  if (!val) {
    document.getElementById('lbl-preco').textContent = '—';
    document.getElementById('lbl-prazo').textContent = '—';
    document.getElementById('lbl-prev').textContent  = '—';
    return;
  }
  var s = catalogo[val];
  document.getElementById('lbl-preco').textContent = 'R$ ' + s.preco.toFixed(2).replace('.', ',');
  document.getElementById('lbl-prazo').textContent = s.prazo + ' dia(s)';
  document.getElementById('lbl-prev').textContent  = formatarData(somarDias(s.prazo));
}

/* ---- Inclui nova solicitação ---- */
function incluir() {
  var val = document.getElementById('sel').value;
  var msg = document.getElementById('msg');

  if (!val) {
    msg.textContent = 'Selecione um serviço de TI.';
    msg.className   = 'msg-validacao msg-erro';
    msg.style.display = 'block';
    return;
  }

  var s = catalogo[val];
  contador++;

  linhas.push({
    data:    formatarData(new Date()),
    num:     contador,
    servico: s.nome,
    status:  'EM ELABORAÇÃO',
    preco:   'R$ ' + s.preco.toFixed(2).replace('.', ','),
    prev:    formatarData(somarDias(s.prazo))
  });

  renderTabela();

  document.getElementById('sel').value = '';
  atualizar();

  msg.textContent   = 'Solicitação incluída com sucesso!';
  msg.className     = 'msg-validacao msg-sucesso';
  msg.style.display = 'block';
  setTimeout(function () { msg.style.display = 'none'; }, 3000);
}

/* ---- Init ---- */
renderTabela();
