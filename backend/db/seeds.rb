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