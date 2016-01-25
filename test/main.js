var chai = require('chai'),
    DelayExt = require('../src/main');

chai.should();

describe('Extension', function() {
    it('should inject in built-in promise', function() {
        var CustomPromiseConstructor = function() {
        };

        !function() {
            DelayExt();
            DelayExt(CustomPromiseConstructor);
        }.should.not.throw(Error);

        global._oldPromise = global.Promise;

        !function() {
            delete global.Promise;
            DelayExt();
        }.should.throw(Error);

        global.Promise = global._oldPromise;

        Promise.should.contain.all.keys('delay');
        Promise.prototype.should.contain.all.keys('delay');

        CustomPromiseConstructor.should.contain.all.keys('delay');
        CustomPromiseConstructor.prototype.should.contain.all.keys('delay');

        DelayExt('customDelay');
        Promise.should.contain.all.keys('customDelay');
        Promise.prototype.should.contain.all.keys('customDelay');
    });
});

describe('Functional', function() {
    it('should working correctly as static function', function(done) {
        var current = new Date();

        this.timeout(1000);
        Promise.delay(500).then(function() {
            if (new Date() - current >= 500) {
                done();
            }
        });
    });

    it('should working correctly as method and should pass arguments through itself', function(done) {
        var current = new Date();

        this.timeout(1100);
        new Promise(function(resolve) {
            resolve('some value');
        }).delay(250).delay(250).then(function(value) {
            if (new Date() - current >= 500 && value === 'some value') {
                done();
            }
        });
    });
});
