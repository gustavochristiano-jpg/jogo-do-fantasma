// ============ VARIÁVEIS GLOBAIS ============
let pontos = 0;
let tempoRestante = 30;
let jogando = false;
let intervaloTempo = null;
let intervaloCriar = null;

// Cores dos fantasmas (ficam lindos!)
const cores = ['#ff6ec7', '#4ade80', '#60a5fa', '#fbbf24', '#a78bfa', '#f87171'];

// ============ ELEMENTOS DA PÁGINA ============
const areaJogo = document.getElementById('area-jogo');
const elPontos = document.getElementById('pontos');
const elTempo = document.getElementById('tempo');
const telaInicio = document.getElementById('tela-inicio');
const telaFim = document.getElementById('tela-fim');
const pontosFinais = document.getElementById('pontos-finais');

// ============ FUNÇÕES DO JOGO ============
function iniciarJogo() {
  pontos = 0;
  tempoRestante = 30;
  jogando = true;
  elPontos.textContent = '0';
  
  elTempo.textContent = '30';
  telaInicio.classList.add('escondida');
  telaFim.classList.add('escondida');

  // Cronômetro
  intervaloTempo = setInterval(() => {
    tempoRestante--;
    elTempo.textContent = tempoRestante;
    if (tempoRestante <= 0) finalizarJogo();
  }, 1000);

  // Cria um fantasma a cada 700ms
  intervaloCriar = setInterval(criarFantasma, 700);
}

function finalizarJogo() {
  jogando = false;
  const som_de_tempo = new Audio("sons/fim.mp3")
  som_de_tempo.preload = 'auto'
  som_de_tempo.currenttime = 0;
  som_de_tempo.play();
  clearInterval(intervaloTempo);
  clearInterval(intervaloCriar);
  areaJogo.innerHTML = ''; // limpa fantasmas
  pontosFinais.textContent = pontos;
  telaFim.classList.remove('escondida');
}

function criarFantasma() {
  if (!jogando) return;

  const fantasma = document.createElement('div');
  fantasma.className = 'fantasma';
  fantasma.textContent = 'fantasma';

  // Escolhe uma cor aleatória
  const cor = cores[Math.floor(Math.random() * cores.length)];
  fantasma.style.color = cor;

  // Posição aleatória dentro da área
  const maxX = areaJogo.clientWidth - 60;
  const maxY = areaJogo.clientHeight - 60;
  fantasma.style.left = Math.random() * maxX + 'px';
  fantasma.style.top = Math.random() * maxY + 'px';
   const som_de_acerto = new Audio("sons/acerto.mp3")
   som_de_acerto.preload = 'auto'
  // Velocidade: cada fantasma vive entre 1 e 2 segundos
  const duracao = 1000 + Math.random() * 1000;

  // Evento de clique
  fantasma.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!jogando || fantasma.classList.contains('morrendo')) return;
    som_de_acerto.currenttime = 0;
     som_de_acerto.play();
    pontos += 10;
    elPontos.textContent = pontos;
    // Efeito de pontuação flutuante
    mostrarPontosFlutuantes(fantasma, '+10');

    // Animação de morte
    fantasma.classList.add('morrendo');
    setTimeout(() => fantasma.remove(), 300);
  });

  areaJogo.appendChild(fantasma);

  // Remove se ninguém clicar
  setTimeout(() => {
    if (fantasma.parentNode) fantasma.remove();
  }, duracao);
}

function mostrarPontosFlutuantes(elemento, texto) {
  const p = document.createElement('div');
  p.className = 'pontos-flutuante';
  p.textContent = texto;
  p.style.left = elemento.style.left;
  p.style.top = elemento.style.top;
  areaJogo.appendChild(p);
  setTimeout(() => p.remove(), 800);
}

// ============ EVENTOS DOS BOTÕES ============
document.getElementById('btn-iniciar').addEventListener('click', iniciarJogo);
document.getElementById('btn-reiniciar').addEventListener('click', iniciarJogo);

