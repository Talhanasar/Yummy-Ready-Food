import React from 'react'
import { ChefHat, Truck, Heart, Star } from 'lucide-react'
import TeamMember from '../components/TemMember'

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-100">
          <div className="container px-4 md:px-6 mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 text-orange-500">
              About Yummy Ready Food
            </h1>
            <p className="max-w-[700px] text-gray-700 md:text-xl text-center mx-auto mb-12">
              We're passionate about making delicious, home-cooked meals accessible to everyone, no matter how busy their lifestyle.
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
              <div className="flex flex-col items-center text-center">
                <ChefHat className="h-12 w-12 mb-4 text-orange-500" />
                <h3 className="text-xl font-bold mb-2">Quality Ingredients</h3>
                <p className="text-gray-600">We source only the freshest, highest-quality ingredients for our meal kits.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="h-12 w-12 mb-4 text-orange-500" />
                <h3 className="text-xl font-bold mb-2">Convenient Delivery</h3>
                <p className="text-gray-600">We deliver pre-portioned ingredients right to your doorstep.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Heart className="h-12 w-12 mb-4 text-orange-500" />
                <h3 className="text-xl font-bold mb-2">Healthy Options</h3>
                <p className="text-gray-600">We offer a variety of nutritious meal options to suit different dietary needs.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Star className="h-12 w-12 mb-4 text-orange-500" />
                <h3 className="text-xl font-bold mb-2">Customer Satisfaction</h3>
                <p className="text-gray-600">We're committed to ensuring our customers love every meal they make with us.</p>
              </div>
            </div>
            <div className="mb-12">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl text-center mb-8 text-orange-500">
                Our Story
              </h2>
              <p className="max-w-[700px] text-gray-700 md:text-lg text-center mx-auto mb-6">
                Yummy Ready Food was founded in 2023 by a group of food enthusiasts who believed that everyone deserves to enjoy delicious, home-cooked meals, regardless of their cooking skills or time constraints.
              </p>
              <p className="max-w-[700px] text-gray-700 md:text-lg text-center mx-auto">
                What started as a small operation has grown into a beloved meal kit service, helping thousands of busy individuals and families enjoy the pleasure of cooking and eating together.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl text-center mb-8 text-orange-500">
                Meet Our Team
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <TeamMember
                  name="Tanjimul Hoque Latifi"
                  role="Founder & CEO"
                  image="/members/tanjim.jpg"
                />
                <TeamMember
                  name="Michael Rodriguez"
                  role="Head Chef"
                  image="/placeholder.svg"
                />
                <TeamMember
                  name="Sarah Johnson"
                  role="Nutritionist"
                  image="/placeholder.svg"
                />
                <TeamMember
                  name="Talha"
                  role="Web Developer"
                  image="/members/talha.jpg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}