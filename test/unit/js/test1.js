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
    var $fixture, mockFileEvent, uploader;
    uploader = null;
    mockFileEvent = {
      originalEvent: {
        target: {
          files: ['a', 'b', 'c']
        }
      }
    };
    $fixture = $('#fixture');
    beforeEach(function() {
      $fixture.append('<div id="upload">' + '<input id="file-select" type="file"/>' + '<div id="file-drag"></div>' + '<button id="btn-submit"></button>' + '</div>');
      uploader = new App.View.Uploader({
        el: $fixture
      });
      sinon.spy(uploader, 'fileSelectHandler');
      return sinon.spy(uploader, 'toggleDroppable');
    });
    afterEach(function() {
      uploader.fileSelectHandler.restore();
      uploader.toggleDroppable.restore();
      uploader.remove();
      return $fixture.empty();
    });
    it('should be able to be instantiated as a view', function() {
      return uploader.should.be.an('object');
    });
    it('calls FileSelectHandler when a file is dropped', function() {
      $fixture.find('#file-drag').trigger('drop', [mockFileEvent]);
      return uploader.fileSelectHandler.should.have.been.calledOnce;
    });
    describe('ToggleDroppable method', function() {
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
        return uploader.toggleDroppable.should.have.been.calledOnce;
      });
      it('hides the submit button', function() {
        return $fixture.find('#btn-submit').css('display').should.equal('none');
      });
      return it('shows the draggable element if this FileAPI exists', function() {
        window.File = true;
        window.FileList = true;
        window.FileReader = true;
        uploader.initialize();
        return $fixture.find('#file-drag').css('display').should.equal('block');
      });
    });
    return describe('file-drag element', function() {
      it('changes class on mouseover', function() {
        $fixture.find('#file-drag').trigger('dragover');
        return $fixture.find('#file-drag').hasClass('hover').should.be["true"];
      });
      return it('changes class on mouseout', function() {
        $fixture.find('#file-drag').addClass('hover');
        $fixture.find('#file-drag').trigger('dragout');
        return $fixture.find('#file-drag').hasClass('hover').should.be["false"];
      });
    });
  });

}).call(this);
