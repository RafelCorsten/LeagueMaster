const Router = require('express').Router;
const router = Router();
const leagueController = require('../controllers/leagueController');
const {protect} = require('../middleware/auth.middleware');

// api_key = 'RGAPI-4bd374ac-6baf-4cc5-9ac3-cdaa1b912677'

router.get('/riot/:server/summoners', leagueController.getSummoners);
// def get_summoner_from_db():
//     summoners = db.summoners.find()
//     return summoners, 200


router.get('/riot/:server/matches/:puuid', leagueController.getMatchesByPlayerId)
// def get_matches_from_db_by_summoner():
//     #filter by summoner and maybe top something
//     matches = db.matches.find()
//     return matches, 200


//Gets last number amount of matches from the db
router.get('/riot/:server/matches/amount/:number', protect, leagueController.getCertainAmountMatches);
//router.post('/riot/:server/summoners/:summonerName', leagueController)
// def get_summoner_from_riot_api_and_post_to_db():
//     summoner_name = Flask.request.args.get('summonerName')
//     server = Flask.request.args.get('server')
//     summoner_info = requests.get(f'https://{server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summoner_name}?api_key={api_key}')
//     #insert in db summoner info
//     db.summoners.insert_one(summoner_info)

//     return summoner_info, 201



//router.post('/riot/:server/matches/:puuid', leagueController)
// def get_matches_from_riot_by_summoner_name_and_insert_in_db():
//     server = Flask.request.args.get('server')
//     puuid = Flask.request.args.get('puuid')
//     #https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/j1kGrDp7aTCMi0KHd9ENvEWrt1tk24bM1W93JVKUfOs7691uGQ582IofeldROoMNkv1ugL6rWQdYKw/ids?start=0&count=100
//     matches = requests.get(f'https://{server}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?api_key={api_key}&start=0&count=100')
    
//     for match in matches:
//         print('Match id ', match)
//         #https://americas.api.riotgames.com/lol/match/v5/matches/LA2_1060308183?api_key=RGAPI-bf4290d5-1d65-4bd9-9bba-45a12e63fe7b
//         match_info = requests.get(f'https://{server}.api.riotgames.com/lol/match/v5/matches/{match}?api_key={api_key}&start=0&count=100')
//         print(match_info)

//         #insert only info and not metadata 
//         #insert matches that dont exist already
//         #db.insert_match(match_info['info'])

//     if matches:
//         return matches, 201
//     return 'Couldnt retrieve the matches', 400

router.get('*', leagueController.render404);


module.exports = router;