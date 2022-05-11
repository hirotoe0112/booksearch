const endPoint = "https://api.openbd.jp";
const apiQuery = "/v1/get?isbn=";

window.onload = function(){
  let isbn = document.querySelector('#isbn');
  isbn.focus();
  isbn.addEventListener('keyup', search, false);
};

function search(event){
  //エラーメッセージ初期化
  let inputError = document.querySelector('#inputError');
  inputError.innerText = "";
  //エンター以外は何もしない
  if(event.keyCode != 13){
    return;
  }
  //入力された文字を取得
  let inputText = document.querySelector('#isbn').value;
  //空の場合はエラーにする
  if(inputText == ""){
    inputError.innerText = "ISBNを入力してください。";
    return;
  }
  //TODO:その他入力チェック

  let apiUrl = endPoint + apiQuery + inputText;
  fetch(apiUrl)
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json[0]);
      console.log(json[0].onix.DescriptiveDetail.TitleDetail.TitleElement.TitleText.content);
      console.log(json[0].onix.DescriptiveDetail.Contributor[0].PersonName.content);
    });
}