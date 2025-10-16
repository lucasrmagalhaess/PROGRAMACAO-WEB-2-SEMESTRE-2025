// Ao sair do campo de CEP, busca o endereço

document.getElementById("cep").addEventListener("blur", function () {
    const cep = this.value.trim();
    const mensagem = document.getElementById("mensagem");
  
    if (cep.length !== 8 || isNaN(cep)) {
      mensagem.textContent = "⚠️ CEP inválido. Digite 8 números.";
      return; // se o cep for estiver digitada de forma incorreta, ele ira exibior a mensagem
    }
  
    mensagem.textContent = "🔎 Buscando endereço..."; //se o cep for valido, exibe essa.
  
    // Faz a requisição à API ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (data.erro) {
          mensagem.textContent = "❌ CEP não encontrado.";
        } else {
          document.getElementById("logradouro").value = data.logradouro; // coletando as informacoes da API
          document.getElementById("bairro").value = data.bairro;
          document.getElementById("cidade").value = data.localidade;
          document.getElementById("uf").value = data.uf;
          mensagem.textContent = "✅ Endereço encontrado!";
        }
      })
      .catch(() => {
        mensagem.textContent = "⚠️ Erro ao buscar o CEP.";
      });
  });
  