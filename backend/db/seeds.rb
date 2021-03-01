require 'open-uri'
require 'geocoder'
User.destroy_all
user_list = [
  [ "60 Queen St W, Toronto", Geocoder.search("60 Queen St W, Toronto").first.coordinates[0], Geocoder.search("60 Queen St W, Toronto").first.coordinates[1]],
  [ "111 Lombard St, Toronto", Geocoder.search("111 Lombard St, Toronto").first.coordinates[0], Geocoder.search("111 Lombard St, Toronto").first.coordinates[1] ],
  [ "350 Victoria St, Toronto", Geocoder.search("350 Victoria St, Toronto").first.coordinates[0], Geocoder.search("350 Victoria St, Toronto").first.coordinates[1] ],
  [ "600 University Ave, Toronto", Geocoder.search("600 University Ave, Toronto").first.coordinates[0], Geocoder.search("600 University Ave, Toronto").first.coordinates[1] ],
  [ "593 Dundas St E, Toronto", Geocoder.search("593 Dundas St E, Toronto").first.coordinates[0], Geocoder.search("593 Dundas St E, Toronto").first.coordinates[1] ],
  [ "31 Howard St, Toronto", Geocoder.search("31 Howard St, Toronto").first.coordinates[0], Geocoder.search("31 Howard St, Toronto").first.coordinates[1] ],
  [ "202 Davenport Rd, Toronto", Geocoder.search("202 Davenport Rd, Toronto").first.coordinates[0], Geocoder.search("202 Davenport Rd, Toronto").first.coordinates[1] ],
  [ "1440 Bathurst St, Toronto", Geocoder.search("1440 Bathurst St, Toronto").first.coordinates[0], Geocoder.search("1440 Bathurst St, Toronto").first.coordinates[1] ],
  [ "167 Dupont St, Toronto", Geocoder.search("167 Dupont St, Toronto").first.coordinates[0], Geocoder.search("167 Dupont St, Toronto").first.coordinates[1] ],
  [ "375 Mt Pleasant Rd, Toronto", Geocoder.search("375 Mt Pleasant Rd, Toronto").first.coordinates[0], Geocoder.search("375 Mt Pleasant Rd, Toronto").first.coordinates[1] ],
  [ "1000 Gerrard St E, Toronto", Geocoder.search("1000 Gerrard St E, Toronto").first.coordinates[0], Geocoder.search("1000 Gerrard St E, Toronto").first.coordinates[1] ],
  [ "617 Gerrard St, Toronto", Geocoder.search("617 Gerrard St, Toronto").first.coordinates[0], Geocoder.search("617 Gerrard St, Toronto").first.coordinates[1] ],
  [ "920 Queen St E, Toronto", Geocoder.search("920 Queen St E, Toronto").first.coordinates[0], Geocoder.search("920 Queen St E, Toronto").first.coordinates[1] ],
  [ "550 Bayview Ave, Toronto", Geocoder.search("550 Bayview Ave, Toronto").first.coordinates[0], Geocoder.search("550 Bayview Ave, Toronto").first.coordinates[1] ],
  [ "490 Front St E, Toronto", Geocoder.search("490 Front St E, Toronto").first.coordinates[0], Geocoder.search("490 Front St E, Toronto").first.coordinates[1] ],
  [ "761 Dundas St E, Toronto", Geocoder.search("761 Dundas St E, Toronto").first.coordinates[0], Geocoder.search("761 Dundas St E, Toronto").first.coordinates[1] ],
  [ "201 Winchester St, Toronto", Geocoder.search("201 Winchester St, Toronto").first.coordinates[0], Geocoder.search("201 Winchester St, Toronto").first.coordinates[1] ],
  [ "2 Whitehall Rd, Toronto", Geocoder.search("2 Whitehall Rd, Toronto").first.coordinates[0], Geocoder.search("2 Whitehall Rd, Toronto").first.coordinates[1] ],
  [ "44 Price St, Toronto", Geocoder.search("44 Price St, Toronto").first.coordinates[0], Geocoder.search("44 Price St, Toronto").first.coordinates[1] ],
  [ "1 Forest Hill Rd, Toronto", Geocoder.search("1 Forest Hill Rd, Toronto").first.coordinates[0], Geocoder.search("1 Forest Hill Rd, Toronto").first.coordinates[1] ],
  [ "33 Forest Hill Rd, Toronto", Geocoder.search("33 Forest Hill Rd, Toronto").first.coordinates[0], Geocoder.search("33 Forest Hill Rd, Toronto").first.coordinates[1] ],
  [ "650 Dupont St, Toronto", Geocoder.search("650 Dupont St, Toronto").first.coordinates[0], Geocoder.search("650 Dupont St, Toronto").first.coordinates[1] ],
  [ "1076 Bloor St W, Toronto", Geocoder.search("1076 Bloor St W, Toronto").first.coordinates[0], Geocoder.search("1076 Bloor St W, Toronto").first.coordinates[1] ],
  [ "171 E Liberty St, Toronto", Geocoder.search("171 E Liberty St, Toronto").first.coordinates[0], Geocoder.search("171 E Liberty St, Toronto").first.coordinates[1] ]
]

