document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startBtn").addEventListener("click", function () {
        document.getElementById("output").innerText = "診断スタートだよね！（質問を出す処理を追加予定）";
        currentQuestionIndex = 0;
        answers = {};
        askQuestion(); // ← ここを追加！
    });
});

const characters = [
    { name: "ジョナサン・ジョースター", traits: { 男性: true, スタンド: null, 敵対: false, 帽子: false, 人間: true, 死亡: true, 学生: true, タトゥー: false, ピアス: false } },
    { name: "ディオ・ブランドー", traits: { 男性: true, スタンド: false, 敵対: true, 帽子: false, 人間: null, 死亡: true, 学生: true, タトゥー: false, ピアス: false } },
    { name: "ジョセフ・ジョースター", traits: { 男性: true, スタンド: true, 敵対: false, 帽子: null, 人間: true, 死亡: false, 学生: false, タトゥー: false, ピアス: false } },
    { name: "カーズ", traits: { 男性: true, スタンド: false, 敵対: true, 帽子: false, 人間: false, 死亡: true, 学生: false, タトゥー: false, ピアス: true } },
    { name: "空条承太郎", traits: { 男性: true, スタンド: true, 敵対: false, 帽子: true, 人間: true, 死亡: true, 学生: true, タトゥー: false, ピアス: true } },
    { name: "DIO", traits: { 男性: true, スタンド: true, 敵対: true, 帽子: false, 人間: false, 死亡: true, 学生: false, タトゥー: false, ピアス: true } },
    { name: "東方仗助", traits: { 男性: true, スタンド: true, 敵対: false, 帽子: false, 人間: true, 死亡: false, 学生: true, タトゥー: false, ピアス: true } },
    { name: "吉良吉影", traits: { 男性: true, スタンド: true, 敵対: true, 帽子: false, 人間: true, 死亡: true, 学生: false, タトゥー: false, ピアス: false } },
    { name: "ジョルノ・ジョバァーナ", traits: { 男性: true, スタンド: true, 敵対: false, 帽子: false, 人間: true, 死亡: false, 学生: true, タトゥー: false, ピアス: true } },
    { name: "ディアボロ", traits: { 男性: true, スタンド: true, 敵対: true, 帽子: false, 人間: true, 死亡: null, 学生: false, タトゥー: true, ピアス: false } },
    { name: "空条徐倫", traits: { 男性: false, スタンド: true, 敵対: false, 帽子: false, 人間: true, 死亡: true, 学生: false, タトゥー: true, ピアス: true } },
    { name: "エンリコ・プッチ", traits: { 男性: true, スタンド: true, 敵対: true, 帽子: false, 人間: true, 死亡: true, 学生: false, タトゥー: false, ピアス: false } },
    { name: "ジョニィ・ジョースター", traits: { 男性: true, スタンド: true, 敵対: false, 帽子: true, 人間: true, 死亡: true, 学生: false, タトゥー: false, ピアス: false } },
    { name: "ファニー・ヴァレンタイン", traits: { 男性: true, スタンド: true, 敵対: true, 帽子: false, 人間: true, 死亡: true, 学生: false, タトゥー: false, ピアス: false } },
    { name: "東方定助", traits: { 男性: true, スタンド: true, 敵対: false, 帽子: true, 人間: true, 死亡: false, 学生: null, タトゥー: false, ピアス: false } },
    { name: "透龍", traits: { 男性: true, スタンド: true, 敵対: true, 帽子: false, 人間: false, 死亡: true, 学生: false, タトゥー: false, ピアス: false } }
];

const questions = [
    { text: "男性ですか？", key: "男性" },
    { text: "スタンド使いですか？", key: "スタンド" },
    { text: "主人公チームにとって敵ですか？（過去に敵対したことがあるのも含む）", key: "敵対" },
    { text: "基本的に帽子をかぶっていますか？", key: "帽子" },
    { text: "人間ですか？（岩人間は「いいえ」）", key: "人間" },
    { text: "物語の中で最終的に死亡しますか？", key: "死亡" },
    { text: "学生ですか？", key: "学生" },
    { text: "タトゥーがありますか？", key: "タトゥー" },
    { text: "体のどこかにピアスをしていますか？", key: "ピアス" }
];

let currentQuestionIndex = 0;
let answers = {};

function askQuestion() {
    if (currentQuestionIndex < questions.length) {
        document.getElementById("output").innerHTML = `
            <p>${questions[currentQuestionIndex].text}</p>
            <button onclick="answerQuestion(true)">はい</button>
            <button onclick="answerQuestion(false)">いいえ</button>
            <button onclick="answerQuestion(null)">分からない</button>
        `;
    } else {
        determineCharacter();
    }
}

function answerQuestion(answer) {
    answers[questions[currentQuestionIndex].key] = answer;
    currentQuestionIndex++;
    askQuestion();
}

function determineCharacter() {
    let possibleCharacters = characters.filter(char => {
        return Object.keys(answers).every(key => 
            answers[key] === null || char.traits[key] === undefined || char.traits[key] === answers[key]
        );
    });

    if (possibleCharacters.length === 1) {
        document.getElementById("output").innerHTML = `<p>あなたが思い浮かべたのは… <strong>${possibleCharacters[0].name}</strong> ですね！</p>`;
    } else if (possibleCharacters.length > 1) {
        document.getElementById("output").innerHTML = `<p>候補が複数います: ${possibleCharacters.map(c => c.name).join(", ")}</p>`;
    } else {
        document.getElementById("output").innerHTML = `<p>該当するキャラが見つかりませんでした。</p>`;
    }
}
