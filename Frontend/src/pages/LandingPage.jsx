import React, { useEffect } from 'react'
import { Timer, Soup, ShoppingBag, Star, MoveRight } from 'lucide-react'
import Button from '../components/ui/Button';
import { useNavigate } from "react-router";
import ProductCard from '../components/ProductCard';
import { useProducts } from '../contexts/ProductContext';

function LandingPage() {
  const { products } = useProducts();
  useEffect(() => {
    document.title = "Yummy Ready Food || Home";
  }, []);
  const navigate = useNavigate();

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
              {products.filter(meal => meal.isSpecial).map((meal, index) => (
                <ProductCard key={meal._id} product={meal} />
              ))}
            </div>
            <Button className="mt-[3rem] bg-orange-500 text-white hover:bg-orange-600"
              onClick={() => navigate('/shop')}
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

        {/* <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12 text-orange-500">What Our Customers Say</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Sarah L.", comment: "Yummy Ready Food has made weeknight dinners so much easier and more enjoyable!" },
                { name: "Mike T.", comment: "The quality of ingredients is top-notch, and the meals are always delicious." },
                { name: "Emily R.", comment: "I love the convenience of having fresh, pre-portioned meals delivered to my door." }
              ].map((testimonial, index) => (
                <div key={index} className="flex flex-col p-6 bg-white rounded-lg shadow-lg">
                  <Star className="h-6 w-6 text-orange-500 mb-4" />
                  <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                  <p className="font-bold">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-100">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12 text-orange-500">Get Started Today</h2>
            <p className="max-w-[600px] mx-auto text-gray-700 mb-12">Experience the convenience and taste of Yummy Ready Food. Sign up today and enjoy your first delivery!</p>
            <Button className="bg-orange-500 text-white hover:bg-orange-600"
              onClick={() => navigate('/signup')}
            >Sign Up Now</Button>
          </div>
        </section> */}
      </main>
    </div>
  )
}

export default LandingPage
