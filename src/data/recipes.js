import grid1 from "../images/grid-1.png";
import grid2 from "../images/grid-2.png";
import grid3 from "../images/grid-3.png";
import grid4 from "../images/grid-4.png";
import grid5 from "../images/grid-5.png";
import grid6 from "../images/grid-6.png";

export const recipes = [
  {
    id: "fresh-salad-bowl",
    title: "Fresh Salad Bowl",
    image: grid2,
    description: "Crisp greens with a zesty lemon dressing.",
    prepTime: 10,
    servings: 2,
    ingredients: [
      "2 cups mixed leaves",
      "1 tbsp olive oil",
      "1 tsp lemon juice",
      "Salt & pepper",
    ],
    steps: [
      "Wash and dry the leaves.",
      "Whisk dressing and toss with leaves.",
      "Season to taste and serve.",
    ],
  },
  {
    id: "chocolate-chip-cookies",
    title: "Chocolate Chip Cookies",
    image: grid1,
    description: "Chewy centers, crisp edges — bakery style.",
    prepTime: 15,
    servings: 12,
    ingredients: ["Flour", "Butter", "Sugar", "Egg", "Chocolate chips"],
    steps: ["Mix wet & dry", "Portion scoops", "Bake until golden"],
  },
  {
    id: "berry-smoothie",
    title: "Berry Smoothie",
    image: grid3,
    description: "A creamy antioxidant boost.",
    prepTime: 5,
    servings: 1,
    ingredients: ["Berries", "Yogurt", "Honey", "Milk"],
    steps: ["Blend all until smooth", "Serve chilled"],
  },
  {
    id: "artisan-bread",
    title: "Artisan Bread",
    image: grid4,
    description: "Crusty outside, tender crumb.",
    prepTime: 20,
    servings: 8,
    ingredients: ["Flour", "Water", "Yeast", "Salt"],
    steps: ["Mix & knead", "Proof", "Shape & bake"],
  },
  {
    id: "sourdough-loaf",
    title: "Sourdough Loaf",
    image: grid5,
    description: "Slow ferment, deep flavor.",
    prepTime: 25,
    servings: 8,
    ingredients: ["Flour", "Water", "Starter", "Salt"],
    steps: ["Autolyse", "Stretch & fold", "Cold proof & bake"],
  },
  {
    id: "vanilla-cupcake",
    title: "Vanilla Cupcake",
    image: grid6,
    description: "Soft sponge with silky frosting.",
    prepTime: 20,
    servings: 6,
    ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Vanilla"],
    steps: ["Beat batter", "Bake", "Cool & frost"],
  },
];