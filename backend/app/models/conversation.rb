class Conversation < ApplicationRecord
  belongs_to :recipient, class_name: "User", foreign_key: "recipient_id"
  belongs_to :initiator, class_name: "User", foreign_key: "initiator_id"
  has_many :messages, dependent: :destroy
end
