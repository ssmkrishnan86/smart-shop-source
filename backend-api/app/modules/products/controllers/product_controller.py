import uuid
from typing import List, Optional
from app.modules.products.schemas.product import ProductCreateSchema, ProductEditRequestSchema, ProductApprovalActionSchema, ProductRejectionActionSchema

MOCK_PRODUCTS = [
    {
        "id": "prod_idol_1",
        "vendor_id": "ven_1",
        "vendor_name": "Vedic Crafts Heritage",
        "name": "Handcrafted Antique Brass Ganesha Idol (8 Inch)",
        "slug": "handcrafted-antique-brass-ganesha-idol",
        "description": "Solid brass Ganesha idol with intricate traditional carving and antique gold finish for temple puja.",
        "short_description": "Handcrafted 8-inch solid brass Ganesha idol for temple worship.",
        "price": 1599.0,
        "original_price": 1999.0,
        "discount_percentage": 20,
        "category": "Idols",
        "brand": "Kanchi Heritage Artisans",
        "sku": "VD-IDOL-GANESHA-8IN",
        "stock": 45,
        "rating": 4.9,
        "review_count": 210,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/brass_ganesha_idol.jpg",
        "images": [
            "/images/products/brass_ganesha_idol.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_idol_2",
        "vendor_id": "ven_1",
        "vendor_name": "Vedic Crafts Heritage",
        "name": "Sacred Panchaloha Radha Krishna Idol (9.5 Inch)",
        "slug": "sacred-panchaloha-radha-krishna-idol",
        "description": "Authentic 5-metal Panchaloha alloy Radha Krishna idol crafted according to Shilpa Shastras.",
        "short_description": "Divine Radha Krishna idol in traditional 5-metal Panchaloha alloy.",
        "price": 2499.0,
        "original_price": 3200.0,
        "discount_percentage": 22,
        "category": "Idols",
        "brand": "Kanchi Heritage Artisans",
        "sku": "VD-IDOL-RADHAKRISHNA-9IN",
        "stock": 25,
        "rating": 4.9,
        "review_count": 140,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/radha_krishna_idol.jpg",
        "images": [
            "/images/products/radha_krishna_idol.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_idol_3",
        "vendor_id": "ven_1",
        "vendor_name": "Vedic Crafts Heritage",
        "name": "Pure Brass Nataraja Dancing Shiva Idol (10 Inch)",
        "slug": "pure-brass-nataraja-dancing-shiva-idol",
        "description": "Anandatandava posture Lord Nataraja Shiva brass sculpture with cosmic aureole arch.",
        "short_description": "10-inch heavy brass Nataraja Shiva idol with cosmic arch.",
        "price": 2999.0,
        "original_price": 3799.0,
        "discount_percentage": 21,
        "category": "Idols",
        "brand": "South Temple Crafts",
        "sku": "VD-IDOL-NATARAJA-10IN",
        "stock": 18,
        "rating": 4.8,
        "review_count": 95,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/nataraja_shiva_idol.jpg",
        "images": [
            "/images/products/nataraja_shiva_idol.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_idol_4",
        "vendor_id": "ven_1",
        "vendor_name": "Vedic Crafts Heritage",
        "name": "Marble Dust Goddess Lakshmi Saraswati Ganesha Set",
        "slug": "marble-dust-goddess-lakshmi-saraswati-ganesha-set",
        "description": "Trio divine idol set of Mahalakshmi, Saraswati, and Ganesha finished in pure white marble dust.",
        "short_description": "Auspicious trio set of Lakshmi, Saraswati & Ganesha for Deepavali.",
        "price": 1899.0,
        "original_price": 2399.0,
        "discount_percentage": 21,
        "category": "Idols",
        "brand": "Vedic Arts",
        "sku": "VD-IDOL-TRIO-MARBLE",
        "stock": 30,
        "rating": 4.9,
        "review_count": 180,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/lakshmi_saraswati_ganesha.jpg",
        "images": [
            "/images/products/lakshmi_saraswati_ganesha.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_idol_5",
        "vendor_id": "ven_1",
        "vendor_name": "Vedic Crafts Heritage",
        "name": "Antique Bronze Finish Hanuman Ji Idol (7 Inch)",
        "slug": "antique-bronze-finish-hanuman-ji-idol",
        "description": "Sanjeevani mountain carrying Lord Hanuman brass idol with antique dark bronze patina.",
        "short_description": "7-inch heavy brass Hanuman Ji idol in Sanjeevani posture.",
        "price": 1299.0,
        "original_price": 1699.0,
        "discount_percentage": 23,
        "category": "Idols",
        "brand": "Kanchi Heritage Artisans",
        "sku": "VD-IDOL-HANUMAN-7IN",
        "stock": 40,
        "rating": 4.9,
        "review_count": 165,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/hanuman_ji_idol.jpg",
        "images": [
            "/images/products/hanuman_ji_idol.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_idol_6",
        "vendor_id": "ven_1",
        "vendor_name": "Vedic Crafts Heritage",
        "name": "Black Stone Mahadev Shiva Lingam with Brass Yoni Base",
        "slug": "black-stone-mahadev-shiva-lingam-with-brass-yoni-base",
        "description": "Natural Narmada stone Shiva Lingam set upon solid polished brass Yoni pedestal.",
        "short_description": "Sacred Narmada stone Shiva Lingam with heavy brass Yoni.",
        "price": 1499.0,
        "original_price": 1899.0,
        "discount_percentage": 21,
        "category": "Idols",
        "brand": "Narmada Sacred Stones",
        "sku": "VD-IDOL-SHIVALING-BRASS",
        "stock": 22,
        "rating": 5.0,
        "review_count": 310,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/shiva_lingam.jpg",
        "images": [
            "/images/products/shiva_lingam.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_idol_7",
        "vendor_id": "ven_1",
        "vendor_name": "Vedic Crafts Heritage",
        "name": "Pure Brass Lord Balaji Venkateshwara Idol (12 Inch)",
        "slug": "pure-brass-lord-balaji-venkateshwara-idol",
        "description": "Tirupati Balaji Sri Venkateshwara solid brass idol with Shankha Chakra & Namam details.",
        "short_description": "12-inch grand Tirupati Balaji Venkateshwara brass idol.",
        "price": 3499.0,
        "original_price": 4499.0,
        "discount_percentage": 22,
        "category": "Idols",
        "brand": "South Temple Crafts",
        "sku": "VD-IDOL-BALAJI-12IN",
        "stock": 15,
        "rating": 5.0,
        "review_count": 280,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/balaji_venkateshwara.jpg",
        "images": [
            "/images/products/balaji_venkateshwara.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_idol_8",
        "vendor_id": "ven_1",
        "vendor_name": "Vedic Crafts Heritage",
        "name": "Brass Goddess Durga Idol on Lion (8.5 Inch)",
        "slug": "brass-goddess-durga-idol-on-lion",
        "description": "Ashtabhuja 8-armed Goddess Durga seated on lion with all divine weapons in pure brass.",
        "short_description": "8.5-inch Ashtabhuja Durga Ma brass idol for Navratri worship.",
        "price": 2199.0,
        "original_price": 2799.0,
        "discount_percentage": 21,
        "category": "Idols",
        "brand": "Kanchi Heritage Artisans",
        "sku": "VD-IDOL-DURGA-8IN",
        "stock": 28,
        "rating": 4.9,
        "review_count": 135,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/durga_idol.jpg",
        "images": [
            "/images/products/durga_idol.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_idol_9",
        "vendor_id": "ven_1",
        "vendor_name": "Vedic Crafts Heritage",
        "name": "Kanchi Kamakshi Amman Brass Idol (7 Inch)",
        "slug": "kanchi-kamakshi-amman-brass-idol",
        "description": "Traditional Kanchipuram Kamakshi Amman idol seated in Padmasana with sugarcane & parrot.",
        "short_description": "7-inch Kanchi Kamakshi Amman traditional brass idol.",
        "price": 1799.0,
        "original_price": 2299.0,
        "discount_percentage": 22,
        "category": "Idols",
        "brand": "Kanchi Heritage Artisans",
        "sku": "VD-IDOL-KAMAKSHI-7IN",
        "stock": 35,
        "rating": 4.9,
        "review_count": 190,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/kamakshi_amman.jpg",
        "images": [
            "/images/products/kamakshi_amman.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_idol_10",
        "vendor_id": "ven_1",
        "vendor_name": "Vedic Crafts Heritage",
        "name": "Sacred Panchaloha Murugan Kartikeya Idol with Spear",
        "slug": "sacred-panchaloha-murugan-kartikeya-idol-with-spear",
        "description": "Lord Murugan / Swaminatha Swami Panchaloha alloy idol carrying the sacred Vel spear.",
        "short_description": "Lord Murugan Kartikeya Panchaloha idol with sacred Vel spear.",
        "price": 2699.0,
        "original_price": 3499.0,
        "discount_percentage": 23,
        "category": "Idols",
        "brand": "South Temple Crafts",
        "sku": "VD-IDOL-MURUGAN-VEL",
        "stock": 20,
        "rating": 5.0,
        "review_count": 215,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/murugan_kartikeya.jpg",
        "images": [
            "/images/products/murugan_kartikeya.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_puja_1",
        "vendor_id": "ven_2",
        "vendor_name": "South Temple Supplies",
        "name": "Premium Pure Brass Puja Thali Set (9 Items)",
        "slug": "premium-pure-brass-puja-thali-set-9-items",
        "description": "Complete 9-piece traditional brass puja thali set including thali, diya, ghanti, agarbatti stand, and bowls.",
        "short_description": "All-in-one brass puja thali set for daily temple worship.",
        "price": 1299.0,
        "original_price": 1699.0,
        "discount_percentage": 23,
        "category": "Puja Samagri",
        "brand": "Temple Puja Works",
        "sku": "VD-PUJA-THALI-9PCS",
        "stock": 50,
        "rating": 4.9,
        "review_count": 320,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/puja_thali_set.jpg",
        "images": [
            "/images/products/puja_thali_set.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_puja_2",
        "vendor_id": "ven_2",
        "vendor_name": "South Temple Supplies",
        "name": "Ornate Brass Akhand Diya Oil Lamp with Glass Shade",
        "slug": "ornate-brass-akhand-diya-oil-lamp",
        "description": "Windproof borosilicate glass shade Akhand Diya with heavy brass base for continuous burning.",
        "short_description": "Windproof long-burning glass and brass Akhand Diya.",
        "price": 699.0,
        "original_price": 899.0,
        "discount_percentage": 22,
        "category": "Puja Samagri",
        "brand": "Temple Puja Works",
        "sku": "VD-PUJA-AKHAND-DIYA",
        "stock": 60,
        "rating": 4.8,
        "review_count": 210,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/akhand_diya_lamp.jpg",
        "images": [
            "/images/products/akhand_diya_lamp.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_puja_3",
        "vendor_id": "ven_2",
        "vendor_name": "South Temple Supplies",
        "name": "Heavy Carved Pure Brass Temple Bell (Ghanti)",
        "slug": "heavy-carved-pure-brass-temple-bell",
        "description": "Garuda / Nandi engraved heavy brass ringing bell producing resonant acoustic vibrations.",
        "short_description": "Resonant heavy brass temple ringing bell with Nandi top.",
        "price": 549.0,
        "original_price": 699.0,
        "discount_percentage": 21,
        "category": "Puja Samagri",
        "brand": "Kanchi Bell Works",
        "sku": "VD-PUJA-GHANTI-BRASS",
        "stock": 70,
        "rating": 4.9,
        "review_count": 180,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/brass_temple_bell.jpg",
        "images": [
            "/images/products/brass_temple_bell.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_puja_4",
        "vendor_id": "ven_2",
        "vendor_name": "South Temple Supplies",
        "name": "Pure Silver Plated Panchamrita Kalash with Mango Leaves",
        "slug": "pure-silver-plated-panchamrita-kalash-with-mango-leaves",
        "description": "Engraved silver-plated copper Kalash for abhishekam and sacred temple rituals.",
        "short_description": "Silver-plated Panchamrita Kalash pot for temple abhishekam.",
        "price": 899.0,
        "original_price": 1199.0,
        "discount_percentage": 25,
        "category": "Puja Samagri",
        "brand": "Temple Puja Works",
        "sku": "VD-PUJA-KALASH-SILVER",
        "stock": 35,
        "rating": 4.9,
        "review_count": 145,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/panchamrita_kalash.jpg",
        "images": [
            "/images/products/panchamrita_kalash.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_puja_5",
        "vendor_id": "ven_2",
        "vendor_name": "South Temple Supplies",
        "name": "Pure Camphor Karpooram Cubes (500g Jar)",
        "slug": "pure-camphor-karpooram-cubes-500g",
        "description": "100% pure green camphor (Bhimseni Karpooram) for aarti without leaving black residue.",
        "short_description": "Pure Bhimseni Karpooram camphor cubes for daily aarti.",
        "price": 449.0,
        "original_price": 599.0,
        "discount_percentage": 25,
        "category": "Puja Samagri",
        "brand": "Vedic Sugandh",
        "sku": "VD-PUJA-CAMPHOR-500G",
        "stock": 100,
        "rating": 5.0,
        "review_count": 410,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/pure_camphor_cubes.jpg",
        "images": [
            "/images/products/pure_camphor_cubes.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_puja_6",
        "vendor_id": "ven_2",
        "vendor_name": "South Temple Supplies",
        "name": "Pure Brass Agarbatti & Dhoop Stand with Ash Catcher",
        "slug": "pure-brass-agarbatti-dhoop-stand-with-ash-catcher",
        "description": "Multi-holder brass incense stick & dhoop cone burner with ornamental tray.",
        "short_description": "Decorative brass incense & dhoop stand with ash tray.",
        "price": 349.0,
        "original_price": 449.0,
        "discount_percentage": 22,
        "category": "Puja Samagri",
        "brand": "Temple Puja Works",
        "sku": "VD-PUJA-INCENSE-STAND",
        "stock": 80,
        "rating": 4.8,
        "review_count": 160,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/dhoop_incense_stand.jpg",
        "images": [
            "/images/products/dhoop_incense_stand.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_puja_7",
        "vendor_id": "ven_2",
        "vendor_name": "South Temple Supplies",
        "name": "Handcarved Sandalwood Tilak Bowl with Brass Spoon",
        "slug": "handcarved-sandalwood-tilak-bowl-with-brass-spoon",
        "description": "Solid Mysuru sandalwood carved cup for keeping chandan paste and kumkum.",
        "short_description": "Natural Mysore Sandalwood tilak bowl with brass spoon.",
        "price": 399.0,
        "original_price": 499.0,
        "discount_percentage": 20,
        "category": "Puja Samagri",
        "brand": "Mysore Heritage",
        "sku": "VD-PUJA-TILAK-BOWL",
        "stock": 45,
        "rating": 4.9,
        "review_count": 190,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/sandalwood_tilak_bowl.jpg",
        "images": [
            "/images/products/sandalwood_tilak_bowl.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_puja_8",
        "vendor_id": "ven_2",
        "vendor_name": "South Temple Supplies",
        "name": "Natural Saffron Kesar & Chandan Powder Set (100g)",
        "slug": "natural-saffron-kesar-chandan-powder-set",
        "description": "Pure Mysore sandalwood powder blended with Kashmiri saffron threads for daily tilak.",
        "short_description": "Pure Mysore Sandalwood & Kashmiri Kesar tilak powder.",
        "price": 599.0,
        "original_price": 799.0,
        "discount_percentage": 25,
        "category": "Puja Samagri",
        "brand": "Vedic Sugandh",
        "sku": "VD-PUJA-KESAR-CHANDAN",
        "stock": 65,
        "rating": 4.9,
        "review_count": 270,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/kesar_chandan_powder.jpg",
        "images": [
            "/images/products/kesar_chandan_powder.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_puja_9",
        "vendor_id": "ven_2",
        "vendor_name": "South Temple Supplies",
        "name": "Traditional Brass Temple Shankh Stand & Blowing Conch Shell",
        "slug": "traditional-brass-temple-shankh-stand-blowing-conch",
        "description": "Natural Vamavarti ritual blowing conch shell accompanied by a heavy brass carved stand.",
        "short_description": "Authentic blowing conch shell with carved brass stand.",
        "price": 1199.0,
        "original_price": 1499.0,
        "discount_percentage": 20,
        "category": "Puja Samagri",
        "brand": "Temple Puja Works",
        "sku": "VD-PUJA-SHANKH-SET",
        "stock": 30,
        "rating": 5.0,
        "review_count": 230,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/conch_shell_shankh.jpg",
        "images": [
            "/images/products/conch_shell_shankh.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_puja_10",
        "vendor_id": "ven_2",
        "vendor_name": "South Temple Supplies",
        "name": "Premium Cotton Wick Baati Set for Puja Diyas (1000 Wicks)",
        "slug": "premium-cotton-wick-baati-set-for-puja-diyas",
        "description": "Hand-rolled organic raw cotton long & round wicks for oil lamps and ghee diyas.",
        "short_description": "1000-piece organic pure cotton wicks for temple diyas.",
        "price": 249.0,
        "original_price": 349.0,
        "discount_percentage": 28,
        "category": "Puja Samagri",
        "brand": "Temple Puja Works",
        "sku": "VD-PUJA-COTTON-WICKS",
        "stock": 150,
        "rating": 4.8,
        "review_count": 520,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/cotton_wicks_baati.jpg",
        "images": [
            "/images/products/cotton_wicks_baati.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_rudra_1",
        "vendor_id": "ven_3",
        "vendor_name": "Himalayan Vedic Store",
        "name": "5 Mukhi Certified Himalayan Rudraksha Mala (108+1 Beads)",
        "slug": "5-mukhi-certified-himalayan-rudraksha-mala",
        "description": "Lab-certified authentic natural 5 Mukhi Rudraksha Mala sourced directly from Nepal foothills.",
        "short_description": "Lab-certified 5 Mukhi Rudraksha Mala for peace & meditation.",
        "price": 1299.0,
        "original_price": 1599.0,
        "discount_percentage": 18,
        "category": "Rudraksha",
        "brand": "Vedic Rudraksha Sansthan",
        "sku": "VD-RUDRA-5MUKHI-108",
        "stock": 50,
        "rating": 4.9,
        "review_count": 450,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/5_mukhi_rudraksha_mala.jpg",
        "images": [
            "/images/products/5_mukhi_rudraksha_mala.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_rudra_2",
        "vendor_id": "ven_3",
        "vendor_name": "Himalayan Vedic Store",
        "name": "Collector Grade 1 Mukhi Ek Mukhi Half-Moon Nepal Rudraksha",
        "slug": "collector-grade-1-mukhi-ek-mukhi-half-moon-rudraksha",
        "description": "Rare lab-certified 1 Mukhi Kaju / Half-Moon shaped Nepal Rudraksha bead with silver casing.",
        "short_description": "Rare lab-certified 1 Mukhi Ek Mukhi Nepal Rudraksha in silver.",
        "price": 4999.0,
        "original_price": 6499.0,
        "discount_percentage": 23,
        "category": "Rudraksha",
        "brand": "Vedic Rudraksha Sansthan",
        "sku": "VD-RUDRA-1MUKHI-SILVER",
        "stock": 10,
        "rating": 5.0,
        "review_count": 180,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/1_mukhi_rudraksha.jpg",
        "images": [
            "/images/products/1_mukhi_rudraksha.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_rudra_3",
        "vendor_id": "ven_3",
        "vendor_name": "Himalayan Vedic Store",
        "name": "Sacred 7 Mukhi Mahalaxmi Nepal Rudraksha Bead",
        "slug": "sacred-7-mukhi-mahalaxmi-nepal-rudraksha-bead",
        "description": "7-faced natural Nepal Rudraksha associated with Goddess Mahalakshmi for financial prosperity.",
        "short_description": "7 Mukhi Mahalakshmi Nepal Rudraksha bead with certificate.",
        "price": 1699.0,
        "original_price": 2199.0,
        "discount_percentage": 22,
        "category": "Rudraksha",
        "brand": "Vedic Rudraksha Sansthan",
        "sku": "VD-RUDRA-7MUKHI-BEAD",
        "stock": 25,
        "rating": 4.9,
        "review_count": 210,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/7_mukhi_rudraksha.jpg",
        "images": [
            "/images/products/7_mukhi_rudraksha.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_rudra_4",
        "vendor_id": "ven_3",
        "vendor_name": "Himalayan Vedic Store",
        "name": "Authentic 14 Mukhi Hanuman Nepal Rudraksha with Certificate",
        "slug": "authentic-14-mukhi-hanuman-nepal-rudraksha",
        "description": "Deva Mani 14 Mukhi Rudraksha associated with Lord Hanuman for courage & protection.",
        "short_description": "Rare 14 Mukhi Deva Mani Rudraksha bead with silver capping.",
        "price": 8999.0,
        "original_price": 11999.0,
        "discount_percentage": 25,
        "category": "Rudraksha",
        "brand": "Vedic Rudraksha Sansthan",
        "sku": "VD-RUDRA-14MUKHI-NEPAL",
        "stock": 5,
        "rating": 5.0,
        "review_count": 95,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/14_mukhi_rudraksha.jpg",
        "images": [
            "/images/products/14_mukhi_rudraksha.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_rudra_5",
        "vendor_id": "ven_3",
        "vendor_name": "Himalayan Vedic Store",
        "name": "Lab-Certified 6 Mukhi Kartikeya Nepal Rudraksha",
        "slug": "lab-certified-6-mukhi-kartikeya-nepal-rudraksha",
        "description": "6 Mukhi Rudraksha ruled by Lord Kartikeya & Venus for focus, wisdom and willpower.",
        "short_description": "Lab-certified 6 Mukhi Kartikeya Rudraksha bead for students.",
        "price": 1499.0,
        "original_price": 1899.0,
        "discount_percentage": 21,
        "category": "Rudraksha",
        "brand": "Vedic Rudraksha Sansthan",
        "sku": "VD-RUDRA-6MUKHI-BEAD",
        "stock": 30,
        "rating": 4.8,
        "review_count": 175,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/6_mukhi_rudraksha.jpg",
        "images": [
            "/images/products/6_mukhi_rudraksha.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_rudra_6",
        "vendor_id": "ven_3",
        "vendor_name": "Himalayan Vedic Store",
        "name": "108 Bead Sphatik Quartz & 5 Mukhi Rudraksha Combination Mala",
        "slug": "sphatik-quartz-5-mukhi-rudraksha-combination-mala",
        "description": "Dual power Japa mala combining natural crystal Sphatik quartz beads with 5 Mukhi Rudraksha.",
        "short_description": "108 bead natural Sphatik quartz & 5 Mukhi Rudraksha mala.",
        "price": 1599.0,
        "original_price": 1999.0,
        "discount_percentage": 20,
        "category": "Rudraksha",
        "brand": "Vedic Rudraksha Sansthan",
        "sku": "VD-RUDRA-SPHATIK-COMBO",
        "stock": 40,
        "rating": 4.9,
        "review_count": 310,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/sphatik_rudraksha_mala.jpg",
        "images": [
            "/images/products/sphatik_rudraksha_mala.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_rudra_7",
        "vendor_id": "ven_3",
        "vendor_name": "Himalayan Vedic Store",
        "name": "Natural 9 Mukhi Durga Nepal Rudraksha Bead",
        "slug": "natural-9-mukhi-durga-nepal-rudraksha-bead",
        "description": "9 Mukhi Rudraksha representing Nine Forms of Navadurga for energy and protection.",
        "short_description": "Natural 9 Mukhi Navadurga Nepal Rudraksha with lab test.",
        "price": 2899.0,
        "original_price": 3699.0,
        "discount_percentage": 21,
        "category": "Rudraksha",
        "brand": "Vedic Rudraksha Sansthan",
        "sku": "VD-RUDRA-9MUKHI-DURGA",
        "stock": 15,
        "rating": 4.9,
        "review_count": 140,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/9_mukhi_rudraksha.jpg",
        "images": [
            "/images/products/9_mukhi_rudraksha.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_rudra_8",
        "vendor_id": "ven_3",
        "vendor_name": "Himalayan Vedic Store",
        "name": "Certified 11 Mukhi Rudra Nepal Rudraksha Pendant in Silver",
        "slug": "certified-11-mukhi-rudra-nepal-rudraksha-pendant",
        "description": "11 Mukhi Rudraksha blessed by 11 Rudras for meditation mastery & leadership.",
        "short_description": "11 Mukhi Rudra Nepal Rudraksha pendant in pure silver.",
        "price": 3499.0,
        "original_price": 4499.0,
        "discount_percentage": 22,
        "category": "Rudraksha",
        "brand": "Vedic Rudraksha Sansthan",
        "sku": "VD-RUDRA-11MUKHI-SILVER",
        "stock": 12,
        "rating": 5.0,
        "review_count": 125,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/11_mukhi_rudraksha.jpg",
        "images": [
            "/images/products/11_mukhi_rudraksha.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_rudra_9",
        "vendor_id": "ven_3",
        "vendor_name": "Himalayan Vedic Store",
        "name": "Sacred Gauri Shankar Dual Rudraksha Bead for Harmony",
        "slug": "sacred-gauri-shankar-dual-rudraksha-bead",
        "description": "Naturally joined twin Rudraksha representing Lord Shiva and Goddess Parvati.",
        "short_description": "Naturally joined Gauri Shankar twin Rudraksha bead.",
        "price": 4499.0,
        "original_price": 5799.0,
        "discount_percentage": 22,
        "category": "Rudraksha",
        "brand": "Vedic Rudraksha Sansthan",
        "sku": "VD-RUDRA-GAURISHANKAR",
        "stock": 8,
        "rating": 5.0,
        "review_count": 210,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/gauri_shankar_bead.jpg",
        "images": [
            "/images/products/gauri_shankar_bead.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_rudra_10",
        "vendor_id": "ven_3",
        "vendor_name": "Himalayan Vedic Store",
        "name": "108 Bead Pure Lotus Seed Kamal Gatta & Rudraksha Japa Mala",
        "slug": "108-bead-kamal-gatta-rudraksha-japa-mala",
        "description": "Sacred combination Japa mala of black Lotus seeds (Kamal Gatta) and 5 Mukhi Rudraksha.",
        "short_description": "108 bead Kamal Gatta lotus seed & Rudraksha Japa mala.",
        "price": 999.0,
        "original_price": 1299.0,
        "discount_percentage": 23,
        "category": "Rudraksha",
        "brand": "Vedic Rudraksha Sansthan",
        "sku": "VD-RUDRA-KAMALGATTA-MALA",
        "stock": 45,
        "rating": 4.8,
        "review_count": 290,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/kamal_gatta_mala.jpg",
        "images": [
            "/images/products/kamal_gatta_mala.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_book_1",
        "vendor_id": "ven_4",
        "vendor_name": "Sacred Veda Publications",
        "name": "Shreemad Bhagavad Gita - Deluxe Gold Edition",
        "slug": "shreemad-bhagavad-gita-deluxe-gold-edition",
        "description": "Hardbound gold-embossed edition of Shreemad Bhagavad Gita featuring original Sanskrit slokas & commentary.",
        "short_description": "Deluxe hardbound Bhagavad Gita with Sanskrit & English translation.",
        "price": 899.0,
        "original_price": 1199.0,
        "discount_percentage": 25,
        "category": "Books",
        "brand": "Gita Press Heritage",
        "sku": "VD-BOOK-GITA-GOLD",
        "stock": 80,
        "rating": 5.0,
        "review_count": 520,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/bhagavad_gita_book.jpg",
        "images": [
            "/images/products/bhagavad_gita_book.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_book_2",
        "vendor_id": "ven_4",
        "vendor_name": "Sacred Veda Publications",
        "name": "Complete Valmiki Ramayana (3 Volume Hardbound Set)",
        "slug": "complete-valmiki-ramayana-3-volume-hardbound-set",
        "description": "Comprehensive 3-volume boxed hardbound set of Maharishi Valmiki Ramayana with Sloka meanings.",
        "short_description": "3-Volume unabridged Valmiki Ramayana hardbound set.",
        "price": 2499.0,
        "original_price": 3199.0,
        "discount_percentage": 21,
        "category": "Books",
        "brand": "Sacred Veda Press",
        "sku": "VD-BOOK-RAMAYANA-3VOL",
        "stock": 35,
        "rating": 5.0,
        "review_count": 340,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/valmiki_ramayana_set.jpg",
        "images": [
            "/images/products/valmiki_ramayana_set.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_book_3",
        "vendor_id": "ven_4",
        "vendor_name": "Sacred Veda Publications",
        "name": "Shreemad Bhagavata Purana - Sanskrit & Hindi Translation",
        "slug": "shreemad-bhagavata-purana-sanskrit-hindi-translation",
        "description": "Full 12 Skandhas of Bhagavata Purana celebrating Sri Krishna leelas with authentic translation.",
        "short_description": "Complete 12 Skandhas Bhagavata Purana scripture set.",
        "price": 1799.0,
        "original_price": 2299.0,
        "discount_percentage": 21,
        "category": "Books",
        "brand": "Gita Press Heritage",
        "sku": "VD-BOOK-BHAGAVATA-PURANA",
        "stock": 30,
        "rating": 4.9,
        "review_count": 210,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/bhagavata_purana_book.jpg",
        "images": [
            "/images/products/bhagavata_purana_book.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_book_4",
        "vendor_id": "ven_4",
        "vendor_name": "Sacred Veda Publications",
        "name": "Shri Ramcharitmanas Code Edition with Commentary",
        "slug": "shri-ramcharitmanas-code-edition-with-commentary",
        "description": "Goswami Tulsidas Shri Ramcharitmanas with Avadhi verse & word-by-word explanation.",
        "short_description": "Goswami Tulsidas Shri Ramcharitmanas complete scripture.",
        "price": 699.0,
        "original_price": 899.0,
        "discount_percentage": 22,
        "category": "Books",
        "brand": "Gita Press Heritage",
        "sku": "VD-BOOK-RAMCHARITMANAS",
        "stock": 60,
        "rating": 5.0,
        "review_count": 480,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/ramcharitmanas_book.jpg",
        "images": [
            "/images/products/ramcharitmanas_book.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_book_5",
        "vendor_id": "ven_4",
        "vendor_name": "Sacred Veda Publications",
        "name": "The Upanishads - 108 Sacred Texts Transliteration & Meaning",
        "slug": "the-upanishads-108-sacred-texts",
        "description": "Deep philosophical treatise covering 108 Principal Upanishads with English commentary.",
        "short_description": "Comprehensive guide to 108 Principal Upanishads.",
        "price": 1199.0,
        "original_price": 1499.0,
        "discount_percentage": 20,
        "category": "Books",
        "brand": "Vedic Philosophy Press",
        "sku": "VD-BOOK-UPANISHADS-108",
        "stock": 40,
        "rating": 4.9,
        "review_count": 190,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/upanishads_book.jpg",
        "images": [
            "/images/products/upanishads_book.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_book_6",
        "vendor_id": "ven_4",
        "vendor_name": "Sacred Veda Publications",
        "name": "Devi Mahatmyam / Durga Saptashati Hardbound Temple Book",
        "slug": "devi-mahatmyam-durga-saptashati-hardbound",
        "description": "700 verses of Durga Saptashati with Argala, Kilaka & Kavacham for Navratri patha.",
        "short_description": "Hardbound Durga Saptashati for sacred Navratri chanting.",
        "price": 499.0,
        "original_price": 649.0,
        "discount_percentage": 23,
        "category": "Books",
        "brand": "Gita Press Heritage",
        "sku": "VD-BOOK-DURGA-SAPTASHATI",
        "stock": 70,
        "rating": 4.9,
        "review_count": 310,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/durga_saptashati_book.jpg",
        "images": [
            "/images/products/durga_saptashati_book.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_book_7",
        "vendor_id": "ven_4",
        "vendor_name": "Sacred Veda Publications",
        "name": "Patanjali Yoga Sutras & Vedic Philosophy Guide",
        "slug": "patanjali-yoga-sutras-vedic-philosophy-guide",
        "description": "Ashtanga Yoga sutras of Maharishi Patanjali with Sanskrit verses & meditation commentary.",
        "short_description": "Maharishi Patanjali Yoga Sutras & Ashtanga meditation guide.",
        "price": 599.0,
        "original_price": 749.0,
        "discount_percentage": 20,
        "category": "Books",
        "brand": "Vedic Philosophy Press",
        "sku": "VD-BOOK-YOGA-SUTRAS",
        "stock": 50,
        "rating": 4.8,
        "review_count": 160,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/yoga_sutras_book.jpg",
        "images": [
            "/images/products/yoga_sutras_book.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_book_8",
        "vendor_id": "ven_4",
        "vendor_name": "Sacred Veda Publications",
        "name": "Sacred Hanuman Chalisa & Sundarkand Pocket Leatherette Edition",
        "slug": "sacred-hanuman-chalisa-sundarkand-pocket-edition",
        "description": "Golden-gilt pocket leatherette book containing Hanuman Chalisa, Bajrang Baan & Sundarkand.",
        "short_description": "Pocket leatherette edition Hanuman Chalisa & Sundarkand.",
        "price": 299.0,
        "original_price": 399.0,
        "discount_percentage": 25,
        "category": "Books",
        "brand": "Sacred Veda Press",
        "sku": "VD-BOOK-HANUMAN-POCKET",
        "stock": 100,
        "rating": 5.0,
        "review_count": 620,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/hanuman_chalisa_pocket.jpg",
        "images": [
            "/images/products/hanuman_chalisa_pocket.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_book_9",
        "vendor_id": "ven_4",
        "vendor_name": "Sacred Veda Publications",
        "name": "Complete Mahabharata Unabridged Translation Set",
        "slug": "complete-mahabharata-unabridged-translation-set",
        "description": "Grand 10-volume boxed set of Maharishi Vyasa Mahabharata translated into lucid prose.",
        "short_description": "10-Volume complete unabridged Vyasa Mahabharata set.",
        "price": 3999.0,
        "original_price": 4999.0,
        "discount_percentage": 20,
        "category": "Books",
        "brand": "Sacred Veda Press",
        "sku": "VD-BOOK-MAHABHARATA-10VOL",
        "stock": 15,
        "rating": 5.0,
        "review_count": 195,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/mahabharata_set.jpg",
        "images": [
            "/images/products/mahabharata_set.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_book_10",
        "vendor_id": "ven_4",
        "vendor_name": "Sacred Veda Publications",
        "name": "Vedic Hymns & Suktam Recitation Guidebook",
        "slug": "vedic-hymns-suktam-recitation-guidebook",
        "description": "Purusha Suktam, Sri Suktam, Rudram & Chamakam with intonation swara markings.",
        "short_description": "Vedic Suktam recitation guide with Devanagari swara marks.",
        "price": 449.0,
        "original_price": 549.0,
        "discount_percentage": 18,
        "category": "Books",
        "brand": "Vedic Philosophy Press",
        "sku": "VD-BOOK-VEDIC-SUKTAM",
        "stock": 45,
        "rating": 4.9,
        "review_count": 140,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/vedic_hymns_book.jpg",
        "images": [
            "/images/products/vedic_hymns_book.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_yantra_1",
        "vendor_id": "ven_5",
        "vendor_name": "Divine Yantra Arts",
        "name": "Pure Copper Energized Sri Yantra Mandala Plate (6x6 Inch)",
        "slug": "pure-copper-energized-sri-yantra-mandala-plate",
        "description": "Precision-engraved 24K gold-plated pure copper Sri Yantra for prosperity and positive energy.",
        "short_description": "Energized 24K gold-plated copper Sri Yantra mandala plate.",
        "price": 1199.0,
        "original_price": 1499.0,
        "discount_percentage": 20,
        "category": "Yantra",
        "brand": "Vedic Yantra Kendra",
        "sku": "VD-YANTRA-SRIYANTRA-COPPER",
        "stock": 40,
        "rating": 4.9,
        "review_count": 280,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/copper_sri_yantra.jpg",
        "images": [
            "/images/products/copper_sri_yantra.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_yantra_2",
        "vendor_id": "ven_5",
        "vendor_name": "Divine Yantra Arts",
        "name": "24K Gold-Plated Meru Prishta 3D Sri Yantra Idol",
        "slug": "24k-gold-plated-meru-prishta-3d-sri-yantra-idol",
        "description": "3D pyramid Meru Sri Yantra cast in solid brass with heavy 24K gold electroplating.",
        "short_description": "3D Meru Sri Yantra pyramid idol in 24K gold plating.",
        "price": 2999.0,
        "original_price": 3799.0,
        "discount_percentage": 21,
        "category": "Yantra",
        "brand": "Vedic Yantra Kendra",
        "sku": "VD-YANTRA-MERU-3D",
        "stock": 20,
        "rating": 5.0,
        "review_count": 190,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/3d_meru_sri_yantra.jpg",
        "images": [
            "/images/products/3d_meru_sri_yantra.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_yantra_3",
        "vendor_id": "ven_5",
        "vendor_name": "Divine Yantra Arts",
        "name": "Sacred Kuber Yantra for Financial Wealth & Prosperity",
        "slug": "sacred-kuber-yantra-for-financial-wealth",
        "description": "Lord Kuber energised magic square yantra etched on heavy brass plate.",
        "short_description": "Energized Lord Kuber yantra plate for wealth & abundance.",
        "price": 899.0,
        "original_price": 1199.0,
        "discount_percentage": 25,
        "category": "Yantra",
        "brand": "Vedic Yantra Kendra",
        "sku": "VD-YANTRA-KUBER-BRASS",
        "stock": 50,
        "rating": 4.8,
        "review_count": 310,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/kuber_yantra.jpg",
        "images": [
            "/images/products/kuber_yantra.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_yantra_4",
        "vendor_id": "ven_5",
        "vendor_name": "Divine Yantra Arts",
        "name": "Heavy Pure Silver Engraved Mahamrityunjaya Yantra",
        "slug": "heavy-pure-silver-engraved-mahamrityunjaya-yantra",
        "description": "Pure 999 silver foil Yantra of Lord Shiva Mahamrityunjaya for health & longevity.",
        "short_description": "999 pure silver Mahamrityunjaya Yantra plate for wellness.",
        "price": 1899.0,
        "original_price": 2399.0,
        "discount_percentage": 20,
        "category": "Yantra",
        "brand": "Vedic Yantra Kendra",
        "sku": "VD-YANTRA-MAHAMRITYUNJAYA",
        "stock": 25,
        "rating": 4.9,
        "review_count": 160,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/mahamrityunjaya_yantra.jpg",
        "images": [
            "/images/products/mahamrityunjaya_yantra.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_yantra_5",
        "vendor_id": "ven_5",
        "vendor_name": "Divine Yantra Arts",
        "name": "24K Gold Foil Framed Surya Yantra for Vitality & Success",
        "slug": "24k-gold-foil-framed-surya-yantra",
        "description": "Sun God Surya Yantra with geometric rays embossed in pure gold foil with wooden frame.",
        "short_description": "Framed 24K gold foil Surya Yantra for leadership & vitality.",
        "price": 1299.0,
        "original_price": 1599.0,
        "discount_percentage": 18,
        "category": "Yantra",
        "brand": "Vedic Yantra Kendra",
        "sku": "VD-YANTRA-SURYA-GOLD",
        "stock": 35,
        "rating": 4.9,
        "review_count": 140,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/surya_yantra.jpg",
        "images": [
            "/images/products/surya_yantra.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_yantra_6",
        "vendor_id": "ven_5",
        "vendor_name": "Divine Yantra Arts",
        "name": "Energized Saraswati Yantra Plate for Education & Wisdom",
        "slug": "energized-saraswati-yantra-plate",
        "description": "Goddess Saraswati Yantra plate for enhancement of memory, arts, knowledge and exams.",
        "short_description": "Goddess Saraswati Yantra plate for academic success.",
        "price": 799.0,
        "original_price": 999.0,
        "discount_percentage": 20,
        "category": "Yantra",
        "brand": "Vedic Yantra Kendra",
        "sku": "VD-YANTRA-SARASWATI",
        "stock": 60,
        "rating": 4.8,
        "review_count": 220,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/saraswati_yantra.jpg",
        "images": [
            "/images/products/saraswati_yantra.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_yantra_7",
        "vendor_id": "ven_5",
        "vendor_name": "Divine Yantra Arts",
        "name": "Solid Brass Gayatri Yantra Wall Hanging Plaque",
        "slug": "solid-brass-gayatri-yantra-wall-hanging-plaque",
        "description": "Heavy brass Gayatri Veda Yantra plaque with hanging chain for home altar.",
        "short_description": "Solid brass Gayatri Yantra wall hanging plaque.",
        "price": 1499.0,
        "original_price": 1899.0,
        "discount_percentage": 21,
        "category": "Yantra",
        "brand": "Vedic Yantra Kendra",
        "sku": "VD-YANTRA-GAYATRI-WALL",
        "stock": 30,
        "rating": 4.9,
        "review_count": 130,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/gayatri_yantra_plaque.jpg",
        "images": [
            "/images/products/gayatri_yantra_plaque.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_yantra_8",
        "vendor_id": "ven_5",
        "vendor_name": "Divine Yantra Arts",
        "name": "Pure Copper Navagraha 9 Planets Yantra Grid Plate",
        "slug": "pure-copper-navagraha-9-planets-yantra-grid-plate",
        "description": "Complete 9-in-1 Navagraha planet yantra grid engraved on pure copper sheet.",
        "short_description": "9 Planets Navagraha yantra grid plate on pure copper.",
        "price": 1599.0,
        "original_price": 1999.0,
        "discount_percentage": 20,
        "category": "Yantra",
        "brand": "Vedic Yantra Kendra",
        "sku": "VD-YANTRA-NAVAGRAHA-GRID",
        "stock": 25,
        "rating": 4.9,
        "review_count": 270,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/navagraha_yantra_grid.jpg",
        "images": [
            "/images/products/navagraha_yantra_grid.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_yantra_9",
        "vendor_id": "ven_5",
        "vendor_name": "Divine Yantra Arts",
        "name": "Energized Karya Siddhi Yantra for Goal Fulfillment",
        "slug": "energized-karya-siddhi-yantra-for-goal-fulfillment",
        "description": "Multi-circle Karya Siddhi Yantra designed for success in business, ventures & desires.",
        "short_description": "Karya Siddhi Yantra plate for task & goal fulfillment.",
        "price": 999.0,
        "original_price": 1299.0,
        "discount_percentage": 23,
        "category": "Yantra",
        "brand": "Vedic Yantra Kendra",
        "sku": "VD-YANTRA-KARYASIDDHI",
        "stock": 45,
        "rating": 4.8,
        "review_count": 180,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/karya_siddhi_yantra.jpg",
        "images": [
            "/images/products/karya_siddhi_yantra.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_yantra_10",
        "vendor_id": "ven_5",
        "vendor_name": "Divine Yantra Arts",
        "name": "24K Gold Plated Vastu Dosh Nivaran Yantra",
        "slug": "24k-gold-plated-vastu-dosh-nivaran-yantra",
        "description": "Vastu Dosh remedy yantra for harmonizing directional energies in home & workplace.",
        "short_description": "24K Gold plated Vastu Dosh remedy yantra for home.",
        "price": 1099.0,
        "original_price": 1399.0,
        "discount_percentage": 21,
        "category": "Yantra",
        "brand": "Vedic Yantra Kendra",
        "sku": "VD-YANTRA-VASTUDOSH",
        "stock": 35,
        "rating": 4.9,
        "review_count": 205,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/vastu_dosh_yantra.jpg",
        "images": [
            "/images/products/vastu_dosh_yantra.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_incense_1",
        "vendor_id": "ven_6",
        "vendor_name": "Sugandh Fragrance Studio",
        "name": "Pure Mysore Sandalwood Dhoop Cones (Pack of 3)",
        "slug": "pure-mysore-sandalwood-dhoop-cones",
        "description": "Handcrafted charcoal-free dhoop cones made from pure Mysore Sandalwood powder.",
        "short_description": "Charcoal-free aromatic Mysore Sandalwood dhoop cones.",
        "price": 399.0,
        "original_price": 499.0,
        "discount_percentage": 20,
        "category": "Incense & Dhoop",
        "brand": "Sugandh Veda",
        "sku": "VD-INCENSE-SANDAL-DHOOP",
        "stock": 90,
        "rating": 4.9,
        "review_count": 340,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/sandalwood_dhoop_cones.jpg",
        "images": [
            "/images/products/sandalwood_dhoop_cones.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_incense_2",
        "vendor_id": "ven_6",
        "vendor_name": "Sugandh Fragrance Studio",
        "name": "Temple Grade Organic Loban & Sambrani Dhoop Cups (Pack of 24)",
        "slug": "temple-grade-organic-loban-sambrani-dhoop-cups",
        "description": "Ready-to-burn natural cow dung dhoop cups filled with pure Loban & Benzoin resin.",
        "short_description": "Organic Loban & Sambrani dhoop cups for temple atmosphere.",
        "price": 499.0,
        "original_price": 649.0,
        "discount_percentage": 23,
        "category": "Incense & Dhoop",
        "brand": "Sugandh Veda",
        "sku": "VD-INCENSE-SAMBRANI-CUPS",
        "stock": 80,
        "rating": 4.9,
        "review_count": 280,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/sambrani_dhoop_cups.jpg",
        "images": [
            "/images/products/sambrani_dhoop_cups.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_incense_3",
        "vendor_id": "ven_6",
        "vendor_name": "Sugandh Fragrance Studio",
        "name": "Pure Natural Kasturi Musk Incense Sticks (100 Sticks)",
        "slug": "pure-natural-kasturi-musk-incense-sticks",
        "description": "Slow-burning natural herbal incense sticks with rich Kasturi musk fragrance.",
        "short_description": "100-pack organic Kasturi musk aromatic agarbatti.",
        "price": 349.0,
        "original_price": 449.0,
        "discount_percentage": 22,
        "category": "Incense & Dhoop",
        "brand": "Sugandh Veda",
        "sku": "VD-INCENSE-KASTURI-100",
        "stock": 100,
        "rating": 4.8,
        "review_count": 210,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/kasturi_incense_sticks.jpg",
        "images": [
            "/images/products/kasturi_incense_sticks.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_incense_4",
        "vendor_id": "ven_6",
        "vendor_name": "Sugandh Fragrance Studio",
        "name": "Traditional Charcoal-Free Guggal Dhoop Sticks (Pack of 4)",
        "slug": "traditional-charcoal-free-guggal-dhoop-sticks",
        "description": "Pure Commiphora mukul (Guggal) gum resin dhoop sticks for air purification.",
        "short_description": "Charcoal-free natural Guggal dhoop sticks 4-pack.",
        "price": 399.0,
        "original_price": 499.0,
        "discount_percentage": 20,
        "category": "Incense & Dhoop",
        "brand": "Sugandh Veda",
        "sku": "VD-INCENSE-GUGGAL-STICKS",
        "stock": 75,
        "rating": 4.8,
        "review_count": 190,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/guggal_dhoop_sticks.jpg",
        "images": [
            "/images/products/guggal_dhoop_sticks.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_incense_5",
        "vendor_id": "ven_6",
        "vendor_name": "Sugandh Fragrance Studio",
        "name": "Sacred Tulsi & Neem Herbal Incense Sticks",
        "slug": "sacred-tulsi-neem-herbal-incense-sticks",
        "description": "Hand-rolled incense infused with holy basil (Tulsi) leaves and pure Neem extract.",
        "short_description": "Natural Tulsi & Neem purifying herbal agarbatti.",
        "price": 299.0,
        "original_price": 399.0,
        "discount_percentage": 25,
        "category": "Incense & Dhoop",
        "brand": "Sugandh Veda",
        "sku": "VD-INCENSE-TULSI-NEEM",
        "stock": 110,
        "rating": 4.8,
        "review_count": 260,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/tulsi_neem_incense.jpg",
        "images": [
            "/images/products/tulsi_neem_incense.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_incense_6",
        "vendor_id": "ven_6",
        "vendor_name": "Sugandh Fragrance Studio",
        "name": "Hand-Rolled Nag Champa Floral Agarbatti",
        "slug": "hand-rolled-nag-champa-floral-agarbatti",
        "description": "Authentic Plumeria & Halmaddi resin Nag Champa agarbatti for meditation and yoga.",
        "short_description": "Authentic hand-rolled Nag Champa floral incense sticks.",
        "price": 329.0,
        "original_price": 429.0,
        "discount_percentage": 23,
        "category": "Incense & Dhoop",
        "brand": "Sugandh Veda",
        "sku": "VD-INCENSE-NAGCHAMPA",
        "stock": 95,
        "rating": 4.9,
        "review_count": 380,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/nag_champa_agarbatti.jpg",
        "images": [
            "/images/products/nag_champa_agarbatti.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_incense_7",
        "vendor_id": "ven_6",
        "vendor_name": "Sugandh Fragrance Studio",
        "name": "Organic Kesar Chandan Aromatic Dhoop Sticks",
        "slug": "organic-kesar-chandan-aromatic-dhoop-sticks",
        "description": "Thick bamboo-less dhoop sticks with rich saffron Kesar and sandalwood fragrance.",
        "short_description": "Bamboo-less Kesar Chandan aromatic dhoop sticks.",
        "price": 429.0,
        "original_price": 549.0,
        "discount_percentage": 21,
        "category": "Incense & Dhoop",
        "brand": "Sugandh Veda",
        "sku": "VD-INCENSE-KESAR-DHOOP",
        "stock": 70,
        "rating": 4.9,
        "review_count": 220,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/kesar_chandan_dhoop.jpg",
        "images": [
            "/images/products/kesar_chandan_dhoop.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_incense_8",
        "vendor_id": "ven_6",
        "vendor_name": "Sugandh Fragrance Studio",
        "name": "Himalayan Cedarwood & Frankincense Incense Cones",
        "slug": "himalayan-cedarwood-frankincense-incense-cones",
        "description": "Aromatic cones crafted from Deodar cedarwood oil and frankincense Olibanum resin.",
        "short_description": "Himalayan Cedarwood & Frankincense dhoop cones.",
        "price": 379.0,
        "original_price": 479.0,
        "discount_percentage": 20,
        "category": "Incense & Dhoop",
        "brand": "Sugandh Veda",
        "sku": "VD-INCENSE-CEDAR-CONES",
        "stock": 85,
        "rating": 4.8,
        "review_count": 150,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/cedarwood_incense_cones.jpg",
        "images": [
            "/images/products/cedarwood_incense_cones.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_incense_9",
        "vendor_id": "ven_6",
        "vendor_name": "Sugandh Fragrance Studio",
        "name": "Natural Rose & Camphor Temple Incense Pack",
        "slug": "natural-rose-camphor-temple-incense-pack",
        "description": "Fragrant agarbatti made from recycled sacred temple rose petals and pure camphor.",
        "short_description": "Temple rose petal & camphor natural incense sticks.",
        "price": 289.0,
        "original_price": 379.0,
        "discount_percentage": 23,
        "category": "Incense & Dhoop",
        "brand": "Sugandh Veda",
        "sku": "VD-INCENSE-ROSE-CAMPHOR",
        "stock": 120,
        "rating": 4.8,
        "review_count": 290,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/rose_camphor_incense.jpg",
        "images": [
            "/images/products/rose_camphor_incense.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_incense_10",
        "vendor_id": "ven_6",
        "vendor_name": "Sugandh Fragrance Studio",
        "name": "Premium Brass Waterfall Backflow Incense Burner with 50 Cones",
        "slug": "premium-brass-waterfall-backflow-incense-burner",
        "description": "Ornamental Ganesha backflow smoke fountain burner with 50 fragrant backflow cones.",
        "short_description": "Ganesha backflow incense fountain burner with 50 cones.",
        "price": 699.0,
        "original_price": 899.0,
        "discount_percentage": 22,
        "category": "Incense & Dhoop",
        "brand": "Sugandh Veda",
        "sku": "VD-INCENSE-BACKFLOW-SET",
        "stock": 50,
        "rating": 4.9,
        "review_count": 430,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/waterfall_incense_burner.jpg",
        "images": [
            "/images/products/waterfall_incense_burner.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_ayur_1",
        "vendor_id": "ven_7",
        "vendor_name": "Vedic Herbals & Oils",
        "name": "Pure Saffron Sandalwood Chandan Paste (100g)",
        "slug": "pure-saffron-sandalwood-chandan-paste",
        "description": "Authentic temple-grade sandalwood paste infused with pure Kashmir saffron for daily tilak.",
        "short_description": "Sacred Chandan & Kesar paste for daily temple tilak.",
        "price": 499.0,
        "original_price": 650.0,
        "discount_percentage": 23,
        "category": "Ayurveda",
        "brand": "Vedic Ayurveda",
        "sku": "VD-AYUR-CHANDAN-PASTE",
        "stock": 70,
        "rating": 4.9,
        "review_count": 310,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/saffron_chandan_paste.jpg",
        "images": [
            "/images/products/saffron_chandan_paste.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_ayur_2",
        "vendor_id": "ven_7",
        "vendor_name": "Vedic Herbals & Oils",
        "name": "Organic Kashmiri Saffron Kesar Threads (5 Grams)",
        "slug": "organic-kashmiri-saffron-kesar-threads-5g",
        "description": "Grade-1 Mongra Kashmiri saffron strands harvested from Pampore fields for health & rituals.",
        "short_description": "Pure Grade-1 Kashmiri Mongra Kesar saffron 5g jar.",
        "price": 1499.0,
        "original_price": 1899.0,
        "discount_percentage": 21,
        "category": "Ayurveda",
        "brand": "Kashmir Organics",
        "sku": "VD-AYUR-KESAR-5G",
        "stock": 40,
        "rating": 5.0,
        "review_count": 270,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/kashmiri_kesar_threads.jpg",
        "images": [
            "/images/products/kashmiri_kesar_threads.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_ayur_3",
        "vendor_id": "ven_7",
        "vendor_name": "Vedic Herbals & Oils",
        "name": "Authentic Kumkumadi Tailam Radiant Facial Oil (30ml)",
        "slug": "authentic-kumkumadi-tailam-radiant-facial-oil",
        "description": "Ayurvedic formulation of 26 herbs with saffron & lotus for glowing complexions.",
        "short_description": "Pure Ayurvedic Kumkumadi Tailam facial radiance oil.",
        "price": 999.0,
        "original_price": 1299.0,
        "discount_percentage": 23,
        "category": "Ayurveda",
        "brand": "Vedic Ayurveda",
        "sku": "VD-AYUR-KUMKUMADI-30ML",
        "stock": 55,
        "rating": 4.9,
        "review_count": 390,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/kumkumadi_tailam.jpg",
        "images": [
            "/images/products/kumkumadi_tailam.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_ayur_4",
        "vendor_id": "ven_7",
        "vendor_name": "Vedic Herbals & Oils",
        "name": "Organic Himalayan Shilajit Resin (50g Jar)",
        "slug": "organic-himalayan-shilajit-resin-50g",
        "description": "Purified Gold Grade Himalayan Shilajit rich in 84+ minerals and fulvic acid.",
        "short_description": "100% Pure Gold Grade Himalayan Shilajit resin 50g.",
        "price": 1299.0,
        "original_price": 1699.0,
        "discount_percentage": 23,
        "category": "Ayurveda",
        "brand": "Himalaya Herbals",
        "sku": "VD-AYUR-SHILAJIT-50G",
        "stock": 45,
        "rating": 4.9,
        "review_count": 480,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/himalayan_shilajit.jpg",
        "images": [
            "/images/products/himalayan_shilajit.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_ayur_5",
        "vendor_id": "ven_7",
        "vendor_name": "Vedic Herbals & Oils",
        "name": "Pure Cold-Pressed Sesame Til Oil for Temple Abhishekam (1 Litre)",
        "slug": "pure-cold-pressed-sesame-til-oil-1l",
        "description": "Traditional wooden ghani cold-pressed black sesame oil for temple lamps and abhishekam.",
        "short_description": "100% pure cold-pressed sesame til oil 1 Litre bottle.",
        "price": 449.0,
        "original_price": 549.0,
        "discount_percentage": 18,
        "category": "Ayurveda",
        "brand": "Vedic Ayurveda",
        "sku": "VD-AYUR-TIL-OIL-1L",
        "stock": 85,
        "rating": 4.8,
        "review_count": 210,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/sesame_til_oil.jpg",
        "images": [
            "/images/products/sesame_til_oil.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_ayur_6",
        "vendor_id": "ven_7",
        "vendor_name": "Vedic Herbals & Oils",
        "name": "Natural Ashwagandha & Shatavari Immunity Rasayana (500g)",
        "slug": "natural-ashwagandha-shatavari-immunity-rasayana",
        "description": "Rejuvenating Ayurvedic jam prepared with organic Ashwagandha roots, Shatavari and wild honey.",
        "short_description": "Rejuvenating Ashwagandha & Shatavari immunity jam.",
        "price": 699.0,
        "original_price": 899.0,
        "discount_percentage": 22,
        "category": "Ayurveda",
        "brand": "Vedic Ayurveda",
        "sku": "VD-AYUR-ASHWA-RASAYANA",
        "stock": 60,
        "rating": 4.9,
        "review_count": 180,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/ashwagandha_rasayana.jpg",
        "images": [
            "/images/products/ashwagandha_rasayana.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_ayur_7",
        "vendor_id": "ven_7",
        "vendor_name": "Vedic Herbals & Oils",
        "name": "Sacred Panchagavya Organic Ghrita / Ghee for Puja Lamps (500g)",
        "slug": "sacred-panchagavya-organic-ghee-500g",
        "description": "Desi Gir Cow A2 bilona ghee produced according to Panchagavya rituals.",
        "short_description": "Desi Gir Cow A2 Bilona Ghee 500g for temple diyas.",
        "price": 599.0,
        "original_price": 799.0,
        "discount_percentage": 25,
        "category": "Ayurveda",
        "brand": "Gir Gaushala",
        "sku": "VD-AYUR-GIR-GHEE-500G",
        "stock": 90,
        "rating": 5.0,
        "review_count": 340,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/panchagavya_ghee.jpg",
        "images": [
            "/images/products/panchagavya_ghee.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_ayur_8",
        "vendor_id": "ven_7",
        "vendor_name": "Vedic Herbals & Oils",
        "name": "Traditional Herbal Bhringraj Hair Nourishing Oil (200ml)",
        "slug": "traditional-herbal-bhringraj-hair-nourishing-oil",
        "description": "Authentic Kshirapak method hair oil made with Bhringraj, Amla and Sesame oil.",
        "short_description": "Kshirapak Bhringraj & Amla herbal hair oil 200ml.",
        "price": 399.0,
        "original_price": 499.0,
        "discount_percentage": 20,
        "category": "Ayurveda",
        "brand": "Vedic Ayurveda",
        "sku": "VD-AYUR-BHRINGRAJ-OIL",
        "stock": 75,
        "rating": 4.8,
        "review_count": 290,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/bhringraj_hair_oil.jpg",
        "images": [
            "/images/products/bhringraj_hair_oil.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_ayur_9",
        "vendor_id": "ven_7",
        "vendor_name": "Vedic Herbals & Oils",
        "name": "Organic Chyawanprash with Gold Leaf & Wild Honey (1kg)",
        "slug": "organic-chyawanprash-with-gold-leaf-1kg",
        "description": "Special Swarna Bhasma (Gold Leaf) enriched Chyawanprash made with fresh organic Amla.",
        "short_description": "Gold Leaf Swarna Bhasma Chyawanprash 1kg jar.",
        "price": 899.0,
        "original_price": 1199.0,
        "discount_percentage": 25,
        "category": "Ayurveda",
        "brand": "Vedic Ayurveda",
        "sku": "VD-AYUR-GOLD-CHYAWANPRASH",
        "stock": 50,
        "rating": 4.9,
        "review_count": 310,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/chyawanprash_gold.jpg",
        "images": [
            "/images/products/chyawanprash_gold.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_ayur_10",
        "vendor_id": "ven_7",
        "vendor_name": "Vedic Herbals & Oils",
        "name": "Pure Himalayan Brahmi Memory & Concentration Syrup (300ml)",
        "slug": "pure-himalayan-brahmi-memory-syrup",
        "description": "Herbal brain tonic formulated with Bacopa monnieri (Brahmi), Shankhpushpi and Gotu Kola.",
        "short_description": "Natural Brahmi & Shankhpushpi brain memory syrup.",
        "price": 349.0,
        "original_price": 449.0,
        "discount_percentage": 22,
        "category": "Ayurveda",
        "brand": "Vedic Ayurveda",
        "sku": "VD-AYUR-BRAHMI-SYRUP",
        "stock": 65,
        "rating": 4.8,
        "review_count": 160,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/brahmi_memory_syrup.jpg",
        "images": [
            "/images/products/brahmi_memory_syrup.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_gift_1",
        "vendor_id": "ven_8",
        "vendor_name": "Kanchi Utsav Gifts",
        "name": "Handcrafted Minakari Wooden Return Gift Box Set",
        "slug": "handcrafted-minakari-wooden-return-gift-box-set",
        "description": "Elegant handcrafted wooden return gift box decorated with traditional peacock Minakari artwork.",
        "short_description": "Traditional Minakari wooden box for auspicious return gifts.",
        "price": 799.0,
        "original_price": 999.0,
        "discount_percentage": 20,
        "category": "Return Gifts",
        "brand": "Kanchi Gift Gallery",
        "sku": "VD-GIFT-MINAKARI-BOX",
        "stock": 50,
        "rating": 4.9,
        "review_count": 210,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/minakari_gift_box.jpg",
        "images": [
            "/images/products/minakari_gift_box.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_gift_2",
        "vendor_id": "ven_8",
        "vendor_name": "Kanchi Utsav Gifts",
        "name": "Ornate Silver Plated Peacock Coin Dish with Gift Box",
        "slug": "ornate-silver-plated-peacock-coin-dish",
        "description": "Silver-plated peacock shape coin bowl presented in royal velvet gift packaging.",
        "short_description": "Silver-plated peacock coin bowl in velvet gift box.",
        "price": 499.0,
        "original_price": 649.0,
        "discount_percentage": 23,
        "category": "Return Gifts",
        "brand": "Kanchi Gift Gallery",
        "sku": "VD-GIFT-PEACOCK-DISH",
        "stock": 80,
        "rating": 4.8,
        "review_count": 180,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/silver_peacock_dish.jpg",
        "images": [
            "/images/products/silver_peacock_dish.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_gift_3",
        "vendor_id": "ven_8",
        "vendor_name": "Kanchi Utsav Gifts",
        "name": "Brass Diya in Velvet Gift Presentation Box (Pack of 2)",
        "slug": "brass-diya-in-velvet-gift-presentation-box",
        "description": "Pair of polished oil diyas presented in silk lined velvet gift box for wedding returns.",
        "short_description": "Pair of brass diyas in velvet gift box for functions.",
        "price": 649.0,
        "original_price": 799.0,
        "discount_percentage": 18,
        "category": "Return Gifts",
        "brand": "Kanchi Gift Gallery",
        "sku": "VD-GIFT-BRASS-DIYA-PAIR",
        "stock": 60,
        "rating": 4.9,
        "review_count": 160,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/brass_diya_velvet_box.jpg",
        "images": [
            "/images/products/brass_diya_velvet_box.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_gift_4",
        "vendor_id": "ven_8",
        "vendor_name": "Kanchi Utsav Gifts",
        "name": "Handpainted Wooden Kumkum & Haldi Box Container",
        "slug": "handpainted-wooden-kumkum-haldi-box-container",
        "description": "Dual compartment handpainted wooden box for haldi & kumkum offering during pujas.",
        "short_description": "Handpainted dual wooden Haldi Kumkum box container.",
        "price": 349.0,
        "original_price": 449.0,
        "discount_percentage": 22,
        "category": "Return Gifts",
        "brand": "Kanchi Gift Gallery",
        "sku": "VD-GIFT-KUMKUM-BOX",
        "stock": 90,
        "rating": 4.8,
        "review_count": 240,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/wooden_haldi_kumkum.jpg",
        "images": [
            "/images/products/wooden_haldi_kumkum.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_gift_5",
        "vendor_id": "ven_8",
        "vendor_name": "Kanchi Utsav Gifts",
        "name": "Decorative Brass Ganesha Wall Hanging Bell Return Gift",
        "slug": "decorative-brass-ganesha-wall-hanging-bell",
        "description": "Carved brass Ganesha wall plaque with ringing temple bell charm.",
        "short_description": "Carved brass Ganesha wall hanging bell plaque.",
        "price": 599.0,
        "original_price": 749.0,
        "discount_percentage": 20,
        "category": "Return Gifts",
        "brand": "Kanchi Gift Gallery",
        "sku": "VD-GIFT-GANESHA-BELL",
        "stock": 70,
        "rating": 4.9,
        "review_count": 190,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/brass_ganesha_hanging.jpg",
        "images": [
            "/images/products/brass_ganesha_hanging.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_gift_6",
        "vendor_id": "ven_8",
        "vendor_name": "Kanchi Utsav Gifts",
        "name": "Gold-Plated Laxmi Ganesha Coin Set in Acrylic Frame",
        "slug": "gold-plated-laxmi-ganesha-coin-set-in-acrylic-frame",
        "description": "Auspicious 24K gold foil Laxmi Ganesha coin preserved inside transparent acrylic stand.",
        "short_description": "24K Gold foil Laxmi Ganesha coin in acrylic stand frame.",
        "price": 399.0,
        "original_price": 499.0,
        "discount_percentage": 20,
        "category": "Return Gifts",
        "brand": "Kanchi Gift Gallery",
        "sku": "VD-GIFT-GOLD-COIN-FRAME",
        "stock": 110,
        "rating": 4.8,
        "review_count": 310,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/gold_laxmi_ganesha_frame.jpg",
        "images": [
            "/images/products/gold_laxmi_ganesha_frame.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_gift_7",
        "vendor_id": "ven_8",
        "vendor_name": "Kanchi Utsav Gifts",
        "name": "Hand-Embroidered Silk Potli Gift Bags (Set of 5)",
        "slug": "hand-embroidered-silk-potli-gift-bags-set-of-5",
        "description": "Raw silk drawstring potli pouches decorated with zari embroidery & tassels.",
        "short_description": "5-pack hand-embroidered raw silk potli gift bags.",
        "price": 449.0,
        "original_price": 599.0,
        "discount_percentage": 25,
        "category": "Return Gifts",
        "brand": "Kanchi Gift Gallery",
        "sku": "VD-GIFT-SILK-POTLI-5PCS",
        "stock": 100,
        "rating": 4.9,
        "review_count": 270,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/silk_potli_bags.jpg",
        "images": [
            "/images/products/silk_potli_bags.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_gift_8",
        "vendor_id": "ven_8",
        "vendor_name": "Kanchi Utsav Gifts",
        "name": "Carved Sandalwood Fragrance Fan with Royal Pouch",
        "slug": "carved-sandalwood-fragrance-fan-with-royal-pouch",
        "description": "Traditional hand-held folding fan intricately carved from Mysore sandalwood wood.",
        "short_description": "Aromatic Mysore Sandalwood folding fan with velvet pouch.",
        "price": 549.0,
        "original_price": 699.0,
        "discount_percentage": 21,
        "category": "Return Gifts",
        "brand": "Mysore Heritage",
        "sku": "VD-GIFT-SANDAL-FAN",
        "stock": 45,
        "rating": 4.9,
        "review_count": 140,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/sandalwood_carved_fan.jpg",
        "images": [
            "/images/products/sandalwood_carved_fan.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_gift_9",
        "vendor_id": "ven_8",
        "vendor_name": "Kanchi Utsav Gifts",
        "name": "Silver-Plated Bowl Set with Tray for Housewarming Gifts",
        "slug": "silver-plated-bowl-set-with-tray",
        "description": "Two silver-plated velvet presentation bowls with matching serving tray & spoons.",
        "short_description": "Silver-plated twin bowl set with tray in velvet box.",
        "price": 999.0,
        "original_price": 1299.0,
        "discount_percentage": 23,
        "category": "Return Gifts",
        "brand": "Kanchi Gift Gallery",
        "sku": "VD-GIFT-SILVER-BOWLS-TRAY",
        "stock": 40,
        "rating": 5.0,
        "review_count": 230,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/silver_plated_bowls.jpg",
        "images": [
            "/images/products/silver_plated_bowls.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_gift_10",
        "vendor_id": "ven_8",
        "vendor_name": "Kanchi Utsav Gifts",
        "name": "Minakari Work Decorative Brass Kalash Return Gift",
        "slug": "minakari-work-decorative-brass-kalash",
        "description": "Intricate peacock enamel Minakari work solid brass small Kalash pot for gift distribution.",
        "short_description": "Peacock Minakari enamel brass small Kalash return gift.",
        "price": 699.0,
        "original_price": 899.0,
        "discount_percentage": 22,
        "category": "Return Gifts",
        "brand": "Kanchi Gift Gallery",
        "sku": "VD-GIFT-MINAKARI-KALASH",
        "stock": 55,
        "rating": 4.9,
        "review_count": 175,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/minakari_brass_kalash.jpg",
        "images": [
            "/images/products/minakari_brass_kalash.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_music_1",
        "vendor_id": "ven_9",
        "vendor_name": "Divine Sound & Music Studio",
        "name": "Sacred Vedic Chants & Rudram Audio Album CD / USB",
        "slug": "sacred-vedic-chants-rudram-audio-album",
        "description": "Authentic Vedic chanting including Sri Rudram, Chamakam & Suktams recorded by Kanchi Veda pathashala scholars.",
        "short_description": "High fidelity audio recordings of Sri Rudram & Sacred Vedic Chants.",
        "price": 599.0,
        "original_price": 799.0,
        "discount_percentage": 25,
        "category": "Music",
        "brand": "Vedic Sound Audio",
        "sku": "VD-MUSIC-RUDRAM-CD",
        "stock": 60,
        "rating": 5.0,
        "review_count": 340,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/vedic_chants_album.jpg",
        "images": [
            "/images/products/vedic_chants_album.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_music_2",
        "vendor_id": "ven_9",
        "vendor_name": "Divine Sound & Music Studio",
        "name": "Divine Morning Chants & Mantras (Gayatri, Mahamrityunjaya)",
        "slug": "divine-morning-chants-mantras",
        "description": "108 times recitation of Gayatri Mantra, Mahamrityunjaya Mantra & Vishnu Sahasranamam.",
        "short_description": "Divine morning japa chants of Gayatri & Mahamrityunjaya Mantras.",
        "price": 499.0,
        "original_price": 649.0,
        "discount_percentage": 23,
        "category": "Music",
        "brand": "Vedic Sound Audio",
        "sku": "VD-MUSIC-MORNING-MANTRAS",
        "stock": 70,
        "rating": 4.9,
        "review_count": 280,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/morning_mantras_album.jpg",
        "images": [
            "/images/products/morning_mantras_album.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_music_3",
        "vendor_id": "ven_9",
        "vendor_name": "Divine Sound & Music Studio",
        "name": "Shreemad Bhagavad Gita Full Recitation MP3 Audio Card",
        "slug": "shreemad-bhagavad-gita-full-recitation-mp3-audio-card",
        "description": "All 18 chapters of Bhagavad Gita recited with clear Sanskrit pronunciation and background tanpura.",
        "short_description": "Complete 18 Chapters Bhagavad Gita Sanskrit MP3 Audio Card.",
        "price": 699.0,
        "original_price": 899.0,
        "discount_percentage": 22,
        "category": "Music",
        "brand": "Vedic Sound Audio",
        "sku": "VD-MUSIC-GITA-AUDIO",
        "stock": 50,
        "rating": 5.0,
        "review_count": 410,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/bhagavad_gita_card.jpg",
        "images": [
            "/images/products/bhagavad_gita_card.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_music_4",
        "vendor_id": "ven_9",
        "vendor_name": "Divine Sound & Music Studio",
        "name": "Traditional Temple Shehnai & Nadaswaram Instrumental Audio",
        "slug": "traditional-temple-shehnai-nadaswaram-instrumental",
        "description": "Auspicious Mangala Isai Nadaswaram & Shehnai instrumental ragas played for temple festivities.",
        "short_description": "Auspicious temple Nadaswaram & Shehnai instrumental music.",
        "price": 399.0,
        "original_price": 499.0,
        "discount_percentage": 20,
        "category": "Music",
        "brand": "Vedic Sound Audio",
        "sku": "VD-MUSIC-NADASWARAM",
        "stock": 40,
        "rating": 4.9,
        "review_count": 190,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/nadaswaram_instrumental.jpg",
        "images": [
            "/images/products/nadaswaram_instrumental.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_music_5",
        "vendor_id": "ven_9",
        "vendor_name": "Divine Sound & Music Studio",
        "name": "Sunderkand & Hanuman Chalisa Musical Bhajans Audio Album",
        "slug": "sunderkand-hanuman-chalisa-musical-bhajans",
        "description": "Full Sundarkand recitation accompanied by traditional dholak, manjira & classical chorus.",
        "short_description": "Complete Sundarkand & Hanuman Chalisa musical bhajan album.",
        "price": 449.0,
        "original_price": 599.0,
        "discount_percentage": 25,
        "category": "Music",
        "brand": "Vedic Sound Audio",
        "sku": "VD-MUSIC-SUNDERKAND",
        "stock": 85,
        "rating": 5.0,
        "review_count": 390,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/sundarkand_bhajans_album.jpg",
        "images": [
            "/images/products/sundarkand_bhajans_album.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_music_6",
        "vendor_id": "ven_9",
        "vendor_name": "Divine Sound & Music Studio",
        "name": "Melodious Veena Devotional Ragas for Meditation CD",
        "slug": "melodious-veena-devotional-ragas-for-meditation",
        "description": "Classical Saraswati Veena instrumental renditions of famous Carnatic & Hindustani kritis.",
        "short_description": "Saraswati Veena instrumental ragas for yoga & meditation.",
        "price": 549.0,
        "original_price": 699.0,
        "discount_percentage": 21,
        "category": "Music",
        "brand": "Vedic Sound Audio",
        "sku": "VD-MUSIC-VEENA-RAGAS",
        "stock": 35,
        "rating": 4.9,
        "review_count": 160,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/veena_devotional_ragas.jpg",
        "images": [
            "/images/products/veena_devotional_ragas.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_music_7",
        "vendor_id": "ven_9",
        "vendor_name": "Divine Sound & Music Studio",
        "name": "Classical Flute Divine Krishna Melodies Audio Card",
        "slug": "classical-flute-divine-krishna-melodies",
        "description": "Enchanting bamboo flute (Bansuri) renditions inspired by Vrindavan Krishna Bhakti.",
        "short_description": "Enchanting bamboo flute Krishna melodies audio card.",
        "price": 499.0,
        "original_price": 649.0,
        "discount_percentage": 23,
        "category": "Music",
        "brand": "Vedic Sound Audio",
        "sku": "VD-MUSIC-FLUTE-BANSURI",
        "stock": 65,
        "rating": 4.9,
        "review_count": 270,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/krishna_flute_melodies.jpg",
        "images": [
            "/images/products/krishna_flute_melodies.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_music_8",
        "vendor_id": "ven_9",
        "vendor_name": "Divine Sound & Music Studio",
        "name": "Ancient Vedic Chants of 4 Vedas (Rig, Yajur, Sama, Atharva) USB Box",
        "slug": "ancient-vedic-chants-of-4-vedas-usb-box",
        "description": "Master collector USB containing authentic recitations of Rig, Yajur, Sama & Atharva Veda samhitas.",
        "short_description": "Master 4 Vedas (Rig, Yajur, Sama, Atharva) Audio USB Box.",
        "price": 1299.0,
        "original_price": 1699.0,
        "discount_percentage": 23,
        "category": "Music",
        "brand": "Vedic Sound Audio",
        "sku": "VD-MUSIC-4VEDAS-USB",
        "stock": 25,
        "rating": 5.0,
        "review_count": 480,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/four_vedas_usb.jpg",
        "images": [
            "/images/products/four_vedas_usb.jpg"
        ],
        "is_featured": True
    },
    {
        "id": "prod_music_9",
        "vendor_id": "ven_9",
        "vendor_name": "Divine Sound & Music Studio",
        "name": "Devotional Bhakti Sangeet Masterpieces Collection",
        "slug": "devotional-bhakti-sangeet-masterpieces",
        "description": "Timeless classical Stotrams, Suprabhatam & Kritis rendered by legendary Carnatic vocalists.",
        "short_description": "Legendary Stotram & Suprabhatam Carnatic vocal collection.",
        "price": 799.0,
        "original_price": 999.0,
        "discount_percentage": 20,
        "category": "Music",
        "brand": "Vedic Sound Audio",
        "sku": "VD-MUSIC-BHAKTI-LEGENDS",
        "stock": 45,
        "rating": 5.0,
        "review_count": 510,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/bhakti_sangeet_collection.jpg",
        "images": [
            "/images/products/bhakti_sangeet_collection.jpg"
        ],
        "is_featured": False
    },
    {
        "id": "prod_music_10",
        "vendor_id": "ven_9",
        "vendor_name": "Divine Sound & Music Studio",
        "name": "Sacred Chanting & Singing Bowl Sound Healing Album",
        "slug": "sacred-chanting-singing-bowl-sound-healing-album",
        "description": "Tibetan singing bowl 432Hz harmonic frequencies blended with Om chanting for deep healing.",
        "short_description": "432Hz Singing bowl & Om chanting sound healing album.",
        "price": 599.0,
        "original_price": 749.0,
        "discount_percentage": 20,
        "category": "Music",
        "brand": "Vedic Sound Audio",
        "sku": "VD-MUSIC-SINGINGBOWL-432HZ",
        "stock": 55,
        "rating": 4.9,
        "review_count": 210,
        "status": "ACTIVE",
        "approval_status": "APPROVED",
        "thumbnail": "/images/products/singing_bowl_healing.jpg",
        "images": [
            "/images/products/singing_bowl_healing.jpg"
        ],
        "is_featured": False
    }
]

PRODUCT_CHANGE_REQUESTS = [
    {
        "id": "req_101",
        "product_id": "prod_1",
        "vendor_id": "ven_1",
        "vendor_name": "Vedic Crafts Heritage",
        "product_name": "Handcrafted Antique Brass Ganesha Idol",
        "current_name": "Handcrafted Antique Brass Ganesha Idol",
        "proposed_name": "Pure Handcrafted Brass Ganesha Idol (8 Inch)",
        "current_price": 1599.0,
        "proposed_price": 1799.0,
        "current_category": "Idols",
        "proposed_category": "Idols",
        "current_stock": 45,
        "proposed_stock": 60,
        "status": "PENDING_APPROVAL",
        "admin_comments": "Submitted product edit request for price & stock increase.",
        "created_at": "2026-08-08T23:50:00Z"
    }
]

APPROVAL_LOGS = [
    {
        "id": "log_1",
        "product_id": "prod_1",
        "product_name": "Handcrafted Antique Brass Ganesha Idol",
        "admin_name": "Super Admin",
        "previous_status": "PENDING_APPROVAL",
        "new_status": "APPROVED",
        "comments": "Product specifications and pricing verified.",
        "created_at": "2026-08-07T10:15:00Z"
    }
]

class ProductController:
    # 1. Storefront API for DivineKart (ONLY APPROVED & ACTIVE PRODUCTS)
    @staticmethod
    async def list_approved_products(
        category: Optional[str] = None,
        search: Optional[str] = None,
        sort: Optional[str] = None,
        page: int = 1,
        limit: int = 12,
    ) -> dict:
        filtered = [
            p for p in MOCK_PRODUCTS
            if p.get("approval_status") == "APPROVED" and p.get("status") != "DELETED"
        ]
        if category and category.lower() not in ["all", ""]:
            cat_norm = category.lower().replace(" ", "").replace("&", "")
            filtered = [
                p for p in filtered
                if p.get("category", "").lower().replace(" ", "").replace("&", "") == cat_norm
                or cat_norm in p.get("category", "").lower().replace(" ", "").replace("&", "")
            ]
        if search:
            q = search.lower().strip()
            filtered = [
                p for p in filtered
                if q in p.get("name", "").lower()
                or q in p.get("description", "").lower()
                or q in p.get("category", "").lower()
                or q in p.get("brand", "").lower()
            ]

        # Sorting logic
        if sort == "price_asc":
            filtered.sort(key=lambda x: x.get("price", 0))
        elif sort == "price_desc":
            filtered.sort(key=lambda x: x.get("price", 0), reverse=True)
        elif sort == "rating_desc":
            filtered.sort(key=lambda x: x.get("rating", 0), reverse=True)
        elif sort == "popularity":
            filtered.sort(key=lambda x: (x.get("is_featured", False), x.get("rating", 0), x.get("review_count", 0)), reverse=True)

        total = len(filtered)
        start = (page - 1) * limit
        items = filtered[start : start + limit]
        total_pages = max(1, (total + limit - 1) // limit) if total > 0 else 1
        has_more = page < total_pages

        return {
            "items": items,
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": total_pages,
            "has_more": has_more,
        }

    # 2. Vendor Product List for DivineVendor
    @staticmethod
    async def list_vendor_products(vendor_id: Optional[str] = None, status: Optional[str] = None) -> List[dict]:
        active = [p for p in MOCK_PRODUCTS if p.get("status") != "DELETED"]
        if vendor_id and vendor_id != "ALL":
            active = [p for p in active if p.get("vendor_id") == vendor_id or True]
        if status and status != "ALL":
            active = [p for p in active if p.get("approval_status") == status]
        return active

    # 3. Vendor Submit New Product (PENDING_APPROVAL)
    @staticmethod
    async def vendor_submit_product(
        payload: ProductCreateSchema, vendor_id: str = "ven_1", vendor_name: str = "Vedic Crafts Heritage"
    ) -> dict:
        prod_id = f"prod_{uuid.uuid4().hex[:8]}"
        slug = payload.name.lower().replace(" ", "-")
        new_prod = {
            "id": prod_id,
            "vendor_id": vendor_id,
            "vendor_name": vendor_name,
            "name": payload.name,
            "slug": slug,
            "description": payload.description or payload.name,
            "short_description": payload.short_description or payload.name,
            "price": float(payload.price),
            "original_price": round(float(payload.price) * 1.25, 2),
            "discount_percentage": 20,
            "category": payload.category,
            "brand": payload.brand or "DivineKart Artisan",
            "sku": f"SKU-{prod_id[:6].upper()}",
            "stock": payload.stock or 10,
            "rating": 0.0,
            "review_count": 0,
            "status": "ACTIVE",
            "approval_status": "PENDING_APPROVAL",
            "rejection_reason": None,
            "approval_comments": "Submitted to DivineAdmin for review.",
            "approved_by": None,
            "thumbnail": payload.thumbnail or "/images/ganesha_idol.jpg",
            "images": [payload.thumbnail or "/images/ganesha_idol.jpg"],
            "vendor_info": {
                "id": vendor_id,
                "store_name": vendor_name,
                "rating": 4.9
            },
            "created_at": "2026-08-09T12:00:00Z",
            "updated_at": "2026-08-09T12:00:00Z",
            "is_featured": False
        }
        MOCK_PRODUCTS.insert(0, new_prod)
        return new_prod

    # 4. Vendor Submit Edit Request (Updates product data & marks PENDING_APPROVAL)
    @staticmethod
    async def vendor_submit_edit_request(product_id: str, payload: ProductEditRequestSchema) -> dict:
        target_prod = None
        for p in MOCK_PRODUCTS:
            if p["id"] == product_id or p.get("slug") == product_id:
                target_prod = p
                break
        
        if not target_prod:
            raise ValueError("Product not found")

        req_id = f"req_{uuid.uuid4().hex[:6]}"
        change_req = {
            "id": req_id,
            "product_id": target_prod["id"],
            "vendor_id": target_prod["vendor_id"],
            "vendor_name": target_prod["vendor_name"],
            "product_name": target_prod["name"],
            "current_name": target_prod["name"],
            "proposed_name": payload.name or target_prod["name"],
            "current_price": target_prod["price"],
            "proposed_price": float(payload.price) if payload.price is not None else target_prod["price"],
            "current_category": target_prod["category"],
            "proposed_category": payload.category or target_prod["category"],
            "current_stock": target_prod["stock"],
            "proposed_stock": payload.stock if payload.stock is not None else target_prod["stock"],
            "status": "PENDING_APPROVAL",
            "admin_comments": "Edit request submitted by merchant",
            "created_at": "2026-08-09T12:30:00Z"
        }

        # Update product data draft and mark PENDING_APPROVAL
        if payload.name:
            target_prod["name"] = payload.name
        if payload.price is not None:
            target_prod["price"] = float(payload.price)
        if payload.category:
            target_prod["category"] = payload.category
        if payload.stock is not None:
            target_prod["stock"] = payload.stock
        if payload.thumbnail:
            target_prod["thumbnail"] = payload.thumbnail
            target_prod["images"] = [payload.thumbnail]

        target_prod["approval_status"] = "PENDING_APPROVAL"
        target_prod["approval_comments"] = "Edit request submitted. Awaiting DivineAdmin approval."

        PRODUCT_CHANGE_REQUESTS.insert(0, change_req)
        return change_req

    # 5. Admin Moderation Queue for DivineAdmin
    @staticmethod
    async def list_admin_approval_queue(status: Optional[str] = None) -> List[dict]:
        active = [p for p in MOCK_PRODUCTS if p.get("status") != "DELETED"]
        if status and status != "ALL":
            return [p for p in active if p.get("approval_status") == status]
        return active

    # 6. Admin Get Pending Change Requests
    @staticmethod
    async def list_admin_change_requests() -> List[dict]:
        return [r for r in PRODUCT_CHANGE_REQUESTS if r.get("status") != "DELETED"]

    # 7. Admin Approve Change Request (Merge proposed fields into live product!)
    @staticmethod
    async def admin_approve_change_request(request_id: str, action: ProductApprovalActionSchema) -> dict:
        target_req = None
        for req in PRODUCT_CHANGE_REQUESTS:
            if req["id"] == request_id or req["product_id"] == request_id:
                target_req = req
                break
        
        if target_req:
            target_req["status"] = "APPROVED"
            target_req["admin_comments"] = action.comments or "Edit request approved by Administrator"

        for p in MOCK_PRODUCTS:
            if p["id"] == request_id or (target_req and p["id"] == target_req["product_id"]):
                prev_status = p.get("approval_status")
                if target_req:
                    p["name"] = target_req["proposed_name"]
                    p["price"] = target_req["proposed_price"]
                    p["category"] = target_req["proposed_category"]
                    p["stock"] = target_req["proposed_stock"]
                    if target_req.get("proposed_thumbnail"):
                        p["thumbnail"] = target_req["proposed_thumbnail"]
                        p["images"] = [target_req["proposed_thumbnail"]]
                p["approval_status"] = "APPROVED"
                p["status"] = "ACTIVE"
                p["approved_by"] = action.admin_name or "Super Admin"
                p["approval_comments"] = action.comments or "Approved edit request"

                APPROVAL_LOGS.insert(0, {
                    "id": f"log_{uuid.uuid4().hex[:6]}",
                    "product_id": p["id"],
                    "product_name": p["name"],
                    "admin_name": action.admin_name or "Super Admin",
                    "previous_status": prev_status,
                    "new_status": "APPROVED",
                    "comments": f"Approved edit request: {action.comments or 'Merged updates into live storefront'}",
                    "created_at": "2026-08-09T12:35:00Z"
                })
                return p
        raise ValueError("Live product not found")

    # 8. Admin Reject Change Request
    @staticmethod
    async def admin_reject_change_request(request_id: str, action: ProductRejectionActionSchema) -> dict:
        target_req = None
        for req in PRODUCT_CHANGE_REQUESTS:
            if req["id"] == request_id or req["product_id"] == request_id:
                target_req = req
                break
        
        if target_req:
            target_req["status"] = "REJECTED"
            target_req["admin_comments"] = action.reason

        for p in MOCK_PRODUCTS:
            if p["id"] == request_id or (target_req and p["id"] == target_req["product_id"]):
                p["approval_status"] = "REJECTED"
                p["rejection_reason"] = action.reason
                p["approval_comments"] = f"Edit request rejected: {action.reason}"

                APPROVAL_LOGS.insert(0, {
                    "id": f"log_{uuid.uuid4().hex[:6]}",
                    "product_id": p["id"],
                    "product_name": p["name"],
                    "admin_name": action.admin_name or "Super Admin",
                    "previous_status": "PENDING_APPROVAL",
                    "new_status": "REJECTED",
                    "comments": f"Rejected edit request: {action.reason}",
                    "created_at": "2026-08-09T12:35:00Z"
                })
                return p
        raise ValueError("Live product not found")

    # 9. Admin Approve Product Creation
    @staticmethod
    async def admin_approve_product(product_id: str, action: ProductApprovalActionSchema) -> dict:
        # Check if there is a pending change request for this product_id
        for req in PRODUCT_CHANGE_REQUESTS:
            if req.get("product_id") == product_id or req.get("id") == product_id:
                req["status"] = "APPROVED"
                req["admin_comments"] = action.comments or "Approved by Super Admin"

        for p in MOCK_PRODUCTS:
            if p["id"] == product_id or p.get("slug") == product_id:
                prev_status = p.get("approval_status")
                p["approval_status"] = "APPROVED"
                p["status"] = "ACTIVE"
                p["approved_by"] = action.admin_name or "Super Admin"
                p["approval_comments"] = action.comments or "Approved by Administrator"
                p["rejection_reason"] = None

                APPROVAL_LOGS.insert(0, {
                    "id": f"log_{uuid.uuid4().hex[:6]}",
                    "product_id": product_id,
                    "product_name": p["name"],
                    "admin_name": action.admin_name or "Super Admin",
                    "previous_status": prev_status,
                    "new_status": "APPROVED",
                    "comments": action.comments or "Approved product for DivineKart marketplace",
                    "created_at": "2026-08-09T12:35:00Z"
                })
                return p
        raise ValueError("Product not found")

    # 10. Admin Reject Product
    @staticmethod
    async def admin_reject_product(product_id: str, action: ProductRejectionActionSchema) -> dict:
        for p in MOCK_PRODUCTS:
            if p["id"] == product_id or p.get("slug") == product_id:
                prev_status = p.get("approval_status")
                p["approval_status"] = "REJECTED"
                p["rejection_reason"] = action.reason
                p["approval_comments"] = f"Rejected: {action.reason}"

                APPROVAL_LOGS.insert(0, {
                    "id": f"log_{uuid.uuid4().hex[:6]}",
                    "product_id": product_id,
                    "product_name": p["name"],
                    "admin_name": action.admin_name or "Super Admin",
                    "previous_status": prev_status,
                    "new_status": "REJECTED",
                    "comments": action.reason,
                    "created_at": "2026-08-09T12:35:00Z"
                })
                return p
        raise ValueError("Product not found")

    # 11. Delete Product (Soft Delete & Exclude from Storefront)
    @staticmethod
    async def delete_product(product_id: str) -> dict:
        for p in MOCK_PRODUCTS:
            if p["id"] == product_id or p.get("slug") == product_id:
                p["status"] = "DELETED"
                p["approval_status"] = "DELETED"

                APPROVAL_LOGS.insert(0, {
                    "id": f"log_{uuid.uuid4().hex[:6]}",
                    "product_id": product_id,
                    "product_name": p["name"],
                    "admin_name": "System / Admin",
                    "previous_status": "ACTIVE",
                    "new_status": "DELETED",
                    "comments": "Product deleted from marketplace",
                    "created_at": "2026-08-09T12:35:00Z"
                })
                return {"id": product_id, "status": "DELETED"}
        raise ValueError("Product not found")

    # 12. Admin Request Changes on Product
    @staticmethod
    async def admin_request_changes(product_id: str, action: ProductApprovalActionSchema) -> dict:
        for p in MOCK_PRODUCTS:
            if p["id"] == product_id:
                prev_status = p.get("approval_status")
                p["approval_status"] = "CHANGES_REQUESTED"
                p["approval_comments"] = action.comments or "Changes requested by Administrator"
                p["rejection_reason"] = action.comments

                APPROVAL_LOGS.insert(0, {
                    "id": f"log_{uuid.uuid4().hex[:6]}",
                    "product_id": product_id,
                    "product_name": p["name"],
                    "admin_name": action.admin_name or "Super Admin",
                    "previous_status": prev_status,
                    "new_status": "CHANGES_REQUESTED",
                    "comments": action.comments or "Changes requested",
                    "created_at": "2026-08-09T12:35:00Z"
                })
                return p
        raise ValueError("Product not found")

    # 13. Get Approval History
    @staticmethod
    async def get_approval_history(product_id: Optional[str] = None) -> List[dict]:
        if product_id:
            return [log for log in APPROVAL_LOGS if log["product_id"] == product_id]
        return APPROVAL_LOGS
