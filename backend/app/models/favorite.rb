class Favorite < ApplicationRecord
  belongs_to :favoriter, :class_name => "User", foreign_key: "favoriter"
  belongs_to :favoritee, :class_name => "User", foreign_key: "favoritee"
end
