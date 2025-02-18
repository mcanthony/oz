// Generated by CoffeeScript 1.4.0
(function() {
  var App, NoiseShader, WindMeshShader, WindParticleShader,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  WindMeshShader = (function() {

    function WindMeshShader() {}

    WindMeshShader.prototype.attributes = {
      "windFactor": {
        type: "f",
        value: []
      }
    };

    WindMeshShader.prototype.uniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib["common"], THREE.UniformsLib["bump"], THREE.UniformsLib["normalmap"], THREE.UniformsLib["fog"], THREE.UniformsLib["lights"], THREE.UniformsLib["shadowmap"], {
        "ambient": {
          type: "c",
          value: new THREE.Color(0xffffff)
        },
        "emissive": {
          type: "c",
          value: new THREE.Color(0x000000)
        },
        "specular": {
          type: "c",
          value: new THREE.Color(0x111111)
        },
        "shininess": {
          type: "f",
          value: 30
        },
        "wrapRGB": {
          type: "v3",
          value: new THREE.Vector3(1, 1, 1)
        },
        "windMin": {
          type: "v2",
          value: new THREE.Vector2()
        },
        "windSize": {
          type: "v2",
          value: new THREE.Vector2()
        },
        "windDirection": {
          type: "v3",
          value: new THREE.Vector3(1, 0, 0)
        },
        "tWindForce": {
          type: "t",
          value: null
        },
        "windScale": {
          type: "f",
          value: 1.0
        }
      }
    ]);

    WindMeshShader.prototype.vertexShader = ["#define PHONG", "varying vec3 vViewPosition;", "varying vec3 vNormal;", THREE.ShaderChunk["map_pars_vertex"], THREE.ShaderChunk["lightmap_pars_vertex"], THREE.ShaderChunk["envmap_pars_vertex"], "attribute float windFactor;", "uniform vec2 windMin;", "uniform vec2 windSize;", "uniform vec3 windDirection;", "uniform sampler2D tWindForce;", "uniform float windScale;", "varying vec3 vWorldPosition;", "varying float vWindForce;", THREE.ShaderChunk["lights_phong_pars_vertex"], THREE.ShaderChunk["color_pars_vertex"], THREE.ShaderChunk["morphtarget_pars_vertex"], THREE.ShaderChunk["skinning_pars_vertex"], THREE.ShaderChunk["shadowmap_pars_vertex"], "void main() {", THREE.ShaderChunk["map_vertex"], THREE.ShaderChunk["lightmap_vertex"], THREE.ShaderChunk["color_vertex"], THREE.ShaderChunk["morphnormal_vertex"], THREE.ShaderChunk["skinbase_vertex"], THREE.ShaderChunk["skinnormal_vertex"], THREE.ShaderChunk["defaultnormal_vertex"], "vNormal = transformedNormal;", THREE.ShaderChunk["morphtarget_vertex"], THREE.ShaderChunk["skinning_vertex"], "vec4 mvPosition;", "#ifdef USE_SKINNING", "mvPosition = modelViewMatrix * skinned;", "#endif", "#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )", "mvPosition = modelViewMatrix * vec4( morphed, 1.0 );", "#endif", "#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )", "vec4 wpos = modelMatrix * vec4( position, 1.0 );", "wpos.z = -wpos.z;", "vec2 totPos = wpos.xz - windMin;", "vec2 windUV = totPos / windSize;", "vWindForce = texture2D(tWindForce,windUV).x;", "float windMod = ((1.0 - vWindForce)* windFactor ) * windScale;", "vec4 pos = vec4(position , 1.0);", "pos.x += windMod * windDirection.x;", "pos.y += windMod * windDirection.y;", "pos.z += windMod * windDirection.z;", "mvPosition = modelViewMatrix *  pos;", "#endif", "gl_Position = projectionMatrix * mvPosition;", "vViewPosition = -mvPosition.xyz;", THREE.ShaderChunk["worldpos_vertex"], THREE.ShaderChunk["envmap_vertex"], THREE.ShaderChunk["lights_phong_vertex"], "vWorldPosition = mPosition.xyz;", THREE.ShaderChunk["shadowmap_vertex"], "}"].join("\n");

    WindMeshShader.prototype.fragmentShader = ["uniform vec3 diffuse;", "uniform float opacity;", "uniform vec3 ambient;", "uniform vec3 emissive;", "uniform vec3 specular;", "uniform float shininess;", THREE.ShaderChunk["color_pars_fragment"], THREE.ShaderChunk["map_pars_fragment"], THREE.ShaderChunk["lightmap_pars_fragment"], THREE.ShaderChunk["envmap_pars_fragment"], THREE.ShaderChunk["fog_pars_fragment"], THREE.ShaderChunk["lights_phong_pars_fragment"], THREE.ShaderChunk["shadowmap_pars_fragment"], THREE.ShaderChunk["bumpmap_pars_fragment"], THREE.ShaderChunk["normalmap_pars_fragment"], THREE.ShaderChunk["specularmap_pars_fragment"], "void main() {", "gl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk["map_fragment"], THREE.ShaderChunk["alphatest_fragment"], THREE.ShaderChunk["specularmap_fragment"], THREE.ShaderChunk["lights_phong_fragment"], THREE.ShaderChunk["lightmap_fragment"], THREE.ShaderChunk["color_fragment"], THREE.ShaderChunk["envmap_fragment"], THREE.ShaderChunk["shadowmap_fragment"], THREE.ShaderChunk["linear_to_gamma_fragment"], THREE.ShaderChunk["fog_fragment"], "}"].join("\n");

    return WindMeshShader;

  })();

  WindParticleShader = (function() {

    WindParticleShader.prototype.uniforms = null;

    function WindParticleShader() {
      this.uniforms = THREE.UniformsUtils.merge([
        THREE.UniformsLib["particle"], THREE.UniformsLib["shadowmap"], {
          "diffuseMultiplier": {
            type: "f",
            value: 2
          },
          "alphaMultiplier": {
            type: "f",
            value: 0.3
          },
          "windMin": {
            type: "v2",
            value: new THREE.Vector2(-30, -30)
          },
          "windSize": {
            type: "v2",
            value: new THREE.Vector2(60, 60)
          },
          "windDirection": {
            type: "v3",
            value: new THREE.Vector3(1, 0, 0)
          },
          "tWindForce": {
            type: "t",
            value: null
          },
          "windScale": {
            type: "f",
            value: 10.0
          },
          "time": {
            type: "f",
            value: 0.0
          }
        }
      ]);
    }

    WindParticleShader.prototype.vertexShader = ["uniform float size;", "uniform float scale;", "uniform vec2 windMin;", "uniform vec2 windSize;", "uniform vec3 windDirection;", "uniform sampler2D tWindForce;", "uniform float windScale;", "uniform float time;", "attribute float speed;", "varying float fSpeed;", THREE.ShaderChunk["color_pars_vertex"], THREE.ShaderChunk["shadowmap_pars_vertex"], "void main() {", "vec4 mvPosition;", "vec4 wpos = modelMatrix * vec4( position, 1.0 );", "wpos.z = -wpos.z;", "vec2 totPos = wpos.xz - windMin;", "vec2 windUV = totPos / windSize;", "float vWindForce = texture2D(tWindForce,windUV).x;", "float windMod = (1.0 - vWindForce) * windScale;", "vec4 pos = vec4(position , 1.0);", "pos.x += windMod * windDirection.x;", "pos.y += windMod * windDirection.y;", "pos.z += windMod * windDirection.z;", "mvPosition = modelViewMatrix *  pos;", "fSpeed = speed;", "float fSize = size * (1.0 + sin(time * speed));", "#ifdef USE_SIZEATTENUATION", "gl_PointSize = fSize * ( scale / length( mvPosition.xyz ) );", "#else", "gl_PointSize = fSize;", "#endif", "gl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk["worldpos_vertex"], THREE.ShaderChunk["shadowmap_vertex"], "}"].join("\n");

    WindParticleShader.prototype.fragmentShader = ["uniform vec3 psColor;", "uniform float opacity;", "uniform float diffuseMultiplier;", "uniform float alphaMultiplier;", "varying float fSpeed;", "uniform float time;", THREE.ShaderChunk["color_pars_fragment"], THREE.ShaderChunk["map_particle_pars_fragment"], THREE.ShaderChunk["fog_pars_fragment"], THREE.ShaderChunk["shadowmap_pars_fragment"], "void main() {", "gl_FragColor = vec4( psColor, opacity );", "#ifdef USE_MAP", "gl_FragColor = texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) ) * diffuseMultiplier;", "gl_FragColor.w = alphaMultiplier * (1.0 + sin(time * fSpeed));", "#endif", THREE.ShaderChunk["alphatest_fragment"], THREE.ShaderChunk["color_fragment"], THREE.ShaderChunk["shadowmap_fragment"], THREE.ShaderChunk["fog_fragment"], "}"].join("\n");

    return WindParticleShader;

  })();

  NoiseShader = (function() {

    function NoiseShader() {}

    NoiseShader.prototype.uniforms = {
      "fTime": {
        type: "f",
        value: 1
      },
      "vScale": {
        type: "v2",
        value: new THREE.Vector2(1, 1)
      },
      "vOffset": {
        type: "v2",
        value: new THREE.Vector2(1, 1)
      }
    };

    NoiseShader.prototype.fragmentShader = ["uniform float fTime;", "varying vec2 vUv;", "vec4 permute( vec4 x ) {", "return mod( ( ( x * 34.0 ) + 1.0 ) * x, 289.0 );", "}", "vec4 taylorInvSqrt( vec4 r ) {", "return 1.79284291400159 - 0.85373472095314 * r;", "}", "float snoise( vec3 v ) {", "const vec2 C = vec2( 1.0 / 6.0, 1.0 / 3.0 );", "const vec4 D = vec4( 0.0, 0.5, 1.0, 2.0 );", "vec3 i  = floor( v + dot( v, C.yyy ) );", "vec3 x0 = v - i + dot( i, C.xxx );", "vec3 g = step( x0.yzx, x0.xyz );", "vec3 l = 1.0 - g;", "vec3 i1 = min( g.xyz, l.zxy );", "vec3 i2 = max( g.xyz, l.zxy );", "vec3 x1 = x0 - i1 + 1.0 * C.xxx;", "vec3 x2 = x0 - i2 + 2.0 * C.xxx;", "vec3 x3 = x0 - 1. + 3.0 * C.xxx;", "i = mod( i, 289.0 );", "vec4 p = permute( permute( permute( i.z + vec4( 0.0, i1.z, i2.z, 1.0 ) ) + i.y + vec4( 0.0, i1.y, i2.y, 1.0 ) ) + i.x + vec4( 0.0, i1.x, i2.x, 1.0 ) );", "float n_ = 1.0 / 7.0;", "vec3 ns = n_ * D.wyz - D.xzx;", "vec4 j = p - 49.0 * floor( p * ns.z *ns.z );", "vec4 x_ = floor( j * ns.z );", "vec4 y_ = floor( j - 7.0 * x_ );", "vec4 x = x_ *ns.x + ns.yyyy;", "vec4 y = y_ *ns.x + ns.yyyy;", "vec4 h = 1.0 - abs( x ) - abs( y );", "vec4 b0 = vec4( x.xy, y.xy );", "vec4 b1 = vec4( x.zw, y.zw );", "vec4 s0 = floor( b0 ) * 2.0 + 1.0;", "vec4 s1 = floor( b1 ) * 2.0 + 1.0;", "vec4 sh = -step( h, vec4( 0.0 ) );", "vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;", "vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;", "vec3 p0 = vec3( a0.xy, h.x );", "vec3 p1 = vec3( a0.zw, h.y );", "vec3 p2 = vec3( a1.xy, h.z );", "vec3 p3 = vec3( a1.zw, h.w );", "vec4 norm = taylorInvSqrt( vec4( dot( p0, p0 ), dot( p1, p1 ), dot( p2, p2 ), dot( p3, p3 ) ) );", "p0 *= norm.x;", "p1 *= norm.y;", "p2 *= norm.z;", "p3 *= norm.w;", "vec4 m = max( 0.6 - vec4( dot( x0, x0 ), dot( x1, x1 ), dot( x2, x2 ), dot( x3, x3 ) ), 0.0 );", "m = m * m;", "return 42.0 * dot( m*m, vec4( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 ), dot( p3, x3 ) ) );", "}", "float surface3( vec3 coord ) {", "float n = 0.0;", "n += 1.0 * abs( snoise( coord ) );", "n += 0.5 * abs( snoise( coord * 2.0 ) );", "n += 0.25 * abs( snoise( coord * 4.0 ) );", "n += 0.125 * abs( snoise( coord * 8.0 ) );", "return n;", "}", "void main( void ) {", "vec3 coord = vec3( vUv, -fTime );", "float n = surface3( coord );", "gl_FragColor = vec4( vec3( n, n, n ), 1.0 );", "}"].join("\n");

    NoiseShader.prototype.vertexShader = ["varying vec2 vUv;", "uniform vec2 vScale;", "uniform vec2 vOffset;", "void main( void ) {", "vUv = (uv * vScale) + vOffset;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n");

    return NoiseShader;

  })();

  App = (function() {

    App.prototype.container = null;

    App.prototype.stats = null;

    App.prototype.camera = null;

    App.prototype.scene = null;

    App.prototype.renderer = null;

    App.prototype.controls = null;

    App.prototype.clock = null;

    App.prototype.noiseMap = null;

    App.prototype.noiseShader = null;

    App.prototype.noiseScene = null;

    App.prototype.noiseMaterial = null;

    App.prototype.noiseCameraOrtho = null;

    App.prototype.noiseQuadTarget = null;

    App.prototype.noiseRenderTarget = null;

    App.prototype.noiseSpeed = 0.046;

    App.prototype.noiseOffsetSpeed = 0.11;

    App.prototype.dustSettings = [];

    App.prototype.dustSystems = [];

    App.prototype.dustSystemMinX = -30;

    App.prototype.dustSystemMinY = 0;

    App.prototype.dustSystemMinZ = -30;

    App.prototype.dustSystemMaxX = 30;

    App.prototype.dustSystemMaxY = 20;

    App.prototype.dustSystemMaxZ = 30;

    App.prototype.windDirection = new THREE.Vector3(0.8, 0.1, 0.1);

    function App() {
      this.onWindowResize = __bind(this.onWindowResize, this);

      this.render = __bind(this.render, this);

      this.animate = __bind(this.animate, this);

      this.onWindDirectionChange = __bind(this.onWindDirectionChange, this);

      var directional;
      this.clock = new THREE.Clock();
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setClearColorHex(0x808080, 1);
      this.container.appendChild(this.renderer.domElement);
      this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
      this.camera.position.x = 5;
      this.camera.position.y = 10;
      this.camera.position.z = 40;
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enabled = true;
      this.scene = new THREE.Scene();
      this.scene.add(new THREE.AmbientLight(0xFFFFFF));
      directional = new THREE.DirectionalLight(0xFFFFFF);
      directional.position.set(10, 10, 10);
      this.scene.add(directional);
      this.initNoiseShader();
      this.initGrass();
      this.initTerrain();
      this.initDust();
      this.initGui();
      this.stats = new Stats();
      this.stats.domElement.style.position = 'absolute';
      this.stats.domElement.style.top = '0px';
      this.container.appendChild(this.stats.domElement);
      window.addEventListener('resize', this.onWindowResize, false);
      this.animate();
    }

    App.prototype.getWindMaterial = function() {
      var material, params, shader, uniforms;
      shader = new WindMeshShader;
      uniforms = shader.uniforms;
      params = {};
      params.fragmentShader = shader.fragmentShader;
      params.vertexShader = shader.vertexShader;
      params.uniforms = shader.uniforms;
      params.attributes = {
        windFactor: {
          type: 'f',
          value: []
        }
      };
      params.lights = true;
      material = new THREE.ShaderMaterial(params);
      uniforms["diffuse"].value = new THREE.Color(0xFFFFFF);
      uniforms["ambient"].value = new THREE.Color(0xCCCCCC);
      uniforms["specular"].value = new THREE.Color(0xFFFFFF);
      uniforms["map"].value = material.map = THREE.ImageUtils.loadTexture("textures/grass.png");
      uniforms["tWindForce"].value = this.noiseMap;
      uniforms["windScale"].value = 1;
      uniforms["windMin"].value = new THREE.Vector2(-30, -30);
      uniforms["windSize"].value = new THREE.Vector2(60, 60);
      uniforms["windDirection"].value = this.windDirection;
      return material;
    };

    App.prototype.initNoiseShader = function() {
      this.noiseMap = new THREE.WebGLRenderTarget(256, 256, {
        minFilter: THREE.LinearMipmapLinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat
      });
      this.noiseShader = new NoiseShader();
      this.noiseShader.uniforms.vScale.value.set(0.3, 0.3);
      this.noiseScene = new THREE.Scene();
      this.noiseCameraOrtho = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -10000, 10000);
      this.noiseCameraOrtho.position.z = 100;
      this.noiseScene.add(this.noiseCameraOrtho);
      this.noiseMaterial = new THREE.ShaderMaterial({
        fragmentShader: this.noiseShader.fragmentShader,
        vertexShader: this.noiseShader.vertexShader,
        uniforms: this.noiseShader.uniforms,
        lights: false
      });
      this.noiseQuadTarget = new THREE.Mesh(new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 100, 100), this.noiseMaterial);
      this.noiseQuadTarget.position.z = -500;
      return this.noiseScene.add(this.noiseQuadTarget);
    };

    App.prototype.initDust = function() {
      var geom, i, k, mat, num, params, particlesystem, setting, shader, vert, _i, _j, _results;
      _results = [];
      for (i = _i = 0; _i < 5; i = _i += 1) {
        shader = new WindParticleShader();
        params = {};
        params.fragmentShader = shader.fragmentShader;
        params.vertexShader = shader.vertexShader;
        params.uniforms = shader.uniforms;
        params.attributes = {
          speed: {
            type: 'f',
            value: []
          }
        };
        mat = new THREE.ShaderMaterial(params);
        mat.map = shader.uniforms["map"].value = THREE.ImageUtils.loadCompressedTexture("textures/dust" + i + ".dds");
        mat.size = shader.uniforms["size"].value = Math.random();
        mat.scale = shader.uniforms["scale"].value = 300.0;
        mat.transparent = true;
        mat.sizeAttenuation = true;
        mat.blending = THREE.AdditiveBlending;
        shader.uniforms["tWindForce"].value = this.noiseMap;
        shader.uniforms["windMin"].value = new THREE.Vector2(-30, -30);
        shader.uniforms["windSize"].value = new THREE.Vector2(60, 60);
        shader.uniforms["windDirection"].value = this.windDirection;
        geom = new THREE.Geometry();
        geom.vertices = [];
        num = 130;
        for (k = _j = 0; _j < num; k = _j += 1) {
          setting = {};
          vert = new THREE.Vector3;
          vert.x = setting.startX = THREE.Math.randFloat(this.dustSystemMinX, this.dustSystemMaxX);
          vert.y = setting.startY = THREE.Math.randFloat(this.dustSystemMinY, this.dustSystemMaxY);
          vert.z = setting.startZ = THREE.Math.randFloat(this.dustSystemMinZ, this.dustSystemMaxZ);
          setting.speed = params.attributes.speed.value[k] = 1 + Math.random() * 10;
          setting.sinX = Math.random();
          setting.sinXR = Math.random() < 0.5 ? 1 : -1;
          setting.sinY = Math.random();
          setting.sinYR = Math.random() < 0.5 ? 1 : -1;
          setting.sinZ = Math.random();
          setting.sinZR = Math.random() < 0.5 ? 1 : -1;
          setting.rangeX = Math.random() * 5;
          setting.rangeY = Math.random() * 5;
          setting.rangeZ = Math.random() * 5;
          setting.vert = vert;
          geom.vertices.push(vert);
          this.dustSettings.push(setting);
        }
        particlesystem = new THREE.ParticleSystem(geom, mat);
        this.dustSystems.push(particlesystem);
        _results.push(this.scene.add(particlesystem));
      }
      return _results;
    };

    App.prototype.initGrass = function() {
      var NUM, i, j, x, y, _i, _results;
      NUM = 15;
      _results = [];
      for (i = _i = 0; _i <= NUM; i = _i += 1) {
        _results.push((function() {
          var _j, _results1;
          _results1 = [];
          for (j = _j = 0; _j <= NUM; j = _j += 1) {
            x = ((i / NUM) - 0.5) * 50 + THREE.Math.randFloat(-1, 1);
            y = ((j / NUM) - 0.5) * 50 + THREE.Math.randFloat(-1, 1);
            _results1.push(this.scene.add(this.instanceGrass(x, 2.5, y, 5.0)));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    App.prototype.instanceGrass = function(x, y, z, height) {
      var geometry, i, material, mesh, r, v, _i, _ref;
      geometry = new THREE.CylinderGeometry(0.9, 0.0, height, 3, 5);
      material = this.getWindMaterial();
      for (i = _i = 0, _ref = geometry.vertices.length - 1; _i <= _ref; i = _i += 1) {
        v = geometry.vertices[i];
        r = (v.y / height) + 0.5;
        material.attributes.windFactor.value[i] = r * r * r;
      }
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      return mesh;
    };

    App.prototype.initTerrain = function() {
      this.plane = new THREE.Mesh(new THREE.PlaneGeometry(60, 60, 2, 2), new THREE.MeshPhongMaterial({
        map: this.noiseMap,
        lights: false
      }));
      this.plane.rotation.x = -Math.PI / 2;
      return this.scene.add(this.plane);
    };

    App.prototype.initGui = function() {
      var _this = this;
      this.gui = new dat.GUI({
        width: 400
      });
      this.gui.add(this.plane, "visible").name("Show Turbulence Plane");
      this.gui.add(this.noiseShader.uniforms.vScale.value, "x", 0, 1).name("Wind Turbulence Scale X");
      this.gui.add(this.noiseShader.uniforms.vScale.value, "y", 0, 1).name("Wind Turbulence Scale Y");
      this.gui.add(this, "noiseSpeed", 0, 1).name("Wind Turbolence Speed");
      this.gui.add(this, "noiseOffsetSpeed", 0, 1).name("Wind Offset Speed");
      this.gui.add({
        value: 1
      }, "value", 0, 10).name("Wind Power").onChange(function(value) {
        var elem, _i, _len, _ref, _ref1, _ref2;
        _ref = _this.scene.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          elem = _ref[_i];
          if ((elem != null ? (_ref1 = elem.material) != null ? (_ref2 = _ref1.uniforms) != null ? _ref2.windScale : void 0 : void 0 : void 0) != null) {
            elem.material.uniforms.windScale.value = value;
          }
        }
      });
      this.xcont = this.gui.add(this.windDirection, "x", -1, 1).step(0.01).name("Wind Direction X").onChange(this.onWindDirectionChange);
      this.ycont = this.gui.add(this.windDirection, "y", -1, 1).step(0.01).name("Wind Direction Y").onChange(this.onWindDirectionChange);
      this.zcont = this.gui.add(this.windDirection, "z", -1, 1).step(0.01).name("Wind Direction Z").onChange(this.onWindDirectionChange);
      this.windDirection.x = 1;
      this.windDirection.y = 0;
      this.windDirection.z = 0;
      return this.onWindDirectionChange();
    };

    App.prototype.onWindDirectionChange = function(value) {
      this.windDirection.normalize();
      this.xcont.updateDisplay();
      this.ycont.updateDisplay();
      return this.zcont.updateDisplay();
    };

    App.prototype.animate = function() {
      window.requestAnimationFrame(this.animate);
      this.render();
      this.stats.update();
    };

    App.prototype.moveDust = function(delta) {
      var obj, setting, vert, _i, _j, _len, _len1, _ref, _ref1;
      _ref = this.dustSettings;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        setting = _ref[_i];
        vert = setting.vert;
        setting.sinX = setting.sinX + ((0.002 * setting.speed) * setting.sinXR);
        setting.sinY = setting.sinY + ((0.002 * setting.speed) * setting.sinYR);
        setting.sinZ = setting.sinZ + ((0.002 * setting.speed) * setting.sinZR);
        vert.x = setting.startX + (Math.sin(setting.sinX) * setting.rangeX);
        vert.y = setting.startY + (Math.sin(setting.sinY) * setting.rangeY);
        vert.z = setting.startZ + (Math.sin(setting.sinZ) * setting.rangeZ);
      }
      _ref1 = this.dustSystems;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        obj = _ref1[_j];
        obj.material.uniforms.time.value += delta;
        obj.geometry.verticesNeedUpdate = true;
      }
    };

    App.prototype.render = function() {
      var delta;
      delta = this.clock.getDelta();
      if (this.windDirection) {
        this.noiseShader.uniforms["fTime"].value += delta * this.noiseSpeed;
        this.noiseShader.uniforms["vOffset"].value.x -= (delta * this.noiseOffsetSpeed) * this.windDirection.x;
        this.noiseShader.uniforms["vOffset"].value.y += (delta * this.noiseOffsetSpeed) * this.windDirection.z;
      }
      this.controls.update();
      this.moveDust(delta);
      this.renderer.render(this.noiseScene, this.noiseCameraOrtho, this.noiseMap, true);
      return this.renderer.render(this.scene, this.camera);
    };

    App.prototype.onWindowResize = function() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      return this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    $(function() {});

    $(document).ready(function() {
      if (!Detector.webgl || !Detector.workers) {
        return Detector.addGetWebGLMessage();
      } else {
        return new App;
      }
    });

    return App;

  })();

}).call(this);