user = User.create!(
  name: 'Alison',
  email: 'rupert@gmail.com',
  password: "password",
  location: "124 Ossington Ave, Toronto",
  lat: Geocoder.search("124 Ossington Ave, Toronto").first.coordinates[0],
  lng: Geocoder.search("124 Ossington Ave, Toronto").first.coordinates[1],
  dog_name: "Rupert",
  primary_image: 'https://i.imgur.com/NpoVbey.jpg',
  image_2: 'https://i.imgur.com/wjrjuwC.jpg',
  image_3: 'https://i.imgur.com/UJvbNyT.jpg',
  image_4: 'https://i.imgur.com/B8cdnDE.jpg',
  image_5: 'https://i.imgur.com/yNqaPoI.jpg',
  bio: "Hello! We're really excited to meet new friends, human and canine alike! Message us to set up a playdate!",
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
    lat: Geocoder.search("1030 King St W, Toronto").first.coordinates[0],
    lng: Geocoder.search("1030 King St W, Toronto").first.coordinates[1],
    dog_name: "Benny",
    primary_image: 'https://i.imgur.com/sl6pWhU.jpg',
    image_2: 'https://i.imgur.com/dZxPM6P.jpg',
    image_3: 'https://i.imgur.com/VxDBJuO.jpg',
    image_4: 'https://i.imgur.com/EaOwpQu.jpg',
    image_5: 'https://i.imgur.com/VhtVUU5.jpg',
    bio: "Hi! We're looking forward to meeting other dogs in the neghbour. Ben is both terrified of and drawn to bodies of water, so best if we go someplace dry to meet!",
    playful: true,
    affectionate: true,
    high_energy: true,
    shy: false,
    well_trained: false,
    large: false
  )
 
  user3 = User.create!(
    name: 'Ashley',
    email: 'inga@gmail.com',
    password: "password",
    location: "164 McCaul St, Toronto",
    lat: Geocoder.search("164 McCaul St, Toronto").first.coordinates[0],
    lng: Geocoder.search("164 McCaul St, Toronto").first.coordinates[1],
    dog_name: "Inga",
    primary_image: 'https://i.imgur.com/dSZiEIX.jpg',
    image_2: 'https://i.imgur.com/4Ba8H9y.jpg',
    image_3: 'https://i.imgur.com/nmUUPCH.jpg',
    image_4: 'https://i.imgur.com/iA1rtWM.jpg',
    image_5: 'https://i.imgur.com/CoGqvta.jpg',
    bio: "We're Ashley and Inga and we love to go for long adventures on the beach, preferably with a glass of Prosecco or La Croix. Message if you want to join us!",
    playful: false,
    affectionate: true,
    high_energy: false,
    shy: true,
    well_trained: true,
    large: false
  )  

  user4 = User.create!(
    name: 'Georgina',
    email: 'buster@gmail.com',
    password: "password",
    location: "93 Front St E, Toronto",
    lat: Geocoder.search("93 Front St E, Toronto").first.coordinates[0],
    lng: Geocoder.search("93 Front St E, Toronto").first.coordinates[1],
    dog_name: "Buster",
    primary_image: 'https://i.imgur.com/JHVYZBg.jpg',
    image_2: 'https://i.imgur.com/2YTWCN1.jpg',
    image_3: 'https://i.imgur.com/9azUI5L.jpg',
    image_4: 'https://i.imgur.com/AJh4bLO.jpg',
    image_5: 'https://i.imgur.com/CUDT4pb.jpg',
    bio: "Georgina and Buster here, we like to wander far and wide, sometimes for hours on end. HMU if you want to go wandering around too!",
    playful: false,
    affectionate: false,
    high_energy: true,
    shy: true,
    well_trained: false,
    large: true
  ) 

  user5 = User.create!(
    name: 'Zoe',
    email: 'ella@gmail.com',
    password: "password",
    location: "916 Dundas St W, Toronto",
    lat: Geocoder.search("916 Dundas St W, Toronto").first.coordinates[0],
    lng: Geocoder.search("916 Dundas St W, Toronto").first.coordinates[1],
    dog_name: "Ella",
    primary_image: 'https://i.imgur.com/T6CY58b.png',
    image_2: 'https://i.imgur.com/2bKWEt8.jpg',
    image_3: 'https://i.imgur.com/RE6jF3D.jpg',
    image_4: 'https://i.imgur.com/vJNXmDj.jpg',
    image_5: 'https://i.imgur.com/1IdBXXI.jpg',
    bio: "Zoe and Ella here, we enjoy taking long walks and eating carrots. Message if you want to eat some carrots with us! And if that doesn't sound fun, then we don't carrot all",
    playful: false,
    affectionate: true,
    high_energy: false,
    shy: true,
    well_trained: true,
    large: true
  ) 
  user6 = User.create!(
    name: 'Joey',
    email: 'pugly@gmail.com',
    password: "password",
    location: "777 Bay St, Toronto",
    lat: Geocoder.search("777 Bay St, Toronto").first.coordinates[0],
    lng: Geocoder.search("777 Bay St, Toronto").first.coordinates[1],
    dog_name: "Pugly",
    primary_image: 'https://i.imgur.com/vazHfhf.jpg',
    image_2: 'https://i.imgur.com/YhLEq2k.jpg',
    image_3: 'https://i.imgur.com/9ZeFCCe.jpg',
    image_4: 'https://i.imgur.com/H1hAaJP.jpg',
    image_5: 'https://i.imgur.com/1by3HcW.jpg',
    bio: "Welcome to Joey and Pugly's page! Pugly's refined gentleman with a strong sartorial sense. We love dressing up for every major and minor occasion. Contact us if you want to hang!",
    playful: true,
    affectionate: true,
    high_energy: false,
    shy: false,
    well_trained: true,
    large: false
  )

  user7 = User.create!(
    name: 'Suzanne',
    email: 'finley@gmail.com',
    password: "password",
    location: "218 Adelaide St W, Toronto",
    lat: Geocoder.search("218 Adelaide St W, Toronto").first.coordinates[0],
    lng: Geocoder.search("218 Adelaide St W, Toronto").first.coordinates[1],
    dog_name: "Finley",
    primary_image: 'https://i.imgur.com/Tx9x2Db.jpg',
    image_2: 'https://i.imgur.com/np7uNmS.jpg',
    image_3: 'https://i.imgur.com/3MF6Em9.jpg',
    image_4: 'https://i.imgur.com/RAwD7p9.jpg',
    image_5: 'https://i.imgur.com/yu2NDRk.jpg',
    bio: "Hello, from Suzanne and Finley. We like to go on long walks in the afternoon, and take long naps afterwards. Message if you want to walk with us!",
    playful: true,
    affectionate: true,
    high_energy: false,
    shy: false,
    well_trained: false,
    large: true
  )

Conversation.destroy_all
user_list.each do |location, lat, lng|
  newUser = User.create!(
    name: Faker::Name.first_name,
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
