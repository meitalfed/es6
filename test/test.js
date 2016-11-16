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
