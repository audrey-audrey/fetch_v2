class Favorite < ApplicationRecord
  belongs_to :favoriter, :class_name => "User", foreign_key: "favoriter_id", :primary_key => "id"
  belongs_to :favoritee, :class_name => "User", foreign_key: "favoritee_id"
  # attr_accessor :favoriter, :favoritee
  # belongs_to :favoriter, class_name: "User", foreign_key: "favoriter", primary_key: "id"
  # belongs_to :user, foreign_key: "favoriter", primary_key: "id"
end
