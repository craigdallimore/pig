assert = chai.assert
expect = chai.expect
should = chai.should()

describe 'App', ->

  it 'has a start method', ->
    App.should.have.property 'start'

  it 'provides the \'App\' namespace', ->
    App.should.be.an 'object'

  it 'has the expected chidren', ->
    App.should.include.keys 'View'

describe 'App.View', ->

  it 'has the expected children', ->
    App.View.should.include.keys 'Uploader'

describe 'App.View.Uploader', ->

  # Setup ---------------------------------------------------------------------

  uploader = null
  mockFileEvent =
    originalEvent:
      target:
        files: ['a', 'b', 'c']


  $fixture = $ '#fixture'

  beforeEach ->
    $fixture.append '<div id="upload">' +
                      '<input id="file-select" type="file"/>' +
                      '<div id="file-drag"></div>' +
                      '<button id="btn-submit"></button>' +
                    '</div>'

    uploader = new App.View.Uploader
                    el: $fixture


    sinon.spy uploader, 'fileSelectHandler'
    sinon.spy uploader, 'toggleDroppable'

  afterEach ->
    uploader.fileSelectHandler.restore()
    uploader.toggleDroppable.restore()
    uploader.remove()
    $fixture.empty()

  # Tests ---------------------------------------------------------------------

  it 'should be able to be instantiated as a view', ->
    uploader.should.be.an 'object'

  it 'calls FileSelectHandler when a file is dropped', ->
    # what if i stub trigger?H

    $fixture.find('#file-drag').trigger('drop', [mockFileEvent])
    uploader.fileSelectHandler.should.have.been.calledOnce


  describe 'ToggleDroppable method', ->
    it 'should not be called if the FileAPI does not exist', ->
      window.File = false
      uploader.initialize()
      uploader.toggleDroppable.should.not.have.been.called

    it 'should be called if the FileAPI exists', ->
      window.File       = true
      window.FileList   = true
      window.FileReader = true
      uploader.initialize()
      uploader.toggleDroppable.should.have.been.calledOnce


    it 'hides the submit button', ->
      $fixture.find('#btn-submit').css('display').should.equal 'none'

    it 'shows the draggable element if this FileAPI exists', ->
      window.File       = true
      window.FileList   = true
      window.FileReader = true
      uploader.initialize()
      $fixture.find('#file-drag').css('display').should.equal 'block'


  describe 'file-drag element', ->

    it 'changes class on mouseover', ->
      $fixture.find('#file-drag').trigger 'dragover'
      $fixture.find('#file-drag').hasClass('hover').should.be.true

    it 'changes class on mouseout', ->
      $fixture.find('#file-drag').addClass 'hover'
      $fixture.find('#file-drag').trigger 'dragout'
      $fixture.find('#file-drag').hasClass('hover').should.be.false



