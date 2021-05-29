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
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("lightBlue");

    //write code to show a heading for showing the result of Quiz
    textSize(30);
    fill("black");
      text("Results",380,40);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    if(allContestants != undefined){
      var displayPosition=250;
      fill("brown");
      textSize(20);
      text("*NOTE: Contestant who anwered correct are highlighted in green color!",130,230);
    }    
    console.log(allContestants)
push ();

    for(var plr in allContestants){
      var correctAns="2";
      if(correctAns==allContestants[plr].answer)
      fill("green");
      else
      fill("red");
      displayPosition=displayPosition+20;
      textSize(16);
      text (allContestants[plr].name + ": " + allContestants[plr].answer,130,displayPosition);
    }
    
    
    pop ();
  }

}
