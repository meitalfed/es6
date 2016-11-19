var chai = require('chai');
var expect = chai.expect;

describe('How let works', function() {
  it('will provide block scoping, unlike var', function() {
    var doWork = function(flag){
        if(flag){
          var x = 3;
        }
        return x;
    };

    var result = doWork(true);
    expect(result).to.equal(3);
  });

  it('will provide block scoping, unlike var', function() {
    var doWork = function(flag){
        if(flag){
          var x = 3;
        }
        return x;
    };

    var result = doWork(false);
    expect(result).to.be.undefined;
  });

  it('will provide block scoping, unlike var', function() {
    var doWork = function(flag){
        if(flag){
          let x = 3;
        }
        return x;
    };

    expect(function(){
      doWork(true)
    }).to.throw('x is not defined');
  });

  it('will provide block scoping, unlike var', function() {
    var doWork = function(flag){
        if(flag){
          let x = 3;
          return x;
        }

    };

    var result = doWork(true);
    expect(result).to.equal(3);
  });
});

describe('How const works', function(){
  it('will make a variable read-only', function(){
    const MAX_SIZE = 10;
    //MAX_SIZE = 12; 'Assignment to constant variable'

    expect(MAX_SIZE).to.equal(10);
  });

  it('can shdow outer declaration', function(){
    var doWork = function(flag){
      var x = 12; //const x = 12 / let x = 12 => Variable x has already been declared
      var x = 10;
      return x;
    };

    var result = doWork(true);
    expect(result).to.equal(result);
  });

  it('can shdow outer declaration', function(){
    const x = 12; // or let
    var doWork = function(flag){
      var x = 10;
      return x;
    };

    var result = doWork(true);
    expect(result).to.equal(result);
    expect(x).to.equal(12);
  });

  it('can shdow outer declaration', function(){
    if(true){ const x = 12; }
    var doWork = function(flag){
      var x = 10;
      return x;
    };

    var result = doWork(true);
    expect(result).to.equal(result);
    expect(function(){ x }).to.throw('x is not defined');
  });
});

describe('destructuring', function(){
  it('can destructure arrays', function(){
    // another way:
    // let x = 2;
    // let y = 3;
    //
    // [x,y] = [y,x];

    let [x,y] = [3,2];

    expect(x).to.equal(3);
    expect(y).to.equal(2);
  });

  it('can destructure arrays', function(){
    var doWork = function(){
      return [1, 3, 2];
    };
    let [, x, y] = doWork();

    expect(x).to.equal(3);
    expect(y).to.equal(2);
  });

  it('can destructure arrays', function(){
    var doWork = function(){
      return [1, 3, 2];
    };
    let [, x, y, z] = doWork();

    expect(x).to.equal(3);
    expect(y).to.equal(2);
    expect(z).to.be.undefined;
  });

  it('can destructure objects', function(){
    var doWork = function(){
      return {
        firstName: 'Meital',
        lastName: 'Federgreen',
        handles: {
          twitter: 'OdeToCode'
        }
      }
    };

    let { firstName: first, lastName: last, handles: { twitter: twt} } = doWork();

    expect(first).to.equal('Meital');
    expect(last).to.equal('Federgreen');
    expect(twt).to.equal('OdeToCode');
  });

  it('can destructure objects', function(){
    var doWork = function(){
      return {
        firstName: 'Meital',
        lastName: 'Federgreen',
        handles: {
          twitter: 'OdeToCode'
        }
      }
    };

    // same name
    let { firstName, lastName } = doWork();

    expect(firstName).to.equal('Meital');
    expect(lastName).to.equal('Federgreen');
    expect(lastName).to.equal('Federgreen');
  });

  it('works with parameters', function(){
    let ajax = function(url, { data, guid }){ // instead of writing conf and use conf.data, conf.guid
      return data;
    };

    let result = ajax(
      'url', {
        data: 'some data',
        guid: 'some guid'
      }
    );

    expect(result).to.equal('some data');
  });
});

describe('rest parameters', function(){
  it('like array', function(){
    let doWork = function(name, ...numbers){
      let result = 0;
      numbers.forEach(function(n){
        result += n;
      });
      return result;
    };

    let result = doWork('name', 1, 2, 3);
    expect(result).to.equal(6);
  });

  it('like array', function(){
    //when
    let doWork = function(name, ...numbers){
      let result = 0;
      numbers.forEach(function(n){
        result += n;
      });
      return result;
    };

    let result = doWork('name');
    expect(result).to.equal(0);
  });

});

describe('spread parameters', function(){
  it('can spread an array across paramteres', function(){
    //when
    let doWork = function(x, y, z ){
      return x + y + z;
    };

    let result = doWork(...[1, 2, 3]);
    expect(result).to.equal(6);
  });

  it('can build arrays', function(){
    var a = [4, 5, 6];
    var b = [1, 2, 3, ...a, 7, 8];

    expect(b).to.deep.equal([1,2,3,4,5,6,7,8]);
  });
});

describe('templates literal', function(){
  it('can easily combine literals and data', function(){
    let doWork = function(name){
      return `Hello, ${name}`;
    };

    expect(doWork('Meital')).to.equal("Hello, Meital");
  });

  it('can use tags', function(){
    let upper = function(strings, ...values){
        let results = '';
        for(let i = 0; i < strings.length; i++){
          results += strings[i];
          if(i < values.length){
            results += values[i];
          }
        }
        return results.toUpperCase();
    };

    var x = 2;
    var y = 3;
    var result = upper `${x} + ${y} is ${x+y}`;
    expect(result).to.equal('2 + 3 IS 5');
  });
});
