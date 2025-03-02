class RushOdyssey extends Phaser.Scene {
  constructor() {
    super({
      key: "RushOdyssey",
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 300 } },
      },
    });
    var streak = (this.streak = 0); // Começa a sequência de kills
    var tempultkill = (this.tempultkill = 0); // Analisa o tempo do último kill
    var pontuacao = (this.pontuacao = 0); // Começa a pontuação
  }

  preload() {
    this.load.image(
      "background",
      "assets/bg.png",
      window.innerWidth,
      window.innerHeight
    );
    this.load.image("terra", "assets/terra.png");
    this.load.spritesheet("player", "assets/spriteperson.png", {
      frameWidth: 80,
      frameHeight: 60,
    });
    this.load.spritesheet("monstro", "assets/monstro.png", {
      frameWidth: 110,
      frameHeight: 140,
    });
  }

  create() {
    // Adiciona o background
    this.background = this.add.image(0, 0, "background").setOrigin(0, 0);
    this.background.setDisplaySize(window.innerWidth, window.innerHeight);

    // Adiciona o sprite do jogador e seus respectivos tamanhos e posições
    this.player = this.physics.add.sprite(100, 300, "player").setScale(1.3);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(50, 22);

    // Configura o teclado para controlar o jogador
    this.teclado = this.input.keyboard.createCursorKeys();

    // Adiciona e configura os elementos do cenário
    this.terra = this.physics.add.staticImage(400, 300, "terra");
    this.physics.add.collider(this.player, this.terra);

    this.terra2 = this.physics.add.staticImage(900, 500, "terra");
    this.physics.add.collider(this.player, this.terra2);

    this.terra3 = this.physics.add.staticImage(1000, 200, "terra");
    this.physics.add.collider(this.player, this.terra3);

    this.chao = this.physics.add.staticImage(700, 720, "terra").setScale(6);
    this.physics.add.collider(this.player, this.chao);
    this.chao.body.setSize(4000, 561);

    // Adiciona o monstro e suas colisões
    this.monstro = this.physics.add.sprite(650, -20, "monstro");
    this.monstro.setCollideWorldBounds(true);
    this.physics.add.collider(this.monstro, this.terra);
    this.physics.add.collider(this.monstro, this.terra2);
    this.physics.add.collider(this.monstro, this.terra3);
    this.physics.add.collider(this.monstro, this.chao);
    this.monstro.body.setSize(80, 125);

    // Adiciona o placar
    this.placar = this.add.text(110, 20, "KILLS:" + this.pontuacao, {
      fontSize: "45px",
      fill: "black",
    });

    // Adiciona o texto da sequência
    this.streakText = this.add.text(110, 60, "STREAK: " + this.streak, {
      fontSize: "45px",
      fill: "green",
    });

    // Configura a colisão entre o jogador e o monstro
    this.physics.add.overlap(
      this.player,
      this.monstro,
      function () {
        this.monstro.setVisible(false); // Torna o monstro invisível
        var posicaoMonstro_Y = Phaser.Math.RND.between(50, 650); // Sorteia uma nova posição para o monstro
        this.monstro.setPosition(posicaoMonstro_Y, 100); // Ajusta a posição do monstro

        // Incrementa a sequência e a pontuação
        this.streak = Math.min(this.streak + 1, 4); // Limita a sequência a 4
        this.pontuacao += this.streak; // Incrementa a pontuação com base na sequência
        this.placar.setText("KILLS:" + this.pontuacao); // Atualiza o texto do placar
        this.streakText.setText("STREAK: " + this.streak); // Atualiza o texto da sequência
        this.tempultkill = this.time.now; // Atualiza o tempo do último kill
        this.monstro.setVisible(true); // Torna o monstro visível novamente

        // Sorteia novas posições para os elementos do cenário
        this.terra.setPosition(
          Phaser.Math.RND.between(100, 1100),
          Phaser.Math.RND.between(100, 600)
        );
        this.terra.body.updateFromGameObject(); // Atualiza a hitbox do terra

        this.terra2.setPosition(
          Phaser.Math.RND.between(100, 1100),
          Phaser.Math.RND.between(100, 600)
        );
        this.terra2.body.updateFromGameObject(); // Atualiza a hitbox do terra2

        this.terra3.setPosition(
          Phaser.Math.RND.between(100, 1100),
          Phaser.Math.RND.between(100, 600)
        );
        this.terra3.body.updateFromGameObject(); // Atualiza a hitbox do terra3
      },
      null, // Previne callback e crash
      this
    );

    // Cria as animações do jogador
    this.anims.create({
      key: "walk_down",
      frames: this.anims.generateFrameNumbers("player", { start: 4, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_right",
      frames: this.anims.generateFrameNumbers("player", { start: 5, end: 10 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_up",
      frames: this.anims.generateFrameNumbers("player", { start: 2, end: 11 }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "walk_left",
      frames: this.anims.generateFrameNumbers("player", { start: 4, end: 9 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  // Atualiza a cena
  update() {
    // Movimento para a esquerda
    if (this.teclado.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.anims.play("walk_left", true);
    }

    // Movimento para a direita
    else if (this.teclado.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play("walk_right", true);
    }

    // Sem movimento horizontal
    else {
      this.player.setVelocityX(0);
    }

    // Movimento para cima
    if (this.teclado.up.isDown) {
      this.player.setVelocityY(-200);
      this.player.anims.play("walk_up", true);
    }

    // Movimento para baixo
    else if (this.teclado.down.isDown) {
      this.player.setVelocityY(200);
      this.player.anims.play("walk_down", true);
    }

    // Verifica se o tempo desde a última kill é maior que 1.2 segundos
    if (this.time.now - this.tempultkill > 1200) {
      this.streak = Math.max(this.streak - 1, 0); // Diminui a sequência, mas não abaixo de 0
      this.streakText.setText("STREAK: " + this.streak); // Atualiza o texto da sequência
      this.tempultkill = this.time.now; // Atualiza o tempo do último decremento
    }
  }
}
