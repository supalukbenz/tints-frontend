<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/main/Navbar.vue';
import Footer from '@/components/main/Footer.vue';
export default {
  components: {
    Navbar,
    Footer,
  },
  created() {
    const user = {
      userID: 1,
      username: 'nana',
      userImgURL: 'https://i.mydramalist.com/rgA8j_5f.jpg',
      likedLip: [
        {
          _id: '600010e404026944b4ad1882',
          brand: 'benefit',
          serie: 'hydra-smooth lip color',
          price: '23.0',
          image_link:
            'https://www.benefitcosmetics.com/ca/sites/ca/files/styles/category_page_lg/public/hydra-smooth-lip-color-component_0.png?itok=GGUNA2l1',
          product_link: 'https://www.benefitcosmetics.com/ca/en-gb/product/hydra-smooth-lip-color',
          category: 'lipstick',
          color_name: 'dare me',
          rgb_value: '(184, 2, 41)',
          deltaE: 1.716,
          api_image_link:
            '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/624/original/open-uri20171223-4-12tcoyi?1514061760',
        },
        {
          _id: '600010e404026944b4ad18c2',
          brand: "burt's bees",
          serie: "Burt's Bees Lip Crayon",
          price: '9.99',
          image_link:
            'https://d3t32hsnjxo7q6.cloudfront.net/i/ab45997fcda6fc649959ea74507c28e3_ra,w158,h184_pa,w158,h184.jpg',
          product_link: 'https://well.ca/products/burts-bees-lip-crayon_101173.html',
          category: 'lipstick',
          color_name: 'Napa Vineyard ',
          rgb_value: '(183, 2, 30)',
          deltaE: 2.012,
          api_image_link:
            '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/062/original/data?1514062259',
        },
        {
          _id: '600010e404026944b4ad1867',
          brand: 'clinique',
          serie: 'Long Last Lipstick',
          price: '17.0',
          image_link:
            'https://www.clinique.com/media/export/cms/products/181x209/clq_63N2_181x209.png',
          product_link:
            'https://www.clinique.com/product/1605/5404/makeup/lipsticks/long-last-lipstick',
          category: 'lipstick',
          color_name: 'Red Red Red',
          rgb_value: '(179, 33, 39)',
          deltaE: 2.473,
          api_image_link:
            '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/762/original/data?1514072329',
        },
        {
          _id: '600010e404026944b4ad186f',
          brand: 'clinique',
          serie: 'Clinique Pop™ Matte Lip Colour + Primer',
          price: '18.5',
          image_link:
            'https://www.clinique.com/media/export/cms/products/181x209/clq_ZTPH01_181x209.png',
          product_link:
            'https://www.clinique.com/product/1605/42767/makeup/lipsticks/clinique-poptm-matte-lip-colour-primer',
          category: 'lipstick',
          color_name: 'Peppermint Pop',
          rgb_value: '(168, 0, 40)',
          deltaE: 3.211,
          api_image_link:
            '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/754/original/data?1514072331',
        },
        {
          _id: '600010e404026944b4ad1864',
          brand: 'clinique',
          serie: 'High Impact&trade; Lip Colour',
          price: '17.5',
          image_link:
            'https://www.clinique.com/media/export/cms/products/181x209/clq_6LX5_181x209.png',
          product_link:
            'https://www.clinique.com/product/1605/5778/makeup/lipsticks/high-impact-lip-colour',
          category: 'lipstick',
          color_name: 'Red-y To Wear',
          rgb_value: '(175, 32, 51)',
          deltaE: 3.64,
          api_image_link:
            '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/765/original/data?1514072330',
        },
        {
          _id: '600010e404026944b4ad1867',
          brand: 'clinique',
          serie: 'Long Last Lipstick',
          price: '17.0',
          image_link:
            'https://www.clinique.com/media/export/cms/products/181x209/clq_63N2_181x209.png',
          product_link:
            'https://www.clinique.com/product/1605/5404/makeup/lipsticks/long-last-lipstick',
          category: 'lipstick',
          color_name: 'Dubonnet',
          rgb_value: '(165, 43, 37)',
          deltaE: 4.162,
          api_image_link:
            '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/762/original/data?1514072329',
        },
      ],
    };
    this.$store.dispatch('updateUserProfile', user);
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

html,
body {
  background-color: #fffcf7 !important;
  // background-image: url('../src/assets/images/blush-bg.jpg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-attachment: fixed;
  height: 100%;
}

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}

button {
  outline: none;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.color-green-200 {
  color: #a1afa0;
}

.color-green-100 {
  color: #9dc99c;
}

.color-brown-100 {
  color: #bca79d;
}

.color-skin-100 {
  color: #edb194;
}

.bg-green-200 {
  background: #a1afa0;
}

.bg-green-100 {
  background: #9dc99c;
}

.bg-brown-100 {
  background: #bca79d;
}

.bg-skin-100 {
  background: #edb194;
}

.ref-feature {
  margin: 1rem 0.5rem;
  border-left: 2px solid #cfcfcf;
}

.heart-gray {
  color: #cfcfcf;
}

.heart-red {
  color: #a83f39;
}

.border-red {
  border-color: #a83f39 !important;
}

.border-gray {
  border-color: #cfcfcf !important;
}

.like-btn {
  border-radius: 50%;
  margin-left: 0.5rem;
  border: 1px solid;
  background: #ffffff;
  &:hover {
    border-color: #a83f39 !important;
    .like-icon {
      color: #a83f39;
    }
  }
}
.fadeIn {
  -webkit-animation: fadein 2s;
  -moz-animation: fadein 2s;
  -ms-animation: fadein 2s;
  -o-animation: fadein 2s;
  animation: fadein 2s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-moz-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-ms-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-o-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
