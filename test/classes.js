var chai = require('chai');
var expect = chai.expect;

describe('the class keyword', function(){
  it('can create a class', function(){
    class Employee {

      doWork(){
        return "complete!";
      }

      getName(){
        return "Meital";
      }
    }

    let emp = new Employee();
    expect(emp.doWork()).to.equal('complete!');
    expect(emp.getName()).to.equal('Meital');
    expect(Employee.prototype.doWork.call()).to.equal('complete!');
  });

  it('can have a constructor', function(){
    class Employee {

      constructor(name){
        this._name = name;
      }

      doWork(){
        return "complete!";
      }

      getName(){
        return this._name;
      }
    }

    let e1 = new Employee('Meital');
    let e2 = new Employee('Scott');

    expect(e1.getName()).to.equal('Meital');
    expect(e2.getName()).to.equal('Scott');
  });

  it('can have getters and setters', function(){
    class Employee {

      constructor(name){
        this._name = name;
      }

      doWork(){
        return "complete!";
      }

      get name(){
        return this._name.toUpperCase();
      }

      set name(value){
        this._name = value;
      }
    }

    let e1 = new Employee('Meital');
    let e2 = new Employee('Scott');

    expect(e1.name).to.equal('MEITAL');
    expect(e2.name).to.equal('SCOTT');

    e1.name = 'Danny';
    expect(e1.name).to.equal('DANNY');
  });

  it('can have a super class', function(){
    class Person {

      constructor(name){
        this._name = name;
      }

      get name(){
        return this._name.toUpperCase();
      }

      set name(value){
        this._name = value;
      }
    }

    class Employee extends Person {
      // Employee 'is a ' Person

      constructor(name, title){
        super(name); // use super method
        this._title = title;
      }

      doWork(){
        return `${this._name} is an employee`;
      }

      get title(){
        return this._title;
      }
    }

    let p1 = new Person('Meital');
    let e1 = new Employee('Scott', 'CEO');

    expect(p1.name).to.equal('MEITAL');
    expect(e1.name).to.equal('SCOTT');

    expect(e1.doWork()).to.equal('Scott is an employee');
    expect(e1.title).to.equal('CEO');
  });

  it('can override', function(){
    class Person {

      constructor(name){
        this._name = name;
      }

      get name(){
        return this._name.toUpperCase();
      }

      set name(value){
        this._name = value;
      }

      doWork(){
        return 'free';
      }
    }

    class Employee extends Person {

      constructor(name, title){
        super(name);
        this._title = title;
      }

      doWork(){
        return 'paid';
      }

      get title(){
        return this._title;
      }
    }

    let p1 = new Person('Meital');
    let e1 = new Employee('Scott', 'CEO');

    let makeEveryoneWork = function(...people){
      let results = [];
      for (var i = 0; i < people.length; i++) {
        if(people[i] instanceof Person){
          results.push(people[i].doWork());
        }
      }
      return results;
    };

    expect(makeEveryoneWork(p1, e1, {})).to.deep.equal(['free', 'paid']);

  });

});
