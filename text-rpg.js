//선택 변수
const $startScreen = document.querySelector("#start-screen");
const $gameMenu = document.querySelector("#game-menu");
const $battleMenu = document.querySelector("#battle-menu");
const $heroName = document.querySelector("#hero-name");
const $heroLevel = document.querySelector("#hero-level");
const $heroHp = document.querySelector("#hero-hp");
const $heroXp = document.querySelector("#hero-xp");
const $heroAtt = document.querySelector("#hero-att");
const $monsterName = document.querySelector("#monster-name");
const $monsterHp = document.querySelector("#monster-hp");
const $monsterAtt = document.querySelector("#monster-att");
const $message = document.querySelector("#message");

class Game {
  //게임 객체 생성
  constructor(name) {
    this.monster = null;
    this.hero = null;
    this.monsterList = [
      { name: "슬라임", hp: 25, att: 10, xp: 10 },
      { name: "스켈레톤", hp: 50, att: 15, xp: 20 },
      { name: "마왕", hp: 150, att: 35, xp: 50 },
    ];
    this.start(name);
  }
  start(name) {
    //게임시작
    $gameMenu.addEventListener("submit", this.onGameMenuInput);
    $battleMenu.addEventListener("submit", this.onBattleMenuInput);
    this.changeScreen("game");
    this.hero = new Hero(this, name);
    this.updateHeroStat();
  }
  changeScreen(screen) {
    //선택에 따라서 화면전환
    if (screen === "start") {
      $startScreen.style.display = "block";
      $gameMenu.style.display = "none";
      $battleMenu.style.display = "none";
    } else if (screen === "game") {
      $startScreen.style.display = "none";
      $gameMenu.style.display = "block";
      $battleMenu.style.display = "none";
    } else if (screen === "battle") {
      $startScreen.style.display = "none";
      $gameMenu.style.display = "none";
      $battleMenu.style.display = "block";
    }
  }
  updateHeroStat() {
    //영웅캐릭터 스텟 초기화
    const { hero } = this;
    if (hero === null) {
      $heroName.textContent = "";
      $heroLevel.textContent = "";
      $heroHp.textContent = "";
      $heroXp.textContent = "";
      $heroAtt.textContent = "";
      return;
    }
    $heroName.textContent = hero.name;
    $heroLevel.textContent = `${hero.lev}Lev`;
    $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
    $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
    $heroAtt.textContent = `ATT: ${hero.att}`;
  }
  updateMonsterStat() {
    //몬스터캐릭터 스텟 초기화
    const { monster } = this;
    if (monster === null) {
      $monsterName.textContent = "";
      $monsterHp.textContent = "";
      $monsterAtt.textContent = "";
      return;
    }
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  }
  showMessage(text) {
    //메세지 표시
    $message.textContent = text;
  }
  quit() {
    //게임오버, 값 초기화
    this.hero = null;
    this.monster = null;
    this.updateHeroStat();
    this.updateMonsterStat();
    $gameMenu.removeEventListener("submit", this.onGameMenuInput);
    $battleMenu.removeEventListener("submit", this.onBattleMenuInput);
    this.changeScreen("start");
    game = null;
  }
  onGameMenuInput = (event) => {
    //게임메뉴 이벤트
    event.preventDefault();
    const input = event.target["menu-input"].value;
    event.target["menu-input"].value = "";
    if (input === "1") {
      this.changeScreen("battle");
      const randomIndex = Math.floor(Math.random() * this.monsterList.length);
      const randomMonster = this.monsterList[randomIndex];
      this.monster = new Monster(
        this,
        randomMonster.name,
        randomMonster.hp,
        randomMonster.att,
        randomMonster.xp
      );
      this.updateMonsterStat();
      this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}인 것 같다!`);
    } else if (input === "2") {
      this.hero.hp = this.hero.maxHp;
      this.updateHeroStat();
      this.showMessage(`회복을 끝냈다. ${this.hero.hp}/${this.hero.maxHp}`);
    } else if (input === "3") {
      this.showMessage(`게임을 종료하셨습니다.`);
      this.quit();
    }
  };
  onBattleMenuInput = (event) => {
    //배틀메뉴 이벤트
    event.preventDefault();
    const input = event.target["battle-input"].value;
    if (input === "1") {
      const { hero, monster } = this;
      hero.attack(monster);
      monster.attack(hero);
      if (hero.hp <= 0) {
        this.showMessage(`${hero.lev} 레벨에서 전사. 새 영웅을 생성하세요.`);
        this.quit();
      } else if (monster.hp <= 0) {
        this.showMessage(`몬스터를 잡아 ${monster.xp} 경험치를 얻었다.`);
        hero.getXp(monster.xp);
        this.monster = null;
        this.changeScreen("game");
      } else {
        this.showMessage(
          `${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`
        );
      }
      this.updateHeroStat();
      this.updateMonsterStat();
    } else if (input === "2") {
      const { hero, monster } = this;
      const beforeHp = hero.hp;
      hero.hp = Math.min(hero.maxHp, hero.hp + 20);
      monster.attack(hero);
      this.updateHeroStat();
      this.showMessage(
        `${hero.hp - beforeHp + this.monster.att}체력을 회복하고, ${
          monster.att
        }의 데미지를 받았다.`
      );
    } else if (input === "3") {
      this.changeScreen("game");
      this.showMessage(`무사히 ${this.monster.name}으로부터 도망쳤다.`);
    }
  };
}
class Unit {
  //유닛 공통 속성
  constructor(game, name, hp, att, xp) {
    this.game = game;
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.xp = xp;
    this.att = att;
  }
  attack(target) {
    //공격
    target.hp -= this.att;
  }
}
class Hero extends Unit {
  //영웅캐릭터
  constructor(game, name) {
    super(game, name, 100, 10, 0);
    this.lev = 1;
  }
  heal(monster) {
    //회복
    this.hp += 20;
    this.hp -= monster.att;
  }
  getXp(xp) {
    //영웅캐릭터 경험치 획득
    this.xp += xp;
    if (this.xp >= this.lev * 15) {
      this.xp -= this.lev * 15;
      this.lev += 1;
      this.maxHp += 5;
      this.att += 5;
      this.hp = this.maxHp;
      this.game.showMessage(`레벨업! 레벨${this.lev}`);
    }
  }
}
class Monster extends Unit {
  //몬스터캐릭터
  constructor(game, name, hp, att, xp) {
    super(game, name, hp, att, xp);
  }
}
//시작화면 이벤트
let game = null;
$startScreen.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target["name-input"].value;
  game = new Game(name);
});
