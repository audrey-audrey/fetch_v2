class Api::ConversationsController < ApplicationController

  def index 
    conversations = Conversation.select('*').where("initiator_id = ? OR recipient_id = ?", params[:id], params[:id])
    initiators = conversations.joins("INNER JOIN users ON conversations.initiator_id = users.id")
    recipients = conversations.joins("INNER JOIN users ON conversations.recipient_id = users.id")

    unreads = Message.select("COUNT(read), conversation_id as id").group(:conversation_id)

    render json: {conversations: conversations, initiators: initiators, recipients: recipients, unreads: unreads}
  end

  def create
    conversation = Conversation.find_or_create_by!(conversation_params)

    render json: conversation
  end
  


  private
  def conversation_params
    params.permit(:initiator_id, :recipient_id)
  end
end
