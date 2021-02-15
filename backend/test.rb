require 'geocoder'

def getLat(location) 
  results = Geocoder.search(location)
  lat = results.first.coordinates[0]
end

def getLng(location) 
  results = Geocoder.search(location)
  lng = results.first.coordinates[1]
end

user_list = [
  ["800 Bay St, Toronto"], 
  ["525 University Ave #3, Toronto"],
  ["600 University Ave, Toronto"],
  ["3 Carlton St, Toronto"],
  ["60 Queen St W, Toronto"]
]

user_list.each do |location|
    p Faker::Name.name
    p Faker::Internet.unique.email
    p "password"
    p location
    p getLat(location),
    p getLng(location)
    p Faker::Creature::Dog.name
    p JSON.parse(open('https://dog.ceo/api/breeds/image/random').read)["message"]
    p Faker::LoremFlickr.image(search_terms: ['person'])
    p Faker::Lorem.paragraph
    p Faker::Boolean.boolean(true_ratio: 0.5)
    p Faker::Boolean.boolean(true_ratio: 0.5)
    p Faker::Boolean.boolean(true_ratio: 0.5)
    p Faker::Boolean.boolean(true_ratio: 0.5)
    p Faker::Boolean.boolean(true_ratio: 0.5)
    p Faker::Boolean.boolean(true_ratio: 0.5)
end