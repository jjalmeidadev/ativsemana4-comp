class InitialScreen extends Phaser.Scene {
  constructor() {
    super({
      key: "InitialScreen"
    });
  }

  preload() {
    this.load.image("tutorial", "assets/tutbots.png"); // Carregando a imagem do tutorial
    this.load.image("play", "assets/botaoplay.png"); // Carregando a imagem do botão "play"
    this.load.image("titulo", "assets/titulo.png"); // Carregando a imagem do título do jogo
    this.load.image("opcoes", "assets/tutorial.png"); // Carregando a imagem do botão "opções"
    this.load.image("preto", "assets/preto.png"); // Carregando a imagem de fundo do tutorial
    this.load.image("text2", "assets/text2.png"); // Carregando a imagem do texto do tutorial
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.returnKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    // Configuração do botão de "play"
    this.tutbot = this.add.image(430, 300, "play").setScale(0.7).setOrigin(0, 0).setInteractive().setVisible(true);

    // Configuração do título do jogo
    this.add.image(145, 100, "titulo").setScale(1.5).setOrigin(0, 0);

    // Configuração do botão "opções" do jogo
    this.opbot = this.add.image(1120, 430, "opcoes").setOrigin(0, 0).setScale(0.4).setInteractive();

    // Configuração de evento para abrir o tutorial ao clicar no botão "opções"
    this.opbot.on(
      "pointerdown",
      function () {
        if (!this.tutorialAberto) {
          // Adiciona as imagens do tutorial na primeira vez que o botão é clicado
          this.preto = this.add
            .image(700, 300, "preto")
            .setDisplaySize(window.innerWidth, window.innerHeight);
          this.tutorial = this.add.image(649, 420, "tutorial").setScale(0.8);
          this.text2 = this.add
            .image(270, 100, "text2")
            .setScale(1.5)
            .setOrigin(0, 0);
          this.tutorialAberto = true; // Define a propriedade como true após o primeiro clique
        } else {
          // Esconde as imagens do tutorial no segundo clique
          this.preto.setVisible(false);
          this.tutorial.setVisible(false);
          this.text2.setVisible(false);
          this.tutorialAberto = false; // Define a propriedade como falsa após o segundo clique
        }
        this.opbot.setDepth(1); // Mantém a visibilidade do botão de tutorial
      },
      this
    );

    // Configuração de evento para iniciar o jogo ao clicar no botão "play"
    this.tutbot.on(
      "pointerdown",
      function () {
        this.scene.start("RushOdyssey", this.game); 
      },
      this
    );
  }
}
