class Conversation < ApplicationRecord
  belongs_to :recipient, class_name: "User", foreign_key: "recipient"
  belongs_to :initiator, class_name: "User", foreign_key: "initiator"
  has_many :messages, dependent: :destroy
end
