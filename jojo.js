function answer(choice) {
    document.getElementById("result").innerText = "あなたの答え: " + choice;
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startBtn").addEventListener("click", function () {
        document.getElementById("output").innerText = "診断スタート！（質問を出す処理を追加予定）";
    });
});
const characters = [
    { name: "空条承太郎", traits: { 帽子: true, スタンド: true, 喫煙: true, 学生: true } },
    { name: "ジョセフ・ジョースター", traits: { 帽子: false, スタンド: true, 喫煙: false, 学生: false } },
    { name: "東方仗助", traits: { 帽子: false, スタンド: true, 喫煙: false, 学生: true } }
];

const questions = [
    { text: "帽子をかぶっていますか？", key: "帽子" },
    { text: "スタンドを持っていますか？", key: "スタンド" },
    { text: "喫煙者ですか？", key: "喫煙" },
    { text: "学生ですか？", key: "学生" }
];
