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

  $fixture = $ '#fixture'
  console.log $fixture

  before ->
    $fixture.append '<div id="upload"><button id="btn-submit"></button></div>'

  after ->
    $fixture.empty()

  beforeEach ->
    uploader = new App.View.Uploader
                    el: $fixture

    sinon.spy uploader, 'toggleDroppable'

  afterEach ->
    uploader.toggleDroppable.restore()
    uploader.remove()

  # Tests ---------------------------------------------------------------------

  it 'should be able to be instantiated as a view', ->
    uploader.should.be.an 'object'

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
    uploader.toggleDroppable.should.have.been.called

  it 'hides the submit button', ->
    $fixture.find('#btn-submit').css('display').should.equal 'none'


    # hides the submit button
    # shows a hover state when something is dragged over it
























