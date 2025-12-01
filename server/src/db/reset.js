// src/db/reset.js
import { pool } from "./pool.js";

async function reset() {
  try {
    console.log("🔥 Resetting database...");

    // Drop tables in correct order (comments depends on recipes)
    await pool.query(`DROP TABLE IF EXISTS comments;`);
    await pool.query(`DROP TABLE IF EXISTS recipes;`);

    console.log("✅ Dropped existing tables.");

    // Recreate recipes table (with category)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS recipes (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        category TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Recreate comments table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
        user_name TEXT NOT NULL,
        comment TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("✅ Recreated tables.");

    // ---- 50 RECIPES ----
    const recipes = [
      // 1–25 cooking
      {
        title: "Classic Spaghetti Bolognese",
        description: "Rich beef bolognese with tomatoes, herbs and red wine.",
        image_url: "https://example.com/spaghetti-bolognese.jpg",
        category: "cooking",
      },
      {
        title: "Creamy Garlic Chicken Thighs",
        description: "Pan-fried chicken thighs in a creamy garlic and herb sauce.",
        image_url: "https://example.com/creamy-garlic-chicken.jpg",
        category: "cooking",
      },
      {
        title: "Chicken Tikka Flatbreads",
        description: "Marinated chicken tikka served on warm soft flatbreads.",
        image_url: "https://example.com/chicken-tikka-flatbreads.jpg",
        category: "cooking",
      },
      {
        title: "One-Pan Sausage & Veg Traybake",
        description: "Roasted sausages with peppers, onions and potatoes.",
        image_url: "https://example.com/sausage-traybake.jpg",
        category: "cooking",
      },
      {
        title: "Sticky Honey Soy Chicken",
        description: "Oven-baked chicken in a sticky honey soy glaze.",
        image_url: "https://example.com/honey-soy-chicken.jpg",
        category: "cooking",
      },
      {
        title: "Beef Chilli Con Carne",
        description: "Comforting chilli with kidney beans, peppers and spices.",
        image_url: "https://example.com/chilli-con-carne.jpg",
        category: "cooking",
      },
      {
        title: "Slow Cooker Pulled Pork",
        description: "Tender pulled pork cooked low and slow in BBQ sauce.",
        image_url: "https://example.com/pulled-pork.jpg",
        category: "cooking",
      },
      {
        title: "Veggie Lentil Curry",
        description: "Creamy coconut lentil curry with spinach and tomatoes.",
        image_url: "https://example.com/lentil-curry.jpg",
        category: "cooking",
      },
      {
        title: "Chicken Fajita Bowls",
        description: "Spiced chicken strips with peppers, rice and salsa.",
        image_url: "https://example.com/chicken-fajita-bowls.jpg",
        category: "cooking",
      },
      {
        title: "Garlic Butter Prawns",
        description: "Juicy prawns cooked quickly in garlic butter and lemon.",
        image_url: "https://example.com/garlic-butter-prawns.jpg",
        category: "cooking",
      },
      {
        title: "Creamy Tomato Pasta",
        description: "Penne in a creamy tomato and basil sauce.",
        image_url: "https://example.com/creamy-tomato-pasta.jpg",
        category: "cooking",
      },
      {
        title: "Chicken & Halloumi Pittas",
        description: "Grilled chicken and halloumi stuffed in warm pittas.",
        image_url: "https://example.com/chicken-halloumi-pittas.jpg",
        category: "cooking",
      },
      {
        title: "Lemon Herb Roast Chicken",
        description: "Whole roast chicken with lemon, thyme and garlic.",
        image_url: "https://example.com/lemon-roast-chicken.jpg",
        category: "cooking",
      },
      {
        title: "Beef Stir Fry Noodles",
        description: "Quick stir fry with beef strips, noodles and veg.",
        image_url: "https://example.com/beef-stir-fry-noodles.jpg",
        category: "cooking",
      },
      {
        title: "Creamy Pesto Chicken Pasta",
        description: "Chicken and pasta tossed in a creamy pesto sauce.",
        image_url: "https://example.com/creamy-pesto-pasta.jpg",
        category: "cooking",
      },
      {
        title: "Homemade Chicken Korma",
        description: "Mild creamy curry with chicken, coconut and almonds.",
        image_url: "https://example.com/chicken-korma.jpg",
        category: "cooking",
      },
      {
        title: "BBQ Chicken Skewers",
        description: "Skewered chicken pieces in a sweet smoky BBQ marinade.",
        image_url: "https://example.com/bbq-chicken-skewers.jpg",
        category: "cooking",
      },
      {
        title: "Mediterranean Baked Cod",
        description: "Cod fillets baked with tomatoes, olives and herbs.",
        image_url: "https://example.com/mediterranean-cod.jpg",
        category: "cooking",
      },
      {
        title: "Loaded Chicken Nachos",
        description: "Crispy nachos topped with chicken, cheese and salsa.",
        image_url: "https://example.com/chicken-nachos.jpg",
        category: "cooking",
      },
      {
        title: "Creamy Tuscan Chicken",
        description: "Chicken in a creamy garlic sauce with spinach and sun-dried tomatoes.",
        image_url: "https://example.com/tuscan-chicken.jpg",
        category: "cooking",
      },
      {
        title: "Sweet & Sour Chicken",
        description: "Crispy chicken pieces in a tangy sweet and sour sauce.",
        image_url: "https://example.com/sweet-sour-chicken.jpg",
        category: "cooking",
      },
      {
        title: "Chicken & Chorizo Rice Bake",
        description: "Baked rice with chicken, chorizo and peppers.",
        image_url: "https://example.com/chicken-chorizo-rice.jpg",
        category: "cooking",
      },
      {
        title: "Creamy Mushroom Chicken",
        description: "Pan-fried chicken in a creamy mushroom sauce.",
        image_url: "https://example.com/mushroom-chicken.jpg",
        category: "cooking",
      },
      {
        title: "Teriyaki Chicken Stir Fry",
        description: "Chicken and veg in a sticky teriyaki sauce with rice.",
        image_url: "https://example.com/teriyaki-chicken.jpg",
        category: "cooking",
      },
      {
        title: "Peri Peri Chicken Traybake",
        description: "Spicy peri peri chicken roasted with potatoes and corn.",
        image_url: "https://example.com/peri-peri-chicken.jpg",
        category: "cooking",
      },

      // 26–50 baking
      {
        title: "Double Chocolate Brownies",
        description: "Super fudgy brownies with melted chocolate chunks.",
        image_url: "https://example.com/double-choc-brownies.jpg",
        category: "baking",
      },
      {
        title: "Banana Bread Loaf",
        description: "Moist banana bread with cinnamon and vanilla.",
        image_url: "https://example.com/banana-bread.jpg",
        category: "baking",
      },
      {
        title: "Lemon Drizzle Cake",
        description: "Soft sponge soaked in sharp lemon syrup.",
        image_url: "https://example.com/lemon-drizzle.jpg",
        category: "baking",
      },
      {
        title: "Chocolate Chip Cookies",
        description: "Chewy cookies with melted chocolate chips.",
        image_url: "https://example.com/choc-chip-cookies.jpg",
        category: "baking",
      },
      {
        title: "Victoria Sponge Cake",
        description: "Classic sponge filled with jam and whipped cream.",
        image_url: "https://example.com/victoria-sponge.jpg",
        category: "baking",
      },
      {
        title: "Cinnamon Swirl Rolls",
        description: "Soft rolls with cinnamon sugar and icing.",
        image_url: "https://example.com/cinnamon-rolls.jpg",
        category: "baking",
      },
      {
        title: "Baked New York Cheesecake",
        description: "Creamy vanilla cheesecake on a biscuit base.",
        image_url: "https://example.com/new-york-cheesecake.jpg",
        category: "baking",
      },
      {
        title: "Raspberry Muffins",
        description: "Light muffins packed with fresh raspberries.",
        image_url: "https://example.com/raspberry-muffins.jpg",
        category: "baking",
      },
      {
        title: "Carrot Cake with Cream Cheese Frosting",
        description: "Spiced carrot sponge with creamy frosting.",
        image_url: "https://example.com/carrot-cake.jpg",
        category: "baking",
      },
      {
        title: "Chocolate Fudge Cake",
        description: "Rich chocolate sponge with fudge icing.",
        image_url: "https://example.com/chocolate-fudge-cake.jpg",
        category: "baking",
      },
      {
        title: "Apple Crumble",
        description: "Baked apples topped with buttery crumble.",
        image_url: "https://example.com/apple-crumble.jpg",
        category: "baking",
      },
      {
        title: "Peanut Butter Blondies",
        description: "Soft blondies with peanut butter and chocolate chunks.",
        image_url: "https://example.com/peanut-butter-blondies.jpg",
        category: "baking",
      },
      {
        title: "Chocolate Orange Loaf Cake",
        description: "Moist chocolate loaf with orange zest.",
        image_url: "https://example.com/choc-orange-loaf.jpg",
        category: "baking",
      },
      {
        title: "Millionaire’s Shortbread",
        description: "Shortbread topped with caramel and chocolate.",
        image_url: "https://example.com/millionaires-shortbread.jpg",
        category: "baking",
      },
      {
        title: "Red Velvet Cupcakes",
        description: "Fluffy red velvet cupcakes with cream cheese frosting.",
        image_url: "https://example.com/red-velvet-cupcakes.jpg",
        category: "baking",
      },
      {
        title: "Oreo Cookie Bars",
        description: "Cookie bar traybake packed with Oreo pieces.",
        image_url: "https://example.com/oreo-cookie-bars.jpg",
        category: "baking",
      },
      {
        title: "Biscoff Cheesecake Bars",
        description: "No-bake cheesecake bars with Biscoff spread.",
        image_url: "https://example.com/biscoff-cheesecake-bars.jpg",
        category: "baking",
      },
      {
        title: "White Chocolate & Raspberry Blondies",
        description: "Blondies loaded with white chocolate and raspberries.",
        image_url: "https://example.com/white-choc-raspberry-blondies.jpg",
        category: "baking",
      },
      {
        title: "Rocky Road Traybake",
        description: "Chocolate, marshmallows and biscuits pressed into a tray.",
        image_url: "https://example.com/rocky-road.jpg",
        category: "baking",
      },
      {
        title: "Gooey Chocolate Lava Cakes",
        description: "Individual chocolate cakes with molten centres.",
        image_url: "https://example.com/chocolate-lava-cakes.jpg",
        category: "baking",
      },
      {
        title: "Jam-Filled Donut Muffins",
        description: "Baked muffins rolled in sugar with jam centres.",
        image_url: "https://example.com/jam-donut-muffins.jpg",
        category: "baking",
      },
      {
        title: "Salted Caramel Brownies",
        description: "Fudgy brownies swirled with salted caramel.",
        image_url: "https://example.com/salted-caramel-brownies.jpg",
        category: "baking",
      },
      {
        title: "Funfetti Birthday Cake",
        description: "Vanilla sponge with colourful sprinkles.",
        image_url: "https://example.com/funfetti-cake.jpg",
        category: "baking",
      },
      {
        title: "Nutella Swirl Banana Bread",
        description: "Banana loaf swirled with Nutella.",
        image_url: "https://example.com/nutella-banana-bread.jpg",
        category: "baking",
      },
      {
        title: "Triple Chocolate Cookies",
        description: "Dark, milk and white chocolate chunk cookies.",
        image_url: "https://example.com/triple-choc-cookies.jpg",
        category: "baking",
      }
    ];

    for (const r of recipes) {
      await pool.query(
        `INSERT INTO recipes (title, description, image_url, category)
         VALUES ($1, $2, $3, $4);`,
        [r.title, r.description, r.image_url, r.category]
      );
    }

    console.log(`✅ Inserted ${recipes.length} recipes.`);

    // ---- 50 COMMENTS ----
    // Two comments each for recipes 1–25 (2 * 25 = 50)
    const comments = [
      { recipe_id: 1, user_name: "Phil", comment: "Made this tonight, whole family loved it!" },
      { recipe_id: 1, user_name: "Jane", comment: "Added extra garlic, was perfect." },

      { recipe_id: 2, user_name: "Tom", comment: "Really creamy and comforting." },
      { recipe_id: 2, user_name: "Sarah", comment: "Served with mash and green beans, so good." },

      { recipe_id: 3, user_name: "Lucy", comment: "Flatbreads were a hit for Friday fakeaway." },
      { recipe_id: 3, user_name: "Phil", comment: "Super easy marinade, will make again." },

      { recipe_id: 4, user_name: "Jake", comment: "Great one-pan dinner, barely any washing up." },
      { recipe_id: 4, user_name: "Amelia", comment: "Kids loved the crispy potatoes." },

      { recipe_id: 5, user_name: "Hannah", comment: "Sticky glaze was unreal!" },
      { recipe_id: 5, user_name: "Phil", comment: "Works great with chicken thighs." },

      { recipe_id: 6, user_name: "Marcus", comment: "Perfect chilli for batch cooking." },
      { recipe_id: 6, user_name: "Ellie", comment: "I added a bit of dark chocolate, delicious." },

      { recipe_id: 7, user_name: "Dan", comment: "Pulled pork sliders were amazing." },
      { recipe_id: 7, user_name: "Laura", comment: "Leftovers froze really well." },

      { recipe_id: 8, user_name: "Matt", comment: "Nice veggie option, very filling." },
      { recipe_id: 8, user_name: "Priya", comment: "Loved the coconut flavour." },

      { recipe_id: 9, user_name: "Chris", comment: "Meal prep friendly and tasty." },
      { recipe_id: 9, user_name: "Zoe", comment: "Kids made their own bowls, fun dinner." },

      { recipe_id: 10, user_name: "Nina", comment: "Cooked in minutes, ideal for busy nights." },
      { recipe_id: 10, user_name: "Rob", comment: "Served with crusty bread, perfect." },

      { recipe_id: 11, user_name: "James", comment: "Simple, quick and tasty pasta." },
      { recipe_id: 11, user_name: "Emily", comment: "Added spinach for extra veg." },

      { recipe_id: 12, user_name: "Phil", comment: "Halloumi and chicken combo is elite." },
      { recipe_id: 12, user_name: "Katie", comment: "Great for a Saturday night." },

      { recipe_id: 13, user_name: "Ben", comment: "Roast chicken turned out super juicy." },
      { recipe_id: 13, user_name: "Jo", comment: "Lemon flavour was lovely and fresh." },

      { recipe_id: 14, user_name: "Ollie", comment: "Stir fry sauce was spot on." },
      { recipe_id: 14, user_name: "Sophie", comment: "Used udon noodles and it worked great." },

      { recipe_id: 15, user_name: "Leah", comment: "Pesto and cream is such a good combo." },
      { recipe_id: 15, user_name: "Gavin", comment: "Whole family smashed this." },

      { recipe_id: 16, user_name: "Maya", comment: "Nice mild curry for the kids." },
      { recipe_id: 16, user_name: "Phil", comment: "I chucked in some toasted almonds too." },

      { recipe_id: 17, user_name: "Rachel", comment: "Perfect for BBQ season." },
      { recipe_id: 17, user_name: "Ali", comment: "Marinated overnight, flavour was insane." },

      { recipe_id: 18, user_name: "Sam", comment: "Light and tasty, loved the olives." },
      { recipe_id: 18, user_name: "Chloe", comment: "Nice change from battered fish." },

      { recipe_id: 19, user_name: "Grant", comment: "Ideal for movie night snacks." },
      { recipe_id: 19, user_name: "Becky", comment: "Loaded mine with jalapeños and sour cream." },

      { recipe_id: 20, user_name: "Isla", comment: "Sauce was so flavourful." },
      { recipe_id: 20, user_name: "Callum", comment: "Served with garlic bread, banging." },

      { recipe_id: 21, user_name: "Dexter", comment: "Proper takeaway vibes at home." },
      { recipe_id: 21, user_name: "Jess", comment: "Kids preferred it to shop-bought." },

      { recipe_id: 22, user_name: "Noah", comment: "Great one-pan rice dinner." },
      { recipe_id: 22, user_name: "Lily", comment: "Chorizo added loads of flavour." },

      { recipe_id: 23, user_name: "Imogen", comment: "Creamy sauce was lush." },
      { recipe_id: 23, user_name: "Jamie", comment: "Used chestnut mushrooms, worked well." },

      { recipe_id: 24, user_name: "Megan", comment: "Super quick weeknight winner." },
      { recipe_id: 24, user_name: "Phil", comment: "Used leftover veg from the fridge." },

      { recipe_id: 25, user_name: "Harriet", comment: "Nice and spicy, just how we like it." },
      { recipe_id: 25, user_name: "Tom", comment: "Paired with corn on the cob, unreal." }
    ];

    for (const c of comments) {
      await pool.query(
        `INSERT INTO comments (recipe_id, user_name, comment)
         VALUES ($1, $2, $3);`,
        [c.recipe_id, c.user_name, c.comment]
      );
    }

    console.log(`✅ Inserted ${comments.length} comments.`);
    console.log("🎉 Database reset and seeded successfully!");
  } catch (error) {
    console.error("❌ Error resetting database:", error);
  } finally {
    await pool.end();
    console.log("🛑 Pool closed.");
  }
}

reset();
