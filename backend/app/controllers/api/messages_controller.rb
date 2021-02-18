class Api::MessagesController < ApplicationController

  before_action do
    @conversation = Conversation.includes(messages: [:user]).find(params[:conversation_id])
  end

  def index
    messages = @conversation.messages
    render json: {user_info: messages}, include: :user

    # messages.where("user_id != ? AND read = ?", params[:user_id], false).update_all(read: true)

    # user_info = messages.select("messages.*, users.name as name").joins("INNER JOIN users ON messages.user_id = users.id")

  end

  def create
    message = @conversation.messages.includes(:user).create!(message_params)

    render json: message, include: :user
  end

  private
    def message_params
      params.require(:message).permit(:content, :user_id, :conversation_id)
    end
end
