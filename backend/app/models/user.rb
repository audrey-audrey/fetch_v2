class User < ApplicationRecord
<<<<<<< HEAD
  # validates :email, presence: true, uniqueness: { case_sensitive: false }
=======
>>>>>>> main
  has_many :favorites, dependent: :destroy
  has_many :conversations, dependent: :destroy

end
