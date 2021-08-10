class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background("yellow");
    textSize(30);
    text("Result", 340, 50);
    Contestant.getPlayerInfo();
    if(allContestants !== undefined){
      //var displayAnswers = 230;
      fill("blue");
      textSize(20);
      text("Note: All Contestants who answered correct are highlighted in blue", 130, 230);
    }
    for(var plr in allContestants){
      var correctAns = "2";
      if(correctAns === allContestants[plr].answer)
        fill("green");
      else
        fill("red");      
    }
    
  }

}
