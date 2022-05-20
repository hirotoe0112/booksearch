const endPoint = "https://api.openbd.jp";
const apiQuery = "/v1/get?isbn=";

var vueData = {
  searchWord:"",
  errorMessage:"",
  book:{
    title:"",
    author:""
  },
  available:false
}
var vueApp;

window.onload = function(){
  vueApp = new Vue({
    el:'#wrap',
    data:vueData,
    methods:{
      search:function(event){
        //エンター以外は何もしない
        if(event.keyCode != 13){
          return;
        }
        //エラーチェック
        this.validate();
        //検索実行
        if(this.errorMessage == ""){
          this.getData();
        }
      },
      validate:function(){
        //結果エリア初期化
        this.available = false;
        //エラーメッセージ初期化
        this.errorMessage = "";
        //空の場合はエラーにする
        if(this.searchWord == ""){
          this.errorMessage = "ISBNを入力してください。";
          return;
        }
        //TODO:その他入力チェック
      },
      getData:function(){
        let apiUrl = endPoint + apiQuery + this.searchWord;
        fetch(apiUrl)
          .then(response => {
            return response.json();
          })
          .then(json => {
            if(json[0] != null){
              this.available = true;
              this.book.title = json[0].onix.DescriptiveDetail.TitleDetail.TitleElement.TitleText.content;
              this.book.author = json[0].onix.DescriptiveDetail.Contributor[0].PersonName.content;
            }else{
              this.errorMessage = "検索結果がありません。";
            }
            console.log(json[0]);
          });
      }
    },
    mounted:function(){
      //画面表示時のフォーカスを設定
      this.$nextTick(function(){
        this.$refs.defaultFocus.focus();
      });
    }
  });
}