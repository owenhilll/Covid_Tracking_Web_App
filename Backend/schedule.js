const fetch = require('node-fetch');
const db = require('./db');
var schedule = require('node-schedule');


/* change 'hour: 0, minute: 0' in the next line to the next closest minute of the current time. i.e if it is 4:34 pm
   change the parameters to 'minute: 35' to have the function run within a minute. you will know if the function ran if
   you see 'cleared table' and 'added covid data' in the console.
   ****************** PLEASE CHANGE THE PARAMETERS BACK TO 'hour: 0, minute: 0' ONCE THE FUNCTION RUNS ************************
*/
var j = schedule.scheduleJob({hour: 0, minute: 0},  async function(){
    var state_codes = ['AK', 'AL','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN',
        'MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI',
        'WY'];

    db.none('DELETE FROM states;')
    .then(() => {
        console.log('cleared table');
    })
    .catch(error => {
        console.log(`Error deleting states table. error message: ${error.message}`);
    });

    const api_url = 'https://api.covidtracking.com/v1/states/current.json';
    const res = await fetch(api_url);
    const json = await res.json();
    var query = '';

    for (var i = 0; i < state_codes.length; i++){
        var current_state = json.find(obj => obj.state == state_codes[i]);

        var state = (current_state['state'] == null) ? 'NULL' : current_state['state'];
        state = `'${state}'`;
        var death = (current_state['death'] == null) ? 'NULL' : current_state['death'];
        var deathConfirmed = (current_state['deathConfirmed'] == null) ? 'NULL' : current_state['deathConfirmed'];
        var deathIncrease = (current_state['deathIncrease'] == null) ? 'NULL' : current_state['deathIncrease'];
        var deathProbable = (current_state['deathProbable'] == null) ? 'NULL' : current_state['deathProbable'];
        var hospitalized = (current_state['hospitalized'] == null) ? 'NULL' : current_state['hospitalized'];
        var hospitalizedCumulative = (current_state['hospitalizedCumulative'] == null) ? 'NULL' : current_state['hospitalizedCumulative'];
        var hospitilizedCurrently = (current_state['hospitilizedCurrently'] == null) ? 'NULL' : current_state['hospitilizedCurrently'];
        var hospitalizedIncrease = (current_state['hospitalizedIncrease'] == null) ? 'NULL' : current_state['hospitalizedIncrease'];
        var inIcuCumulative = (current_state['inIcuCumulative'] == null) ? 'NULL' : current_state['inIcuCumulative'];
        var inIcuCurrently = (current_state['inIcuCurrently'] == null) ? 'NULL' : current_state['inIcuCurrently'];
        var lastUpdateEt = (current_state['lastUpdateEt'] == null) ? "NULL" : current_state['lastUpdateEt'];
        lastUpdateEt = `'${lastUpdateEt}'`;
        var negative = (current_state['negative'] == null) ? 'NULL' : current_state['negative'];
        var onVentilatorCumulative = (current_state['onVentilatorCumulative'] == null) ? 'NULL' : current_state['onVentilatorCumulative'];
        var onVentilatorCurrently = (current_state['onVentilatorCurrently'] == null) ? 'NULL' : current_state['onVentilatorCurrently'];
        var positive = (current_state['positive'] == null) ? 'NULL' : current_state['positive'];
        var positiveCasesViral = (current_state['positiveCasesViral'] == null) ? 'NULL' : current_state['positiveCasesViral'];
        var positiveIncrease = (current_state['positiveIncrease'] == null) ? 'NULL' : current_state['positiveIncrease'];
        var probableCases = (current_state['probableCases'] == null) ? 'NULL' : current_state['probableCases'];
        var recovered = (current_state['recovered'] == null) ? 'NULL' : current_state['recovered'];

        query += `INSERT INTO states VALUES (${state}, ${death}, ${deathConfirmed}, ${deathIncrease}, ${deathProbable}, ${hospitalized}, ${hospitalizedCumulative}, ${hospitilizedCurrently}, ${hospitalizedIncrease}, ${inIcuCumulative}, ${inIcuCurrently}, ${lastUpdateEt}, ${negative}, ${onVentilatorCumulative}, ${onVentilatorCurrently}, ${positive}, ${positiveCasesViral}, ${positiveIncrease}, ${probableCases}, ${recovered});`;
        query += '\n';
    }
    db.none(query)
    .then(() => {
        console.log('added covid data');
    })
    .catch(error => {
        console.log(`Error adding rows to state table. error message: ${error.message}`);
    });
});

exports.scheduler = j;
