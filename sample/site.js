$(function () {
  // Synth
  var ctx = Waml.getAudioContext();
  var tri = Waml.createModule('TriOscillator');

  // Effect
  var trm = Waml.createModule('SimpleTremolo');
  trm.depth.value = 2.0;
  trm.frequency.value = 0.0;
  tri.connect(trm.inlet);

  var mod = ctx.createOscillator();
  mod.frequency.value = 0.1;
  mod.start();
  var modrange = ctx.createWaveShaper();
  modrange.curve = new Float32Array([0.4,5]);
  mod.connect(modrange);
  modrange.connect(trm.frequency);
  trm.connect(ctx.destination);

  var kb = document.getElementById('keyboard');
  kb.addEventListener('change', function(e) {
    var note = e.note;
    if ( note[0] ) {
      tri.noteOn(note[1]);
    }
    else {
      tri.noteOff();
    }
  });

  var renderer = Waml.Web.createWaveFormRenderer('waveform', {
    waveColor: '#f84',
    backgroundColor: '#fff',
    centerLine: '#abc'
  });
  trm.connect(renderer);
  Waml.onmoduleload = function (module) {
    Waml.describe(module.name, function (message) {
  console.log(message);
      var $console = $('#js-console');
      var html = $console.html();
      $console.html( html + "<br />" + message );
    });
  };
  Waml.Web.loadScriptFromURL('SimpleAutoWah.js');
});