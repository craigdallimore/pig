(function() {
  var assert, expect, should;

  assert = chai.assert;

  expect = chai.expect;

  should = chai.should();

  describe('App', function() {
    it('has a start method', function() {
      return App.should.have.property('start');
    });
    it('provides the \'App\' namespace', function() {
      return App.should.be.an('object');
    });
    return it('has the expected chidren', function() {
      return App.should.include.keys('View');
    });
  });

  describe('App.View', function() {
    return it('has the expected children', function() {
      return App.View.should.include.keys('Uploader');
    });
  });

  describe('App.View.Uploader', function() {
    var $fixture, uploader;
    uploader = null;
    $fixture = $('#fixture');
    console.log($fixture);
    before(function() {
      return $fixture.append('<div id="upload"><button id="btn-submit"></button></div>');
    });
    after(function() {
      return $fixture.empty();
    });
    beforeEach(function() {
      uploader = new App.View.Uploader({
        el: $fixture
      });
      return sinon.spy(uploader, 'toggleDroppable');
    });
    afterEach(function() {
      uploader.toggleDroppable.restore();
      return uploader.remove();
    });
    it('should be able to be instantiated as a view', function() {
      return uploader.should.be.an('object');
    });
    describe('ToggleDroppable method', function() {});
    it('should not be called if the FileAPI does not exist', function() {
      window.File = false;
      uploader.initialize();
      return uploader.toggleDroppable.should.not.have.been.called;
    });
    it('should be called if the FileAPI exists', function() {
      window.File = true;
      window.FileList = true;
      window.FileReader = true;
      uploader.initialize();
      return uploader.toggleDroppable.should.have.been.called;
    });
    return it('hides the submit button', function() {
      return $fixture.find('#btn-submit').css('display').should.equal('none');
    });
  });

}).call(this);
