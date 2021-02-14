# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri' 

# Users
User.destroy_all

def genPostalCode
  first = ['M', 'L'].shuffle.first
  second = rand(10).to_s
  third = ('A'..'P').to_a.sample
  fourth = rand(10).to_s
  fifth = ('A'..'P').to_a.sample
  sixth = rand(10).to_s

  postalCode = first + second + third + fourth + fifth + sixth
end

2.times do
  User.create(
    name: Faker::Name.name,
    email: Faker::Internet.unique.email,
    password: "password",
    location: genPostalCode,
    dog_name: Faker::Creature::Dog.name,
    primary_image: JSON.parse(open('https://dog.ceo/api/breeds/image/random').read)["message"],
    image_2: Faker::LoremFlickr.image(search_terms: ['person']),
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

