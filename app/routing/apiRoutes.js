
var friends = require("../data/friends.js");

module.exports = function(app){
    app.get("/api/friends", function(req, res){
        return res.json(friends);
    });
    app.post("/api/friends", function(req, res){
        var newFriend = req.body;
        newFriend.name = newFriend.name.replace(/\s+/g, "").toLowerCase();

    
        var newFriendScores = newFriend.scores;
        var scoreArray = [];
        var bestMatch = 0;


        //looping thru list of current friends
        for (var i = 0; i < friends.length; i ++){
            var scoreDifference = 0;

            //looping thru list of new friend scores to compare current friends scores vs new friend scores
            
            for (var j = 0; j <newFriendScores.length; j++){
                scoreDifference += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(newFriendScores[j])));
            }

            //pushing results into an Array
            scoreArray.push(scoreDifference);
        }

        for (var i = 0; i < scoreArray.length; i++){
            if(scoreArray[i] <= scoreArray[bestMatch]){
                bestMatch = i;
            }
        }
        var bestFriend = friends[bestMatch];
        res.json(bestFriend);

        friends.push(newFriend);
        
    });
    
    

};

