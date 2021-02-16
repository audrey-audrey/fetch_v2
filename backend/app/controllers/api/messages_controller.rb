class Api::MessagesController < ApplicationController

  before_action do
    @conversation = Conversation.find(params[:conversation_id])
  end

  def index
    messages = @conversation.messages

    messages.where("user_id != ? AND read = ?", params[:user_id], false).update_all(read: true)

    message = @conversation.messages.new

    render json: messages
  end

  def create
    message = @conversation.messages.new(message_params)
    message.user = current_user

    if message.save
      redirect_to conversation_messages_path(@conversation)
    end
  end

  private
    def message_params
      params.require(:message).permit(:body, :user_id)
    end
end
