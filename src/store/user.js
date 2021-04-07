import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    userProfile: {
      userID: 1,
      username: 'nana',
      userImgURL: 'https://i.mydramalist.com/rgA8j_5f.jpg',
      likedLip: [
        {
            _id: "600010e404026944b4ad186d",
            brand: "clinique",
            serie: "Clinique Pop Glaze&trade; Sheer Lip Colour + Primer",
            price: "18.5",
            image_link: "https://www.clinique.com/media/export/cms/products/181x209/clq_ZLPR02_181x209.png",
            product_link: "https://www.clinique.com/product/1605/39138/makeup/lipsticks/clinique-pop-glaze-sheer-lip-colour-primer",
            category: "lipstick",
            color_name: "Melon Drop Pop",
            rgb_value: "(244, 92, 95)",
            deltaE: 2.762,
            api_image_link: "//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/756/original/data?1514072327"
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
      likedBlush: [
        {
          _id: '6000105304026944b4ad1789',
          brand: 'pacifica',
          serie: 'Pacifica Radiant Shimmer Highlighting Creams For Eyes Lips Face',
          price: '28.0',
          image_link:
            'https://d3t32hsnjxo7q6.cloudfront.net/i/4395f2c09aebd1b8d8f183168bc5d00f_ra,w158,h184_pa,w158,h184.jpeg',
          product_link: 'https://well.ca/products/pacifica-radiant-shimmer_77804.html?cat=1977',
          category: 'powder',
          color_name: 'color 1',
          rgb_value: '(126, 85, 74)',
          deltaE: 0.0,
          api_image_link:
            '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/278/original/data?1514063324',
        },
        {
          _id: '6000105304026944b4ad1741',
          brand: 'nyx',
          serie: 'Cheek Contour Duo Palette',
          price: '9.0',
          image_link:
            'https://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dwb9e0511a/ProductImages/2016/Face/Cheek_Contour_Duo_Palette/800897012007_cheekcontourduopalette_doubledate_main.jpg?sw=390&sh=390&sm=fit',
          product_link:
            'https://www.nyxcosmetics.com/cheek-contour-duo-palette/NYX_309.html?cgid=blush',
          category: null,
          color_name: 'Perfect Match',
          rgb_value: '(143, 77, 61)',
          deltaE: 6.239,
          api_image_link:
            '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/923/original/open-uri20171224-4-13zuxu4?1514082646',
        },
        {
          _id: '6000105304026944b4ad1741',
          brand: 'nyx',
          serie: 'Cheek Contour Duo Palette',
          price: '9.0',
          image_link:
            'https://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dwb9e0511a/ProductImages/2016/Face/Cheek_Contour_Duo_Palette/800897012007_cheekcontourduopalette_doubledate_main.jpg?sw=390&sh=390&sm=fit',
          product_link:
            'https://www.nyxcosmetics.com/cheek-contour-duo-palette/NYX_309.html?cgid=blush',
          category: null,
          color_name: 'Cheek On Cheek',
          rgb_value: '(122, 76, 50)',
          deltaE: 6.846,
          api_image_link:
            '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/923/original/open-uri20171224-4-13zuxu4?1514082646',
        },
        {
          _id: '6000105304026944b4ad1741',
          brand: 'nyx',
          serie: 'Cheek Contour Duo Palette',
          price: '9.0',
          image_link:
            'https://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dwb9e0511a/ProductImages/2016/Face/Cheek_Contour_Duo_Palette/800897012007_cheekcontourduopalette_doubledate_main.jpg?sw=390&sh=390&sm=fit',
          product_link:
            'https://www.nyxcosmetics.com/cheek-contour-duo-palette/NYX_309.html?cgid=blush',
          category: null,
          color_name: 'Wine & Dine',
          rgb_value: '(107, 69, 48)',
          deltaE: 7.738,
          api_image_link:
            '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/923/original/open-uri20171224-4-13zuxu4?1514082646',
        },
        {
          _id: '6000105304026944b4ad176a',
          brand: 'e.l.f.',
          serie: 'e.l.f. Studio Blush Palette Dark',
          price: '9.99',
          image_link:
            'https://d3t32hsnjxo7q6.cloudfront.net/i/73da123512d4ca1f2aebf5149e065d86_ra,w158,h184_pa,w158,h184.jpg',
          product_link: 'https://well.ca/products/elf-studio-blush-palette-dark_99359.html',
          category: 'powder',
          color_name: 'color 4',
          rgb_value: '(153, 80, 77)',
          deltaE: 8.222,
          api_image_link:
            '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/454/original/data?1514062281',
        },
        {
          _id: '6000105304026944b4ad1741',
          brand: 'nyx',
          serie: 'Cheek Contour Duo Palette',
          price: '9.0',
          image_link:
            'https://www.nyxcosmetics.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-cpd-nyxusa-master-catalog/default/dwb9e0511a/ProductImages/2016/Face/Cheek_Contour_Duo_Palette/800897012007_cheekcontourduopalette_doubledate_main.jpg?sw=390&sh=390&sm=fit',
          product_link:
            'https://www.nyxcosmetics.com/cheek-contour-duo-palette/NYX_309.html?cgid=blush',
          category: null,
          color_name: 'Ginger & Pepper',
          rgb_value: '(109, 61, 59)',
          deltaE: 8.635,
          api_image_link:
            '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/923/original/open-uri20171224-4-13zuxu4?1514082646',
        },
        {
          _id: '6000105304026944b4ad1777',
          brand: 'pure anada',
          serie: 'Pure Anada Loose Mineral Velvet Matte Blush ',
          price: '12.0',
          image_link:
            'https://d3t32hsnjxo7q6.cloudfront.net/i/47169d3a86232fa7eec3a0c43ed1ad06_ra,w158,h184_pa,w158,h184.jpeg',
          product_link: 'https://well.ca/products/pure-anada-loose-mineral-velvet_83216.html',
          category: 'powder',
          color_name: 'Twig Blush (Neutral Tones) ',
          rgb_value: '(155, 89, 62)',
          deltaE: 8.688,
          api_image_link:
            '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/440/original/data?1514063325',
        },
        {
          _id: '6000105304026944b4ad1749',
          brand: 'clinique',
          serie: 'Sculptionary&trade; Cheek Contouring Palette',
          price: '34.0',
          image_link:
            'https://www.clinique.com/media/export/cms/products/181x209/clq_ZAMN_181x209.png',
          product_link:
            'https://www.clinique.com/product/1593/34892/makeup/blushers/sculptionary-cheek-contouring-palette',
          category: null,
          color_name: 'Defining Roses',
          rgb_value: '(154, 95, 98)',
          deltaE: 9.637,
          api_image_link:
            '//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/778/original/data?1514072606',
        },
      ],
    }
  },
  getters: {
    getUserInfo: state => {
      return state.userProfile;
    },
    addLikedLip: state => item =>{
      return state.userProfile.likedLip.push(item);
    },
  },
  mutations: {
    setUserProfile(state, payload) {
      state.userProfile = payload;
    },
  },
  actions: {
    updateUserProfile({ commit }, payload) {
      commit('setUserProfile', payload);
    },
  },
  modules: {

  },
};
