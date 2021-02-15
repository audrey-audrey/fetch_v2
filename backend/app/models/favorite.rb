class Favorite < ApplicationRecord
  belongs_to :favoriter, :class_name => "User"
  belongs_to :favoritee, :class_name => "User"
end
