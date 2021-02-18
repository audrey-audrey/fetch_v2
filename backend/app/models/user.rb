class User < ApplicationRecord
  
  has_many :favorites, :class_name => "Favorite", :foreign_key => "favoriter_id", primary_key: "id", dependent: :destroy
  has_many :conversations, dependent: :destroy

end
