import { apiClient } from './apiClient';
import { IProduct, IApiResponse } from '../interfaces';
import { FilterParams } from '../types';

const API_BASE_URL = '/products';

export const MOCK_PRODUCTS: IProduct[] = [
  {
    "id": "prod_idol_1",
    "name": "Handcrafted Antique Brass Ganesha Idol (8 Inch)",
    "slug": "handcrafted-antique-brass-ganesha-idol",
    "description": "Solid brass Ganesha idol with intricate traditional carving and antique gold finish for temple puja.",
    "shortDescription": "Handcrafted 8-inch solid brass Ganesha idol for temple worship.",
    "price": 1599,
    "originalPrice": 1999,
    "discountPercentage": 20,
    "rating": 4.9,
    "reviewCount": 210,
    "stock": 45,
    "category": "Idols",
    "brand": "Kanchi Heritage Artisans",
    "thumbnail": "/images/products/brass_ganesha_idol.jpg",
    "images": [
      "/images/products/brass_ganesha_idol.jpg"
    ],
    "tags": [
      "idols"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Kanchi Heritage Artisans"
    ],
    "vendor": {
      "id": "ven_1",
      "name": "Vedic Crafts Heritage",
      "logo": "/images/products/brass_ganesha_idol.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_idol_2",
    "name": "Sacred Panchaloha Radha Krishna Idol (9.5 Inch)",
    "slug": "sacred-panchaloha-radha-krishna-idol",
    "description": "Authentic 5-metal Panchaloha alloy Radha Krishna idol crafted according to Shilpa Shastras.",
    "shortDescription": "Divine Radha Krishna idol in traditional 5-metal Panchaloha alloy.",
    "price": 2499,
    "originalPrice": 3200,
    "discountPercentage": 22,
    "rating": 4.9,
    "reviewCount": 140,
    "stock": 25,
    "category": "Idols",
    "brand": "Kanchi Heritage Artisans",
    "thumbnail": "/images/products/radha_krishna_idol.jpg",
    "images": [
      "/images/products/radha_krishna_idol.jpg"
    ],
    "tags": [
      "idols"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Kanchi Heritage Artisans"
    ],
    "vendor": {
      "id": "ven_1",
      "name": "Vedic Crafts Heritage",
      "logo": "/images/products/radha_krishna_idol.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_idol_3",
    "name": "Pure Brass Nataraja Dancing Shiva Idol (10 Inch)",
    "slug": "pure-brass-nataraja-dancing-shiva-idol",
    "description": "Anandatandava posture Lord Nataraja Shiva brass sculpture with cosmic aureole arch.",
    "shortDescription": "10-inch heavy brass Nataraja Shiva idol with cosmic arch.",
    "price": 2999,
    "originalPrice": 3799,
    "discountPercentage": 21,
    "rating": 4.8,
    "reviewCount": 95,
    "stock": 18,
    "category": "Idols",
    "brand": "South Temple Crafts",
    "thumbnail": "/images/products/nataraja_shiva_idol.jpg",
    "images": [
      "/images/products/nataraja_shiva_idol.jpg"
    ],
    "tags": [
      "idols"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by South Temple Crafts"
    ],
    "vendor": {
      "id": "ven_1",
      "name": "Vedic Crafts Heritage",
      "logo": "/images/products/nataraja_shiva_idol.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_idol_4",
    "name": "Marble Dust Goddess Lakshmi Saraswati Ganesha Set",
    "slug": "marble-dust-goddess-lakshmi-saraswati-ganesha-set",
    "description": "Trio divine idol set of Mahalakshmi, Saraswati, and Ganesha finished in pure white marble dust.",
    "shortDescription": "Auspicious trio set of Lakshmi, Saraswati & Ganesha for Deepavali.",
    "price": 1899,
    "originalPrice": 2399,
    "discountPercentage": 21,
    "rating": 4.9,
    "reviewCount": 180,
    "stock": 30,
    "category": "Idols",
    "brand": "Vedic Arts",
    "thumbnail": "/images/products/lakshmi_saraswati_ganesha.jpg",
    "images": [
      "/images/products/lakshmi_saraswati_ganesha.jpg"
    ],
    "tags": [
      "idols"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Arts"
    ],
    "vendor": {
      "id": "ven_1",
      "name": "Vedic Crafts Heritage",
      "logo": "/images/products/lakshmi_saraswati_ganesha.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_idol_5",
    "name": "Antique Bronze Finish Hanuman Ji Idol (7 Inch)",
    "slug": "antique-bronze-finish-hanuman-ji-idol",
    "description": "Sanjeevani mountain carrying Lord Hanuman brass idol with antique dark bronze patina.",
    "shortDescription": "7-inch heavy brass Hanuman Ji idol in Sanjeevani posture.",
    "price": 1299,
    "originalPrice": 1699,
    "discountPercentage": 23,
    "rating": 4.9,
    "reviewCount": 165,
    "stock": 40,
    "category": "Idols",
    "brand": "Kanchi Heritage Artisans",
    "thumbnail": "/images/products/hanuman_ji_idol.jpg",
    "images": [
      "/images/products/hanuman_ji_idol.jpg"
    ],
    "tags": [
      "idols"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Kanchi Heritage Artisans"
    ],
    "vendor": {
      "id": "ven_1",
      "name": "Vedic Crafts Heritage",
      "logo": "/images/products/hanuman_ji_idol.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_idol_6",
    "name": "Black Stone Mahadev Shiva Lingam with Brass Yoni Base",
    "slug": "black-stone-mahadev-shiva-lingam-with-brass-yoni-base",
    "description": "Natural Narmada stone Shiva Lingam set upon solid polished brass Yoni pedestal.",
    "shortDescription": "Sacred Narmada stone Shiva Lingam with heavy brass Yoni.",
    "price": 1499,
    "originalPrice": 1899,
    "discountPercentage": 21,
    "rating": 5.0,
    "reviewCount": 310,
    "stock": 22,
    "category": "Idols",
    "brand": "Narmada Sacred Stones",
    "thumbnail": "/images/products/shiva_lingam.jpg",
    "images": [
      "/images/products/shiva_lingam.jpg"
    ],
    "tags": [
      "idols"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Narmada Sacred Stones"
    ],
    "vendor": {
      "id": "ven_1",
      "name": "Vedic Crafts Heritage",
      "logo": "/images/products/shiva_lingam.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_idol_7",
    "name": "Pure Brass Lord Balaji Venkateshwara Idol (12 Inch)",
    "slug": "pure-brass-lord-balaji-venkateshwara-idol",
    "description": "Tirupati Balaji Sri Venkateshwara solid brass idol with Shankha Chakra & Namam details.",
    "shortDescription": "12-inch grand Tirupati Balaji Venkateshwara brass idol.",
    "price": 3499,
    "originalPrice": 4499,
    "discountPercentage": 22,
    "rating": 5.0,
    "reviewCount": 280,
    "stock": 15,
    "category": "Idols",
    "brand": "South Temple Crafts",
    "thumbnail": "/images/products/balaji_venkateshwara.jpg",
    "images": [
      "/images/products/balaji_venkateshwara.jpg"
    ],
    "tags": [
      "idols"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by South Temple Crafts"
    ],
    "vendor": {
      "id": "ven_1",
      "name": "Vedic Crafts Heritage",
      "logo": "/images/products/balaji_venkateshwara.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_idol_8",
    "name": "Brass Goddess Durga Idol on Lion (8.5 Inch)",
    "slug": "brass-goddess-durga-idol-on-lion",
    "description": "Ashtabhuja 8-armed Goddess Durga seated on lion with all divine weapons in pure brass.",
    "shortDescription": "8.5-inch Ashtabhuja Durga Ma brass idol for Navratri worship.",
    "price": 2199,
    "originalPrice": 2799,
    "discountPercentage": 21,
    "rating": 4.9,
    "reviewCount": 135,
    "stock": 28,
    "category": "Idols",
    "brand": "Kanchi Heritage Artisans",
    "thumbnail": "/images/products/durga_idol.jpg",
    "images": [
      "/images/products/durga_idol.jpg"
    ],
    "tags": [
      "idols"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Kanchi Heritage Artisans"
    ],
    "vendor": {
      "id": "ven_1",
      "name": "Vedic Crafts Heritage",
      "logo": "/images/products/durga_idol.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_idol_9",
    "name": "Kanchi Kamakshi Amman Brass Idol (7 Inch)",
    "slug": "kanchi-kamakshi-amman-brass-idol",
    "description": "Traditional Kanchipuram Kamakshi Amman idol seated in Padmasana with sugarcane & parrot.",
    "shortDescription": "7-inch Kanchi Kamakshi Amman traditional brass idol.",
    "price": 1799,
    "originalPrice": 2299,
    "discountPercentage": 22,
    "rating": 4.9,
    "reviewCount": 190,
    "stock": 35,
    "category": "Idols",
    "brand": "Kanchi Heritage Artisans",
    "thumbnail": "/images/products/kamakshi_amman.jpg",
    "images": [
      "/images/products/kamakshi_amman.jpg"
    ],
    "tags": [
      "idols"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Kanchi Heritage Artisans"
    ],
    "vendor": {
      "id": "ven_1",
      "name": "Vedic Crafts Heritage",
      "logo": "/images/products/kamakshi_amman.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_idol_10",
    "name": "Sacred Panchaloha Murugan Kartikeya Idol with Spear",
    "slug": "sacred-panchaloha-murugan-kartikeya-idol-with-spear",
    "description": "Lord Murugan / Swaminatha Swami Panchaloha alloy idol carrying the sacred Vel spear.",
    "shortDescription": "Lord Murugan Kartikeya Panchaloha idol with sacred Vel spear.",
    "price": 2699,
    "originalPrice": 3499,
    "discountPercentage": 23,
    "rating": 5.0,
    "reviewCount": 215,
    "stock": 20,
    "category": "Idols",
    "brand": "South Temple Crafts",
    "thumbnail": "/images/products/murugan_kartikeya.jpg",
    "images": [
      "/images/products/murugan_kartikeya.jpg"
    ],
    "tags": [
      "idols"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by South Temple Crafts"
    ],
    "vendor": {
      "id": "ven_1",
      "name": "Vedic Crafts Heritage",
      "logo": "/images/products/murugan_kartikeya.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_puja_1",
    "name": "Premium Pure Brass Puja Thali Set (9 Items)",
    "slug": "premium-pure-brass-puja-thali-set-9-items",
    "description": "Complete 9-piece traditional brass puja thali set including thali, diya, ghanti, agarbatti stand, and bowls.",
    "shortDescription": "All-in-one brass puja thali set for daily temple worship.",
    "price": 1299,
    "originalPrice": 1699,
    "discountPercentage": 23,
    "rating": 4.9,
    "reviewCount": 320,
    "stock": 50,
    "category": "Puja Samagri",
    "brand": "Temple Puja Works",
    "thumbnail": "/images/products/puja_thali_set.jpg",
    "images": [
      "/images/products/puja_thali_set.jpg"
    ],
    "tags": [
      "puja samagri"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Temple Puja Works"
    ],
    "vendor": {
      "id": "ven_2",
      "name": "South Temple Supplies",
      "logo": "/images/products/puja_thali_set.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_puja_2",
    "name": "Ornate Brass Akhand Diya Oil Lamp with Glass Shade",
    "slug": "ornate-brass-akhand-diya-oil-lamp",
    "description": "Windproof borosilicate glass shade Akhand Diya with heavy brass base for continuous burning.",
    "shortDescription": "Windproof long-burning glass and brass Akhand Diya.",
    "price": 699,
    "originalPrice": 899,
    "discountPercentage": 22,
    "rating": 4.8,
    "reviewCount": 210,
    "stock": 60,
    "category": "Puja Samagri",
    "brand": "Temple Puja Works",
    "thumbnail": "/images/products/akhand_diya_lamp.jpg",
    "images": [
      "/images/products/akhand_diya_lamp.jpg"
    ],
    "tags": [
      "puja samagri"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Temple Puja Works"
    ],
    "vendor": {
      "id": "ven_2",
      "name": "South Temple Supplies",
      "logo": "/images/products/akhand_diya_lamp.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_puja_3",
    "name": "Heavy Carved Pure Brass Temple Bell (Ghanti)",
    "slug": "heavy-carved-pure-brass-temple-bell",
    "description": "Garuda / Nandi engraved heavy brass ringing bell producing resonant acoustic vibrations.",
    "shortDescription": "Resonant heavy brass temple ringing bell with Nandi top.",
    "price": 549,
    "originalPrice": 699,
    "discountPercentage": 21,
    "rating": 4.9,
    "reviewCount": 180,
    "stock": 70,
    "category": "Puja Samagri",
    "brand": "Kanchi Bell Works",
    "thumbnail": "/images/products/brass_temple_bell.jpg",
    "images": [
      "/images/products/brass_temple_bell.jpg"
    ],
    "tags": [
      "puja samagri"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Kanchi Bell Works"
    ],
    "vendor": {
      "id": "ven_2",
      "name": "South Temple Supplies",
      "logo": "/images/products/brass_temple_bell.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_puja_4",
    "name": "Pure Silver Plated Panchamrita Kalash with Mango Leaves",
    "slug": "pure-silver-plated-panchamrita-kalash-with-mango-leaves",
    "description": "Engraved silver-plated copper Kalash for abhishekam and sacred temple rituals.",
    "shortDescription": "Silver-plated Panchamrita Kalash pot for temple abhishekam.",
    "price": 899,
    "originalPrice": 1199,
    "discountPercentage": 25,
    "rating": 4.9,
    "reviewCount": 145,
    "stock": 35,
    "category": "Puja Samagri",
    "brand": "Temple Puja Works",
    "thumbnail": "/images/products/panchamrita_kalash.jpg",
    "images": [
      "/images/products/panchamrita_kalash.jpg"
    ],
    "tags": [
      "puja samagri"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Temple Puja Works"
    ],
    "vendor": {
      "id": "ven_2",
      "name": "South Temple Supplies",
      "logo": "/images/products/panchamrita_kalash.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_puja_5",
    "name": "Pure Camphor Karpooram Cubes (500g Jar)",
    "slug": "pure-camphor-karpooram-cubes-500g",
    "description": "100% pure green camphor (Bhimseni Karpooram) for aarti without leaving black residue.",
    "shortDescription": "Pure Bhimseni Karpooram camphor cubes for daily aarti.",
    "price": 449,
    "originalPrice": 599,
    "discountPercentage": 25,
    "rating": 5.0,
    "reviewCount": 410,
    "stock": 100,
    "category": "Puja Samagri",
    "brand": "Vedic Sugandh",
    "thumbnail": "/images/products/pure_camphor_cubes.jpg",
    "images": [
      "/images/products/pure_camphor_cubes.jpg"
    ],
    "tags": [
      "puja samagri"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Sugandh"
    ],
    "vendor": {
      "id": "ven_2",
      "name": "South Temple Supplies",
      "logo": "/images/products/pure_camphor_cubes.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_puja_6",
    "name": "Pure Brass Agarbatti & Dhoop Stand with Ash Catcher",
    "slug": "pure-brass-agarbatti-dhoop-stand-with-ash-catcher",
    "description": "Multi-holder brass incense stick & dhoop cone burner with ornamental tray.",
    "shortDescription": "Decorative brass incense & dhoop stand with ash tray.",
    "price": 349,
    "originalPrice": 449,
    "discountPercentage": 22,
    "rating": 4.8,
    "reviewCount": 160,
    "stock": 80,
    "category": "Puja Samagri",
    "brand": "Temple Puja Works",
    "thumbnail": "/images/products/dhoop_incense_stand.jpg",
    "images": [
      "/images/products/dhoop_incense_stand.jpg"
    ],
    "tags": [
      "puja samagri"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Temple Puja Works"
    ],
    "vendor": {
      "id": "ven_2",
      "name": "South Temple Supplies",
      "logo": "/images/products/dhoop_incense_stand.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_puja_7",
    "name": "Handcarved Sandalwood Tilak Bowl with Brass Spoon",
    "slug": "handcarved-sandalwood-tilak-bowl-with-brass-spoon",
    "description": "Solid Mysuru sandalwood carved cup for keeping chandan paste and kumkum.",
    "shortDescription": "Natural Mysore Sandalwood tilak bowl with brass spoon.",
    "price": 399,
    "originalPrice": 499,
    "discountPercentage": 20,
    "rating": 4.9,
    "reviewCount": 190,
    "stock": 45,
    "category": "Puja Samagri",
    "brand": "Mysore Heritage",
    "thumbnail": "/images/products/sandalwood_tilak_bowl.jpg",
    "images": [
      "/images/products/sandalwood_tilak_bowl.jpg"
    ],
    "tags": [
      "puja samagri"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Mysore Heritage"
    ],
    "vendor": {
      "id": "ven_2",
      "name": "South Temple Supplies",
      "logo": "/images/products/sandalwood_tilak_bowl.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_puja_8",
    "name": "Natural Saffron Kesar & Chandan Powder Set (100g)",
    "slug": "natural-saffron-kesar-chandan-powder-set",
    "description": "Pure Mysore sandalwood powder blended with Kashmiri saffron threads for daily tilak.",
    "shortDescription": "Pure Mysore Sandalwood & Kashmiri Kesar tilak powder.",
    "price": 599,
    "originalPrice": 799,
    "discountPercentage": 25,
    "rating": 4.9,
    "reviewCount": 270,
    "stock": 65,
    "category": "Puja Samagri",
    "brand": "Vedic Sugandh",
    "thumbnail": "/images/products/kesar_chandan_powder.jpg",
    "images": [
      "/images/products/kesar_chandan_powder.jpg"
    ],
    "tags": [
      "puja samagri"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Sugandh"
    ],
    "vendor": {
      "id": "ven_2",
      "name": "South Temple Supplies",
      "logo": "/images/products/kesar_chandan_powder.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_puja_9",
    "name": "Traditional Brass Temple Shankh Stand & Blowing Conch Shell",
    "slug": "traditional-brass-temple-shankh-stand-blowing-conch",
    "description": "Natural Vamavarti ritual blowing conch shell accompanied by a heavy brass carved stand.",
    "shortDescription": "Authentic blowing conch shell with carved brass stand.",
    "price": 1199,
    "originalPrice": 1499,
    "discountPercentage": 20,
    "rating": 5.0,
    "reviewCount": 230,
    "stock": 30,
    "category": "Puja Samagri",
    "brand": "Temple Puja Works",
    "thumbnail": "/images/products/conch_shell_shankh.jpg",
    "images": [
      "/images/products/conch_shell_shankh.jpg"
    ],
    "tags": [
      "puja samagri"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Temple Puja Works"
    ],
    "vendor": {
      "id": "ven_2",
      "name": "South Temple Supplies",
      "logo": "/images/products/conch_shell_shankh.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_puja_10",
    "name": "Premium Cotton Wick Baati Set for Puja Diyas (1000 Wicks)",
    "slug": "premium-cotton-wick-baati-set-for-puja-diyas",
    "description": "Hand-rolled organic raw cotton long & round wicks for oil lamps and ghee diyas.",
    "shortDescription": "1000-piece organic pure cotton wicks for temple diyas.",
    "price": 249,
    "originalPrice": 349,
    "discountPercentage": 28,
    "rating": 4.8,
    "reviewCount": 520,
    "stock": 150,
    "category": "Puja Samagri",
    "brand": "Temple Puja Works",
    "thumbnail": "/images/products/cotton_wicks_baati.jpg",
    "images": [
      "/images/products/cotton_wicks_baati.jpg"
    ],
    "tags": [
      "puja samagri"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Temple Puja Works"
    ],
    "vendor": {
      "id": "ven_2",
      "name": "South Temple Supplies",
      "logo": "/images/products/cotton_wicks_baati.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_rudra_1",
    "name": "5 Mukhi Certified Himalayan Rudraksha Mala (108+1 Beads)",
    "slug": "5-mukhi-certified-himalayan-rudraksha-mala",
    "description": "Lab-certified authentic natural 5 Mukhi Rudraksha Mala sourced directly from Nepal foothills.",
    "shortDescription": "Lab-certified 5 Mukhi Rudraksha Mala for peace & meditation.",
    "price": 1299,
    "originalPrice": 1599,
    "discountPercentage": 18,
    "rating": 4.9,
    "reviewCount": 450,
    "stock": 50,
    "category": "Rudraksha",
    "brand": "Vedic Rudraksha Sansthan",
    "thumbnail": "/images/products/5_mukhi_rudraksha_mala.jpg",
    "images": [
      "/images/products/5_mukhi_rudraksha_mala.jpg"
    ],
    "tags": [
      "rudraksha"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Rudraksha Sansthan"
    ],
    "vendor": {
      "id": "ven_3",
      "name": "Himalayan Vedic Store",
      "logo": "/images/products/5_mukhi_rudraksha_mala.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_rudra_2",
    "name": "Collector Grade 1 Mukhi Ek Mukhi Half-Moon Nepal Rudraksha",
    "slug": "collector-grade-1-mukhi-ek-mukhi-half-moon-rudraksha",
    "description": "Rare lab-certified 1 Mukhi Kaju / Half-Moon shaped Nepal Rudraksha bead with silver casing.",
    "shortDescription": "Rare lab-certified 1 Mukhi Ek Mukhi Nepal Rudraksha in silver.",
    "price": 4999,
    "originalPrice": 6499,
    "discountPercentage": 23,
    "rating": 5.0,
    "reviewCount": 180,
    "stock": 10,
    "category": "Rudraksha",
    "brand": "Vedic Rudraksha Sansthan",
    "thumbnail": "/images/products/1_mukhi_rudraksha.jpg",
    "images": [
      "/images/products/1_mukhi_rudraksha.jpg"
    ],
    "tags": [
      "rudraksha"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Rudraksha Sansthan"
    ],
    "vendor": {
      "id": "ven_3",
      "name": "Himalayan Vedic Store",
      "logo": "/images/products/1_mukhi_rudraksha.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_rudra_3",
    "name": "Sacred 7 Mukhi Mahalaxmi Nepal Rudraksha Bead",
    "slug": "sacred-7-mukhi-mahalaxmi-nepal-rudraksha-bead",
    "description": "7-faced natural Nepal Rudraksha associated with Goddess Mahalakshmi for financial prosperity.",
    "shortDescription": "7 Mukhi Mahalakshmi Nepal Rudraksha bead with certificate.",
    "price": 1699,
    "originalPrice": 2199,
    "discountPercentage": 22,
    "rating": 4.9,
    "reviewCount": 210,
    "stock": 25,
    "category": "Rudraksha",
    "brand": "Vedic Rudraksha Sansthan",
    "thumbnail": "/images/products/7_mukhi_rudraksha.jpg",
    "images": [
      "/images/products/7_mukhi_rudraksha.jpg"
    ],
    "tags": [
      "rudraksha"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Rudraksha Sansthan"
    ],
    "vendor": {
      "id": "ven_3",
      "name": "Himalayan Vedic Store",
      "logo": "/images/products/7_mukhi_rudraksha.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_rudra_4",
    "name": "Authentic 14 Mukhi Hanuman Nepal Rudraksha with Certificate",
    "slug": "authentic-14-mukhi-hanuman-nepal-rudraksha",
    "description": "Deva Mani 14 Mukhi Rudraksha associated with Lord Hanuman for courage & protection.",
    "shortDescription": "Rare 14 Mukhi Deva Mani Rudraksha bead with silver capping.",
    "price": 8999,
    "originalPrice": 11999,
    "discountPercentage": 25,
    "rating": 5.0,
    "reviewCount": 95,
    "stock": 5,
    "category": "Rudraksha",
    "brand": "Vedic Rudraksha Sansthan",
    "thumbnail": "/images/products/14_mukhi_rudraksha.jpg",
    "images": [
      "/images/products/14_mukhi_rudraksha.jpg"
    ],
    "tags": [
      "rudraksha"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Rudraksha Sansthan"
    ],
    "vendor": {
      "id": "ven_3",
      "name": "Himalayan Vedic Store",
      "logo": "/images/products/14_mukhi_rudraksha.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_rudra_5",
    "name": "Lab-Certified 6 Mukhi Kartikeya Nepal Rudraksha",
    "slug": "lab-certified-6-mukhi-kartikeya-nepal-rudraksha",
    "description": "6 Mukhi Rudraksha ruled by Lord Kartikeya & Venus for focus, wisdom and willpower.",
    "shortDescription": "Lab-certified 6 Mukhi Kartikeya Rudraksha bead for students.",
    "price": 1499,
    "originalPrice": 1899,
    "discountPercentage": 21,
    "rating": 4.8,
    "reviewCount": 175,
    "stock": 30,
    "category": "Rudraksha",
    "brand": "Vedic Rudraksha Sansthan",
    "thumbnail": "/images/products/6_mukhi_rudraksha.jpg",
    "images": [
      "/images/products/6_mukhi_rudraksha.jpg"
    ],
    "tags": [
      "rudraksha"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Rudraksha Sansthan"
    ],
    "vendor": {
      "id": "ven_3",
      "name": "Himalayan Vedic Store",
      "logo": "/images/products/6_mukhi_rudraksha.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_rudra_6",
    "name": "108 Bead Sphatik Quartz & 5 Mukhi Rudraksha Combination Mala",
    "slug": "sphatik-quartz-5-mukhi-rudraksha-combination-mala",
    "description": "Dual power Japa mala combining natural crystal Sphatik quartz beads with 5 Mukhi Rudraksha.",
    "shortDescription": "108 bead natural Sphatik quartz & 5 Mukhi Rudraksha mala.",
    "price": 1599,
    "originalPrice": 1999,
    "discountPercentage": 20,
    "rating": 4.9,
    "reviewCount": 310,
    "stock": 40,
    "category": "Rudraksha",
    "brand": "Vedic Rudraksha Sansthan",
    "thumbnail": "/images/products/sphatik_rudraksha_mala.jpg",
    "images": [
      "/images/products/sphatik_rudraksha_mala.jpg"
    ],
    "tags": [
      "rudraksha"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Rudraksha Sansthan"
    ],
    "vendor": {
      "id": "ven_3",
      "name": "Himalayan Vedic Store",
      "logo": "/images/products/sphatik_rudraksha_mala.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_rudra_7",
    "name": "Natural 9 Mukhi Durga Nepal Rudraksha Bead",
    "slug": "natural-9-mukhi-durga-nepal-rudraksha-bead",
    "description": "9 Mukhi Rudraksha representing Nine Forms of Navadurga for energy and protection.",
    "shortDescription": "Natural 9 Mukhi Navadurga Nepal Rudraksha with lab test.",
    "price": 2899,
    "originalPrice": 3699,
    "discountPercentage": 21,
    "rating": 4.9,
    "reviewCount": 140,
    "stock": 15,
    "category": "Rudraksha",
    "brand": "Vedic Rudraksha Sansthan",
    "thumbnail": "/images/products/9_mukhi_rudraksha.jpg",
    "images": [
      "/images/products/9_mukhi_rudraksha.jpg"
    ],
    "tags": [
      "rudraksha"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Rudraksha Sansthan"
    ],
    "vendor": {
      "id": "ven_3",
      "name": "Himalayan Vedic Store",
      "logo": "/images/products/9_mukhi_rudraksha.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_rudra_8",
    "name": "Certified 11 Mukhi Rudra Nepal Rudraksha Pendant in Silver",
    "slug": "certified-11-mukhi-rudra-nepal-rudraksha-pendant",
    "description": "11 Mukhi Rudraksha blessed by 11 Rudras for meditation mastery & leadership.",
    "shortDescription": "11 Mukhi Rudra Nepal Rudraksha pendant in pure silver.",
    "price": 3499,
    "originalPrice": 4499,
    "discountPercentage": 22,
    "rating": 5.0,
    "reviewCount": 125,
    "stock": 12,
    "category": "Rudraksha",
    "brand": "Vedic Rudraksha Sansthan",
    "thumbnail": "/images/products/11_mukhi_rudraksha.jpg",
    "images": [
      "/images/products/11_mukhi_rudraksha.jpg"
    ],
    "tags": [
      "rudraksha"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Rudraksha Sansthan"
    ],
    "vendor": {
      "id": "ven_3",
      "name": "Himalayan Vedic Store",
      "logo": "/images/products/11_mukhi_rudraksha.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_rudra_9",
    "name": "Sacred Gauri Shankar Dual Rudraksha Bead for Harmony",
    "slug": "sacred-gauri-shankar-dual-rudraksha-bead",
    "description": "Naturally joined twin Rudraksha representing Lord Shiva and Goddess Parvati.",
    "shortDescription": "Naturally joined Gauri Shankar twin Rudraksha bead.",
    "price": 4499,
    "originalPrice": 5799,
    "discountPercentage": 22,
    "rating": 5.0,
    "reviewCount": 210,
    "stock": 8,
    "category": "Rudraksha",
    "brand": "Vedic Rudraksha Sansthan",
    "thumbnail": "/images/products/gauri_shankar_bead.jpg",
    "images": [
      "/images/products/gauri_shankar_bead.jpg"
    ],
    "tags": [
      "rudraksha"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Rudraksha Sansthan"
    ],
    "vendor": {
      "id": "ven_3",
      "name": "Himalayan Vedic Store",
      "logo": "/images/products/gauri_shankar_bead.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_rudra_10",
    "name": "108 Bead Pure Lotus Seed Kamal Gatta & Rudraksha Japa Mala",
    "slug": "108-bead-kamal-gatta-rudraksha-japa-mala",
    "description": "Sacred combination Japa mala of black Lotus seeds (Kamal Gatta) and 5 Mukhi Rudraksha.",
    "shortDescription": "108 bead Kamal Gatta lotus seed & Rudraksha Japa mala.",
    "price": 999,
    "originalPrice": 1299,
    "discountPercentage": 23,
    "rating": 4.8,
    "reviewCount": 290,
    "stock": 45,
    "category": "Rudraksha",
    "brand": "Vedic Rudraksha Sansthan",
    "thumbnail": "/images/products/kamal_gatta_mala.jpg",
    "images": [
      "/images/products/kamal_gatta_mala.jpg"
    ],
    "tags": [
      "rudraksha"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Rudraksha Sansthan"
    ],
    "vendor": {
      "id": "ven_3",
      "name": "Himalayan Vedic Store",
      "logo": "/images/products/kamal_gatta_mala.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_book_1",
    "name": "Shreemad Bhagavad Gita - Deluxe Gold Edition",
    "slug": "shreemad-bhagavad-gita-deluxe-gold-edition",
    "description": "Hardbound gold-embossed edition of Shreemad Bhagavad Gita featuring original Sanskrit slokas & commentary.",
    "shortDescription": "Deluxe hardbound Bhagavad Gita with Sanskrit & English translation.",
    "price": 899,
    "originalPrice": 1199,
    "discountPercentage": 25,
    "rating": 5.0,
    "reviewCount": 520,
    "stock": 80,
    "category": "Books",
    "brand": "Gita Press Heritage",
    "thumbnail": "/images/products/bhagavad_gita_book.jpg",
    "images": [
      "/images/products/bhagavad_gita_book.jpg"
    ],
    "tags": [
      "books"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Gita Press Heritage"
    ],
    "vendor": {
      "id": "ven_4",
      "name": "Sacred Veda Publications",
      "logo": "/images/products/bhagavad_gita_book.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_book_2",
    "name": "Complete Valmiki Ramayana (3 Volume Hardbound Set)",
    "slug": "complete-valmiki-ramayana-3-volume-hardbound-set",
    "description": "Comprehensive 3-volume boxed hardbound set of Maharishi Valmiki Ramayana with Sloka meanings.",
    "shortDescription": "3-Volume unabridged Valmiki Ramayana hardbound set.",
    "price": 2499,
    "originalPrice": 3199,
    "discountPercentage": 21,
    "rating": 5.0,
    "reviewCount": 340,
    "stock": 35,
    "category": "Books",
    "brand": "Sacred Veda Press",
    "thumbnail": "/images/products/valmiki_ramayana_set.jpg",
    "images": [
      "/images/products/valmiki_ramayana_set.jpg"
    ],
    "tags": [
      "books"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Sacred Veda Press"
    ],
    "vendor": {
      "id": "ven_4",
      "name": "Sacred Veda Publications",
      "logo": "/images/products/valmiki_ramayana_set.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_book_3",
    "name": "Shreemad Bhagavata Purana - Sanskrit & Hindi Translation",
    "slug": "shreemad-bhagavata-purana-sanskrit-hindi-translation",
    "description": "Full 12 Skandhas of Bhagavata Purana celebrating Sri Krishna leelas with authentic translation.",
    "shortDescription": "Complete 12 Skandhas Bhagavata Purana scripture set.",
    "price": 1799,
    "originalPrice": 2299,
    "discountPercentage": 21,
    "rating": 4.9,
    "reviewCount": 210,
    "stock": 30,
    "category": "Books",
    "brand": "Gita Press Heritage",
    "thumbnail": "/images/products/bhagavata_purana_book.jpg",
    "images": [
      "/images/products/bhagavata_purana_book.jpg"
    ],
    "tags": [
      "books"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Gita Press Heritage"
    ],
    "vendor": {
      "id": "ven_4",
      "name": "Sacred Veda Publications",
      "logo": "/images/products/bhagavata_purana_book.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_book_4",
    "name": "Shri Ramcharitmanas Code Edition with Commentary",
    "slug": "shri-ramcharitmanas-code-edition-with-commentary",
    "description": "Goswami Tulsidas Shri Ramcharitmanas with Avadhi verse & word-by-word explanation.",
    "shortDescription": "Goswami Tulsidas Shri Ramcharitmanas complete scripture.",
    "price": 699,
    "originalPrice": 899,
    "discountPercentage": 22,
    "rating": 5.0,
    "reviewCount": 480,
    "stock": 60,
    "category": "Books",
    "brand": "Gita Press Heritage",
    "thumbnail": "/images/products/ramcharitmanas_book.jpg",
    "images": [
      "/images/products/ramcharitmanas_book.jpg"
    ],
    "tags": [
      "books"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Gita Press Heritage"
    ],
    "vendor": {
      "id": "ven_4",
      "name": "Sacred Veda Publications",
      "logo": "/images/products/ramcharitmanas_book.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_book_5",
    "name": "The Upanishads - 108 Sacred Texts Transliteration & Meaning",
    "slug": "the-upanishads-108-sacred-texts",
    "description": "Deep philosophical treatise covering 108 Principal Upanishads with English commentary.",
    "shortDescription": "Comprehensive guide to 108 Principal Upanishads.",
    "price": 1199,
    "originalPrice": 1499,
    "discountPercentage": 20,
    "rating": 4.9,
    "reviewCount": 190,
    "stock": 40,
    "category": "Books",
    "brand": "Vedic Philosophy Press",
    "thumbnail": "/images/products/upanishads_book.jpg",
    "images": [
      "/images/products/upanishads_book.jpg"
    ],
    "tags": [
      "books"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Philosophy Press"
    ],
    "vendor": {
      "id": "ven_4",
      "name": "Sacred Veda Publications",
      "logo": "/images/products/upanishads_book.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_book_6",
    "name": "Devi Mahatmyam / Durga Saptashati Hardbound Temple Book",
    "slug": "devi-mahatmyam-durga-saptashati-hardbound",
    "description": "700 verses of Durga Saptashati with Argala, Kilaka & Kavacham for Navratri patha.",
    "shortDescription": "Hardbound Durga Saptashati for sacred Navratri chanting.",
    "price": 499,
    "originalPrice": 649,
    "discountPercentage": 23,
    "rating": 4.9,
    "reviewCount": 310,
    "stock": 70,
    "category": "Books",
    "brand": "Gita Press Heritage",
    "thumbnail": "/images/products/durga_saptashati_book.jpg",
    "images": [
      "/images/products/durga_saptashati_book.jpg"
    ],
    "tags": [
      "books"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Gita Press Heritage"
    ],
    "vendor": {
      "id": "ven_4",
      "name": "Sacred Veda Publications",
      "logo": "/images/products/durga_saptashati_book.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_book_7",
    "name": "Patanjali Yoga Sutras & Vedic Philosophy Guide",
    "slug": "patanjali-yoga-sutras-vedic-philosophy-guide",
    "description": "Ashtanga Yoga sutras of Maharishi Patanjali with Sanskrit verses & meditation commentary.",
    "shortDescription": "Maharishi Patanjali Yoga Sutras & Ashtanga meditation guide.",
    "price": 599,
    "originalPrice": 749,
    "discountPercentage": 20,
    "rating": 4.8,
    "reviewCount": 160,
    "stock": 50,
    "category": "Books",
    "brand": "Vedic Philosophy Press",
    "thumbnail": "/images/products/yoga_sutras_book.jpg",
    "images": [
      "/images/products/yoga_sutras_book.jpg"
    ],
    "tags": [
      "books"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Philosophy Press"
    ],
    "vendor": {
      "id": "ven_4",
      "name": "Sacred Veda Publications",
      "logo": "/images/products/yoga_sutras_book.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_book_8",
    "name": "Sacred Hanuman Chalisa & Sundarkand Pocket Leatherette Edition",
    "slug": "sacred-hanuman-chalisa-sundarkand-pocket-edition",
    "description": "Golden-gilt pocket leatherette book containing Hanuman Chalisa, Bajrang Baan & Sundarkand.",
    "shortDescription": "Pocket leatherette edition Hanuman Chalisa & Sundarkand.",
    "price": 299,
    "originalPrice": 399,
    "discountPercentage": 25,
    "rating": 5.0,
    "reviewCount": 620,
    "stock": 100,
    "category": "Books",
    "brand": "Sacred Veda Press",
    "thumbnail": "/images/products/hanuman_chalisa_pocket.jpg",
    "images": [
      "/images/products/hanuman_chalisa_pocket.jpg"
    ],
    "tags": [
      "books"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Sacred Veda Press"
    ],
    "vendor": {
      "id": "ven_4",
      "name": "Sacred Veda Publications",
      "logo": "/images/products/hanuman_chalisa_pocket.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_book_9",
    "name": "Complete Mahabharata Unabridged Translation Set",
    "slug": "complete-mahabharata-unabridged-translation-set",
    "description": "Grand 10-volume boxed set of Maharishi Vyasa Mahabharata translated into lucid prose.",
    "shortDescription": "10-Volume complete unabridged Vyasa Mahabharata set.",
    "price": 3999,
    "originalPrice": 4999,
    "discountPercentage": 20,
    "rating": 5.0,
    "reviewCount": 195,
    "stock": 15,
    "category": "Books",
    "brand": "Sacred Veda Press",
    "thumbnail": "/images/products/mahabharata_set.jpg",
    "images": [
      "/images/products/mahabharata_set.jpg"
    ],
    "tags": [
      "books"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Sacred Veda Press"
    ],
    "vendor": {
      "id": "ven_4",
      "name": "Sacred Veda Publications",
      "logo": "/images/products/mahabharata_set.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_book_10",
    "name": "Vedic Hymns & Suktam Recitation Guidebook",
    "slug": "vedic-hymns-suktam-recitation-guidebook",
    "description": "Purusha Suktam, Sri Suktam, Rudram & Chamakam with intonation swara markings.",
    "shortDescription": "Vedic Suktam recitation guide with Devanagari swara marks.",
    "price": 449,
    "originalPrice": 549,
    "discountPercentage": 18,
    "rating": 4.9,
    "reviewCount": 140,
    "stock": 45,
    "category": "Books",
    "brand": "Vedic Philosophy Press",
    "thumbnail": "/images/products/vedic_hymns_book.jpg",
    "images": [
      "/images/products/vedic_hymns_book.jpg"
    ],
    "tags": [
      "books"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Philosophy Press"
    ],
    "vendor": {
      "id": "ven_4",
      "name": "Sacred Veda Publications",
      "logo": "/images/products/vedic_hymns_book.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_yantra_1",
    "name": "Pure Copper Energized Sri Yantra Mandala Plate (6x6 Inch)",
    "slug": "pure-copper-energized-sri-yantra-mandala-plate",
    "description": "Precision-engraved 24K gold-plated pure copper Sri Yantra for prosperity and positive energy.",
    "shortDescription": "Energized 24K gold-plated copper Sri Yantra mandala plate.",
    "price": 1199,
    "originalPrice": 1499,
    "discountPercentage": 20,
    "rating": 4.9,
    "reviewCount": 280,
    "stock": 40,
    "category": "Yantra",
    "brand": "Vedic Yantra Kendra",
    "thumbnail": "/images/products/copper_sri_yantra.jpg",
    "images": [
      "/images/products/copper_sri_yantra.jpg"
    ],
    "tags": [
      "yantra"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Yantra Kendra"
    ],
    "vendor": {
      "id": "ven_5",
      "name": "Divine Yantra Arts",
      "logo": "/images/products/copper_sri_yantra.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_yantra_2",
    "name": "24K Gold-Plated Meru Prishta 3D Sri Yantra Idol",
    "slug": "24k-gold-plated-meru-prishta-3d-sri-yantra-idol",
    "description": "3D pyramid Meru Sri Yantra cast in solid brass with heavy 24K gold electroplating.",
    "shortDescription": "3D Meru Sri Yantra pyramid idol in 24K gold plating.",
    "price": 2999,
    "originalPrice": 3799,
    "discountPercentage": 21,
    "rating": 5.0,
    "reviewCount": 190,
    "stock": 20,
    "category": "Yantra",
    "brand": "Vedic Yantra Kendra",
    "thumbnail": "/images/products/3d_meru_sri_yantra.jpg",
    "images": [
      "/images/products/3d_meru_sri_yantra.jpg"
    ],
    "tags": [
      "yantra"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Yantra Kendra"
    ],
    "vendor": {
      "id": "ven_5",
      "name": "Divine Yantra Arts",
      "logo": "/images/products/3d_meru_sri_yantra.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_yantra_3",
    "name": "Sacred Kuber Yantra for Financial Wealth & Prosperity",
    "slug": "sacred-kuber-yantra-for-financial-wealth",
    "description": "Lord Kuber energised magic square yantra etched on heavy brass plate.",
    "shortDescription": "Energized Lord Kuber yantra plate for wealth & abundance.",
    "price": 899,
    "originalPrice": 1199,
    "discountPercentage": 25,
    "rating": 4.8,
    "reviewCount": 310,
    "stock": 50,
    "category": "Yantra",
    "brand": "Vedic Yantra Kendra",
    "thumbnail": "/images/products/kuber_yantra.jpg",
    "images": [
      "/images/products/kuber_yantra.jpg"
    ],
    "tags": [
      "yantra"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Yantra Kendra"
    ],
    "vendor": {
      "id": "ven_5",
      "name": "Divine Yantra Arts",
      "logo": "/images/products/kuber_yantra.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_yantra_4",
    "name": "Heavy Pure Silver Engraved Mahamrityunjaya Yantra",
    "slug": "heavy-pure-silver-engraved-mahamrityunjaya-yantra",
    "description": "Pure 999 silver foil Yantra of Lord Shiva Mahamrityunjaya for health & longevity.",
    "shortDescription": "999 pure silver Mahamrityunjaya Yantra plate for wellness.",
    "price": 1899,
    "originalPrice": 2399,
    "discountPercentage": 20,
    "rating": 4.9,
    "reviewCount": 160,
    "stock": 25,
    "category": "Yantra",
    "brand": "Vedic Yantra Kendra",
    "thumbnail": "/images/products/mahamrityunjaya_yantra.jpg",
    "images": [
      "/images/products/mahamrityunjaya_yantra.jpg"
    ],
    "tags": [
      "yantra"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Yantra Kendra"
    ],
    "vendor": {
      "id": "ven_5",
      "name": "Divine Yantra Arts",
      "logo": "/images/products/mahamrityunjaya_yantra.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_yantra_5",
    "name": "24K Gold Foil Framed Surya Yantra for Vitality & Success",
    "slug": "24k-gold-foil-framed-surya-yantra",
    "description": "Sun God Surya Yantra with geometric rays embossed in pure gold foil with wooden frame.",
    "shortDescription": "Framed 24K gold foil Surya Yantra for leadership & vitality.",
    "price": 1299,
    "originalPrice": 1599,
    "discountPercentage": 18,
    "rating": 4.9,
    "reviewCount": 140,
    "stock": 35,
    "category": "Yantra",
    "brand": "Vedic Yantra Kendra",
    "thumbnail": "/images/products/surya_yantra.jpg",
    "images": [
      "/images/products/surya_yantra.jpg"
    ],
    "tags": [
      "yantra"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Yantra Kendra"
    ],
    "vendor": {
      "id": "ven_5",
      "name": "Divine Yantra Arts",
      "logo": "/images/products/surya_yantra.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_yantra_6",
    "name": "Energized Saraswati Yantra Plate for Education & Wisdom",
    "slug": "energized-saraswati-yantra-plate",
    "description": "Goddess Saraswati Yantra plate for enhancement of memory, arts, knowledge and exams.",
    "shortDescription": "Goddess Saraswati Yantra plate for academic success.",
    "price": 799,
    "originalPrice": 999,
    "discountPercentage": 20,
    "rating": 4.8,
    "reviewCount": 220,
    "stock": 60,
    "category": "Yantra",
    "brand": "Vedic Yantra Kendra",
    "thumbnail": "/images/products/saraswati_yantra.jpg",
    "images": [
      "/images/products/saraswati_yantra.jpg"
    ],
    "tags": [
      "yantra"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Yantra Kendra"
    ],
    "vendor": {
      "id": "ven_5",
      "name": "Divine Yantra Arts",
      "logo": "/images/products/saraswati_yantra.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_yantra_7",
    "name": "Solid Brass Gayatri Yantra Wall Hanging Plaque",
    "slug": "solid-brass-gayatri-yantra-wall-hanging-plaque",
    "description": "Heavy brass Gayatri Veda Yantra plaque with hanging chain for home altar.",
    "shortDescription": "Solid brass Gayatri Yantra wall hanging plaque.",
    "price": 1499,
    "originalPrice": 1899,
    "discountPercentage": 21,
    "rating": 4.9,
    "reviewCount": 130,
    "stock": 30,
    "category": "Yantra",
    "brand": "Vedic Yantra Kendra",
    "thumbnail": "/images/products/gayatri_yantra_plaque.jpg",
    "images": [
      "/images/products/gayatri_yantra_plaque.jpg"
    ],
    "tags": [
      "yantra"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Yantra Kendra"
    ],
    "vendor": {
      "id": "ven_5",
      "name": "Divine Yantra Arts",
      "logo": "/images/products/gayatri_yantra_plaque.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_yantra_8",
    "name": "Pure Copper Navagraha 9 Planets Yantra Grid Plate",
    "slug": "pure-copper-navagraha-9-planets-yantra-grid-plate",
    "description": "Complete 9-in-1 Navagraha planet yantra grid engraved on pure copper sheet.",
    "shortDescription": "9 Planets Navagraha yantra grid plate on pure copper.",
    "price": 1599,
    "originalPrice": 1999,
    "discountPercentage": 20,
    "rating": 4.9,
    "reviewCount": 270,
    "stock": 25,
    "category": "Yantra",
    "brand": "Vedic Yantra Kendra",
    "thumbnail": "/images/products/navagraha_yantra_grid.jpg",
    "images": [
      "/images/products/navagraha_yantra_grid.jpg"
    ],
    "tags": [
      "yantra"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Yantra Kendra"
    ],
    "vendor": {
      "id": "ven_5",
      "name": "Divine Yantra Arts",
      "logo": "/images/products/navagraha_yantra_grid.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_yantra_9",
    "name": "Energized Karya Siddhi Yantra for Goal Fulfillment",
    "slug": "energized-karya-siddhi-yantra-for-goal-fulfillment",
    "description": "Multi-circle Karya Siddhi Yantra designed for success in business, ventures & desires.",
    "shortDescription": "Karya Siddhi Yantra plate for task & goal fulfillment.",
    "price": 999,
    "originalPrice": 1299,
    "discountPercentage": 23,
    "rating": 4.8,
    "reviewCount": 180,
    "stock": 45,
    "category": "Yantra",
    "brand": "Vedic Yantra Kendra",
    "thumbnail": "/images/products/karya_siddhi_yantra.jpg",
    "images": [
      "/images/products/karya_siddhi_yantra.jpg"
    ],
    "tags": [
      "yantra"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Yantra Kendra"
    ],
    "vendor": {
      "id": "ven_5",
      "name": "Divine Yantra Arts",
      "logo": "/images/products/karya_siddhi_yantra.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_yantra_10",
    "name": "24K Gold Plated Vastu Dosh Nivaran Yantra",
    "slug": "24k-gold-plated-vastu-dosh-nivaran-yantra",
    "description": "Vastu Dosh remedy yantra for harmonizing directional energies in home & workplace.",
    "shortDescription": "24K Gold plated Vastu Dosh remedy yantra for home.",
    "price": 1099,
    "originalPrice": 1399,
    "discountPercentage": 21,
    "rating": 4.9,
    "reviewCount": 205,
    "stock": 35,
    "category": "Yantra",
    "brand": "Vedic Yantra Kendra",
    "thumbnail": "/images/products/vastu_dosh_yantra.jpg",
    "images": [
      "/images/products/vastu_dosh_yantra.jpg"
    ],
    "tags": [
      "yantra"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Yantra Kendra"
    ],
    "vendor": {
      "id": "ven_5",
      "name": "Divine Yantra Arts",
      "logo": "/images/products/vastu_dosh_yantra.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_incense_1",
    "name": "Pure Mysore Sandalwood Dhoop Cones (Pack of 3)",
    "slug": "pure-mysore-sandalwood-dhoop-cones",
    "description": "Handcrafted charcoal-free dhoop cones made from pure Mysore Sandalwood powder.",
    "shortDescription": "Charcoal-free aromatic Mysore Sandalwood dhoop cones.",
    "price": 399,
    "originalPrice": 499,
    "discountPercentage": 20,
    "rating": 4.9,
    "reviewCount": 340,
    "stock": 90,
    "category": "Incense & Dhoop",
    "brand": "Sugandh Veda",
    "thumbnail": "/images/products/sandalwood_dhoop_cones.jpg",
    "images": [
      "/images/products/sandalwood_dhoop_cones.jpg"
    ],
    "tags": [
      "incense & dhoop"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Sugandh Veda"
    ],
    "vendor": {
      "id": "ven_6",
      "name": "Sugandh Fragrance Studio",
      "logo": "/images/products/sandalwood_dhoop_cones.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_incense_2",
    "name": "Temple Grade Organic Loban & Sambrani Dhoop Cups (Pack of 24)",
    "slug": "temple-grade-organic-loban-sambrani-dhoop-cups",
    "description": "Ready-to-burn natural cow dung dhoop cups filled with pure Loban & Benzoin resin.",
    "shortDescription": "Organic Loban & Sambrani dhoop cups for temple atmosphere.",
    "price": 499,
    "originalPrice": 649,
    "discountPercentage": 23,
    "rating": 4.9,
    "reviewCount": 280,
    "stock": 80,
    "category": "Incense & Dhoop",
    "brand": "Sugandh Veda",
    "thumbnail": "/images/products/sambrani_dhoop_cups.jpg",
    "images": [
      "/images/products/sambrani_dhoop_cups.jpg"
    ],
    "tags": [
      "incense & dhoop"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Sugandh Veda"
    ],
    "vendor": {
      "id": "ven_6",
      "name": "Sugandh Fragrance Studio",
      "logo": "/images/products/sambrani_dhoop_cups.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_incense_3",
    "name": "Pure Natural Kasturi Musk Incense Sticks (100 Sticks)",
    "slug": "pure-natural-kasturi-musk-incense-sticks",
    "description": "Slow-burning natural herbal incense sticks with rich Kasturi musk fragrance.",
    "shortDescription": "100-pack organic Kasturi musk aromatic agarbatti.",
    "price": 349,
    "originalPrice": 449,
    "discountPercentage": 22,
    "rating": 4.8,
    "reviewCount": 210,
    "stock": 100,
    "category": "Incense & Dhoop",
    "brand": "Sugandh Veda",
    "thumbnail": "/images/products/kasturi_incense_sticks.jpg",
    "images": [
      "/images/products/kasturi_incense_sticks.jpg"
    ],
    "tags": [
      "incense & dhoop"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Sugandh Veda"
    ],
    "vendor": {
      "id": "ven_6",
      "name": "Sugandh Fragrance Studio",
      "logo": "/images/products/kasturi_incense_sticks.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_incense_4",
    "name": "Traditional Charcoal-Free Guggal Dhoop Sticks (Pack of 4)",
    "slug": "traditional-charcoal-free-guggal-dhoop-sticks",
    "description": "Pure Commiphora mukul (Guggal) gum resin dhoop sticks for air purification.",
    "shortDescription": "Charcoal-free natural Guggal dhoop sticks 4-pack.",
    "price": 399,
    "originalPrice": 499,
    "discountPercentage": 20,
    "rating": 4.8,
    "reviewCount": 190,
    "stock": 75,
    "category": "Incense & Dhoop",
    "brand": "Sugandh Veda",
    "thumbnail": "/images/products/guggal_dhoop_sticks.jpg",
    "images": [
      "/images/products/guggal_dhoop_sticks.jpg"
    ],
    "tags": [
      "incense & dhoop"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Sugandh Veda"
    ],
    "vendor": {
      "id": "ven_6",
      "name": "Sugandh Fragrance Studio",
      "logo": "/images/products/guggal_dhoop_sticks.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_incense_5",
    "name": "Sacred Tulsi & Neem Herbal Incense Sticks",
    "slug": "sacred-tulsi-neem-herbal-incense-sticks",
    "description": "Hand-rolled incense infused with holy basil (Tulsi) leaves and pure Neem extract.",
    "shortDescription": "Natural Tulsi & Neem purifying herbal agarbatti.",
    "price": 299,
    "originalPrice": 399,
    "discountPercentage": 25,
    "rating": 4.8,
    "reviewCount": 260,
    "stock": 110,
    "category": "Incense & Dhoop",
    "brand": "Sugandh Veda",
    "thumbnail": "/images/products/tulsi_neem_incense.jpg",
    "images": [
      "/images/products/tulsi_neem_incense.jpg"
    ],
    "tags": [
      "incense & dhoop"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Sugandh Veda"
    ],
    "vendor": {
      "id": "ven_6",
      "name": "Sugandh Fragrance Studio",
      "logo": "/images/products/tulsi_neem_incense.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_incense_6",
    "name": "Hand-Rolled Nag Champa Floral Agarbatti",
    "slug": "hand-rolled-nag-champa-floral-agarbatti",
    "description": "Authentic Plumeria & Halmaddi resin Nag Champa agarbatti for meditation and yoga.",
    "shortDescription": "Authentic hand-rolled Nag Champa floral incense sticks.",
    "price": 329,
    "originalPrice": 429,
    "discountPercentage": 23,
    "rating": 4.9,
    "reviewCount": 380,
    "stock": 95,
    "category": "Incense & Dhoop",
    "brand": "Sugandh Veda",
    "thumbnail": "/images/products/nag_champa_agarbatti.jpg",
    "images": [
      "/images/products/nag_champa_agarbatti.jpg"
    ],
    "tags": [
      "incense & dhoop"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Sugandh Veda"
    ],
    "vendor": {
      "id": "ven_6",
      "name": "Sugandh Fragrance Studio",
      "logo": "/images/products/nag_champa_agarbatti.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_incense_7",
    "name": "Organic Kesar Chandan Aromatic Dhoop Sticks",
    "slug": "organic-kesar-chandan-aromatic-dhoop-sticks",
    "description": "Thick bamboo-less dhoop sticks with rich saffron Kesar and sandalwood fragrance.",
    "shortDescription": "Bamboo-less Kesar Chandan aromatic dhoop sticks.",
    "price": 429,
    "originalPrice": 549,
    "discountPercentage": 21,
    "rating": 4.9,
    "reviewCount": 220,
    "stock": 70,
    "category": "Incense & Dhoop",
    "brand": "Sugandh Veda",
    "thumbnail": "/images/products/kesar_chandan_dhoop.jpg",
    "images": [
      "/images/products/kesar_chandan_dhoop.jpg"
    ],
    "tags": [
      "incense & dhoop"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Sugandh Veda"
    ],
    "vendor": {
      "id": "ven_6",
      "name": "Sugandh Fragrance Studio",
      "logo": "/images/products/kesar_chandan_dhoop.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_incense_8",
    "name": "Himalayan Cedarwood & Frankincense Incense Cones",
    "slug": "himalayan-cedarwood-frankincense-incense-cones",
    "description": "Aromatic cones crafted from Deodar cedarwood oil and frankincense Olibanum resin.",
    "shortDescription": "Himalayan Cedarwood & Frankincense dhoop cones.",
    "price": 379,
    "originalPrice": 479,
    "discountPercentage": 20,
    "rating": 4.8,
    "reviewCount": 150,
    "stock": 85,
    "category": "Incense & Dhoop",
    "brand": "Sugandh Veda",
    "thumbnail": "/images/products/cedarwood_incense_cones.jpg",
    "images": [
      "/images/products/cedarwood_incense_cones.jpg"
    ],
    "tags": [
      "incense & dhoop"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Sugandh Veda"
    ],
    "vendor": {
      "id": "ven_6",
      "name": "Sugandh Fragrance Studio",
      "logo": "/images/products/cedarwood_incense_cones.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_incense_9",
    "name": "Natural Rose & Camphor Temple Incense Pack",
    "slug": "natural-rose-camphor-temple-incense-pack",
    "description": "Fragrant agarbatti made from recycled sacred temple rose petals and pure camphor.",
    "shortDescription": "Temple rose petal & camphor natural incense sticks.",
    "price": 289,
    "originalPrice": 379,
    "discountPercentage": 23,
    "rating": 4.8,
    "reviewCount": 290,
    "stock": 120,
    "category": "Incense & Dhoop",
    "brand": "Sugandh Veda",
    "thumbnail": "/images/products/rose_camphor_incense.jpg",
    "images": [
      "/images/products/rose_camphor_incense.jpg"
    ],
    "tags": [
      "incense & dhoop"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Sugandh Veda"
    ],
    "vendor": {
      "id": "ven_6",
      "name": "Sugandh Fragrance Studio",
      "logo": "/images/products/rose_camphor_incense.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_incense_10",
    "name": "Premium Brass Waterfall Backflow Incense Burner with 50 Cones",
    "slug": "premium-brass-waterfall-backflow-incense-burner",
    "description": "Ornamental Ganesha backflow smoke fountain burner with 50 fragrant backflow cones.",
    "shortDescription": "Ganesha backflow incense fountain burner with 50 cones.",
    "price": 699,
    "originalPrice": 899,
    "discountPercentage": 22,
    "rating": 4.9,
    "reviewCount": 430,
    "stock": 50,
    "category": "Incense & Dhoop",
    "brand": "Sugandh Veda",
    "thumbnail": "/images/products/waterfall_incense_burner.jpg",
    "images": [
      "/images/products/waterfall_incense_burner.jpg"
    ],
    "tags": [
      "incense & dhoop"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Sugandh Veda"
    ],
    "vendor": {
      "id": "ven_6",
      "name": "Sugandh Fragrance Studio",
      "logo": "/images/products/waterfall_incense_burner.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_ayur_1",
    "name": "Pure Saffron Sandalwood Chandan Paste (100g)",
    "slug": "pure-saffron-sandalwood-chandan-paste",
    "description": "Authentic temple-grade sandalwood paste infused with pure Kashmir saffron for daily tilak.",
    "shortDescription": "Sacred Chandan & Kesar paste for daily temple tilak.",
    "price": 499,
    "originalPrice": 650,
    "discountPercentage": 23,
    "rating": 4.9,
    "reviewCount": 310,
    "stock": 70,
    "category": "Ayurveda",
    "brand": "Vedic Ayurveda",
    "thumbnail": "/images/products/saffron_chandan_paste.jpg",
    "images": [
      "/images/products/saffron_chandan_paste.jpg"
    ],
    "tags": [
      "ayurveda"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Ayurveda"
    ],
    "vendor": {
      "id": "ven_7",
      "name": "Vedic Herbals & Oils",
      "logo": "/images/products/saffron_chandan_paste.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_ayur_2",
    "name": "Organic Kashmiri Saffron Kesar Threads (5 Grams)",
    "slug": "organic-kashmiri-saffron-kesar-threads-5g",
    "description": "Grade-1 Mongra Kashmiri saffron strands harvested from Pampore fields for health & rituals.",
    "shortDescription": "Pure Grade-1 Kashmiri Mongra Kesar saffron 5g jar.",
    "price": 1499,
    "originalPrice": 1899,
    "discountPercentage": 21,
    "rating": 5.0,
    "reviewCount": 270,
    "stock": 40,
    "category": "Ayurveda",
    "brand": "Kashmir Organics",
    "thumbnail": "/images/products/kashmiri_kesar_threads.jpg",
    "images": [
      "/images/products/kashmiri_kesar_threads.jpg"
    ],
    "tags": [
      "ayurveda"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Kashmir Organics"
    ],
    "vendor": {
      "id": "ven_7",
      "name": "Vedic Herbals & Oils",
      "logo": "/images/products/kashmiri_kesar_threads.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_ayur_3",
    "name": "Authentic Kumkumadi Tailam Radiant Facial Oil (30ml)",
    "slug": "authentic-kumkumadi-tailam-radiant-facial-oil",
    "description": "Ayurvedic formulation of 26 herbs with saffron & lotus for glowing complexions.",
    "shortDescription": "Pure Ayurvedic Kumkumadi Tailam facial radiance oil.",
    "price": 999,
    "originalPrice": 1299,
    "discountPercentage": 23,
    "rating": 4.9,
    "reviewCount": 390,
    "stock": 55,
    "category": "Ayurveda",
    "brand": "Vedic Ayurveda",
    "thumbnail": "/images/products/kumkumadi_tailam.jpg",
    "images": [
      "/images/products/kumkumadi_tailam.jpg"
    ],
    "tags": [
      "ayurveda"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Ayurveda"
    ],
    "vendor": {
      "id": "ven_7",
      "name": "Vedic Herbals & Oils",
      "logo": "/images/products/kumkumadi_tailam.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_ayur_4",
    "name": "Organic Himalayan Shilajit Resin (50g Jar)",
    "slug": "organic-himalayan-shilajit-resin-50g",
    "description": "Purified Gold Grade Himalayan Shilajit rich in 84+ minerals and fulvic acid.",
    "shortDescription": "100% Pure Gold Grade Himalayan Shilajit resin 50g.",
    "price": 1299,
    "originalPrice": 1699,
    "discountPercentage": 23,
    "rating": 4.9,
    "reviewCount": 480,
    "stock": 45,
    "category": "Ayurveda",
    "brand": "Himalaya Herbals",
    "thumbnail": "/images/products/himalayan_shilajit.jpg",
    "images": [
      "/images/products/himalayan_shilajit.jpg"
    ],
    "tags": [
      "ayurveda"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Himalaya Herbals"
    ],
    "vendor": {
      "id": "ven_7",
      "name": "Vedic Herbals & Oils",
      "logo": "/images/products/himalayan_shilajit.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_ayur_5",
    "name": "Pure Cold-Pressed Sesame Til Oil for Temple Abhishekam (1 Litre)",
    "slug": "pure-cold-pressed-sesame-til-oil-1l",
    "description": "Traditional wooden ghani cold-pressed black sesame oil for temple lamps and abhishekam.",
    "shortDescription": "100% pure cold-pressed sesame til oil 1 Litre bottle.",
    "price": 449,
    "originalPrice": 549,
    "discountPercentage": 18,
    "rating": 4.8,
    "reviewCount": 210,
    "stock": 85,
    "category": "Ayurveda",
    "brand": "Vedic Ayurveda",
    "thumbnail": "/images/products/sesame_til_oil.jpg",
    "images": [
      "/images/products/sesame_til_oil.jpg"
    ],
    "tags": [
      "ayurveda"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Ayurveda"
    ],
    "vendor": {
      "id": "ven_7",
      "name": "Vedic Herbals & Oils",
      "logo": "/images/products/sesame_til_oil.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_ayur_6",
    "name": "Natural Ashwagandha & Shatavari Immunity Rasayana (500g)",
    "slug": "natural-ashwagandha-shatavari-immunity-rasayana",
    "description": "Rejuvenating Ayurvedic jam prepared with organic Ashwagandha roots, Shatavari and wild honey.",
    "shortDescription": "Rejuvenating Ashwagandha & Shatavari immunity jam.",
    "price": 699,
    "originalPrice": 899,
    "discountPercentage": 22,
    "rating": 4.9,
    "reviewCount": 180,
    "stock": 60,
    "category": "Ayurveda",
    "brand": "Vedic Ayurveda",
    "thumbnail": "/images/products/ashwagandha_rasayana.jpg",
    "images": [
      "/images/products/ashwagandha_rasayana.jpg"
    ],
    "tags": [
      "ayurveda"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Ayurveda"
    ],
    "vendor": {
      "id": "ven_7",
      "name": "Vedic Herbals & Oils",
      "logo": "/images/products/ashwagandha_rasayana.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_ayur_7",
    "name": "Sacred Panchagavya Organic Ghrita / Ghee for Puja Lamps (500g)",
    "slug": "sacred-panchagavya-organic-ghee-500g",
    "description": "Desi Gir Cow A2 bilona ghee produced according to Panchagavya rituals.",
    "shortDescription": "Desi Gir Cow A2 Bilona Ghee 500g for temple diyas.",
    "price": 599,
    "originalPrice": 799,
    "discountPercentage": 25,
    "rating": 5.0,
    "reviewCount": 340,
    "stock": 90,
    "category": "Ayurveda",
    "brand": "Gir Gaushala",
    "thumbnail": "/images/products/panchagavya_ghee.jpg",
    "images": [
      "/images/products/panchagavya_ghee.jpg"
    ],
    "tags": [
      "ayurveda"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Gir Gaushala"
    ],
    "vendor": {
      "id": "ven_7",
      "name": "Vedic Herbals & Oils",
      "logo": "/images/products/panchagavya_ghee.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_ayur_8",
    "name": "Traditional Herbal Bhringraj Hair Nourishing Oil (200ml)",
    "slug": "traditional-herbal-bhringraj-hair-nourishing-oil",
    "description": "Authentic Kshirapak method hair oil made with Bhringraj, Amla and Sesame oil.",
    "shortDescription": "Kshirapak Bhringraj & Amla herbal hair oil 200ml.",
    "price": 399,
    "originalPrice": 499,
    "discountPercentage": 20,
    "rating": 4.8,
    "reviewCount": 290,
    "stock": 75,
    "category": "Ayurveda",
    "brand": "Vedic Ayurveda",
    "thumbnail": "/images/products/bhringraj_hair_oil.jpg",
    "images": [
      "/images/products/bhringraj_hair_oil.jpg"
    ],
    "tags": [
      "ayurveda"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Ayurveda"
    ],
    "vendor": {
      "id": "ven_7",
      "name": "Vedic Herbals & Oils",
      "logo": "/images/products/bhringraj_hair_oil.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_ayur_9",
    "name": "Organic Chyawanprash with Gold Leaf & Wild Honey (1kg)",
    "slug": "organic-chyawanprash-with-gold-leaf-1kg",
    "description": "Special Swarna Bhasma (Gold Leaf) enriched Chyawanprash made with fresh organic Amla.",
    "shortDescription": "Gold Leaf Swarna Bhasma Chyawanprash 1kg jar.",
    "price": 899,
    "originalPrice": 1199,
    "discountPercentage": 25,
    "rating": 4.9,
    "reviewCount": 310,
    "stock": 50,
    "category": "Ayurveda",
    "brand": "Vedic Ayurveda",
    "thumbnail": "/images/products/chyawanprash_gold.jpg",
    "images": [
      "/images/products/chyawanprash_gold.jpg"
    ],
    "tags": [
      "ayurveda"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Ayurveda"
    ],
    "vendor": {
      "id": "ven_7",
      "name": "Vedic Herbals & Oils",
      "logo": "/images/products/chyawanprash_gold.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_ayur_10",
    "name": "Pure Himalayan Brahmi Memory & Concentration Syrup (300ml)",
    "slug": "pure-himalayan-brahmi-memory-syrup",
    "description": "Herbal brain tonic formulated with Bacopa monnieri (Brahmi), Shankhpushpi and Gotu Kola.",
    "shortDescription": "Natural Brahmi & Shankhpushpi brain memory syrup.",
    "price": 349,
    "originalPrice": 449,
    "discountPercentage": 22,
    "rating": 4.8,
    "reviewCount": 160,
    "stock": 65,
    "category": "Ayurveda",
    "brand": "Vedic Ayurveda",
    "thumbnail": "/images/products/brahmi_memory_syrup.jpg",
    "images": [
      "/images/products/brahmi_memory_syrup.jpg"
    ],
    "tags": [
      "ayurveda"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Ayurveda"
    ],
    "vendor": {
      "id": "ven_7",
      "name": "Vedic Herbals & Oils",
      "logo": "/images/products/brahmi_memory_syrup.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_gift_1",
    "name": "Handcrafted Minakari Wooden Return Gift Box Set",
    "slug": "handcrafted-minakari-wooden-return-gift-box-set",
    "description": "Elegant handcrafted wooden return gift box decorated with traditional peacock Minakari artwork.",
    "shortDescription": "Traditional Minakari wooden box for auspicious return gifts.",
    "price": 799,
    "originalPrice": 999,
    "discountPercentage": 20,
    "rating": 4.9,
    "reviewCount": 210,
    "stock": 50,
    "category": "Return Gifts",
    "brand": "Kanchi Gift Gallery",
    "thumbnail": "/images/products/minakari_gift_box.jpg",
    "images": [
      "/images/products/minakari_gift_box.jpg"
    ],
    "tags": [
      "return gifts"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Kanchi Gift Gallery"
    ],
    "vendor": {
      "id": "ven_8",
      "name": "Kanchi Utsav Gifts",
      "logo": "/images/products/minakari_gift_box.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_gift_2",
    "name": "Ornate Silver Plated Peacock Coin Dish with Gift Box",
    "slug": "ornate-silver-plated-peacock-coin-dish",
    "description": "Silver-plated peacock shape coin bowl presented in royal velvet gift packaging.",
    "shortDescription": "Silver-plated peacock coin bowl in velvet gift box.",
    "price": 499,
    "originalPrice": 649,
    "discountPercentage": 23,
    "rating": 4.8,
    "reviewCount": 180,
    "stock": 80,
    "category": "Return Gifts",
    "brand": "Kanchi Gift Gallery",
    "thumbnail": "/images/products/silver_peacock_dish.jpg",
    "images": [
      "/images/products/silver_peacock_dish.jpg"
    ],
    "tags": [
      "return gifts"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Kanchi Gift Gallery"
    ],
    "vendor": {
      "id": "ven_8",
      "name": "Kanchi Utsav Gifts",
      "logo": "/images/products/silver_peacock_dish.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_gift_3",
    "name": "Brass Diya in Velvet Gift Presentation Box (Pack of 2)",
    "slug": "brass-diya-in-velvet-gift-presentation-box",
    "description": "Pair of polished oil diyas presented in silk lined velvet gift box for wedding returns.",
    "shortDescription": "Pair of brass diyas in velvet gift box for functions.",
    "price": 649,
    "originalPrice": 799,
    "discountPercentage": 18,
    "rating": 4.9,
    "reviewCount": 160,
    "stock": 60,
    "category": "Return Gifts",
    "brand": "Kanchi Gift Gallery",
    "thumbnail": "/images/products/brass_diya_velvet_box.jpg",
    "images": [
      "/images/products/brass_diya_velvet_box.jpg"
    ],
    "tags": [
      "return gifts"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Kanchi Gift Gallery"
    ],
    "vendor": {
      "id": "ven_8",
      "name": "Kanchi Utsav Gifts",
      "logo": "/images/products/brass_diya_velvet_box.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_gift_4",
    "name": "Handpainted Wooden Kumkum & Haldi Box Container",
    "slug": "handpainted-wooden-kumkum-haldi-box-container",
    "description": "Dual compartment handpainted wooden box for haldi & kumkum offering during pujas.",
    "shortDescription": "Handpainted dual wooden Haldi Kumkum box container.",
    "price": 349,
    "originalPrice": 449,
    "discountPercentage": 22,
    "rating": 4.8,
    "reviewCount": 240,
    "stock": 90,
    "category": "Return Gifts",
    "brand": "Kanchi Gift Gallery",
    "thumbnail": "/images/products/wooden_haldi_kumkum.jpg",
    "images": [
      "/images/products/wooden_haldi_kumkum.jpg"
    ],
    "tags": [
      "return gifts"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Kanchi Gift Gallery"
    ],
    "vendor": {
      "id": "ven_8",
      "name": "Kanchi Utsav Gifts",
      "logo": "/images/products/wooden_haldi_kumkum.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_gift_5",
    "name": "Decorative Brass Ganesha Wall Hanging Bell Return Gift",
    "slug": "decorative-brass-ganesha-wall-hanging-bell",
    "description": "Carved brass Ganesha wall plaque with ringing temple bell charm.",
    "shortDescription": "Carved brass Ganesha wall hanging bell plaque.",
    "price": 599,
    "originalPrice": 749,
    "discountPercentage": 20,
    "rating": 4.9,
    "reviewCount": 190,
    "stock": 70,
    "category": "Return Gifts",
    "brand": "Kanchi Gift Gallery",
    "thumbnail": "/images/products/brass_ganesha_hanging.jpg",
    "images": [
      "/images/products/brass_ganesha_hanging.jpg"
    ],
    "tags": [
      "return gifts"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Kanchi Gift Gallery"
    ],
    "vendor": {
      "id": "ven_8",
      "name": "Kanchi Utsav Gifts",
      "logo": "/images/products/brass_ganesha_hanging.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_gift_6",
    "name": "Gold-Plated Laxmi Ganesha Coin Set in Acrylic Frame",
    "slug": "gold-plated-laxmi-ganesha-coin-set-in-acrylic-frame",
    "description": "Auspicious 24K gold foil Laxmi Ganesha coin preserved inside transparent acrylic stand.",
    "shortDescription": "24K Gold foil Laxmi Ganesha coin in acrylic stand frame.",
    "price": 399,
    "originalPrice": 499,
    "discountPercentage": 20,
    "rating": 4.8,
    "reviewCount": 310,
    "stock": 110,
    "category": "Return Gifts",
    "brand": "Kanchi Gift Gallery",
    "thumbnail": "/images/products/gold_laxmi_ganesha_frame.jpg",
    "images": [
      "/images/products/gold_laxmi_ganesha_frame.jpg"
    ],
    "tags": [
      "return gifts"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Kanchi Gift Gallery"
    ],
    "vendor": {
      "id": "ven_8",
      "name": "Kanchi Utsav Gifts",
      "logo": "/images/products/gold_laxmi_ganesha_frame.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_gift_7",
    "name": "Hand-Embroidered Silk Potli Gift Bags (Set of 5)",
    "slug": "hand-embroidered-silk-potli-gift-bags-set-of-5",
    "description": "Raw silk drawstring potli pouches decorated with zari embroidery & tassels.",
    "shortDescription": "5-pack hand-embroidered raw silk potli gift bags.",
    "price": 449,
    "originalPrice": 599,
    "discountPercentage": 25,
    "rating": 4.9,
    "reviewCount": 270,
    "stock": 100,
    "category": "Return Gifts",
    "brand": "Kanchi Gift Gallery",
    "thumbnail": "/images/products/silk_potli_bags.jpg",
    "images": [
      "/images/products/silk_potli_bags.jpg"
    ],
    "tags": [
      "return gifts"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Kanchi Gift Gallery"
    ],
    "vendor": {
      "id": "ven_8",
      "name": "Kanchi Utsav Gifts",
      "logo": "/images/products/silk_potli_bags.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_gift_8",
    "name": "Carved Sandalwood Fragrance Fan with Royal Pouch",
    "slug": "carved-sandalwood-fragrance-fan-with-royal-pouch",
    "description": "Traditional hand-held folding fan intricately carved from Mysore sandalwood wood.",
    "shortDescription": "Aromatic Mysore Sandalwood folding fan with velvet pouch.",
    "price": 549,
    "originalPrice": 699,
    "discountPercentage": 21,
    "rating": 4.9,
    "reviewCount": 140,
    "stock": 45,
    "category": "Return Gifts",
    "brand": "Mysore Heritage",
    "thumbnail": "/images/products/sandalwood_carved_fan.jpg",
    "images": [
      "/images/products/sandalwood_carved_fan.jpg"
    ],
    "tags": [
      "return gifts"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Mysore Heritage"
    ],
    "vendor": {
      "id": "ven_8",
      "name": "Kanchi Utsav Gifts",
      "logo": "/images/products/sandalwood_carved_fan.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_gift_9",
    "name": "Silver-Plated Bowl Set with Tray for Housewarming Gifts",
    "slug": "silver-plated-bowl-set-with-tray",
    "description": "Two silver-plated velvet presentation bowls with matching serving tray & spoons.",
    "shortDescription": "Silver-plated twin bowl set with tray in velvet box.",
    "price": 999,
    "originalPrice": 1299,
    "discountPercentage": 23,
    "rating": 5.0,
    "reviewCount": 230,
    "stock": 40,
    "category": "Return Gifts",
    "brand": "Kanchi Gift Gallery",
    "thumbnail": "/images/products/silver_plated_bowls.jpg",
    "images": [
      "/images/products/silver_plated_bowls.jpg"
    ],
    "tags": [
      "return gifts"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Kanchi Gift Gallery"
    ],
    "vendor": {
      "id": "ven_8",
      "name": "Kanchi Utsav Gifts",
      "logo": "/images/products/silver_plated_bowls.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_gift_10",
    "name": "Minakari Work Decorative Brass Kalash Return Gift",
    "slug": "minakari-work-decorative-brass-kalash",
    "description": "Intricate peacock enamel Minakari work solid brass small Kalash pot for gift distribution.",
    "shortDescription": "Peacock Minakari enamel brass small Kalash return gift.",
    "price": 699,
    "originalPrice": 899,
    "discountPercentage": 22,
    "rating": 4.9,
    "reviewCount": 175,
    "stock": 55,
    "category": "Return Gifts",
    "brand": "Kanchi Gift Gallery",
    "thumbnail": "/images/products/minakari_brass_kalash.jpg",
    "images": [
      "/images/products/minakari_brass_kalash.jpg"
    ],
    "tags": [
      "return gifts"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Kanchi Gift Gallery"
    ],
    "vendor": {
      "id": "ven_8",
      "name": "Kanchi Utsav Gifts",
      "logo": "/images/products/minakari_brass_kalash.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_music_1",
    "name": "Sacred Vedic Chants & Rudram Audio Album CD / USB",
    "slug": "sacred-vedic-chants-rudram-audio-album",
    "description": "Authentic Vedic chanting including Sri Rudram, Chamakam & Suktams recorded by Kanchi Veda pathashala scholars.",
    "shortDescription": "High fidelity audio recordings of Sri Rudram & Sacred Vedic Chants.",
    "price": 599,
    "originalPrice": 799,
    "discountPercentage": 25,
    "rating": 5.0,
    "reviewCount": 340,
    "stock": 60,
    "category": "Music",
    "brand": "Vedic Sound Audio",
    "thumbnail": "/images/products/vedic_chants_album.jpg",
    "images": [
      "/images/products/vedic_chants_album.jpg"
    ],
    "tags": [
      "music"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Sound Audio"
    ],
    "vendor": {
      "id": "ven_9",
      "name": "Divine Sound & Music Studio",
      "logo": "/images/products/vedic_chants_album.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_music_2",
    "name": "Divine Morning Chants & Mantras (Gayatri, Mahamrityunjaya)",
    "slug": "divine-morning-chants-mantras",
    "description": "108 times recitation of Gayatri Mantra, Mahamrityunjaya Mantra & Vishnu Sahasranamam.",
    "shortDescription": "Divine morning japa chants of Gayatri & Mahamrityunjaya Mantras.",
    "price": 499,
    "originalPrice": 649,
    "discountPercentage": 23,
    "rating": 4.9,
    "reviewCount": 280,
    "stock": 70,
    "category": "Music",
    "brand": "Vedic Sound Audio",
    "thumbnail": "/images/products/morning_mantras_album.jpg",
    "images": [
      "/images/products/morning_mantras_album.jpg"
    ],
    "tags": [
      "music"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Sound Audio"
    ],
    "vendor": {
      "id": "ven_9",
      "name": "Divine Sound & Music Studio",
      "logo": "/images/products/morning_mantras_album.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_music_3",
    "name": "Shreemad Bhagavad Gita Full Recitation MP3 Audio Card",
    "slug": "shreemad-bhagavad-gita-full-recitation-mp3-audio-card",
    "description": "All 18 chapters of Bhagavad Gita recited with clear Sanskrit pronunciation and background tanpura.",
    "shortDescription": "Complete 18 Chapters Bhagavad Gita Sanskrit MP3 Audio Card.",
    "price": 699,
    "originalPrice": 899,
    "discountPercentage": 22,
    "rating": 5.0,
    "reviewCount": 410,
    "stock": 50,
    "category": "Music",
    "brand": "Vedic Sound Audio",
    "thumbnail": "/images/products/bhagavad_gita_card.jpg",
    "images": [
      "/images/products/bhagavad_gita_card.jpg"
    ],
    "tags": [
      "music"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Sound Audio"
    ],
    "vendor": {
      "id": "ven_9",
      "name": "Divine Sound & Music Studio",
      "logo": "/images/products/bhagavad_gita_card.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_music_4",
    "name": "Traditional Temple Shehnai & Nadaswaram Instrumental Audio",
    "slug": "traditional-temple-shehnai-nadaswaram-instrumental",
    "description": "Auspicious Mangala Isai Nadaswaram & Shehnai instrumental ragas played for temple festivities.",
    "shortDescription": "Auspicious temple Nadaswaram & Shehnai instrumental music.",
    "price": 399,
    "originalPrice": 499,
    "discountPercentage": 20,
    "rating": 4.9,
    "reviewCount": 190,
    "stock": 40,
    "category": "Music",
    "brand": "Vedic Sound Audio",
    "thumbnail": "/images/products/nadaswaram_instrumental.jpg",
    "images": [
      "/images/products/nadaswaram_instrumental.jpg"
    ],
    "tags": [
      "music"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Sound Audio"
    ],
    "vendor": {
      "id": "ven_9",
      "name": "Divine Sound & Music Studio",
      "logo": "/images/products/nadaswaram_instrumental.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_music_5",
    "name": "Sunderkand & Hanuman Chalisa Musical Bhajans Audio Album",
    "slug": "sunderkand-hanuman-chalisa-musical-bhajans",
    "description": "Full Sundarkand recitation accompanied by traditional dholak, manjira & classical chorus.",
    "shortDescription": "Complete Sundarkand & Hanuman Chalisa musical bhajan album.",
    "price": 449,
    "originalPrice": 599,
    "discountPercentage": 25,
    "rating": 5.0,
    "reviewCount": 390,
    "stock": 85,
    "category": "Music",
    "brand": "Vedic Sound Audio",
    "thumbnail": "/images/products/sundarkand_bhajans_album.jpg",
    "images": [
      "/images/products/sundarkand_bhajans_album.jpg"
    ],
    "tags": [
      "music"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Sound Audio"
    ],
    "vendor": {
      "id": "ven_9",
      "name": "Divine Sound & Music Studio",
      "logo": "/images/products/sundarkand_bhajans_album.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_music_6",
    "name": "Melodious Veena Devotional Ragas for Meditation CD",
    "slug": "melodious-veena-devotional-ragas-for-meditation",
    "description": "Classical Saraswati Veena instrumental renditions of famous Carnatic & Hindustani kritis.",
    "shortDescription": "Saraswati Veena instrumental ragas for yoga & meditation.",
    "price": 549,
    "originalPrice": 699,
    "discountPercentage": 21,
    "rating": 4.9,
    "reviewCount": 160,
    "stock": 35,
    "category": "Music",
    "brand": "Vedic Sound Audio",
    "thumbnail": "/images/products/veena_devotional_ragas.jpg",
    "images": [
      "/images/products/veena_devotional_ragas.jpg"
    ],
    "tags": [
      "music"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Sound Audio"
    ],
    "vendor": {
      "id": "ven_9",
      "name": "Divine Sound & Music Studio",
      "logo": "/images/products/veena_devotional_ragas.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_music_7",
    "name": "Classical Flute Divine Krishna Melodies Audio Card",
    "slug": "classical-flute-divine-krishna-melodies",
    "description": "Enchanting bamboo flute (Bansuri) renditions inspired by Vrindavan Krishna Bhakti.",
    "shortDescription": "Enchanting bamboo flute Krishna melodies audio card.",
    "price": 499,
    "originalPrice": 649,
    "discountPercentage": 23,
    "rating": 4.9,
    "reviewCount": 270,
    "stock": 65,
    "category": "Music",
    "brand": "Vedic Sound Audio",
    "thumbnail": "/images/products/krishna_flute_melodies.jpg",
    "images": [
      "/images/products/krishna_flute_melodies.jpg"
    ],
    "tags": [
      "music"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Sound Audio"
    ],
    "vendor": {
      "id": "ven_9",
      "name": "Divine Sound & Music Studio",
      "logo": "/images/products/krishna_flute_melodies.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_music_8",
    "name": "Ancient Vedic Chants of 4 Vedas (Rig, Yajur, Sama, Atharva) USB Box",
    "slug": "ancient-vedic-chants-of-4-vedas-usb-box",
    "description": "Master collector USB containing authentic recitations of Rig, Yajur, Sama & Atharva Veda samhitas.",
    "shortDescription": "Master 4 Vedas (Rig, Yajur, Sama, Atharva) Audio USB Box.",
    "price": 1299,
    "originalPrice": 1699,
    "discountPercentage": 23,
    "rating": 5.0,
    "reviewCount": 480,
    "stock": 25,
    "category": "Music",
    "brand": "Vedic Sound Audio",
    "thumbnail": "/images/products/four_vedas_usb.jpg",
    "images": [
      "/images/products/four_vedas_usb.jpg"
    ],
    "tags": [
      "music"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Sound Audio"
    ],
    "vendor": {
      "id": "ven_9",
      "name": "Divine Sound & Music Studio",
      "logo": "/images/products/four_vedas_usb.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": true
  },
  {
    "id": "prod_music_9",
    "name": "Devotional Bhakti Sangeet Masterpieces Collection",
    "slug": "devotional-bhakti-sangeet-masterpieces",
    "description": "Timeless classical Stotrams, Suprabhatam & Kritis rendered by legendary Carnatic vocalists.",
    "shortDescription": "Legendary Stotram & Suprabhatam Carnatic vocal collection.",
    "price": 799,
    "originalPrice": 999,
    "discountPercentage": 20,
    "rating": 5.0,
    "reviewCount": 510,
    "stock": 45,
    "category": "Music",
    "brand": "Vedic Sound Audio",
    "thumbnail": "/images/products/bhakti_sangeet_collection.jpg",
    "images": [
      "/images/products/bhakti_sangeet_collection.jpg"
    ],
    "tags": [
      "music"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Sound Audio"
    ],
    "vendor": {
      "id": "ven_9",
      "name": "Divine Sound & Music Studio",
      "logo": "/images/products/bhakti_sangeet_collection.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  },
  {
    "id": "prod_music_10",
    "name": "Sacred Chanting & Singing Bowl Sound Healing Album",
    "slug": "sacred-chanting-singing-bowl-sound-healing-album",
    "description": "Tibetan singing bowl 432Hz harmonic frequencies blended with Om chanting for deep healing.",
    "shortDescription": "432Hz Singing bowl & Om chanting sound healing album.",
    "price": 599,
    "originalPrice": 749,
    "discountPercentage": 20,
    "rating": 4.9,
    "reviewCount": 210,
    "stock": 55,
    "category": "Music",
    "brand": "Vedic Sound Audio",
    "thumbnail": "/images/products/singing_bowl_healing.jpg",
    "images": [
      "/images/products/singing_bowl_healing.jpg"
    ],
    "tags": [
      "music"
    ],
    "features": [
      "100% Authentic Devotional Quality",
      "Handcrafted by Vedic Sound Audio"
    ],
    "vendor": {
      "id": "ven_9",
      "name": "Divine Sound & Music Studio",
      "logo": "/images/products/singing_bowl_healing.jpg",
      "rating": 4.9,
      "totalProducts": 85,
      "verified": true
    },
    "isFeatured": false
  }
];

export const productService = {
  getProducts: async (params?: FilterParams): Promise<IApiResponse<IProduct[]>> => {
    const page = params?.page || 1;
    const limit = params?.limit || 12;

    try {
      const response = await apiClient.get(API_BASE_URL, {
        params: {
          category: params?.category,
          search: params?.search,
          sort: params?.sortBy || params?.sort,
          page,
          limit,
        },
      });

      if (response.data && response.data.data) {
        const approvedList = response.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          description: item.description || item.name,
          shortDescription: item.short_description || item.name,
          price: item.price,
          originalPrice: item.original_price || item.price * 1.25,
          discountPercentage: item.discount_percentage || 20,
          rating: item.rating || 4.8,
          reviewCount: item.review_count || 120,
          stock: item.stock || 10,
          category: item.category,
          brand: item.brand || 'DivineKart Artisan',
          thumbnail: item.thumbnail || '/images/ganesha_idol.jpg',
          images: item.images || [item.thumbnail || '/images/ganesha_idol.jpg'],
          tags: [item.category ? item.category.toLowerCase() : 'idols'],
          features: item.features || ['High quality devotional product'],
          vendor: {
            id: item.vendor_id || 'ven_1',
            name: item.vendor_name || 'Vedic Crafts Heritage',
            logo: item.thumbnail || '/images/ganesha_idol.jpg',
            rating: 4.9,
            totalProducts: 85,
            verified: true,
          },
          isFeatured: item.is_featured || false,
        }));

        const meta = response.data.meta || {};
        const total = meta.total ?? approvedList.length;
        const totalPages = meta.total_pages ?? meta.totalPages ?? Math.max(1, Math.ceil(total / limit));
        const hasMore = meta.has_more ?? meta.hasMore ?? page < totalPages;

        return {
          success: true,
          message: 'DivineKart products fetched successfully',
          data: approvedList,
          meta: {
            page: meta.page || page,
            limit: meta.limit || limit,
            total,
            totalPages,
            hasMore,
          },
        };
      }
    } catch (err) {
      console.warn('Backend API fallback: fetching products from local memory', err);
    }

    let filtered = [...MOCK_PRODUCTS];

    if (params?.category && params.category !== 'All' && params.category !== 'all') {
      const targetCat = params.category.toLowerCase().replace(/[^a-z0-9]/g, '');
      const catMatches = filtered.filter((p) => {
        const prodCat = (p.category || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const matchesTag = (p.tags || []).some((t) => t.toLowerCase().replace(/[^a-z0-9]/g, '').includes(targetCat));
        return prodCat.includes(targetCat) || targetCat.includes(prodCat) || matchesTag;
      });
      filtered = catMatches.length > 0 ? catMatches : filtered;
    }

    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    const sortOpt = params?.sortBy || params?.sort;
    if (sortOpt === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOpt === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOpt === 'rating_desc') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginatedItems = filtered.slice(start, start + limit);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const hasMore = page < totalPages;

    return {
      success: true,
      message: 'DivineKart products fetched from memory',
      data: paginatedItems,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasMore,
      },
    };
  },

  getProductById: async (id: string): Promise<IApiResponse<IProduct>> => {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/${id}`);
      if (response.data && response.data.data) {
        const item = response.data.data;
        const product: IProduct = {
          id: item.id,
          name: item.name,
          slug: item.slug,
          description: item.description || item.name,
          shortDescription: item.short_description || item.name,
          price: item.price,
          originalPrice: item.original_price || item.price * 1.25,
          discountPercentage: item.discount_percentage || 20,
          rating: item.rating || 4.8,
          reviewCount: item.review_count || 120,
          stock: item.stock || 10,
          category: item.category,
          brand: item.brand || 'DivineKart Artisan',
          thumbnail: item.thumbnail || '/images/ganesha_idol.jpg',
          images: item.images || [item.thumbnail || '/images/ganesha_idol.jpg'],
          tags: [item.category.toLowerCase()],
          features: item.features || ['High quality devotional product'],
          vendor: {
            id: item.vendor_id || 'ven_1',
            name: item.vendor_name || 'Vedic Crafts Heritage',
            logo: item.thumbnail || '/images/ganesha_idol.jpg',
            rating: 4.9,
            totalProducts: 85,
            verified: true,
          },
          isFeatured: item.is_featured || false,
        };

        return {
          success: true,
          message: 'Product detail retrieved',
          data: product,
        };
      }
    } catch (err) {
      console.warn('Backend API fallback: fetching product detail from memory', err);
    }

    const product = MOCK_PRODUCTS.find((p) => p.id === id || p.slug === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return {
      success: true,
      message: 'Product detail retrieved from memory',
      data: product,
    };
  },

  getFeaturedProducts: async (): Promise<IApiResponse<IProduct[]>> => {
    const res = await productService.getProducts();
    const featured = res.data.filter((p) => p.isFeatured || true);
    return {
      success: true,
      message: 'Featured products fetched',
      data: featured,
    };
  },
};

export const adjustMockStock = (productId: string, delta: number) => {
  if (!productId) return;
  const item = MOCK_PRODUCTS.find((p) => p.id === productId || p.slug === productId);
  if (item) {
    item.stock = Math.max(0, item.stock + delta);
  }
};

