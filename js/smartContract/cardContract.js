'use strict'

/*
    save card info . card info is a object

    key value

    value = {
        name: '',
        company: '',
        position: '',
        sex: '',
        birthday: '',
        phone: '',
        email: ''
    }
*/

var CardItem = function(text){
    if(text){
        var obj = JSON.parse(text);
        this.key = obj.key;
        this.value = obj.value;
        this.owner = obj.owner;
    }else{
        this.key = '';
        this.owner = '';
        this.value = '';
    }
}


CardItem.prototype = {
    toString: function(){
        return JSON.stringify(this);
    }
}

var CardStorage = function(){
    LocalContractStorage.defineMapProperty(this, 'card', {
        parse: function(text){
            return new CardItem(text);
        },
        stringify: function(o){
            return o.toString();
        }
    })
}

CardStorage.prototype = {
    init: function(){
        //
    },

    save: function(key, value){
        if(key === '' || value === ""){
            throw new Error("empty key / value")
        }
        if (key.length > 32){
            throw new Error("key / value exceed limit length")
        }

        var from = Blockchain.transaction.from;
        var cardItem = this.card.get(key)

        if (cardItem){
            throw new Error("value has been occupied");
        }

        cardItem = new CardItem();
        cardItem.owner = from;
        cardItem.key = key;
        cardItem.value = value;

        this.card.put(key, cardItem)
    },

    get: function(key){
        key = key.trim();
        if (key === ""){
            throw new Error("empty key")
        }
        return this.card.get(key);
    }
}

module.exports = CardStorage;
