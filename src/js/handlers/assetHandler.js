import 'three';
var MobileDetect = require('mobile-detect');

export default function Assets(
  _THUMB0,
  _THUMB1,
  _THUMB2,
  _THUMB3,
  _THUMB4,
  _THUMB5,
  _THUMB6,
  _THUMB7,
  _THUMB8,
  _THUMB9
) {
  this.urls = [
    _THUMB0,
    _THUMB1,
    _THUMB2,
    _THUMB3,
    _THUMB4,
    _THUMB5,
    _THUMB6,
    _THUMB7,
    _THUMB8,
    _THUMB9
  ];
  this.imgs = [];
  this.progress = 0;
  this.md = new MobileDetect(window.navigator.userAgent);

  var manager = new THREE.LoadingManager();
  manager.onLoad = function() {
    // console.log('Loading done');
    $('#loader')
      .fadeOut(1500);
  };
  var loader = new THREE.TextureLoader(manager);

  if (this.md.mobile()) {
    for (var i = 0; i < this.urls.length; i++) {
      var texture = loader.load(
        require('./../../../static/imgs/project/' + this.urls[i] + '.png')
      );
      var mat = new THREE.MeshBasicMaterial({
        map: texture
      });
      this.imgs.push(mat);
      this.progress++;
    }
  } else {
    for (var j = 0; j < this.urls.length; j++) {
      var textureS = loader.load(
        require('./../../../static/imgs/project/' + this.urls[j] + '.png')
      );
      var matS = new THREE.MeshStandardMaterial({
        map: textureS,
        roughness: 1.0
      });
      this.imgs.push(matS);
      this.progress++;
    }
  }

  this.init();
}

