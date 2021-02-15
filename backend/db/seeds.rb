# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri' 
require 'geocoder'

# Users
User.destroy_all

user_list = [
  [ "60 Queen St W, Toronto", Geocoder.search("60 Queen St W, Toronto").first.coordinates[0], Geocoder.search("60 Queen St W, Toronto").first.coordinates[1]],
  [ "111 Lombard St, Toronto", Geocoder.search("111 Lombard St, Toronto").first.coordinates[0], Geocoder.search("111 Lombard St, Toronto").first.coordinates[1] ],
  [ "350 Victoria St, Toronto", Geocoder.search("350 Victoria St, Toronto").first.coordinates[0], Geocoder.search("350 Victoria St, Toronto").first.coordinates[1] ],
  [ "600 University Ave, Toronto", Geocoder.search("600 University Ave, Toronto").first.coordinates[0], Geocoder.search("600 University Ave, Toronto").first.coordinates[1] ],
  [ "66 Nassau St, Toronto", Geocoder.search("66 Nassau St, Toronto").first.coordinates[0], Geocoder.search("66 Nassau St, Toronto").first.coordinates[1] ]
]

<<<<<<< HEAD
<<<<<<< HEAD
  postalCode = first + second + third + fourth + fifth + sixth
end

<<<<<<< HEAD
<<<<<<< HEAD
User.create!(
  name: "Alison",
  email: "alisonhussey@gmail.com",
  password: "asd"
)
=======
<<<<<<< HEAD
=======
>>>>>>> main
2.times do
  User.create(
=======
def getLatLng(postalCode)
  lat = JSON.parse(open('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDxIOZYjqhufR8C8Frdo4XhWeCvi7xWWvg&address=#{postalCode}').read)["message"]
end
<<<<<<< HEAD
>>>>>>> main
=======
>>>>>>> main

10.times do
  randomPostalCode = genPostalCode
  lat = getLatLng(randomPostalCode)

  User.create!(
>>>>>>> feature/map
    name: Faker::Name.name,
    email: Faker::Internet.unique.email,
    password: "password",
    location: lat,
=======
=======
>>>>>>> feature/map
user_list.each do |location, lat, lng|
  User.create!(
    name: Faker::Name.name,
    email: Faker::Internet.unique.email,
    password: "password",
    location: location,
    lat: lat,
    lng: lng,
    dog_name: Faker::Creature::Dog.name,
    primary_image: JSON.parse(open('https://dog.ceo/api/breeds/image/random').read)["message"],
    bio: Faker::Lorem.paragraph,
    playful: Faker::Boolean.boolean(true_ratio: 0.5),
    affectionate: Faker::Boolean.boolean(true_ratio: 0.5),
    high_energy: Faker::Boolean.boolean(true_ratio: 0.5),
    shy: Faker::Boolean.boolean(true_ratio: 0.5),
    well_trained: Faker::Boolean.boolean(true_ratio: 0.5),
    large: Faker::Boolean.boolean(true_ratio: 0.5)
  )
end

# Conversations
# Conversation.destroy_all
# User.conversations.create(
#   initiator: 2,
#   recipient: 3
# )

# # Messages
# Message.destroy_all

# 5.times do 
#   Message.create!(
#     content: Faker::Lorem.paragraph(sentence_count: 2),
#     user_id: 4,
#     conversation_id: 1
#   )
# end



# # Favorites
# Favorite.destroy_all

# Favorite.create!(
#   favoriter: 1,
#   favoritee: 2
# )

