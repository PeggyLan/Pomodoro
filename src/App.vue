<template>
  <div id="app" class="vh-100 d-flex flex-column">
    <div id="background">
      <vueParticles class="vh-100 vw-100"></vueParticles>
      <!-- <video id="bgvideo" autoplay muted loop>
        <source :src="'./img/video3.mp4'" type="video/mp4" />
      </video> -->
      </div>
    <div id="header" class="container">
      <div class="row">
        <div class="col text-center pt-4 pb-3">
          <h1>POMODORO</h1>
        </div>
      </div>
    </div>
    <div id="content" class="container vw-100">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <div id="footer" class="fixed-bottom mb-3">
      <div id="nav" class="row justify-content-center align-items-center h-100">
        <div class="col text-center">
          <router-link class="btn" to="/">
            <font-awesome-icon :icon="['fas','igloo']" size="3x"></font-awesome-icon>
            <h6>Home</h6>
          </router-link>
        </div>
        <div class="col text-center">
          <router-link class="btn" to="/list">
            <font-awesome-icon :icon="['fas','clipboard-list']" size="3x"></font-awesome-icon>
            <h6>Tasks</h6>
          </router-link>
        </div>
        <div class="col text-center">
          <router-link class="btn" to="/settings">
              <font-awesome-icon :icon="['fas','tools']" size="3x"></font-awesome-icon>
              <h6>Setting</h6>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// export default {
//   name: 'particlesJS',
//   mounted () {
//     require('particles.js')
//     this.$nextTick(() => {
//       this.initparticlesJS()
//     })
//   },
//   methods: {
//     initparticlesJS () {
//       particlesJS('particles-js', {
//         particles: {
//           number: {
//             value: 237,
//             density: {
//               enable: true,
//               value_area: 946.9771699587272
//             }
//           },
//           color: {
//             value: '#fff'
//           },
//           shape: {
//             type: 'circle',
//             stroke: {
//               width: 0,
//               color: '#000000'
//             },
//             polygon: {
//               nb_sides: 5
//             },
//             image: {
//               src: 'img/github.svg',
//               width: 100,
//               height: 100
//             }
//           },
//           opacity: {
//             value: 0.5,
//             random: true,
//             anim: {
//               enable: false,
//               speed: 1,
//               opacity_min: 0.1,
//               sync: false
//             }
//           },
//           size: {
//             value: 6,
//             random: true,
//             anim: {
//               enable: false,
//               speed: 40,
//               size_min: 0.1,
//               sync: false
//             }
//           },
//           line_linked: {
//             enable: false,
//             distance: 78.91476416322726,
//             color: '#ffffff',
//             opacity: 0.4,
//             width: 2
//           },
//           move: {
//             enable: true,
//             speed: 7,
//             direction: 'bottom-right',
//             random: true,
//             straight: false,
//             out_mode: 'out',
//             bounce: false,
//             attract: {
//               enable: false,
//               rotateX: 600,
//               rotateY: 1200
//             }
//           }
//         },
//         interactivity: {
//           detect_on: 'canvas',
//           events: {
//             onhover: {
//               enable: true,
//               mode: 'bubble'
//             },
//             onclick: {
//               enable: false,
//               mode: 'repulse'
//             },
//             resize: true
//           },
//           modes: {
//             grab: {
//               distance: 400,
//               line_linked: {
//                 opacity: 0.5
//               }
//             },
//             bubble: {
//               distance: 400,
//               size: 4,
//               duration: 0.3,
//               opacity: 1,
//               speed: 3
//             },
//             repulse: {
//               distance: 200,
//               duration: 0.4
//             },
//             push: {
//               particles_nb: 4
//             },
//             remove: {
//               particles_nb: 2
//             }
//           }
//         },
//         retina_detect: true
//       })
//     }
//   }
// }
</script>
