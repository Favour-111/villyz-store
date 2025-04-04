const product = [
  {
    id: 1,
    name: "portable fan",
    image:
      "https://cdn-img.oraimo.com/fit-in/600x600/KE/product/2024/10/16/OHF-201A.png",
    category: "Home comfort & energy",
    start: 4,
    newPrice: 50,
    oldPrice: 60,
    inStock: true,
  },
  {
    id: 2,
    name: "Measuring spoon",
    image:
      "https://png.pngtree.com/png-clipart/20231004/original/pngtree-measuring-spoons-spoons-picture-image_13087262.png",
    category: "kitchen Essentials",
    start: 5,
    newPrice: 40,
    oldPrice: 45,
    inStock: true,
  },
  {
    id: 3,
    name: "vegetable peeler",
    image:
      "https://static.vecteezy.com/system/resources/previews/051/965/852/non_2x/vegetable-peeler-on-transparent-background-free-png.png",
    category: "kitchen Essentials",
    start: 5,
    newPrice: 40,
    oldPrice: 45,
    inStock: true,
  },
  {
    id: 4,
    name: "Frying pan",
    image:
      "https://static.vecteezy.com/system/resources/previews/041/148/197/non_2x/ai-generated-non-stick-frying-pan-free-png.png",
    category: "kitchen Essentials",
    start: 5,
    newPrice: 50,
    oldPrice: 55,
    inStock: true,
  },
  {
    id: 5,
    name: "portable Fruit blender",
    image:
      "https://static.vecteezy.com/system/resources/previews/047/826/370/non_2x/portable-blender-against-transparent-background-free-png.png",
    category: "kitchen Essentials",
    start: 5,
    newPrice: 70,
    oldPrice: 105,
    inStock: true,
  },
  {
    id: 6,
    name: "can opener",
    image:
      "https://png.pngtree.com/png-vector/20230929/ourmid/pngtree-can-opener-removing-png-image_10127743.png",
    category: "kitchen Essentials",
    start: 5,
    newPrice: 40,
    oldPrice: 45,
    outOfStock: true,
  },
  {
    id: 7,
    name: "Tong",
    image:
      "https://png.pngtree.com/png-clipart/20220908/ourmid/pngtree-stainless-steel-ice-tongs-isolated-on-white-background-png-image_6142242.png",
    category: "kitchen Essentials",
    start: 5,
    newPrice: 40,
    oldPrice: 45,
    inStock: true,
  },
  {
    id: 8,
    name: "fruit juicer",
    image:
      "https://static.vecteezy.com/system/resources/previews/039/213/103/non_2x/ai-generated-juicer-or-grinder-on-transparent-background-ai-generated-png.png",
    category: "kitchen Essentials",
    start: 4,
    newPrice: 70,
    oldPrice: 96,
    outOfStock: true,
  },
  {
    id: 9,
    name: "cleaning dust pan",
    image:
      "https://png.pngtree.com/png-vector/20240806/ourmid/pngtree-dustpan-with-red-plastic-body-and-black-color-png-image_13399819.png",
    category: "Cleaning tool",
    start: 4,
    newPrice: 70,
    oldPrice: 86,
    inStock: true,
  },
  {
    id: 10,
    name: "Cleaning machine for homes",
    image:
      "https://i02.appmifile.com/552_operatorx_operatorx_opx/19/10/2023/09218c6cba39756bf7a86f9f70e240da.png",
    category: "Cleaning tool",
    start: 4,
    newPrice: 60,
    oldPrice: 106,
    inStock: true,
  },
  {
    id: 11,
    name: "Cleaning brush",
    image:
      "https://png.pngtree.com/png-clipart/20231118/original/pngtree-scrub-brush-scrub-photo-png-image_13635940.png",
    category: "Cleaning tool",
    start: 4,
    newPrice: 70,
    oldPrice: 126,
    outOfStock: true,
  },
  {
    id: 12,
    name: "mop",
    image: "https://pngimg.com/d/mop_PNG10.png",
    category: "Cleaning tool",
    start: 4,
    newPrice: 10,
    oldPrice: 16,
    outOfStock: true,
  },
  {
    id: 13,
    name: "vacuum cleaner",
    image:
      "https://static.vecteezy.com/system/resources/previews/047/826/722/non_2x/vacuum-cleaner-against-transparent-background-free-png.png",
    category: "Cleaning tool",
    start: 4,
    newPrice: 70,
    oldPrice: 66,
    outOfStock: true,
  },
  {
    id: 14,
    name: "spray bottles",
    image:
      "https://png.pngtree.com/png-vector/20240123/ourmid/pngtree-green-plastic-spray-bottle-isolated-png-image_11468070.png",
    category: "Cleaning tool",
    start: 4,
    newPrice: 70,
    oldPrice: 66,
    outOfStock: true,
  },
  {
    id: 15,
    name: "paper towel",
    image:
      "https://static.vecteezy.com/system/resources/previews/047/920/991/non_2x/paper-towel-roll-isolated-on-a-transparent-background-free-png.png",
    category: "Cleaning tool",
    start: 4,
    newPrice: 70,
    oldPrice: 66,
    outOfStock: true,
  },

  {
    id: 16,
    name: "hangers for cloths and utensils",
    image:
      "https://static.vecteezy.com/system/resources/previews/049/678/807/non_2x/wooden-wall-rack-with-five-hooks-for-organizing-items-at-home-cut-out-transparent-png.png",
    category: "Organization & storage",
    start: 4,
    newPrice: 30,
    oldPrice: 66,
    inStock: true,
  },
  {
    id: 17,
    name: "drawer",
    image:
      "https://static.vecteezy.com/system/resources/previews/021/186/879/non_2x/wooden-drawer-3d-illustration-png.png",
    category: "Organization & storage",
    start: 4,
    newPrice: 30,
    oldPrice: 66,
    inStock: true,
  },
  {
    id: 18,
    name: "full set of hanger",
    image:
      "https://png.pngtree.com/png-clipart/20231026/original/pngtree-wooden-hanger-on-a-white-background-hanger-photo-png-image_13435800.png",
    category: "Organization & storage",
    start: 4,
    newPrice: 30,
    oldPrice: 66,
    outOfStock: true,
  },
  {
    id: 19,
    name: "shoe rack",
    image:
      "https://img.pikbest.com/png-images/20241031/shoe-storage_11035447.png!w700wp",
    category: "Organization & storage",
    start: 4,
    newPrice: 30,
    oldPrice: 66,
    inStock: true,
  },
  {
    id: 20,
    name: "book shelf",
    image: "https://pngimg.com/d/bookshelf_PNG107149.png",
    category: "Organization & storage",
    start: 4,
    newPrice: 30,
    oldPrice: 66,
    outOfStock: true,
  },
  {
    id: 21,
    name: "wooden foldable table",
    image:
      "https://static.vecteezy.com/system/resources/previews/046/853/168/non_2x/a-wooden-folding-table-on-a-transparent-background-free-png.png",
    category: "Organization & storage",
    start: 4,
    newPrice: 30,
    oldPrice: 66,
    inStock: true,
  },
  {
    id: 22,
    name: "utensil holder",
    image:
      "https://png.pngtree.com/png-vector/20240617/ourmid/pngtree-3d-utensil-holder-kitchen-wood-on-transparent-background-png-image_12792051.png",
    category: "Organization & storage",
    start: 4,
    newPrice: 30,
    oldPrice: 66,
    outOfStock: true,
  },
  {
    id: 23,
    name: "knife holder",
    image:
      "https://officialpsds.com/imageview/ry/38/ry384k_large.png?1528036623",
    category: "Organization & storage",
    start: 4,
    newPrice: 30,
    oldPrice: 66,
    inStock: true,
  },
  {
    id: 24,
    name: "screw driver ",
    image: "https://pngimg.com/d/screwdriver_PNG9498.png",
    category: "DIY & Repairs",
    start: 4,
    newPrice: 30,
    oldPrice: 66,
    inStock: true,
  },
  {
    id: 25,
    name: "electric drill",
    image: "https://pngimg.com/d/drill_PNG47.png",
    category: "DIY & Repairs",
    start: 4,
    newPrice: 30,
    oldPrice: 66,
    outOfStock: true,
  },
  {
    id: 27,
    name: "flash light",
    image: "https://pngimg.com/d/flashlight_PNG55977.png",
    category: "DIY & Repairs",
    start: 4,
    newPrice: 30,
    oldPrice: 66,
    outOfStock: true,
  },
  {
    id: 28,
    name: "hangers for cloths and utensils",
    image:
      "https://static.vecteezy.com/system/resources/previews/049/678/807/non_2x/wooden-wall-rack-with-five-hooks-for-organizing-items-at-home-cut-out-transparent-png.png",
    category: "DIY & Repairs",
    start: 4,
    newPrice: 30,
    oldPrice: 66,
    outOfStock: true,
  },
  {
    id: 29,
    name: "multi meter",
    image:
      "https://png.pngtree.com/png-vector/20220630/ourmid/pngtree-cartoon-multimeter-electrical-equipment-png-image_5633205.png",
    category: "DIY & Repairs",
    start: 4,
    newPrice: 30,
    oldPrice: 66,
    outOfStock: true,
  },
  {
    id: 30,
    name: "Safety glasses",
    image:
      "https://png.pngtree.com/png-clipart/20231015/original/pngtree-safety-glasses-cutout-png-file-png-image_13302548.png",
    category: "DIY & Repairs",
    start: 4,
    newPrice: 30,
    oldPrice: 66,
    outOfStock: true,
  },
  {
    id: 32,
    name: "putty knife",
    image:
      "https://png.pngtree.com/png-clipart/20220103/original/pngtree-stainless-steel-putty-knife-png-image_7015690.png",
    category: "DIY & Repairs",
    start: 4,
    newPrice: 30,
    oldPrice: 66,
    outOfStock: true,
  },

  {
    id: 26,
    name: "hangers for cloths and utensils",
    image:
      "https://static.vecteezy.com/system/resources/previews/049/678/807/non_2x/wooden-wall-rack-with-five-hooks-for-organizing-items-at-home-cut-out-transparent-png.png",
    category: "DIY & Repairs",
    start: 4,
    newPrice: 30,
    oldPrice: 66,
    outOfStock: true,
  },
  {
    id: 26,
    name: "hangers for cloths and utensils",
    image:
      "https://static.vecteezy.com/system/resources/previews/049/678/807/non_2x/wooden-wall-rack-with-five-hooks-for-organizing-items-at-home-cut-out-transparent-png.png",
    category: "DIY & Repairs",
    start: 4,
    newPrice: 30,
    oldPrice: 66,
    outOfStock: true,
  },
];

export default product;
