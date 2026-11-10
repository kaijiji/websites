// ゲームバランスの定数。数値をいじるときはまずここ。
export const ARENA_R = 39;          // プレイヤーが動ける半径 [m]
export const MAX_PLAYERS = 4;
export const QUEST_LIMIT = 20 * 60; // 制限時間 [s]
export const CARTS = 3;             // 力尽きてよい回数（パーティ共有）

export const PLAYER = {
  hp: 100, stamina: 100,
  walk: 5.4, sprint: 8.4, guardMove: 2.2, chargeMove: 2.4,
  staminaRegen: 26, staminaDelay: 0.7, sprintDrain: 9,
  dodgeCost: 22, dodgeDur: 0.52, dodgeDist: 7.2, iFrom: 0.03, iTo: 0.34,
  parryWindow: 0.2, guardRate: 0.3, // ガード時の被ダメ倍率
  potions: 4, potionHeal: 50, potionTime: 1.5,
  eye: 1.66, radius: 0.45,
};

// 攻撃モーション: dur=全体, hit=判定の瞬間, mv=モーション値, reach=届く距離, next=次の入力を受け付ける時刻
export const ATTACKS = {
  light1: { dur: 0.56, hit: 0.2, mv: 16, reach: 3.7, next: 0.3, step: 1.1 },
  light2: { dur: 0.56, hit: 0.19, mv: 19, reach: 3.7, next: 0.3, step: 1.0 },
  light3: { dur: 0.86, hit: 0.33, mv: 34, reach: 3.9, next: 0.62, step: 1.3 },
  heavy1: { dur: 0.82, hit: 0.2, mv: 40, reach: 4.2, next: 0.6, step: 1.2 },
  heavy2: { dur: 0.9, hit: 0.22, mv: 80, reach: 4.3, next: 0.68, step: 1.4 },
  heavy3: { dur: 1.0, hit: 0.24, mv: 135, reach: 4.4, next: 0.78, step: 1.6 },
  counter: { dur: 0.66, hit: 0.14, mv: 85, reach: 4.4, next: 0.42, step: 1.8 },
};
export const CHARGE = { start: 0.2, lv: [0.55, 1.15, 1.75], over: 2.7 };

// 肉質（部位ごとのダメージ倍率）
export const HITZONE = { head: 1.45, body: 1.0, leg: 0.8, tail: 1.05, back: 0.45 };

export const BOSS = {
  name: '灰角竜 グラヴァルド',
  hp: 8000,
  hpScale: [1, 1.75, 2.4, 3.0], // 人数による体力倍率
  headFlinch: 560, legTopple: 600, tailCut: 900, hornBreak: 1100, parryStun: 3, // 怯み・転倒は起こすたびに必要量が増える
  walk: 4.2, run: 15.5, turn: 1.9,
};

export const RANKS = [ // クリアタイム [s] 以下でそのランク
  { r: 'S', t: 300 }, { r: 'A', t: 480 }, { r: 'B', t: 720 }, { r: 'C', t: Infinity },
];
export const PLAYER_COLORS = ['#e2573a', '#3aa0e2', '#e2b23a', '#57c26a'];
export const STAMPS = ['ナイス！', '回復する！', '尻尾を狙おう！', '助けて！'];
