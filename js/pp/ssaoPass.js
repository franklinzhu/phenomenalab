function initPostprocessing() {
  // Setup render pass
  var renderPass = new THREE.RenderPass( scene, camera );
  // Setup depth pass
  depthMaterial = new THREE.MeshDepthMaterial();
  depthMaterial.depthPacking = THREE.RGBADepthPacking;
  depthMaterial.blending = THREE.NoBlending;
  var pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter };
  depthRenderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, pars );
  depthRenderTarget.texture.name = "SSAOShader.rt";
  // Setup SSAO pass
  ssaoPass = new THREE.ShaderPass( THREE.SSAOShader );
  ssaoPass.renderToScreen = true;
  //ssaoPass.uniforms[ "tDiffuse" ].value will be set by ShaderPass
  ssaoPass.uniforms[ "tDepth" ].value = depthRenderTarget.texture;
  ssaoPass.uniforms[ 'size' ].value.set( window.innerWidth, window.innerHeight );
  ssaoPass.uniforms[ 'cameraNear' ].value = camera.near;
  ssaoPass.uniforms[ 'cameraFar' ].value = camera.far;
  ssaoPass.uniforms[ 'radius' ].value = 5;
  // Add pass to effect composer
  effectComposer = new THREE.EffectComposer( renderer );
  effectComposer.addPass( renderPass );
  effectComposer.addPass( ssaoPass );
}
