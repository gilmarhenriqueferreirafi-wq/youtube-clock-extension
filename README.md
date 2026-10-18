# YouTube Floating Clock Extension

Uma extensão para Brave/Chrome que mostra um relógio flutuante quando o YouTube está em modo fullscreen.

## 🎯 Funcionalidades

- ⏰ **Relógio Flutuante**: Mostra a hora atual durante vídeos em fullscreen
- 🎨 **Customizável**: Escolha formato 12h/24h, cores, tamanho e posição
- 🖱️ **Arrastável**: Mova o relógio para qualquer lugar da tela
- 💾 **Configurações Salvas**: Suas preferências são salvas automaticamente
- 🌙 **Modo Cinema**: Funciona tanto em fullscreen quanto no modo cinema do YouTube

## 📦 Instalação no Brave

### Passo 1: Baixe a extensão
Certifique-se de que você tem todos os arquivos da extensão na pasta `youtube-clock-extension`.

### Passo 2: Abra o Brave
1. Abra o navegador Brave
2. Na barra de endereços, digite: `brave://extensions`
3. Pressione Enter

### Passo 3: Ative o modo desenvolvedor
1. No canto superior direito, clique no interruptor **"Modo do desenvolvedor"**
2. Isso habilitará opções adicionais de instalação

### Passo 4: Instale a extensão
1. Clique no botão **"Carregar sem compactação"** (Load unpacked)
2. Navegue até a pasta `youtube-clock-extension`
3. Selecione a pasta e clique em "Selecionar pasta"

### Passo 5: Use a extensão
1. Abra o [YouTube](https://www.youtube.com)
2. Entre em modo fullscreen em qualquer vídeo
3. O relógio aparecerá automaticamente!

## ⚙️ Configurações

Para customizar o relógio:

1. Clique no ícone da extensão na barra do navegador
2. Configure as opções:
   - **Formato 24 horas**: Alterne entre formato 12h e 24h
   - **Mostrar segundos**: Inclua ou remova os segundos
   - **Cor do relógio**: Escolha a cor preferida
   - **Tamanho**: Selecione entre pequeno, médio, grande ou extra grande
   - **Posição inicial**: Escolha onde o relógio aparecerá
3. Clique em "Salvar Configurações"

## 🎮 Como Usar

1. **Durante vídeos em fullscreen**: O relógio aparece automaticamente
2. **Mover o relógio**: Clique e arraste o relógio para qualquer posição
3. **Configurar**: Clique no ícone da extensão para alterar as configurações
4. **Sair do fullscreen**: O relógio desaparece automaticamente

## 📁 Estrutura de Arquivos

```
youtube-clock-extension/
├── manifest.json          # Configuração da extensão
├── content.js             # Script principal do relógio
├── content.css            # Estilos do relógio
├── popup.html             # Interface de configurações
├── popup.js               # Lógica do popup
├── popup.css              # Estilos do popup
├── icons/
│   ├── icon16.png         # Ícone 16x16
│   ├── icon48.png         # Ícone 48x48
│   └── icon128.png        # Ícone 128x128
└── README.md             # Este arquivo
```

## 🔧 Desenvolvimento

### Tecnologias Utilizadas
- **Manifest V3**: Padrão moderno de extensões
- **Vanilla JavaScript**: Sem frameworks externos
- **CSS3**: Estilos modernos com animações
- **Chrome Storage API**: Para salvar configurações

### Modificação
Para modificar a extensão:

1. **Alterar comportamento**: Edite `content.js`
2. **Alterar aparência**: Edite `content.css`
3. **Modificar popup**: Edite `popup.html`, `popup.css` ou `popup.js`
4. **Alterar permissões**: Edite `manifest.json`

### Recarregar após modificações
1. Vá para `brave://extensions`
2. Clique no ícone de recarregar 🔄 na extensão
3. Recarregue a página do YouTube

## 🐛 Solução de Problemas

### O relógio não aparece
- Certifique-se de que está no YouTube (youtube.com)
- Verifique se está em modo fullscreen
- Recarregue a página e tente novamente
- Verifique o console do navegador para erros

### Configurações não são salvas
- Verifique se o armazenamento está habilitado
- Tente recarregar a extensão

### Extensão não carrega
- Verifique se todos os arquivos estão presentes
- Certifique-se de que o `manifest.json` está válido
- Tente recarregar o navegador

## 📝 Notas

- A extensão funciona apenas no YouTube
- Requer conexão com internet para o YouTube
- Configurações são salvas localmente no navegador
- Funciona em modo fullscreen e modo cinema

## 🤝 Contribuições

Sinta-se livre para modificar e melhorar esta extensão!

## 📄 Licença

Esta extensão é fornecida como está para fins educacionais.

---

**Desenvolvido com ❤️ para melhorar sua experiência no YouTube**