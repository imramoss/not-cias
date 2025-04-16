// script.js

// Carregar e exibir notícias na index.html
if (document.getElementById('noticias-container')) {
    const noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    const container = document.getElementById('noticias-container');
    noticias.forEach((noticia, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${noticia.imagem}" alt="${noticia.titulo}" />
        <h3>${noticia.titulo}</h3>
        <p>${noticia.conteudo.substring(0, 100)}...</p>
        <a href="noticia.html?id=${index}">Ver mais</a>
      `;
      container.appendChild(card);
    });
  }
  
  // Carregar notícia individual na noticia.html
  if (document.getElementById('noticia-completa')) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    const noticia = noticias[id];
    if (noticia) {
      document.getElementById('noticia-completa').innerHTML = `
        <h2>${noticia.titulo}</h2>
        <img src="${noticia.imagem}" alt="${noticia.titulo}" />
        <p>${noticia.conteudo}</p>
      `;
    }
  }
  
  // Adicionar nova notícia via admin.html
  if (document.getElementById('form-noticia')) {
    document.getElementById('form-noticia').addEventListener('submit', function (e) {
      e.preventDefault();
      const titulo = document.getElementById('titulo').value;
      const conteudo = document.getElementById('conteudo').value;
      const imagemInput = document.getElementById('imagem');
      const reader = new FileReader();
      reader.onload = function () {
        const imagem = reader.result;
        const noticia = { titulo, conteudo, imagem };
        const noticias = JSON.parse(localStorage.getItem('noticias')) || [];
        noticias.push(noticia);
        localStorage.setItem('noticias', JSON.stringify(noticias));
        alert('Notícia adicionada com sucesso!');
        window.location.reload();
      };
      reader.readAsDataURL(imagemInput.files[0]);
    });
  }
  
  // Exibir notícias cadastradas no painel admin
  if (document.getElementById('lista-noticias')) {
    const lista = document.getElementById('lista-noticias');
    const noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    noticias.forEach((n, i) => {
      const li = document.createElement('li');
      li.textContent = `${n.titulo}`;
      lista.appendChild(li);
    });
  }
  
  // Adicionar anúncio
  if (document.getElementById('form-anuncio')) {
    document.getElementById('form-anuncio').addEventListener('submit', function (e) {
      e.preventDefault();
      const titulo = document.getElementById('titulo-anuncio').value;
      const link = document.getElementById('link-anuncio').value;
      const imagemInput = document.getElementById('imagem-anuncio');
      const reader = new FileReader();
      reader.onload = function () {
        const imagem = reader.result;
        const anuncio = { titulo, link, imagem };
        localStorage.setItem('anuncio', JSON.stringify(anuncio));
        alert('Anúncio adicionado com sucesso!');
        window.location.reload();
      };
      reader.readAsDataURL(imagemInput.files[0]);
    });
  }
  
  // Carregar anúncio nas páginas
  if (document.getElementById('anuncio-topo')) {
    const anuncio = JSON.parse(localStorage.getItem('anuncio'));
    if (anuncio) {
      document.getElementById('anuncio-topo').innerHTML = `
        <a href="${anuncio.link}" target="_blank">
          <img src="${anuncio.imagem}" alt="${anuncio.titulo}" />
        </a>
      `;
    }
  }
  