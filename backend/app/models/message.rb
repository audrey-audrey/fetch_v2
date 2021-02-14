class Message < ApplicationRecord
  belongs_to :conversations
  belongs_to :users 
  validates_presence_of :content, :conversation_id, :user_id
end
