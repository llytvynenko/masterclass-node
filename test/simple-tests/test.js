const {assert, expect} = require('chai');
var request = require('request');
var jsdom = require('jsdom');
var co = require('co');

describe('test', () => {
  it('should pass', () => {
    assert(1 == '1');
  });

  it('async test', (done) => {
    request.get('http://nodejs.org/dist/', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      jsdom.env(body, (error, window) => {
        const links = window.document.querySelectorAll('a');
        expect(links.length).to.equal(255);
        done();
      })
    })
  })

  const dom = (body) => new Promise((resolve, reject) => {
    return jsdom.env(body, (error, window) => error ? reject(error) : resolve(window))
  });

  const [get, post] = ['get', 'post'].map(verb => {
    return options => new Promise((resolve, reject) => {
      return request[verb](options, (error, response) => {
        if (error) return reject(error);
        resolve(response);
      })
    })
  });

  const test = generator => done => co(generator).then(done, done);

  it('async test2', test(function* () {
      const response = yield get('https://nodejs.org/dist/');
      expect(response.statusCode).to.equal(200);
      const window = yield dom(response.body);
      const [goog, ya] = yield [get('https://google.com'), get('http://ya.ru')];
      const links = window.document.querySelectorAll('a');
      expect(links.length).to.equal(255);
    }));
  });
