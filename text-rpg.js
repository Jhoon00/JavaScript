//태그 선택
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
  //게임 클래스 생성
  constructor(name) {
    this.monster = null; // Game 클래스의 몬스터
    this.hero = null; // Game 클래스의 히어로
    this.monsterList = [
      // 몬스터 리스트 객체
      { name: "슬라임", hp: 25, att: 10, xp: 10 },
      { name: "스켈레톤", hp: 50, att: 15, xp: 20 },
      { name: "마왕", hp: 150, att: 35, xp: 50 },
    ];
    this.start(name); // 클래스 Game형으로 함수
  }

  //게임시작
  start(name) {
    // 게임메뉴에서 이벤트 후 함수 실행
    $gameMenu.addEventListener("submit", this.onGameMenuInput);
    // 배틀메뉴에서 이벤트 후 함수 실행
    $battleMenu.addEventListener("submit", this.onBattleMenuInput);
    this.changeScreen("game");
    this.hero = new Hero(this, name);
    this.updateHeroStat();
  }

  // 선택에 따라 화면은 전환
  changeScreen(screen) {
    if (screen === "start") {
      // 스타트 화면 출력
      $startScreen.style.display = "block";
      $gameMenu.style.display = "none";
      $battleMenu.style.display = "none";
    } else if (screen === "game") {
      // 게임메뉴 화면 출력
      $startScreen.style.display = "none";
      $gameMenu.style.display = "block";
      $battleMenu.style.display = "none";
    } else if (screen === "battle") {
      // 배틀메뉴 화면 출력
      $startScreen.style.display = "none";
      $gameMenu.style.display = "none";
      $battleMenu.style.display = "block";
    }
  }

  //영웅캐릭터 스텟 초기화
  updateHeroStat() {
    const { hero } = this;
    if (hero === null) {
      // 영웅이 없으면 초기화
      $heroName.textContent = "";
      $heroLevel.textContent = "";
      $heroHp.textContent = "";
      $heroXp.textContent = "";
      $heroAtt.textContent = "";
      return;
    }
    // 히어로 속성 출력
    $heroName.textContent = hero.name;
    $heroLevel.textContent = `${hero.lev}Lev`;
    $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
    $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
    $heroAtt.textContent = `ATT: ${hero.att}`;
  }

  //몬스터캐릭터 스텟 초기화
  updateMonsterStat() {
    //객체를 한번에 변수 선언
    const { monster } = this;
    // 몬스터 값이 없을 시
    if (monster === null) {
      //값 초기화
      $monsterName.textContent = "";
      $monsterHp.textContent = "";
      $monsterAtt.textContent = "";
      return;
    }
    // 몬스터 속성 출력
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT: ${monster.att}`;
  }

  showMessage(text) {
    //메세지 출력
    $message.textContent = text;
  }

  quit() {
    //게임오버, 값 초기화, 화면전환
    this.hero = null;
    this.monster = null;
    this.updateHeroStat();
    this.updateMonsterStat();
    $gameMenu.removeEventListener("submit", this.onGameMenuInput);
    $battleMenu.removeEventListener("submit", this.onBattleMenuInput);
    this.changeScreen("start");
    game = null;
  }

  //게임메뉴 값 입력 후 불러오는 함수
  onGameMenuInput = (event) => {
    event.preventDefault(); // 초기화 막기
    const input = event.target["menu-input"].value; // 입력 받은 값 저장
    event.target["menu-input"].value = ""; // 입력 값 초기화
    // 선택한 메뉴
    if (input === "1") {
      this.changeScreen("battle"); // 배틀화면으로 변경
      // 몬스터 리스트에서 무작위로 뽑아 저장
      const randomIndex = Math.floor(Math.random() * this.monsterList.length);
      const randomMonster = this.monsterList[randomIndex];
      // 다형성 적용하여 몬스터 객체 생성
      this.monster = new Monster(
        this,
        randomMonster.name,
        randomMonster.hp,
        randomMonster.att,
        randomMonster.xp
      );
      this.updateMonsterStat(); // 몬스터 업데이트
      this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}인 것 같다!`); // 화면에 메세지 출력
    } else if (input === "2") {
      // 히어로 hp를 maxHp로 변경
      this.hero.hp = this.hero.maxHp;
      this.updateHeroStat();
      this.showMessage(`회복을 끝냈다. ${this.hero.hp}/${this.hero.maxHp}`);
    } else if (input === "3") {
      // 게임종료 및 초기화
      this.showMessage(`게임을 종료하셨습니다.`);
      this.quit();
    }
  };

  //배틀메뉴 값 입력후 불러오는 함수
  onBattleMenuInput = (event) => {
    event.preventDefault(); // 초기화 막기
    const input = event.target["battle-input"].value; // 입력 값 저장
    // 공격
    if (input === "1") {
      //객체를 선언
      const { hero, monster } = this;
      // Hero클래스의 메소드
      hero.attack(monster);
      monster.attack(hero);
      if (hero.hp <= 0) {
        // 히어로 캐릭터 소멸
        this.showMessage(`${hero.lev} 레벨에서 전사. 새 영웅을 생성하세요.`);
        this.quit(); // 게임 아웃
      } else if (monster.hp <= 0) {
        // 몬스터 소멸
        this.showMessage(`몬스터를 잡아 ${monster.xp} 경험치를 얻었다.`);
        //Hero클래스의 메소드
        hero.getXp(monster.xp);
        this.monster = null; // 몬스터 값 초기화
        this.changeScreen("game"); // 화면 전환
      } else {
        // 현재 상황 출력
        this.showMessage(
          `${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`
        );
      }
      this.updateHeroStat();
      this.updateMonsterStat();
    } else if (input === "2") {
      const { hero, monster } = this; // 객체를 선언
      const beforeHp = hero.hp; // 현재 hp값 저장
      hero.hp = Math.min(hero.maxHp, hero.hp + 20); // 초과하지 않게 +
      // Monster클래스 메서드
      monster.attack(hero);
      // 속성 업데이트
      this.updateHeroStat();
      this.showMessage(
        `${hero.hp - beforeHp + this.monster.att}체력을 회복하고, ${
          monster.att
        }의 데미지를 받았다.`
      );
    } else if (input === "3") {
      // 화면전환`
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
