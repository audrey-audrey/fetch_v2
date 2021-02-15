class Conversation < ApplicationRecord
  belongs_to :recipient, class_name: "User", foreign_key: "recipient_id"
  belongs_to :initiator, class_name: "User", foreign_key: "initiator_id"
  has_many :messages, dependent: :destroy

  scope :link, -> (initiator_id, recipient_id) do
    where(
      "(conversations.initiator_id = ? AND conversations.recipient_id = ?) OR (conversations.recipient_id = ? AND conversations.initiator_id = ?",initiator_id, recipient_id, initiator_id, recipient_id)
  end
end
