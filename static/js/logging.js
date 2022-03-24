//Needs to include the following when in use (* means file was also edited following by the function edited)
/*
 - timeTracker.js * timeoutHandle *(toSeconds())
 - feed back js * checkIncorrect * (getCounter())
 - all merge sort level files * confirm quit, getNextRow,
*/

function logGame(reason) {
    let gameInfo, data;
    try {
        // If the reason is undefined change to unkown
        if(reason == undefined) {
            reason = "unknown";
        }

        gameInfo = (window.location.pathname).slice(1).split('/'); // Gets the game type and level from the url
        gameInfo[0] = gameInfo[0].replace('_', ' '); // Replaces the underscore with a space for correct game type

        data = {
            type: gameInfo[0],
            level: gameInfo[1],
            playTime: toSeconds(), //Gets the elapsed played time in seconds,
            mistakeCount: getCounter(), // Gets the Number of mistakes made
            logReason: reason
        };
        
    } catch (err) {
        console.log("An Error Occured While Logging The Game.");
        console.log(err);
    } finally {
        $.post(`/admin/log_game`, data);

        //Updates the users max level if the gam was completed
        if(reason == 'completed') {
            $.post(`/admin/update_max_ms`, {newMax: (gameInfo[1] + 1)});
        }
    }
}
