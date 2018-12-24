// Price ticker
SeroTools.ticker = new Mongo.Collection('serocash_price_ticker', {connection: null});
if(Meteor.isClient)
    new PersistentMinimongo(SeroTools.ticker);

SeroTools.ticker.start = function(options){
    var url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR';

    options = options || {};

    if(options.extraParams)
        url += '&extraParams='+ options.extraParams;

    var updatePrice = function(e, res){

        if(!e && res && res.statusCode === 200) {
            var content = JSON.parse(res.content);

            if(content){
                _.each(content, function(price, key){
                    var name = key.toLowerCase();

                    // make sure its a number and nothing else!
                    if(_.isFinite(price)) {
                        SeroTools.ticker.upsert(name, {$set: {
                            price: String(price),
                            timestamp: null
                        }});
                    }

                });
            }
        } else {
            console.warn('Can not connect to https://mini-api.cryptocompare.com to get price ticker data, please check your internet connection.');
        }
    };

    // update right away
    HTTP.get(url, updatePrice);
        
    // update prices
    Meteor.setInterval(function(){
        HTTP.get(url, updatePrice);    
    }, 1000 * 30);
}

