require 'open-uri'
require 'geocoder'
User.destroy_all
user_list = [
  [ "60 Queen St W, Toronto", Geocoder.search("60 Queen St W, Toronto").first.coordinates[0], Geocoder.search("60 Queen St W, Toronto").first.coordinates[1]],
  [ "111 Lombard St, Toronto", Geocoder.search("111 Lombard St, Toronto").first.coordinates[0], Geocoder.search("111 Lombard St, Toronto").first.coordinates[1] ],
  [ "350 Victoria St, Toronto", Geocoder.search("350 Victoria St, Toronto").first.coordinates[0], Geocoder.search("350 Victoria St, Toronto").first.coordinates[1] ],
  [ "600 University Ave, Toronto", Geocoder.search("600 University Ave, Toronto").first.coordinates[0], Geocoder.search("600 University Ave, Toronto").first.coordinates[1] ],
  [ "66 Nassau St, Toronto", Geocoder.search("66 Nassau St, Toronto").first.coordinates[0], Geocoder.search("66 Nassau St, Toronto").first.coordinates[1] ]
]

user = User.create!(
  name: 'Alison',
  email: 'dog_lover@gmail.com',
  password: "password",
  location: "124 Ossington Ave, Toronto",
  lat: 43.647115,
  lng: -79.419895,
  dog_name: "Rupert",
  primary_image: 'https://i.imgur.com/NpoVbey.jpg',
  image_2: 'https://i.imgur.com/wjrjuwC.jpg',
  image_3: 'https://i.imgur.com/UJvbNyT.jpg',
  image_4: 'https://i.imgur.com/B8cdnDE.jpg',
  image_5: 'https://i.imgur.com/yNqaPoI.jpg',
  bio: "Hello!",
  playful: true,
  affectionate: true,
  high_energy: true,
  shy: false,
  well_trained: true,
  large: true 
)

user2 = User.create!(
    name: 'Trysh',
    email: 'benny@gmail.com',
    password: "password",
    location: "1030 King St W, Toronto",
    lat: 43.641306,
    lng: -79.41565,
    dog_name: "Benny",
    primary_image: 'https://i.imgur.com/sl6pWhU.jpg',
    image_2: 'https://i.imgur.com/dZxPM6P.jpg',
    image_3: 'https://i.imgur.com/VxDBJuO.jpg',
    image_4: 'https://i.imgur.com/EaOwpQu.jpg',
    image_5: 'https://i.imgur.com/VhtVUU5.jpg',
    bio: "Hi!",
    playful: true,
    affectionate: true,
    high_energy: true,
    shy: false,
    well_trained: false,
    large: false
  )

Conversation.destroy_all
user_list.each do |location, lat, lng|
  newUser = User.create!(
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
  if user != ''
    Conversation.create!(
    initiator: user,
    recipient: newUser,
    created_at: '2021-02-16',
    updated_at: '2021-02-16'
    )
  end
  if user != ''
    Favorite.create!(
      favoriter: user,
      favoritee: newUser,
      created_at: '2021-02-16',
      updated_at: '2021-02-16'
    )
  end
  user = newUser

end
# # Conversations
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