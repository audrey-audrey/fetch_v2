class User < ApplicationRecord
  # validates :email, presence: true, uniqueness: { case_sensitive: false }
  has_many :favorites, dependent: :destroy
  has_many :conversations, dependent: :destroy

end
