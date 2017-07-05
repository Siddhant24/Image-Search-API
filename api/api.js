'use strict'

module.exports = {
  
  search: function(query, offset, GoogleSearch, response){
    if(offset)
      var start = offset;
    else
      var start = 1;
    var googleSearch = new GoogleSearch({
      key: process.env.API_KEY,
      cx: process.env.API_CX
    });  
    googleSearch.build({
      q: query,
      searchType: 'image',
      start: start
    }, function(err, res){
      if(err)
        throw err;
      response.type('json').send(res.items.map(function(item){
        var json = {};
        json.url = item.link;
        json.snippet = item.snippet;
        json.thumbnail = item.image.thumbnailLink;
        json.context = item.image.contextLink;
        return json;
      }));
    });
  },
  
  
  save: function(collection, query){
    collection.save({
      "term": query,
      "when": new Date().toLocaleString()
    }, function(err, result){
      if(err)
        throw err
    });
  },
  
  
  history: function(collection, res){
    collection.find({},{
      _id: 0
    }).toArray(function(err, data){
      if(err)
        throw err;
      res.type('json').send(data.reverse());
    });
  }
  
}