import React, { useEffect } from 'react'
import { Timer, Soup, ShoppingBag, Star, MoveRight } from 'lucide-react'
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function LandingPage() {
  useEffect(() => {
    document.title = "Yummy Ready Food || Home";
  }, []);
  const navigate = useNavigate();
  
  const products=[{
      "_id":  "670fc617de73bda08d0bb6dd",
      "name": "Shingara",
      "price": 130,
      "category": "Snacks",
      "description": "Classic Bengali snack. Enjoy 12 crispy shingaras filled with a savory potato mix.",
      "rating": 4.5,
      "reviews": 120,
      "itemAvailable": 88,
      "imagePath": "/products/shingara.jpg",
      "isSpecial": true,
      "createdAt": {
        "$date": "2024-10-16T13:56:39.017Z"
      },
      "updatedAt": {
        "$date": "2025-03-16T12:17:35.652Z"
      },
      "__v": 0
    },
    {
      "_id": "670fc624de73bda08d0bb6df",
      "name": "Chicken Samucha",
      "price": 150,
      "category": "Snacks",
      "description": "Delicious samucha filled with juicy chicken and flavorful spices. Includes 12 pieces in one packet.",
      "rating": 4.5,
      "reviews": 120,
      "itemAvailable": 41,
      "imagePath": "/products/samucha.jpg",
      "isSpecial": true,
      "createdAt": {
        "$date": "2024-10-16T13:56:52.331Z"
      },
      "updatedAt": {
        "$date": "2025-03-16T12:17:36.111Z"
      },
      "__v": 0
    },
    {
      "_id": "670fc62ede73bda08d0bb6e1",
      "name": "Chicken Roll",
      "price": 150,
      "category": "Snacks",
      "description": "Flaky chicken rolls with 12 pieces, packed with flavor for a filling snack.",
      "rating": 4.5,
      "reviews": 120,
      "itemAvailable": 78,
      "imagePath": "/products/roll.jpg",
      "isSpecial": true,
      "createdAt": {
        "$date": "2024-10-16T13:57:02.472Z"
      },
      "updatedAt": {
        "$date": "2024-10-28T03:32:56.609Z"
      },
      "__v": 0
    },
    {
      "_id": "670fc63ade73bda08d0bb6e3",
      "name": "Paratha",
      "price": 120,
      "category": "Breads",
      "description": "Delicious, flaky flatbread perfect for breakfast or as a side dish. Comes in a pack of 5.",
      "rating": 4.5,
      "reviews": 120,
      "itemAvailable": 95,
      "imagePath": "/products/paratha.jpg",
      "isSpecial": false,
      "createdAt": {
        "$date": "2024-10-16T13:57:14.630Z"
      },
      "updatedAt": {
        "$date": "2024-10-26T12:47:50.833Z"
      },
      "__v": 0
    }
  ]


  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-orange-100">
          <div className="container px-4 md:px-6 mx-auto grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-orange-500">
                Delicious Meals, Ready to Cook
              </h1>
              <p className="max-w-[600px] text-gray-700 md:text-xl">
                Fresh ingredients and pre-portioned meals delivered to your door. Enjoy home-cooked meals without the hassle.
              </p>
              <div className="flex gap-2 min-[400px]:flex-row">
                <Button className="bg-orange-500 text-white hover:bg-orange-600"
                  onClick={() => navigate('/shop')}
                >Get Started</Button>
              </div>
            </div>
            <img
              alt="Delicious ready-to-cook meal"
              className="mx-auto rounded-xl object-cover sm:w-[600px]"
              src="/images/hero.jpg"
            />
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12 text-orange-500">Why Choose Yummy Ready Food?</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[{
                Icon: Timer, title: "Save Time", description: "Skip the grocery store. We deliver everything you need for delicious meals."
              }, {
                Icon: Soup, title: "Easy to Prepare", description: "Pre-portioned ingredients make cooking a breeze, even for beginners."
              }, {
                Icon: ShoppingBag, title: "Fresh Ingredients", description: "We source the freshest, highest-quality ingredients for every meal."
              }].map(({ Icon, title, description }, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Icon className="h-12 w-12 mb-4 text-orange-500" />
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-100">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12 text-orange-500">Featured Meals</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {products.filter(meal => meal.isSpecial).map((meal) => (
                <ProductCard key={meal._id} product={meal} />
              ))}
            </div>
            <Button className="mt-[3rem] bg-orange-500 text-white hover:bg-orange-600"
            >
              View All Products <MoveRight className="inline-block mr-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12 text-orange-500">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { step: 1, title: "Choose Your Meals", description: "Browse our menu and select your favorite pre-portioned meals." },
                { step: 2, title: "We Deliver", description: "We'll deliver fresh, pre-portioned ingredients to your door." },
                { step: 3, title: "Heat and Enjoy", description: "Simply heat up your meal and enjoy a delicious, home-style dinner." }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LandingPage