Assets.prototype.init = function() {
  this.projectMainVidURLs = [
    'https://player.vimeo.com/video/207461532', //futureofmusic
    'https://player.vimeo.com/video/233104062', //gravity
    'https://player.vimeo.com/video/115735583', //helloplaynye
    'https://player.vimeo.com/video/162052542', //jane
    'http://film.livyatanim.com', //myth
    'https://player.vimeo.com/video/235253501', //offf
    'https://player.vimeo.com/video/252150784', //Rescue
    'https://player.vimeo.com/video/272629916', //redaxes
    'https://player.vimeo.com/video/264197456', //DJ Snake
    'https://player.vimeo.com/video/166021791' //thewalk
  ];

  this.projectInfo = [
    '<p>The Future of Music</p>A ground-breaking 360° experience made by director Greg Barth and Phenomena Labs immersing you in a surrealist musical universe. In which you as a interviewer taking place in the middle of a behind the scene interview with Carre Bleu, a revolutionary in music inventor who presents his unique production method of recording an instrumental track. while each of the instruments are actually humans who turns into GIF like loops. <br><br>The concept was designed around 360 degrees filming of telling a compelling story, with Gregs unique style and designs on real shot actors and set props we created a room who takes advantage of the format which 360 degrees videos are being made as equiangular round spaced pixels to manipulate gravity and make this a surreal room who becomes the musical track as the director creates it while being interviewed by the viewer.<br><br><br>Making of Video:',
    //futureofmusic

    '<p>Gravity</p>Gravity is an interactive immersive experience that was developed and installed at Israel National Museum of Science, Technology and Space. Open for public since June 2017. The participates interact with sounds and visuals with their motion. Gravity’s main subject is the role play of the simple man vs the infinite universe, the isolated man and its spectacle size in the physical world and the infinite micro universe in our brains.<br><br>During the experience the participates challenge gravitational forces in the universe. and will get to experience what its like to be wide as a galaxy, fast as light, and seeding new stars within the universe. within the 15 min long story-line we used sounds from the voyage gold record of NASA.<br><br>The Installation including 2 huge wall projection synced to each-other act as a 360 degrees experience,time and space travel making the illusion of 2 walls continues space where 3D objects pass from one screen to the other.' +
    ' Four sensors are sensing the visitors movements and forces they apply on the universe and generating sounds.<br><br><br>Making of Gravity:',
    //gravity

    '<p>Hello Play - NYE PROMO</p> Phenomena Labs collabrated with director Greg Barth to create this promotional video for Hello Play, a Belgian online electronic music platform. The mission was to create the 3D physical simulations that were later on 3D printed and shot on set.<br><br><br> Featured on:<br><br>Fubiz, Creative review "Ads of The Week", Trendhunter, PSFK.com<br>Stash Media, Shots Magazine, AOL go Buzz60, Laughing Squid<br>Gizmodo, Behance Gallery, Nice Fucking Graphic, LBBOnline, Viralstack<br>3DPrint.com, 3dprintingindustry.com, 3Ders.org, Creative Pool Magazine<br><br><br>Making of Video:',
    //helloplaynye

    '<p>Jane Bourdeaux - MAAGALIM</p> The official music video for Jane Bordeaux’s ‘Ma’agalim’. In a forgotten old penny arcade a wooden doll is stuck in place and time. using a rotating penny arcade entertainment machine to explore the concept of cycles. A wooden doll, stuck in place and time, is overtaken by every-day life scenarios. Finally the clockwork behind the scenes comes to a breaking point.<br><br><br>Making of Video:',
    //jane

    '<p>LIVYATANIM - MYTH</p>Phenomena Labs produced this WebVR short film in collabaration with the LIVYATANIM band (which in hebrew means whales).<br> The project included concept design, look development, 3D and animation and programming the experience and was developed entirely in-house.<br>LIVYATANIM: Myth uses MIDI notation to drive the films animation, making the visual aspect an extension of the sound. <br>The experience can be viewed on mobile devices, desktops and VR headsets through the website.<br>The film also uses WebVR to render virtual reality content in the browser allowing a wide range of headsets easy acsses through the webapp.',
    //myth

    '<p>Main Titles for OFFFTLV 2017</p>',
    //offf

    '<p>RESCUE</p> RESCUE is an audio-visual paint/scan/multi touch Interactive wall.<br>Curated by: Tal Berman for the israel science space museum as part of its "RESCUE" exhibition [2017].<br> The piece including: real-time drawings scan, multi-touch screen using laser, Paintings into 3d animations on the fly, and 16 speakers binaural sound mapping.<br>The interactions with objects Installed and open for public at: Israel national museum for space and technology.<br><br><br>Making of Video:', //Rescue

    '<p>Rone - Waves</p>',
    //Rone

    '<p>DJ Snake - Magenta Riddim</p>', //DJ Snake

    '<p>The Walk</p>Phenomena Labs provided FX Development for the claim-up sequence of "The Walk"in collaboration with Atomic Fiction Studios. <br><br>"You know the feeling when the whole world disappears and only you and what you are doing are left?" Director Robert Zemeckis & VFX Sup Kevin Blaine, described that moment they wanted to achieve with 3D Atmospherics simulation on the rooftop of Manhattans world trade center. Phenomena Labs were involved doing Lookdev on this effect at early stages. Developing a procedural volumetric shader in that generates 4 layers of 4D volumetric noise. The shader was carefully tuned to create large pockets of clouds based on fractal algorithms and Mathematical functions within the shader. <br><br>The unique render-time generative approached, allowed us to control the speed of which the clouds and atmospherics moves in each shot of the sequence, tune the amounts, speeds and light scattering throughout the 13 shots of the sequence.' +
    ' The end result has really captured the peak moment of the film when Philip takes his first steps on the wire, and separates the audience from views of New York City for a few moments and brings them back into it with a whole new perspective.<br><br><br>Making of Video:'
    //thewalk
  ];

  this.projectMakinVidURLs = [
    'https://player.vimeo.com/video/159758919', //futureofmusic
    '', //gravity
    'https://player.vimeo.com/video/159760813', //helloplaynye
    'https://player.vimeo.com/video/162052542', //jane
    '', //myth
    'https://player.vimeo.com/video/266468193', //offf
    '', //Rescue
    '', //Rone
    'https://player.vimeo.com/video/264197456', //DJ Snake
    'https://player.vimeo.com/video/166021791' //thewalk
  ];

  this.projectCredits = [
    'Credits:<br><br>Director: Greg Barth<br>Original Musical Score: Polar Youth<br>DoP: Pau Munoz<br>On set VFX Supervisor - Ronen Tanchum<br>Post Production and VR Technology - Phenomena Labs:<br>Effects - Ronen Tanchum<br>Compositor - Tal Baltuch<br>3D Tracking: Peanut - Amélie Guyot, Peregrine McCafferty<br>Additional VFX UK: Johannes Sambs<br>Gaffer: Max Halstead<br>Art Director: Will Vincent<br>Art Department:<br>Rosalind Gahamire, Isobel Irwin, Lauren Veevers,<br>Juhee Hahm, Clare Lewis, Clarissa Collins<br>Costumes provided by Mai Gidah<br>Additional Costumes: Juhee Hahm<br>Mix and Mastering - Nookaad Productions<br>Produced by Blinkink and Phenomena Labs<br>Agency - DIGIZIK:<br>Producers: Hugo Donkin, Greg Barth<br>Cameras and Lenses generously provided by SeeSense<br>Filmed at Clapham Road Studios<br>Executive Producers: James Stevenson Bretton, Bart Yates',
    //futureofmusic

    'Credits:<br><br>Curator: Tal Berman<br>Creator: Amir Schorr [Fast Music]<br>Interactive Design & Development: Ronen Tanchum [Phenomena Labs]<br>Software development: Itay Gal<br>Music and sound production: Yoav Rosenthal<br>Making of Film by: Ronen Tanchum<br>Editor: Tom Uziel',
    //gravity

    'Credits:<br><br>Director - Greg Barth<br>Production Company - Blinkink<br>Client - Digizik<br>Art Direction Greg Barth<br>DOP Pau Munoz<br>Music by Khoo<br>Mix and mastering by Nookaad Productions<br>Technical Assistance and gear Max Halstead<br>Stop-frame animation Andy Biddle<br>Art Department<br>Will Vincent, Lizzy Dalton, Magda Bieszczak<br>Styling Daisy Azis<br>Styling Assistant Rebecca Stone<br>Hand Models Albert Sala, Miranda Latimer<br>Math, 3D particle and physics simulations by Phenomena Labs<br>Book Cover design by Morgan Guegan<br>Post Production Blink<br>Shot in London, UK at Blink Industries',
    //helloplaynye

    'Credits:<br><br>Music – Jane Bordeaux Band<br>Producers: Uri Lotan & Yoav Shtibelman<br>Director: Uri Lotan<br>Co-Director: Yoav Shtibelman<br>Art Director: Ovadia Benishu<br>Additional Art: Avner Geller<br>Lighting and Shading: Yosef Refaeli<br>Additional Lighting: Uri Lotan, Rob Showalter<br>Storyboard: Yoav Shtibelman<br>Modeling and Rigging: Uri Lotan, Ore Peleg, Or Ofri<br>Texturing: Yosef Refaeli, Dor Ben-Dayan<br>Animation: Yoav Shtibelman, Toby Pedersen, Ron Polischuk<br>Effects: Phenomena Labs<br>Compositing: Uri Lotan, Ilia Marcus<br>Coloring: Ilya Marcus',
    //jane

    '',
    //myth

    'Credits:<br><br>Directors & Creative: Wix Studio - Guy Levin & Eliraz Dekalo<br>Designer & Lookdev Artist: Hezi Elad Jacob<br>3D Simulation: Phenomena Labs<br>Modeling: Alon Peled<br>Editor: Maor Keshet<br>Sound Post-Production: Yossi Rabinovich<br>Soundtrack - Noga Erez “Dance While You Shoot” <br>courtesy of City Slang published by CEUSO composed & written by Noga Erez, Ori Rousso',
    //offf

    'Credits:<br><br>Curator: Tal Berman<br>Creator: Amir Schorr [Fast Music]<br>Interactive Design & Development: Phenomena Labs <br>Software development: Itay Gal<br>Music and sound production: Yoav Rosenthal<br>Making of Film by: Ronen Tanchum<br>Editor: Tom Uziel',
    //Rescue

    'Credits:<br><br>Produced by Selena Cunningham<br>Production manager Laura Jenkins<br>DOP Annika Summerson<br>Makeup design Susana Mota<br>1st AD Amelie Guyot<br>Art Director Nigel Howlett/Greg Barth<br><br>Studio Nan Studios<br>Starring<br> Naomi Weijand, Callum Sterling, Maggie Day<br><br>CGI sup peregrine McCafferty<br>Editing Nick Armstromg @ Cut & Run<br>Look Dev Glassworks LDN<br>VFX Static FX<br>Post Production Coordinator Alexandra Oprea<br>CGI Aaron Smith, Phillipe Medina, Peregrine McCafferty, Greg Barth, Ronen Tanchum<br>Compositors Shahin Toosi, Alina Simion, Felip Docolomansky,<br> Quentin Vien, Sandrine Jimenez, Grzegorz Zolnowski <br>Houdini FX - Phenomena Labs<br> Colour Grade Jonny Thorpe<br>',
    //Rone

    'Credits:<br><br>Produced by Iconoclast<br>Producer: Natan Schottenfels<br>Executive Producers: Natan Schottenfels and Francesco Colombo<br>Cinematography by: Arnau Valls Colomer<br>Edited by: Gal Muggia and Vania Heymann<br>VFX by: Tal Baltuch and Vania Heymann<br>Production Designer : Twisha Pal<br>Costume Designer : Neeraja Kona<br>Action Director : Vijay Alam<br>Casting Director : Dileep Basava<br>Make up : K Ramana babu<br>2nd Unti DP: Eitan Hatuka<br>DJ Snake Stylist: Sasha Nassar<br>Color & Title Design: Tal Baltuch<br>3D: Uri Lotan<br>FX Simulations: Phenomena Labs<br>Additional VFX: Cinnamon VFX<br>Sound Design: Shlomi Attias<br>News Theme Music: Assa Raviv<br>Production Supervisor: Stephen Predisik<br>Storyboard artist: Yoav Shtibelman<br>Treatment Layout & Design: Charlie Reader',
    //DJ Snake

    'Credits:'
    //thewalk
  ];
};
