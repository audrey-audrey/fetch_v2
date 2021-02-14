class User < ApplicationRecord
  has_many :favorites, dependent: :destroy
  has_many :conversations, dependent: :destroy

end
