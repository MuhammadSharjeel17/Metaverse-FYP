import React from 'react'

const VirtualRealityModel = () => {
    /* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */

  
  return (
   <>
   <a-scene>
      <a-assets>
        <img id="city" crossorigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg" />
        <img id="city-thumb" crossorigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-city.jpg" />
        <img id="cubes-thumb" crossorigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg" />
        <img id="sechelt-thumb" crossorigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-sechelt.jpg"/>
        <audio id="click-sound" crossorigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg"></audio>
        <img id="cubes" crossorigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/cubes.jpg"/>
        <img id="sechelt" crossorigin="anonymous" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg"/>

        {/* <!-- Image link template to be reused. --> */}
        <script id="link" type="text/nunjucks">
          <a-plane className="link" height="1" width="1"
            material="shader: flat; src: {{ thumb }}"
            event-set__1="_event: mousedown; scale: 1 1 1"
            event-set__2="_event: mouseup; scale: 1.2 1.2 1"
            event-set__3="_event: mouseenter; scale: 1.2 1.2 1"
            event-set__4="_event: mouseleave; scale: 1 1 1"
            set-image="on: click; target: #image-360; src: {{ src }}"
            sound="on: click; src: #click-sound"
            update-raycaster="#cursor"></a-plane>
        </script>
      </a-assets>

      {/* <!-- 360-degree image. --> */}
      <a-sky id="image-360" radius="10" src="#city"></a-sky>

      {/* <!-- Image links. --> */}
      <a-entity id="links" layout="type: line; margin: 1.5" position="0 -1 -4">
        <a-entity template="src: #link" data-src="#cubes" data-thumb="#cubes-thumb"></a-entity>
        <a-entity template="src: #link" data-src="#city" data-thumb="#city-thumb"></a-entity>
        <a-entity template="src: #link" data-src="#sechelt" data-thumb="#sechelt-thumb"></a-entity>
      </a-entity>

      {/* <!-- Camera + cursor. --> */}
      <a-entity camera look-controls>
        <a-cursor id="cursor"
          animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
          animation__fusing="property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500"
          event-set__1="_event: mouseenter; color: springgreen"
          event-set__2="_event: mouseleave; color: black"
          raycaster="objects: .link"></a-cursor>
      </a-entity>
    </a-scene>
   </>
  )
}
AFRAME.registerComponent('set-image', {
    schema: {
      on: {type: 'string'},
      target: {type: 'selector'},
      src: {type: 'string'},
      dur: {type: 'number', default: 300}
    },
  
    init: function () {
      var data = this.data;
      var el = this.el;
  
      this.setupFadeAnimation();
  
      el.addEventListener(data.on, function () {
        // Fade out image.
        data.target.emit('set-image-fade');
        // Wait for fade to complete.
        setTimeout(function () {
          // Set image.
          data.target.setAttribute('material', 'src', data.src);
        }, data.dur);
      });
    },
  
    /**
     * Setup fade-in + fade-out.
     */
    setupFadeAnimation: function () {
      var data = this.data;
      var targetEl = this.data.target;
  
      // Only set up once.
      if (targetEl.dataset.setImageFadeSetup) { return; }
      targetEl.dataset.setImageFadeSetup = true;
  
      // Create animation.
      targetEl.setAttribute('animation__fade', {
        property: 'material.color',
        startEvents: 'set-image-fade',
        dir: 'alternate',
        dur: data.dur,
        from: '#FFF',
        to: '#000'
      });
    }
  });

export default VirtualRealityModel