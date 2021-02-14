class Conversation < ApplicationRecord
  belongs_to :recipient, :class_name => "User"
  belongs_to :initiator, :class_name => "User"
  has_many :messages, dependent: :destroy
end
